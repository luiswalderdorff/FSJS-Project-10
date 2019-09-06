// stateless functional component

import React, {Component} from 'react';

const Header = () => {
		return(
			<div className="header">
			  <div className="bounds">
			    <h1 className="header--logo">Courses</h1>
			    <nav><a className="signup" href="">Sign Up</a><a className="signin" href="">Sign In</a></nav>
			  </div>
			</div>
		)
}

export default Header;