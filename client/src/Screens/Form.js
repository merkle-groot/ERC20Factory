import React, {useState, useEffect} from 'react';
import '../CSS/Form.css';
import {
  Link, Redirect, useHistory 
} from "react-router-dom";
import Web3 from "web3";
import back from "../images/left-arrow.png";
import ERC20FactoryObject from "../build/contracts/ERC20Factory.json";


const web3 = new Web3('http://127.0.0.1:8584');
const ERC20Factory = new web3.eth.Contract(ERC20FactoryObject.abi, '0x2D2e364AA38BbfF2fCb408E77E9Bb9e59633F853');


function Form() {
    const [name, setName] = useState();
    const [symbol, setSymbol] = useState();
    const [supply, setSupply] = useState();
    const [contractProp, setContractProp] = useState();
    const [contractCreated, setContractCreated] = useState(0);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        console.log(account);

        const gas = await ERC20Factory.methods.createChildContract(name,symbol,parseInt(supply)).estimateGas();
        const createResponse = await ERC20Factory.methods.createChildContract(name,symbol,parseInt(supply)).send(
            {
                from: account,
                gas
            }
        );
        console.log(createResponse);
        let ev = createResponse.events;
        console.log(ev.ContractCreated.returnValues.contractAddress); 
        setContractProp(ev.ContractCreated.returnValues.contractAddress);
        localStorage.setItem('addr', ev.ContractCreated.returnValues.contractAddress);
        setContractCreated(1);

    }

    if(contractCreated){
        console.log('Redirecting..')
        return <Redirect
            to={{
            pathname: `/tokens/${contractProp}`,
            }}
        />
    }

    return (
        <div className="formScreen">
            <div className="backButton">
				<Link to='/'>
                    <img src={back} alt="back button"/>
				</Link>

                <Link to='/' className="imgbox">
                    <h1>BACK</h1>
                </Link>
            </div>

            <div className="bodyForm">
                <form onSubmit={handleSubmit}>  
                    <div className="single-input"> 
                        <label>NAME</label>
                    </div>

                    <div className="single-input">     
                        <input required type="text" maxLength="32" name="name" onChange={(event) => setName(event.target.value)} value={name}/>
                    </div>

                    <div className="single-input"> 
                        <label>SYMBOL</label>
                    </div>

                    <div className="single-input">     
                        <input required type="text" maxLength="6" name="symbol" onChange={(event) => setSymbol(event.target.value)} value={symbol}/>
                    </div>

                    <div className="single-input"> 
                        <label>SUPPLY</label>
                    </div>

                    <div className="single-input">     
                        <input min="1" max="115792089237316195423570985008687907853269984665640564039457584007913129639935" required type="number" name="supply" onChange={(event) => setSupply(event.target.value)} value={supply}/>
                    </div>

                    <div className="single-input submit"> 
                        <input type="submit" value="SUBMIT" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;
