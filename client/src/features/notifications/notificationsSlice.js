import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  data: [],
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificationsAdd: {
      prepare: (notification) => ({
        payload: {
          ...notification,
          id: uuidv4(),
          displayed: false,
        },
      }),
      reducer: (state, { payload }) => {
        state.data = [...state.data, payload];
      },
    },
    notificationsDisplay: (state, { payload }) => {
      state.data = state.data.map((notification) =>
        notification.id === payload ? { ...notification, displayed: true } : notification,
      );
    },
    notificationsRemove: (state, { payload }) => {
      state.data = state.data.filter(({ id }) => id !== payload);
    },
  },
});

export const { notificationsAdd, notificationsDisplay, notificationsRemove } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
