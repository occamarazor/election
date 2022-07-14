const Election = artifacts.require('Election');

contract('Election', (accounts) => {
  const accountOne = accounts[0];
  const accountTwo = accounts[1];

  it('initializes with 2 candidates', async () => {
    const electionInstance = await Election.deployed();
    const candidatesCount = await electionInstance.candidatesCount();

    assert.equal(candidatesCount, 2);
  });

  it('initializes the candidates with correct values', async () => {
    const electionInstance = await Election.deployed();
    const candidateOne = await electionInstance.candidates(1);
    const candidateTwo = await electionInstance.candidates(2);

    assert.equal(candidateOne.id, 1, 'contains the correct id');
    assert.equal(candidateOne.name, 'Franklin', 'contains the correct name');
    assert.equal(candidateOne.slogan, 'Happy Days Are Here Again', 'contains the correct slogan');
    assert.equal(candidateOne.voteCount, 0, 'contains the correct votes count');
    assert.equal(candidateTwo.id, 2, 'contains the correct id');
    assert.equal(candidateTwo.name, 'Grant', 'contains the correct name');
    assert.equal(candidateTwo.slogan, 'Let Us Have Peace', 'contains the correct slogan');
    assert.equal(candidateTwo.voteCount, 0, 'contains the correct votes count');
  });

  it('allows voter to cast a vote', async () => {
    const candidateId = 1;
    const electionInstance = await Election.deployed();

    await electionInstance.vote(candidateId, { from: accountOne });

    const voted = await electionInstance.voters(accountOne);
    const { voteCount } = await electionInstance.candidates(candidateId);

    assert.equal(voted, true, 'voter marked as voted');
    assert.equal(voteCount, 1, "increments candidate's voteCount");
  });

  it('throws an exception for invalid candidates', async () => {
    const candidateId = 99;
    const electionInstance = await Election.deployed();

    try {
      await electionInstance.vote(candidateId, { from: accountTwo });
    } catch (e) {
      assert(e.message.includes('revert'), "error message must contain 'revert'");
    }

    const candidateOne = await electionInstance.candidates(1);
    assert.equal(candidateOne.voteCount, 1, 'candidate 1 did not receive any votes');

    const candidateTwo = await electionInstance.candidates(2);
    assert.equal(candidateTwo.voteCount, 0, 'candidate 2 did not receive any votes');
  });

  it('throws an exception for double voting', async () => {
    const candidateId = 2;
    const electionInstance = await Election.deployed();

    await electionInstance.vote(candidateId, { from: accountTwo });

    const voted = await electionInstance.voters(accountTwo);
    const { voteCount } = await electionInstance.candidates(candidateId);

    assert.equal(voted, true, 'voter marked as voted on first vote');
    assert.equal(voteCount, 1, "increments candidate's voteCount on first vote");

    try {
      await electionInstance.vote(candidateId, { from: accountTwo });
    } catch (e) {
      assert(e.message.includes('revert'), "error message must contain 'revert'");
    }

    const candidateOne = await electionInstance.candidates(1);
    assert.equal(candidateOne.voteCount, 1, 'candidate 1 did not receive any votes');

    const candidateTwo = await electionInstance.candidates(2);
    assert.equal(candidateTwo.voteCount, 1, 'candidate 2 did not receive any votes');
  });
});
