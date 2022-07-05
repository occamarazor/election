import { all } from 'redux-saga/effects';
import electionSagas from './features/election/electionSagas';

export default function* rootSaga() {
  yield all([...electionSagas]);
}
