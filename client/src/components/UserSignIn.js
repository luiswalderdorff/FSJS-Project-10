import React, {Component} from 'react';
import Form from './Form';


class UserSignIn extends Component {
	state = {
	    emailAddress: "",
	    password: '',
	    errors: [],
	  }

	render() {

		const {
      emailAddress,
      password,
      errors,
    } = this.state;

		return(
			<div className="bounds">
			  <div className="grid-33 centered signin">
			    <h1>Sign In</h1>
			    <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password" 
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
              </React.Fragment>
            )} />
			    <p>&nbsp;</p>
			    <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
			  </div>
			</div>
		)
	}

	change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/authenticated' } }; //If a user submits the sign in form without previously visiting a protected route, they will navigate to /authenticated by default
    const { emailAddress, password } = this.state;
    context.actions.signIn(emailAddress, password) //Call the signIn() function, which you can access via the destructured context variable. In Context.js, you passed Context.Provider a value prop whose value was an object with an actions property. The signIn() function provided to the UserSignIn component is available via context.actions.signIn
    // signIn() is an asynchronous operation that calls the getUser API method (written in Data.js) and returns a promise. The resolved value of the promise is either an object holding the authenticated user's name and username values (sent from the API if the response is 201), or null (if the response is a 401 Unauthorized HTTP status code). Be sure to have another look at the getUser() method in Data.js to review its inner-workings.
      .then( user => {
        if (user === null) {
          this.setState(() => {
            return { errors: ["Sign-in was unsuccessful"]};
          });
        } else {
          this.props.history.push(from); //The from variable passed to history.push(from) contains information about the pathname an unauthenticated user redirected from (via this.props.location.state). For example, if a user redirects to the sign up page from /settings, from will be equal to pathname: "/settings".
          console.log(`SUCCESS! ${emailAddress} is now signed in!`); // Same as in UserSignUp
        }
      }).catch( err => {
        console.log(err);
        this.props.history.push("/error");
      })
  }

  cancel = () => {
    this.props.history.push("/");
  }
}

export default UserSignIn;