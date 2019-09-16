import React, {Component} from 'react';
import {Link} from 'react-router-dom';



class CourseDetail extends Component {

	constructor() { 
    super(); 
    this.state = {
      courseInfo: []
      };
  } 

  componentWillMount() {
    this.getCourseTitles();
  }

  getCourseTitles = function() {
    fetch("http://localhost:5000/api/courses")
      .then(response => response.json())
      .then(response => {
      	console.log(response);
        let courseInfo = [];
        let i;
        for(i=0; i < response.length; i++) {
          courseInfo.push({courseTitle: response[i].title, courseId: response[i].id, courseTeacher: response[i].teacher, courseTime: response[i].estimatedTime, courseMaterials: response[i].materialsNeeded, courseDescription: response[i].description});
        }
        courseInfo = courseInfo.find(x => x.courseId = this.props.match.params.id); //Why doesn't this work?
        this.setState({courseInfo: courseInfo})
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  }

	render() {

		const { courseInfo } = this.state;

		return(
			<div>
			  <div className="actions--bar">
			    <div className="bounds">
			      <div className="grid-100">
			      	<span>
			      		<Link className="button" to={`/courses/${this.props.match.params.id}/update`}>Update Course</Link> {/**/}
			      		<Link className="button" to="#">Delete Course</Link>
		      		</span>
		      		<Link className="button button-secondary" to="/">Return to List</Link>
	      		</div>
			    </div>
			  </div>
			  <div className="bounds course--detail">
			    <div className="grid-66">
			      <div className="course--header">
			        <h4 className="course--label">Course</h4>
			        <h3 className="course--title">{courseInfo.courseTitle}</h3>
			        {/*<p>By {courseInfo.courseTeacher.firstName} {courseInfo.courseTeacher.lastName}</p>*/} {/*Doesn't work. Why?*/}
			      </div>
			      <div className="course--description">
			        <p>{courseInfo.courseDescription}</p>
			      </div>
			    </div>
			    <div className="grid-25 grid-right">
			      <div className="course--stats">
			        <ul className="course--stats--list">
			          <li className="course--stats--list--item">
			            <h4>Estimated Time</h4>
			            <h3>{courseInfo.courseTime}</h3>
			          </li>
			          <li className="course--stats--list--item">
			            <h4>Materials Needed</h4>
			            <ul>
			              <li>{courseInfo.courseMaterials}</li> {/* Maybe array, seperate at * and then for loop? Doesn't accept loop in here. How to write it? */}
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