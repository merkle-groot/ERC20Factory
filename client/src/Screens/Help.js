import '../CSS/Help.css';
import {
	Link
} from "react-router-dom";
import back from "../images/left-arrow.png";

function Help() {
	return(
		<div className="helpSection">
			<div className="backButton">
				<Link to='/'>
                    <img src={back} alt="back button"/>
				</Link>

                <Link to='/' className="imgbox">
                    <h1>BACK</h1>
                </Link>
            </div>

			
		</div>
	);
}

export default Help;
