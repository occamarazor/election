import Container from '@mui/material/Container';
import ElectionMain from '../election/ElectionMain';

const AppMain = () => (
  <Container component='main' maxWidth='lg' sx={{ pt: 16, pb: 6 }}>
    <ElectionMain />
  </Container>
);

export default AppMain;
