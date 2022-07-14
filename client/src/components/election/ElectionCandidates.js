import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import { NOTIFICATION_TYPES } from '../common/commonConstants';
import { notificationsAdd } from '../../features/notifications/notificationsSlice';
import { selectUser } from '../../features/user/userSelectors';
import { selectElection } from '../../features/election/electionSelectors';
import { electionRequestVote } from '../../features/election/electionSlice';

const ElectionCandidates = () => {
  const dispatch = useDispatch();
  const { data: userAccount } = useSelector(selectUser);
  const { data: candidates } = useSelector(selectElection);

  const handleCandidateVote = useCallback(
    (candidateId) => () => {
      if (userAccount) {
        dispatch(electionRequestVote(candidateId));
      } else {
        dispatch(
          notificationsAdd({
            message: 'Election vote: error; please connect',
            variant: NOTIFICATION_TYPES.ERROR,
          }),
        );
      }
    },
    [dispatch, userAccount],
  );

  return (
    <Container
      maxWidth='md'
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        pb: 6,
      }}
    >
      <Grid container spacing={5} alignItems='flex-end'>
        {candidates.map(({ id, name, slogan, voteCount }) => (
          <Grid item key={id} xs={12} sm={6}>
            <Card>
              <CardHeader
                title={'Candidate name'}
                subheader={name}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                sx={{ backgroundColor: (theme) => theme.palette.grey[200] }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2,
                  }}
                >
                  <Typography component='h2' variant='h3' color='text.primary'>
                    Votes: {voteCount}
                  </Typography>
                </Box>
                <ul>
                  <Typography component='li' variant='subtitle1' align='center'>
                    {`"${slogan}"`}
                  </Typography>
                </ul>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant='outlined'
                  color={userAccount ? 'success' : 'error'}
                  onClick={handleCandidateVote(id)}
                >
                  Vote
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ElectionCandidates;
