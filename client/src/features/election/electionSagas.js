import { select, call, put, takeLatest, fork } from 'redux-saga/effects';
// import Web3 from 'web3';
import Web3 from 'web3/dist/web3.min.js';
import { GANACHE_URL } from '../../components/common/commonConstants';
import { selectUser } from '../user/userSelectors';
import { ELECTION_GANACHE_NETWORK_ID } from './electionConstants';
import {
  electionRequestCandidates,
  electionRequestCandidatesSuccess,
  electionRequestCandidatesError,
  electionRequestVote,
} from './electionSlice';
import electionContractData from '../../contracts/Election.json';
import { electionRequestCandidatesAdapter } from './electionAdapters';

function* electionRequestContractWorker() {
  try {
    const web3 = new Web3(Web3.givenProvider || GANACHE_URL);
    const electionAddress = electionContractData.networks[ELECTION_GANACHE_NETWORK_ID].address;
    return new web3.eth.Contract(electionContractData.abi, electionAddress);
  } catch ({ message }) {
    // TODO: error notification
    console.log('electionRequestContractWorker error:', message);
    yield put(electionRequestCandidatesError(message));
    return null;
  }
}

function* electionRequestCandidatesWorker() {
  try {
    const electionContract = yield call(electionRequestContractWorker);
    const candidatesCount = yield call(electionContract.methods.candidatesCount().call);
    const electionCandidates = [];

    for (let i = 1; i <= candidatesCount; i++) {
      const candidate = yield call(electionContract.methods.candidates(i).call);
      const electionCandidate = yield call(electionRequestCandidatesAdapter, candidate);
      electionCandidates.push(electionCandidate);
    }

    yield put(electionRequestCandidatesSuccess(electionCandidates));
  } catch ({ message }) {
    console.log('electionRequestCandidatesWorker error:', message);
    yield put(electionRequestCandidatesError(message));
  }
}

function* electionRequestCandidatesWatcher() {
  yield takeLatest(electionRequestCandidates, electionRequestCandidatesWorker);
}

function* electionRequestVoteWorker({ payload }) {
  try {
    const { data: userAccount } = yield select(selectUser);
    const electionContract = yield call(electionRequestContractWorker);
    const receipt = yield call(electionContract.methods.vote(payload).send, {
      from: userAccount,
    });

    console.log(receipt);
    yield call(electionRequestCandidatesWorker);
  } catch ({ message }) {
    // TODO: error notification
    console.log('electionRequestVoteWorker error:', message);
  }
}

function* electionRequestVoteWatcher() {
  yield takeLatest(electionRequestVote, electionRequestVoteWorker);
}

const electionSagas = [fork(electionRequestCandidatesWatcher), fork(electionRequestVoteWatcher)];

export default electionSagas;
