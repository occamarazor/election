import { useSelector } from 'react-redux';
import { selectElection } from '../../features/election/electionSelectors';

const Election = () => {
  const { electionAccount, electionAddress, electionCandidates } = useSelector(selectElection);

  return (
    <>
      <div>Your account: {electionAccount}</div>
      <div>Contract address: {electionAddress}</div>
      <div>
        {electionCandidates.map(({ id, name, voteCount }) => (
          <div key={id}>
            <div>CANDIDATE ID: {id}</div>
            <div>CANDIDATE NAME: {name}</div>
            <div>CANDIDATE VOTES: {voteCount}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Election;
