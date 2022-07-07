import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { REQUEST_STATUS_TYPES } from '../common/commonConstants';
import { selectElection } from '../../features/election/electionSelectors';
import { electionRequestInfo } from '../../features/election/electionSlice';
import AppHeader from './AppHeader';
import AppMain from './AppMain';
import AppSection from './AppSection';

const App = () => {
  const dispatch = useDispatch();
  const { electionStatus, electionError } = useSelector(selectElection);
  const electionLoadSuccess = electionStatus === REQUEST_STATUS_TYPES.SUCCESS;
  const electionLoadError = electionStatus === REQUEST_STATUS_TYPES.ERROR;
  const electionLoading = !electionLoadSuccess && !electionLoadError;

  useEffect(() => {
    dispatch(electionRequestInfo());
  }, []);

  const app = (
    <>
      <AppHeader />
      <AppMain />
      <AppSection />
    </>
  );

  return (
    <>
      {electionLoading && <LinearProgress />}
      {electionLoadSuccess && app}
      {electionLoadError && <>Election error: {electionError}</>}
    </>
  );
};

export default App;
