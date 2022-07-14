import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    account: '',
    voted: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userRequestAccount: () => {},
    userRequestAccountSuccess: (state, { payload }) => {
      state.data.account = payload;
    },
    userRequestVoted: () => {},
    userRequestVotedSuccess: (state, { payload }) => {
      state.data.voted = payload;
    },
    userReset: (state) => {
      state.data = initialState.data;
    },
  },
});

export const {
  userRequestAccount,
  userRequestAccountSuccess,
  userRequestVoted,
  userRequestVotedSuccess,
  userReset,
} = userSlice.actions;

export default userSlice.reducer;
