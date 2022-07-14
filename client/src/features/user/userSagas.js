import { call, put, takeLatest, fork } from 'redux-saga/effects';
// import Web3 from 'web3';
import Web3 from 'web3/dist/web3.min.js';
import { GANACHE_URL, NOTIFICATION_TYPES } from '../../components/common/commonConstants';
import { notificationsAdd } from '../notifications/notificationsSlice';
import { userRequestAccount, userRequestAccountSuccess } from './userSlice';

function* userRequestAccountWorker() {
  try {
    const web3 = new Web3(Web3.givenProvider || GANACHE_URL);
    const userAccounts = yield call(web3.eth.requestAccounts);
    const userAccount = userAccounts[0];
    // const userAccount = yield call(web3.eth.getCoinbase);
    yield put(userRequestAccountSuccess(userAccount));
    yield put(
      notificationsAdd({
        message: `User account: connected to '${userAccount}'`,
        variant: NOTIFICATION_TYPES.SUCCESS,
      }),
    );
  } catch ({ message }) {
    const isPending = message.includes('pending');
    yield put(
      notificationsAdd({
        message: isPending ? 'User account: connect pending' : 'User account: connect error',
        variant: isPending ? NOTIFICATION_TYPES.WARNING : NOTIFICATION_TYPES.ERROR,
      }),
    );
    console.log('userRequestAccountWorker error:', message);
  }
}

function* userRequestAccountWatcher() {
  yield takeLatest(userRequestAccount, userRequestAccountWorker);
}

const userSagas = [fork(userRequestAccountWatcher)];

export default userSagas;
