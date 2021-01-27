import '../CSS/Help.css';
import {
	Link
} from "react-router-dom";

function Help() {
	return(
		<div className="helpSection">
			<div className="backButton">
				<Link to='/'>
					<h1>BACK</h1>
				</Link>
			</div>
		</div>
	);
}

export default Help;
