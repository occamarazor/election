const Election = artifacts.require('Election');

contract('Election', () => {
  it('initializes with 2 candidates', () =>
    Election.deployed()
      .then((instance) => instance.candidatesCount())
      .then((count) => {
        assert.equal(count, 2);
      }));

  it('initializes candidate 1 with the correct values', () =>
    Election.deployed()
      .then((instance) => instance.candidates(1))
      .then(({ id, name, slogan, voteCount }) => {
        assert.equal(id, 1, 'contains the correct id');
        assert.equal(name, 'Franklin', 'contains the correct name');
        assert.equal(slogan, 'Happy Days Are Here Again', 'contains the correct slogan');
        assert.equal(voteCount, 0, 'contains the correct votes count');
      }));

  it('initializes candidate 2 with the correct values', () =>
    Election.deployed()
      .then((instance) => instance.candidates(2))
      .then(({ id, name, slogan, voteCount }) => {
        assert.equal(id, 2, 'contains the correct id');
        assert.equal(name, 'Grant', 'contains the correct name');
        assert.equal(slogan, 'Let Us Have Peace', 'contains the correct slogan');
        assert.equal(voteCount, 0, 'contains the correct votes count');
      }));
});
