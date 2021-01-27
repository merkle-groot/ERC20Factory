import React, {useState, useEffect} from 'react';
import '../CSS/Form.css';
import {
  Link
} from "react-router-dom";
import Web3 from "web3";
import ERC20FactoryObject from "../build/contracts/ERC20Factory.json";

const web3 = new Web3('http://127.0.0.1:6969');
const ERC20Factory = new web3.eth.Contract(ERC20FactoryObject.abi, '0x53782cCB154c04c7e318a5B4b21DBbC401e0d77e');


function Form() {
    const [name, setName] = useState();
    const [symbol, setSymbol] = useState();
    const [supply, setSupply] = useState();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const acc = await web3.eth.getAccounts();
        console.log(acc[0]);
        const createResponse = await ERC20Factory.methods.createChildContract(name,symbol,parseInt(supply)).send(
            {
                from: acc[0]
            }
        );
        const responseJSON = await createResponse.json();
        console.log(responseJSON);
    }

    return (
        <div className="formScreen">
            <div className="backButton">
				<Link to='/'>
					<h1>BACK</h1>
				</Link>
            </div>

            <div className="bodyForm">
                <form onSubmit={handleSubmit}>  
                    <div className="single-input"> 
                        <label>NAME</label>
                    </div>

                    <div className="single-input">     
                        <input type="text" name="name" onChange={(event) => setName(event.target.value)} value={name}/>
                    </div>

                    <div className="single-input"> 
                        <label>SYMBOL</label>
                    </div>

                    <div className="single-input">     
                        <input type="text" name="symbol" onChange={(event) => setSymbol(event.target.value)} value={symbol}/>
                    </div>

                    <div className="single-input"> 
                        <label>SUPPLY</label>
                    </div>

                    <div className="single-input">     
                        <input type="number" name="supply" onChange={(event) => setSupply(event.target.value)} value={supply}/>
                    </div>

                    <div className="single-input"> 
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;
