# Electronic-Health-Records

PROJECT DESCRIPTION:

The Healthcare sector uses centralized systems to store medical records of their patients, leading to issues like data leaks and cyber-attacks. It is a challenge to access patients’ scattered data and is time-consuming. Blockchain technology helps to build decentralized systems, which will provide a secure, hassle-free, exchangeable, and reusable storage system. 

WORKFLOW:       
  •	One can log in either as a doctor or as a patient. <br/>
  •	Patient will upload his/her medical files, which will then be stored on the IPFS.<br/>
  •	Doctor will request the patient’s medical record. <br/>
  •	After the patient grants access, the doctor will be able to retrieve the contents located at the patient’s hash. <br/>
  •	The doctor will then update the patient’s record, if necessary. <br/>

  NOTE: Code has been tested only with ganache, not with any testnet. <br/>

REQUIREMENTS: <br/>
  •	Nodejs: v14.4.0 <br/>
  •	Npm: v6.14.5 <br/>
  •	solc - v0.5.0  <br/>
  •	Web3 <br/>
  •	Ganache <br/>
  •	Truffle  <br/>
  •	Metamask Chrome extension <br/>

STEPS TO RUN: <br/>
  •	Clone the repository <br/>
  •	Run npm install in the command prompt <br/>
  •	Start Ganache <br/>
  •	Connect Metamask to the Ganache Network and import accounts <br/>
  •	Run truffle migrate <br/>
  •	Run npm run start <br/>
