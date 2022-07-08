import { select, call, put, takeLatest, fork } from 'redux-saga/effects';
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

export function* electionRequestAccountWorker() {
  try {
    const web3 = new Web3(Web3.givenProvider || ELECTION_GANACHE_URL);
    const electionAccounts = yield call(web3.eth.requestAccounts);
    // const electionAccount = yield call(web3.eth.getCoinbase);
    return electionAccounts[0];
  } catch ({ message }) {
    console.log('electionRequestAccountWorker error:', message);
    yield put(electionRequestInfoError(message));
    return '';
  }
}

export function* electionRequestContractWorker() {
  try {
    const web3 = new Web3(Web3.givenProvider || ELECTION_GANACHE_URL);
    const { data } = yield call(electionRequestInfoApi);
    const electionAddress = data.networks['5777'].address;
    const electionAbi = data.abi;
    const electionContract = new web3.eth.Contract(electionAbi, electionAddress);
    return [electionContract, electionAddress];
  } catch ({ message }) {
    console.log('electionRequestContractWorker error:', message);
    yield put(electionRequestInfoError(message));
    return [];
  }
}

export function* electionRequestInfoWorker() {
  try {
    // Get user account
    const electionAccount = yield call(electionRequestAccountWorker);
    // Get contract instance and contract address
    const [electionContract, electionAddress] = yield call(electionRequestContractWorker);
    // Get election candidates
    const candidatesCount = yield call(electionContract.methods.candidatesCount().call);
    // Filter candidate props
    const electionCandidates = [];
    for (let i = 1; i <= candidatesCount; i++) {
      const candidate = yield call(electionContract.methods.candidates(i).call);
      const electionCandidate = yield call(electionRequestInfoCandidateAdapter, candidate);
      electionCandidates.push(electionCandidate);
    }

    yield put(
      electionRequestInfoSuccess({
        electionAccount,
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
  yield takeLatest(electionRequestInfo, electionRequestInfoWorker);
}

export function* electionRequestVoteWorker({ payload }) {
  try {
    // Get contract address and ABI
    const [electionContract] = yield call(electionRequestContractWorker);
    const { electionAccount } = yield select(selectElection);
    // Trigger vote
    const receipt = yield call(electionContract.methods.vote(payload).send, {
      from: electionAccount,
    });
    yield call(electionRequestInfoWorker);
    console.log(receipt);
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
