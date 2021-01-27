import '../CSS/Home.css';
import {
	Link
} from "react-router-dom";

function Home() {
  return (
    <div className="App">
      	<div className="container">
			<div className="upperText">
				<Link to="/deployed">
					<h1>Look at the Deployed</h1>
					<h1>Tokens</h1>
				</Link>
			</div>

			<div className="centerImage">
				<p>Image</p>
			</div>

			<div className="centerButton">
				<p>Button</p>
			</div>

			<div className="lowerText">
				<Link to="/help">
					<h1>Find out how it works</h1>
				</Link>
			</div>
      	</div>
    </div>
  );
}

export default Home;
