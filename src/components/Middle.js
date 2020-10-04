
import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import file from '../abis/file.json';
import '../loginStyle.css';
import SecondFile from './SecondFile';
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
//<img  src={`https://ipfs.infura.io/ipfs/${this.state.filehash}`} width="700" height="500"/>


export class Middle extends Component {


  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  constructor(props) {
  super(props)

    this.state = {
      account:'',
      buffer: null,
      filehash: '',
      contract: null
    };
  }

  docclick(){
    window.open('https://ipfs.infura.io/ipfs/QmUQJrygU9rh3AfvWzs61hLkeEkJtZHnyR8LMQVAjTTcF5', '_blank')
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {

      const web3 = window.web3
      // Load account
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      const networkId = await web3.eth.net.getId()
      const networkData = file.networks[networkId]
      if(networkData) {
        const contract = web3.eth.Contract(file.abi, networkData.address)
        this.setState({ contract })
        const filehash = await contract.methods.get().call()
        this.setState({ filehash })
      } else {
        window.alert('Smart contract not deployed to detected network.')
      }
    }



  captureFile = (event) => {

    event.preventDefault()
    //Process file for ipfs
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
    }
  }


  onSubmit = (event) => {
      event.preventDefault()
      console.log("Submitting file to ipfs...")
      ipfs.add(this.state.buffer, (error, result) => {
        console.log('Ipfs result', result)
        const filehash=result[0].hash
        this.setState({filehash})
        if(error) {
          console.error(error)
          return
        }
        //store a file on blockchain
       this.state.contract.methods.set(result[0].hash).send({ from: this.state.account }).then((r) => {
         return this.setState({ filehash: result[0].hash })
       })
      })
    }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            rel="noopener noreferrer"
          >
            Electronic Health Record System
          </a>

        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
                <h2 className="ur" >Welcome Dr.  {this.props.values.name}</h2>
                <br/><br/>
                  <h3>View Patient's Records</h3>
                  <br></br>
                  <input type='submit' id='docbtn' className="btnSubmit" value="View Records"  onClick={this.docclick}/>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

}

export default Middle;
