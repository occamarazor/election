import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  data: [],
};

// TODO: logs
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificationsAdd: {
      prepare(notification) {
        console.log('notificationsAdd prepare:', notification);
        const payload = {
          ...notification,
          id: uuidv4(),
          displayed: false,
        };
        return { payload };
      },
      reducer: (state, { payload }) => {
        console.log('notificationsAdd reducer:', payload);
        state.data = [...state.data, payload];
      },
    },
    notificationsDisplay: (state, { payload }) => {
      state.data = state.data.map(
        (notification) => {
          if (notification.id === payload) {
            console.log('notificationsDisplay:', { ...notification, displayed: true });
            return { ...notification, displayed: true };
          } else {
            return notification;
          }
        },
        // notification.id === payload ? { ...notification, displayed: true } : notification,
      );
    },
    notificationsRemove: (state, { payload }) => {
      console.log('notificationsRemove:', payload);
      state.data = state.data.filter(({ id }) => id !== payload);
    },
  },
});

export const { notificationsAdd, notificationsDisplay, notificationsRemove } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
