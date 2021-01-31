import React, {useState, useEffect} from 'react';
import '../CSS/Form.css';
import {
  Link, Redirect
} from "react-router-dom";
import Web3 from "web3";
import back from "../images/left-arrow.png";
import ERC20FactoryObject from "../build/contracts/ERC20Factory.json";
import logo from '../images/ethereum-eth-logo-animated.gif';


const web3 = new Web3(Web3.givenProvider);
const ERC20Factory = new web3.eth.Contract(ERC20FactoryObject.abi, '0x88e5f0db44aa7620315b8b722d2cf9c557fbbe9e');


function Form() {

    useEffect(()=>{
        alert("Please switch your Metamask network to Goerli Testnet");
    },[]);

    const [name, setName] = useState();
    const [symbol, setSymbol] = useState();
    const [supply, setSupply] = useState();
    const [contractProp, setContractProp] = useState();
    const [contractCreated, setContractCreated] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const accounts = await window.ethereum.enable();
        setIsLoading(true);
        const account = accounts[0];
        console.log(account);

        try{ 
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
            setIsLoading(false);
            setContractCreated(1);
        } catch {
            alert('Transaction Declined');
            setIsLoading(false);
        }
    }

    if(isLoading){
        return(
            <div className="loadingScreen">
                <h1>Loading....</h1>
				<img src={logo} alt="eth logo"/>
			</div>
        )
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
                        <input min="1" maxLength="10" required type="number" name="supply" onChange={(event) => setSupply(event.target.value)} value={supply}/>
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
