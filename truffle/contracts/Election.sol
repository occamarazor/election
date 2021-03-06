// SPDX-License-Identifier: MIT
// Declare the source file compiler version
pragma solidity ^0.8.1;

contract Election {
    // Model a candidate
    struct Candidate {
        uint id;
        string name;
        string slogan;
        uint voteCount;
    }
    // Store candidates
    mapping (uint => Candidate) public candidates;
    // Store candidates count
    uint public candidatesCount;
    // Store voters
    mapping (address => bool) public voters;
    // Constructor
    constructor() {
        addCandidate("Franklin", "Happy Days Are Here Again");
        addCandidate("Grant", "Let Us Have Peace");
    }
    // Add new candidate
    function addCandidate(string memory _name, string memory _slogan) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _slogan, 0);
    }
    // Vote for candidate
    function vote(uint _candidateId) public {
        require(!voters[tx.origin]);
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        voters[tx.origin] = true;
        candidates[_candidateId].voteCount++;
    }
}
