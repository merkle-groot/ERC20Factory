import '../CSS/Home.css';
import {
	Link
} from "react-router-dom";
import logo from "../images/ethereum-eth-logo-animated.gif"

function Home() {
  return (
	  	<div className="homeApp">
			<div className="homeContainer">
				<div className="homeheading">
					<h2>BREW YOUR OWN</h2>
					<h2>ERC-20</h2>
				</div>

				<div className="centerImage">
					<img className="anim" src={logo} alt="eth"/>
				</div>

				<div className="centerButton">
					<p>Button</p>
				</div>
      		</div>
		</div>
		
  );
}

export default Home;
