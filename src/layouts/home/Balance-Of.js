import React, { Component } from 'react';
import Web3 from 'web3';

let balanceOf;
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x9fbda871d559710256a2502a2517b794b482db40';
let RR = web3.eth.contract(RRAbi).at(RRAddress);


class BalanceOf extends Component{
  constructor(props){
    super(props)
    this.state = {
      balanceOfSearchBox : '',
      balanceOf : 0,
    }

    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleTextChange=this.handleTextChange.bind(this);
  }

  handleTextChange = (event) => {
    if(this.state[event.target.id] !== undefined){
      this.setState({[event.target.id]: event.target.value});
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("BalanceOf Search fired!");
    balanceOf = Number(RR.balanceOf(this.state.balanceOf));
    console.log(balanceOf);
    this.setState({
      balanceOf: balanceOf,
    })
  }

  render(){
    return(
      <div className="balanceOf">
        <fieldset>
          <legend>Balance Of</legend>
            <label>Address:
              <input id="balanceOfSearchBox" type="text" onChange={this.handleTextChange} value={this.state.balanceOfSearchBox} />
              <input id="search" type="submit" value="Search" onClick={this.handleSubmit} />
              {this.state.balanceOf}
            </label>
        </fieldset>
      </div>
    )
  }
}

export default BalanceOf
