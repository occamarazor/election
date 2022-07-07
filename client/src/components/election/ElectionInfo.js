import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { selectElection } from '../../features/election/electionSelectors';

const ElectionInfo = () => {
  const { electionAccount, electionAddress } = useSelector(selectElection);

  return (
    <Container sx={{ pb: 6 }}>
      <Typography component='h1' variant='h3' align='center' color='text.primary' gutterBottom>
        Your account: {electionAccount}
      </Typography>
      <Typography component='h2' variant='h5' align='center' color='text.secondary'>
        Contract address: {electionAddress}
      </Typography>
    </Container>
  );
};

export default ElectionInfo;
