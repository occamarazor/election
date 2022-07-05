import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import electionReducer from './features/election/electionSlice';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    election: electionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);
