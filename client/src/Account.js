import React, { useState, useEffect } from 'react';
import Web3 from 'web3/dist/web3.min.js';

const Account = () => {
  const [account, setAccount] = useState('');
  const [address, setAddress] = useState('');
  const [candidates, setCandidates] = useState([]);

  // TODO: move side effect
  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

      // Set current account
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      // const account = await web3.eth.getCoinbase();
      // setAccount(account);

      // Set contract address
      const electionResponse = await fetch('contracts/Election.json');
      const electionData = await electionResponse.json();
      const electionAddress = electionData.networks['5777'].address;
      setAddress(electionAddress);

      // Set candidates
      const electionAbi = electionData.abi;
      const electionContract = new web3.eth.Contract(electionAbi, electionAddress);
      const candidatesCount = await electionContract.methods.candidatesCount().call();

      for (let i = 1; i <= candidatesCount; i++) {
        const candidate = await electionContract.methods.candidates(i).call();
        setCandidates((candidates) => [...candidates, candidate]);
      }
    }

    load();
  }, []);

  return (
    <>
      <div>Your account: {account}</div>
      <div>Contract address: {address}</div>
      <div>
        {candidates.map(({ id, name, voteCount }) => (
          <div key={id}>
            <div>ID: {id}</div>
            <div>NAME: {name}</div>
            <div>VOTES: {voteCount}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Account;
