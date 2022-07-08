import { select, call, put, takeEvery, takeLatest, fork } from 'redux-saga/effects';
// import Web3 from 'web3';
import Web3 from 'web3/dist/web3.min.js';
import { ELECTION_GANACHE_URL } from './electionConstants';
import { selectElection } from './electionSelectors';
import {
  electionRequestInfo,
  electionRequestInfoSuccess,
  electionRequestInfoError,
  electionRequestVote,
} from './electionSlice';
import { electionRequestInfoApi } from './electionApi';
import { electionRequestInfoCandidateAdapter } from './electionAdapters';

export function* electionRequestInfoWorker({ payload }) {
  try {
    const web3 = new Web3(Web3.givenProvider || ELECTION_GANACHE_URL);

    // Get user account
    const electionAccounts = yield call(web3.eth.requestAccounts);
    // const electionAccount = yield call(web3.eth.getCoinbase);

    // Get contract address
    const { data } = yield call(electionRequestInfoApi, payload);
    const electionAddress = data.networks['5777'].address;

    // Get election candidates
    const electionAbi = data.abi;
    const election = new web3.eth.Contract(electionAbi, electionAddress);
    const candidatesCount = yield call(election.methods.candidatesCount().call);

    const electionCandidates = [];
    for (let i = 1; i <= candidatesCount; i++) {
      const candidate = yield call(election.methods.candidates(i).call);
      const electionCandidate = yield call(electionRequestInfoCandidateAdapter, candidate);
      electionCandidates.push(electionCandidate);
    }

    yield put(
      electionRequestInfoSuccess({
        electionAbi,
        electionAccount: electionAccounts[0],
        electionAddress,
        electionCandidates,
      }),
    );
  } catch ({ message }) {
    yield put(electionRequestInfoError(message));
    console.log('electionRequestInfoWorker error:', message);
  }
}

function* electionRequestInfoWatcher() {
  yield takeEvery(electionRequestInfo, electionRequestInfoWorker);
}

export function* electionRequestVoteWorker({ payload }) {
  try {
    const web3 = new Web3(Web3.givenProvider || ELECTION_GANACHE_URL);
    const { electionAccount, electionAbi, electionAddress } = yield select(selectElection);
    const election = new web3.eth.Contract(electionAbi, electionAddress);
    const receipt = yield call(election.methods.vote(payload).send, { from: electionAccount });
    console.log(receipt);

    // const { data } = yield call(electionRequestVoteApi, payload);
    // const prop = yield call(electionRequestVoteAdapter, data);
    // yield put(electionRequestVoteSuccess(prop));
  } catch ({ message }) {
    // yield put(electionRequestVoteError(message));
    console.log('electionRequestVoteWorker error:', message);
  }
}

function* electionRequestVoteWatcher() {
  yield takeLatest(electionRequestVote, electionRequestVoteWorker);
}

const electionSagas = [fork(electionRequestInfoWatcher), fork(electionRequestVoteWatcher)];

export default electionSagas;
