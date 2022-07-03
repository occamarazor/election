// Declare the source file compiler version
pragma solidity ^0.8.1;

contract Election {
    // Declare state variables outside function, persist through life of contract
    string public candidate;
    // Constructor, can receive one or many variables here; only one allowed
    constructor() public {
        candidate = "Candidate 1";
    }
}
