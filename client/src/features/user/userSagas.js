import { call, put, takeLatest, fork } from 'redux-saga/effects';
// import Web3 from 'web3';
// import Web3 from 'web3/dist/web3.min.js';
// import { GANACHE_URL } from '../../components/common/commonConstants';
import { NOTIFICATION_TYPES } from '../../components/common/commonConstants';
import { notificationsAdd } from '../notifications/notificationsSlice';
import {
  userRequestAccount,
  userRequestAccountSuccess,
  userRequestAccountError,
} from './userSlice';

function* userRequestAccountWorker() {
  try {
    const userAccounts = yield call(window.ethereum.request, { method: 'eth_requestAccounts' });
    const userAccount = userAccounts[0];
    yield put(userRequestAccountSuccess(userAccount));
    yield put(
      notificationsAdd({
        message: `User account: connected to '${userAccount}'`,
        variant: NOTIFICATION_TYPES.SUCCESS,
      }),
    );
  } catch ({ message }) {
    yield put(
      notificationsAdd({
        message: 'User account: connect error',
        variant: NOTIFICATION_TYPES.ERROR,
      }),
    );
    yield put(userRequestAccountError(message));
    console.log('userRequestAccountWorker error:', message);
  }
}

// function* userRequestAccountWorker() {
//   try {
//     const web3 = new Web3(Web3.givenProvider || GANACHE_URL);
//     const userAccounts = yield call(web3.eth.requestAccounts);
//     // const userAccount = yield call(web3.eth.getCoinbase);
//     yield put(userRequestAccountSuccess(userAccounts[0]));
//   } catch ({ message }) {
//     yield put(userRequestAccountError(message));
//     console.log('userRequestAccountWorker error:', message);
//   }
// }

function* userRequestAccountWatcher() {
  yield takeLatest(userRequestAccount, userRequestAccountWorker);
}

const userSagas = [fork(userRequestAccountWatcher)];

export default userSagas;
