import Container from '@mui/material/Container';
import ElectionCandidates from '../election/ElectionCandidates';

const AppSection = () => (
  <Container
    component='section'
    maxWidth='md'
    sx={{
      borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      mb: 8,
    }}
  >
    <ElectionCandidates />
  </Container>
);

export default AppSection;
