const Election = artifacts.require('Election');

contract('Election', () => {
  it('initializes with 2 candidates', async () => {
    const electionInstance = await Election.deployed();
    const candidatesCount = await electionInstance.candidatesCount();
    assert.equal(candidatesCount, 2);
  });

  it('initializes the candidate 1 with correct values', async () => {
    const electionInstance = await Election.deployed();
    const { id, name, slogan, voteCount } = await electionInstance.candidates(1);
    assert.equal(id, 1, 'contains the correct id');
    assert.equal(name, 'Franklin', 'contains the correct name');
    assert.equal(slogan, 'Happy Days Are Here Again', 'contains the correct slogan');
    assert.equal(voteCount, 0, 'contains the correct votes count');
  });

  it('initializes the candidate 2 with correct values', async () => {
    const electionInstance = await Election.deployed();
    const { id, name, slogan, voteCount } = await electionInstance.candidates(2);
    assert.equal(id, 2, 'contains the correct id');
    assert.equal(name, 'Grant', 'contains the correct name');
    assert.equal(slogan, 'Let Us Have Peace', 'contains the correct slogan');
    assert.equal(voteCount, 0, 'contains the correct votes count');
  });
});
