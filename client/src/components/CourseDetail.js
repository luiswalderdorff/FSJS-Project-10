import React, {Component} from 'react';
import {Link} from 'react-router-dom';



class CourseDetail extends Component {

	constructor() { 
    super(); 
    this.state = {
      courseInfo: {},
      teacher: "",
      };
  } 

  componentDidMount() {
    this.getCourseTitles();
  }

  getCourseTitles = function() {
  	const paramId = this.props.match.params.id;
    fetch(`http://localhost:5000/api/courses/${paramId}`)
      .then(response => response.json())
      .then(response => {
      	const teacherName = `${response.teacher.firstName} ${response.teacher.lastName}`;
      	const teacherId = response.teacher.id;
        this.setState({courseInfo: response, teacher: teacherName, teacherId: teacherId})
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  }

	render() {

		const { courseInfo, teacher, teacherId } = this.state;
		const { context } = this.props;
		let userId; 
		if (context.authenticatedUser) {
			userId = context.authenticatedUser.id;
		}

		let buttons;

		if (userId === teacherId) {
			buttons = <span>
			      			<Link className="button" to={`/courses/${this.props.match.params.id}/update`}>Update Course</Link>
			      			<Link className="button" to="#">Delete Course</Link>
		      			</span>
		}


		return(
			/*{if authUser === courseInfo.userId}*/
			<div>
			  <div className="actions--bar">
			    <div className="bounds">
			      <div className="grid-100">
		      		{buttons}
		      		<Link className="button button-secondary" to="/">Return to List</Link>
	      		</div>
			    </div>
			  </div>
			  <div className="bounds course--detail">
			    <div className="grid-66">
			      <div className="course--header">
			        <h4 className="course--label">Course</h4>
			        <h3 className="course--title">{courseInfo.title}</h3>
							<p>By {teacher}</p>
			      </div>
			      <div className="course--description">
			        <p>{courseInfo.description}</p>
			      </div>
			    </div>
			    <div className="grid-25 grid-right">
			      <div className="course--stats">
			        <ul className="course--stats--list">
			          <li className="course--stats--list--item">
			            <h4>Estimated Time</h4>
			            <h3>{courseInfo.estimatedTime}</h3>
			          </li>
			          <li className="course--stats--list--item">
			            <h4>Materials Needed</h4>
			            <ul>
			              <li>{courseInfo.materialsNeeded}</li> {/* Maybe array, seperate at * and then for loop? Doesn't accept loop in here. How to write it? */}
			            </ul>
			          </li>
			        </ul>
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
}

export default CourseDetail;