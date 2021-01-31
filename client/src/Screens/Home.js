import '../CSS/Home.css';
import {
	Link
} from "react-router-dom";
import { ReactComponent as Github } from '../images/github.svg';
import { ReactComponent as Twitter } from '../images/twitter.svg';
import logo from '../images/ethereum-eth-logo-animated.gif';


function Home() {
  return (
    <div className="App">
      	<div className="container">
			<div className="upperText">
				<Link to="/deployed">
					<h1>Brew Your Own</h1>
					<h1>ERC-20 Token!</h1>
				</Link>
			</div>

			<div className="centerImage">
				<img src={logo} alt="eth logo"/>
			</div>

			<div className="centerButton">
				<Link to="/form">
					<input className="enter" type="submit" value="ENTER!" />
				</Link>
			</div>

			<div className="lowerLeftText">
				<Link to="/help">
					<h1>Help</h1>
				</Link>
			</div>

			<div className="lowerRightText">
				<div lassName="Github">
					<a href="https://github.com/merkle-groot/ERC20Factory/">
						<Github c/>
					</a>
				</div>

				<a href="https://twitter.com/merkle_groot">
					<Twitter className="Twitter"/>
				</a>
			</div>
      	</div>
    </div>
  );
}

export default Home;