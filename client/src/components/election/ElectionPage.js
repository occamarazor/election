import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { REQUEST_STATUS_TYPES } from '../common/commonConstants';
import { selectElection } from '../../features/election/electionSelectors';
import { electionRequestCandidates } from '../../features/election/electionSlice';
import ElectionCandidates from './ElectionCandidates';
import ElectionError from './ElectionError';

const ElectionPage = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectElection);
  const electionLoadSuccess = status === REQUEST_STATUS_TYPES.SUCCESS;
  const electionLoadError = status === REQUEST_STATUS_TYPES.ERROR;
  const electionLoading = !electionLoadSuccess && !electionLoadError;

  useEffect(() => {
    dispatch(electionRequestCandidates());
  }, [dispatch]);

  return (
    <>
      {electionLoading && <LinearProgress />}

      <Box pt={8}>
        {electionLoadSuccess && <ElectionCandidates />}
        {electionLoadError && <ElectionError title='ElectionPage error' error={error} />}
      </Box>
    </>
  );
};

export default ElectionPage;
