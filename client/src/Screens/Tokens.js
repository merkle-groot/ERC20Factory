import React, {useState, useEffect} from 'react';
import '../CSS/Tokens.css';
import {
  Link, Redirect, useParams
} from "react-router-dom";
import Web3 from "web3";
import back from "../images/left-arrow.png";
import ERC20Contract from "../build/contracts/ERC20.json";




const Tokens = () => {
    
    const addr = localStorage.getItem('addr');
    console.log(addr);

    const [name, setName] = useState();
    const [symbol, setSymbol] = useState();
    const [supply, setSupply] = useState();
    const web3 = new Web3(Web3.givenProvider);
    const ERC20 = new web3.eth.Contract(ERC20Contract.abi, addr);

    useEffect(()=>{
        loadData();
    },[])

    const openExplorer = (e) => {
        console.log('clicked')
        e.preventDefault();
        window.location.href = `https://goerli.etherscan.io/address/${addr}#internaltx`;  
    }
    

    const loadData = async() => {
        const nameTemp = await ERC20.methods.name().call();
        const symbolTemp = await ERC20.methods.symbol().call();
        const supplyTemp = await ERC20.methods.totalSupply().call();

        setSymbol(symbolTemp);
        setName(nameTemp);
        setSupply(supplyTemp);
        console.log(symbolTemp, nameTemp, supplyTemp);
    }

    
    return (
        <div className="tokenScreen">
            <div className="backButton">
				<Link to='/'>
                    <img src={back} alt="back button"/>
				</Link>

                <Link to='/' className="imgbox">
                    <h1>BACK</h1>
                </Link>
            </div>

            <div className="tokenHeading">
                <h2>Here's Your Token!</h2>
            </div>

            
            <div className="tokenBody" onClick={(e)=> openExplorer(e)}>      
                <div className="tokenHeader">
                    <h1>ERC-20</h1>
                </div>

              
                    <div className="tokenKey">
                        <p>NAME</p>
                        <p>SYMBOL</p>
                        <p>SUPPLY</p>
                        <p>ADDRESS</p>
                    </div>

                    <div className="tokenValue">
                        <p>{name}</p>
                        <p>{symbol}</p>
                        <p>{supply}</p>
                        <p className="addr">{addr.slice(0,25)}....</p>
                    </div> 
            </div>
        </div>
    );
}

export default Tokens;
