import '../CSS/Deployed.css';
import {
  Link
} from "react-router-dom";

function Deployed() {
    return (
        <div className="deployed">
            <div className="backButton">
				<Link to='/'>
					<h1>BACK</h1>
				</Link>
            </div>
        </div>
    );
}

export default Deployed;
