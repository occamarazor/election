import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import notificationsReducer from './features/notifications/notificationsSlice';
import userReducer from './features/user/userSlice';
import electionReducer from './features/election/electionSlice';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    user: userReducer,
    election: electionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);
