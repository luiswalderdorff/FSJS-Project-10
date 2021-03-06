// stateless functional component

import React, {Component} from 'react';
import {Link} from 'react-router-dom';



export default class Header extends Component {
	render() {
		const { context } = this.props;
		const authUser = context.authenticatedUser;
		return(
			<div className="header">
			  <div className="bounds">
			    <h1 className="header--logo">Courses</h1>
				    {authUser ? 
				    	<nav>
					    	<span>Welcome, {authUser.firstName}!</span>
					    	<Link className="signout" to="/signout">Sign Out</Link>
					    </nav>
				    	:
				    	<nav>
					    	<Link className="signup" to="/signup">Sign Up</Link> 
					    	<Link className="signin" to="/signin">Sign In</Link>
					    </nav>
				    }
			  </div>
			</div>
		)
	}
		
}

