import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
	BrowserRouter as Router,
  	Switch,
  	Route,
} from "react-router-dom";
import Home from './Screens/Home';
import Deployed from './Screens/Deployed';
import Help from './Screens/Help';
import Form from './Screens/Form';
import Tokens from './Screens/Tokens';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  	<React.StrictMode>
		<Router>
			<Switch>
				<Route path="/form">
					<Form />
				</Route>
				<Route path="/help">
					<Help />
				</Route>
				<Route path="/deployed">
					<Deployed />
				</Route>
				<Route path='/tokens'>
					<Tokens/>
				</Route>
				<Route path="/">
					<Home />
				</Route>
				
			</Switch>
		</Router>
  	</React.StrictMode>,
  	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
