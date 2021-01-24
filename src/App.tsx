import React, { Component } from 'react'
import './App.css';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

class App extends Component {

  
    state = {
      address: ''

    }
   connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });


  
  walletConnectFunc = async () => {

    if (this.connector.connected) {
      alert("already connected")
      return
    }
    this.connector.createSession();
    this.connector.on("connect", async (error, payload) => {
      console.log("connect")
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
      console.log("connect account", accounts)
      console.log("chainid account", chainId)

      const obj = {
        "address": accounts[0],

      }
      this.setState({ address: obj.address })
      console.log(this.state.address)
      alert(this.state.address)
    })


  }
  render() {
    return (
      <div className="App">

        
          <div>
            <button className="btn btn-primary my-4" type="button" onClick={() => this.walletConnectFunc()}>WalletConnect</button>
          </div>
          <p id="walletconnect" hidden>{this.state.address}</p>
        
      </div>
    );
  }
}

export default App;
