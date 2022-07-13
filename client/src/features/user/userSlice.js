import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS_TYPES } from '../../components/common/commonConstants';

// TODO: voted
const initialState = {
  status: REQUEST_STATUS_TYPES.INITIAL,
  data: '',
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userRequestAccount: (state) => {
      state.status = REQUEST_STATUS_TYPES.LOADING;
    },
    userRequestAccountSuccess: (state, { payload }) => {
      state.data = payload;
      state.status = REQUEST_STATUS_TYPES.SUCCESS;
    },
    userRequestAccountError: (state, { payload }) => {
      state.error = payload;
      state.status = REQUEST_STATUS_TYPES.ERROR;
    },
  },
});

export const {
  userRequestAccount,
  userRequestAccountSuccess,
  userRequestAccountError,
  userResetAccount,
} = userSlice.actions;

export default userSlice.reducer;
