import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// add Link component
// How do I know which course page I am on? I did a course with that for Programmer courses. Rewatch
const CourseButton = ({title, id}) => {
  return(
    <div className="grid-33">
      <a className="course--module course--link" href={`/courses/${id}`}>
      <h4 className="course--label">Course</h4>
      <h3 className="course--title">{title}</h3>
      </a>
    </div>
  )
}

class Courses extends Component {

  constructor() { //What does a constructor do again?
    super(); // ?
    this.state = {
      courseTitles: [],
      courseIds: [],
      };
  } 

  componentWillMount() {
    this.getCourseTitles();
  }

  getCourseTitles = function() {
    fetch("http://localhost:5000/api/courses")
      .then(response => response.json())
      .then(response => {
        let courseTitles = [];
        let courseIds = [];
        let i;
        for(i=0; i < response.length; i++) {
          courseTitles.push(response[i].title);
          courseIds.push(response[i].id)
        }
        this.setState({courseTitles: courseTitles})
        console.log(courseTitles);
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  }


  render() {

    const { courseTitles } = this.state;
    const { courseIds } = this.state;
    const courseButtons = courseTitles.map(courseTitle => <CourseButton title={courseTitle}/>); // Each child should hava a uniquie "key" prop
    /*for(i=0; i < courseTitles.length; i++) {
      <CourseButton title={courseTitles[i]} id={courseIds[i] key={i}}
    }*/
    
    return(
      <div>
        {courseButtons}
        <div className="grid-33"><a className="course--module course--add--module" href="create-course.html">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
              </svg>New Course</h3>
          </a></div>
      </div>  
    )
  }
}

export default Courses;