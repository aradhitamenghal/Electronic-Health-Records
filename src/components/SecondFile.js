
import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import file from '../abis/file.json'
import '../loginStyle.css'
import LoginForm from './LoginForm';

//src={`https://ipfs.infura.io/ipfs/${this.state.filehash}`}
//src="https://ipfs.infura.io/ipfs/QmUQJrygU9rh3AfvWzs61hLkeEkJtZHnyR8LMQVAjTTcF5"
//<img  src={`https://ipfs.infura.io/ipfs/${this.state.filehash}`} width="500" height="300"/>

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

export class SecondFile extends Component {


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
            contract: null,
            visibility:'hidden'
        };
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
      this.setState({visibility: 'hidden'})
      const file = event.target.files[0]
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {
          this.setState({ buffer: Buffer(reader.result) })
      }
  }

  onSubmit = (event) => {
      event.preventDefault()

      this.setState({visibility: 'visible'})
      ipfs.add(this.state.buffer, (error, result) => {
        console.log('Ipfs result', result)
        this.setState({visibility: 'hidden'})
        const filehash=result[0].hash
        this.setState({filehash})
        if(error) {
            console.error(error)
            return
        }
        //store a file on blockchain
       this.state.contract.methods.set(result[0].hash).send({ from: this.state.account }).then((r) => {
          return  this.setState({ filehash: result[0].hash })
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
          <p id='heading'>
            Electronic Health Record System
            </p>
          </a>


        </nav>

        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <br/><br/>


                <p>&nbsp;</p>
                <h2>Electronic Health Record</h2>
                <br/>
                <h3 className="ur">
                Welcome Patient {this.props.values.name}
                </h3>
                <br/><br/>

                <form onSubmit={this.onSubmit} >
                  <input type='file' Name="btnSubmit" onChange={this.captureFile} />
                  <br/> <br/> <br/>
                  <input type='submit' id="finalbtn" className="btnSubmit" onClick={LoginForm.continue} />
                  <br/><br/>
                  <div  id="afterSub" style={{visibility: this.state.visibility }}>
                        Submitting to IPFS....Please Wait For A While
                    </div>

                </form>


              </div>

            </main>

          </div>
        </div>
      </div>


    );
  }

}

export default SecondFile;
