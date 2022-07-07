import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { selectElection } from '../../features/election/electionSelectors';

const ElectionMain = () => {
  const { electionAccount, electionAddress } = useSelector(selectElection);

  return (
    <>
      <Typography component='h1' variant='h3' align='center' color='text.primary' gutterBottom>
        Your account: {electionAccount}
      </Typography>
      <Typography component='h2' variant='h5' align='center' color='text.secondary'>
        Contract address: {electionAddress}
      </Typography>
    </>
  );
};

export default ElectionMain;
