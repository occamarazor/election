import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS_TYPES } from '../../components/common/commonConstants';

// TODO: move account to user slice
const initialState = {
  electionStatus: REQUEST_STATUS_TYPES.INITIAL,
  electionError: '',
  electionAccount: '',
  electionAbi: [],
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
      { payload: { electionAccount, electionAbi, electionAddress, electionCandidates } },
    ) => {
      state.electionAccount = electionAccount;
      state.electionAbi = electionAbi;
      state.electionAddress = electionAddress;
      state.electionCandidates = electionCandidates;
      state.electionStatus = REQUEST_STATUS_TYPES.SUCCESS;
    },
    electionRequestInfoError: (state, { payload }) => {
      state.electionError = payload;
      state.electionStatus = REQUEST_STATUS_TYPES.ERROR;
    },
    electionRequestVote: (state, { payload }) => {
      console.log(`Slice: Vote for candidate ${payload}`);
    },
    electionRequestRetract: (state, { payload }) => {
      console.log(`Slice: Retract vote for candidate ${payload}`);
    },
  },
});

export const {
  electionRequestInfo,
  electionRequestInfoSuccess,
  electionRequestInfoError,
  electionRequestVote,
  electionRequestRetract,
} = electionSlice.actions;

export default electionSlice.reducer;
