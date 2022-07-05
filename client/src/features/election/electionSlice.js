import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS_TYPES } from '../../components/common/commonConstants';

const initialState = {
  electionStatus: REQUEST_STATUS_TYPES.INITIAL,
  electionError: '',
  electionAccount: '',
  electionAddress: '',
  electionCandidates: [],
};

export const electionSlice = createSlice({
  name: 'election',
  initialState,
  reducers: {
    electionRequestInfo: (state) => {
      state.electionStatus = REQUEST_STATUS_TYPES.LOADING;
    },
    electionRequestInfoSuccess: (
      state,
      { payload: { electionAccount, electionAddress, electionCandidates } },
    ) => {
      state.electionAccount = electionAccount;
      state.electionAddress = electionAddress;
      state.electionCandidates = electionCandidates;
      state.electionStatus = REQUEST_STATUS_TYPES.SUCCESS;
    },
    electionRequestInfoError: (state, { payload }) => {
      state.electionError = payload;
      state.electionStatus = REQUEST_STATUS_TYPES.ERROR;
    },
  },
});

export const { electionRequestInfo, electionRequestInfoSuccess, electionRequestInfoError } =
  electionSlice.actions;

export default electionSlice.reducer;
