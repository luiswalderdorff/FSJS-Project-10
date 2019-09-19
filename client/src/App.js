import React, {Component} from 'react';
import logo from './logo.svg';
import './styles/global.css';
  

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
//import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

//Context
import withContext from "./Context";
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);



class App extends Component {

  render() {
    return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/" component={Courses} />
        <Route path="/courses/create" component={CreateCourse} />
        <Route path="/courses/:id/update" component={UpdateCourse} />
        <Route path="/courses/:id" component={CourseDetail} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
{/*        <Route path="/signout" component={UserSignOut} />
*/}   {/*error, notfound, forbidden!!!*/}

    </Switch>
    </Router>
  );
  }
}

export default App;
