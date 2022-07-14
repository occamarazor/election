import { createSlice } from '@reduxjs/toolkit';

// TODO: voted
const initialState = {
  data: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userRequestAccount: () => {},
    userRequestAccountSuccess: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { userRequestAccount, userRequestAccountSuccess } = userSlice.actions;

export default userSlice.reducer;
