# Electronic-Health-Records

PROJECT DESCRIPTION:

Healthcare sector uses centralized systems to store medical records of their patients, leading to issues like data leaks and cyber-attacks. It is a challenge to access patients’ scattered data and is time consuming. Blockchain Technology helps to build decentralized systems, which will provide a secure, hassle-free, exchangeable and reusable storage system. 

WORKFLOW:       
  •	One can login either as a doctor or as a patient.
  •	Patient will upload his/her medical files, which will then be stored on the IPFS. 
  •	Doctor will request for the patient’s medical record. 
  •	After the patient grants the access, the doctor will be able to retrieve the contents located at the patient’s hash. 
  •	The doctor will then update the patient’s record, if necessary.

  NOTE: Code has been tested only with ganache, not with any testnet.

REQUIREMENTS:
  •	Nodejs: v14.4.0
  •	Npm: v6.14.5
  •	solc - v0.5.0  
  •	Web3
  •	Ganache 
  •	Truffle
  •	Metamask Chrome extension

STEPS TO RUN:
  •	Clone the repository
  •	Run npm install in the command prompt
  •	Start Ganache 
  •	Connect Metamask to the Ganache Network and import accounts
  •	Run truffle migrate
  •	Run npm run start


