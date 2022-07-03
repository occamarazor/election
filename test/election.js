const Election = artifacts.require('Election');

contract('Election', () => {
  it('initializes with 2 candidates',
    () => Election.deployed()
                  .then((instance) => instance.candidatesCount())
                  .then((count) => { assert.equal(count, 2) })
  );
  
  it('initializes candidate 1 with the correct values',
    () => Election.deployed()
                  .then((instance) => instance.candidates(1))
                  .then((candidateOne) => {
                    assert.equal(candidateOne.id, 1, 'contains the correct id');
                    assert.equal(candidateOne.name, 'Candidate 1', 'contains the correct name');
                    assert.equal(candidateOne.voteCount, 0, 'contains the correct votes count');
                  })
  );
  
  it('initializes candidate 2 with the correct values',
    () => Election.deployed()
                  .then((instance) => instance.candidates(2))
                  .then((candidateOne) => {
                    assert.equal(candidateOne.id, 2, 'contains the correct id');
                    assert.equal(candidateOne.name, 'Candidate 2', 'contains the correct name');
                    assert.equal(candidateOne.voteCount, 0, 'contains the correct votes count');
                  })
  );
});
