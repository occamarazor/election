import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS_TYPES } from '../../components/common/commonConstants';

const initialState = {
  status: REQUEST_STATUS_TYPES.INITIAL,
  data: [],
  error: '',
};

export const electionSlice = createSlice({
  name: 'election',
  initialState,
  reducers: {
    electionRequestCandidates: (state) => {
      state.status = REQUEST_STATUS_TYPES.LOADING;
    },
    electionRequestCandidatesSuccess: (state, { payload }) => {
      state.data = payload;
      state.status = REQUEST_STATUS_TYPES.SUCCESS;
    },
    electionRequestCandidatesError: (state, { payload }) => {
      state.error = payload;
      state.status = REQUEST_STATUS_TYPES.ERROR;
    },
    electionRequestVote: () => {},
  },
});

export const {
  electionRequestCandidates,
  electionRequestCandidatesSuccess,
  electionRequestCandidatesError,
  electionRequestVote,
} = electionSlice.actions;

export default electionSlice.reducer;
