import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { REQUEST_STATUS_TYPES } from '../common/commonConstants';
import { selectElection } from '../../features/election/electionSelectors';
import { electionRequestInfo } from '../../features/election/electionSlice';
import ElectionInfo from './ElectionInfo';
import ElectionCandidates from './ElectionCandidates';
import ElectionError from './ElectionError';

const ElectionPage = () => {
  const dispatch = useDispatch();
  const { electionStatus, electionError } = useSelector(selectElection);
  const electionLoadSuccess = electionStatus === REQUEST_STATUS_TYPES.SUCCESS;
  const electionLoadError = electionStatus === REQUEST_STATUS_TYPES.ERROR;
  const electionLoading = !electionLoadSuccess && !electionLoadError;

  useEffect(() => {
    dispatch(electionRequestInfo());
  }, []);

  return (
    <>
      {electionLoading && <LinearProgress />}

      <Box pt={8}>
        {electionLoadSuccess && (
          <>
            <ElectionInfo />
            <ElectionCandidates />
          </>
        )}
        {electionLoadError && <ElectionError title='ElectionPage error' error={electionError} />}
      </Box>
    </>
  );
};

export default ElectionPage;
