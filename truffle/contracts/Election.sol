// Declare the source file compiler version
pragma solidity ^0.8.1;

contract Election {
    // Model a candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    // Store candidates
    mapping (uint => Candidate) public candidates;
    // Store candidates count
    uint public candidatesCount;
    // Constructor
    constructor() public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }
    // Add new candidate
    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}
