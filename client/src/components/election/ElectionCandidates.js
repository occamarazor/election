import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import { selectElection } from '../../features/election/electionSelectors';

const ElectionCandidates = () => {
  const { electionCandidates } = useSelector(selectElection);

  return (
    <Grid container spacing={5} alignItems='flex-end'>
      {electionCandidates.map(({ id, name, slogan, voteCount }) => (
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
              <Button fullWidth variant='outlined'>
                Vote
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ElectionCandidates;
