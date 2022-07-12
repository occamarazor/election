import { all } from 'redux-saga/effects';
import userSagas from './features/user/userSagas';
import electionSagas from './features/election/electionSagas';

export default function* rootSaga() {
  yield all([...userSagas, ...electionSagas]);
}
