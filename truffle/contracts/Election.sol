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
    // Constructor
    constructor() public {
        addCandidate("Franklin", "Happy Days Are Here Again");
        addCandidate("Grant", "Let Us Have Peace");
    }
    // Add new candidate
    function addCandidate(string memory _name, string memory _slogan) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _slogan, 0);
    }
}
