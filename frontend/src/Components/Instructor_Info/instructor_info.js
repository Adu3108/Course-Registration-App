import './instructor_info.css';
import { Component } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

class Instructor_Info extends Component{
  constructor(props) {
    super(props);
    this.state = { name : "", instructor_id : "", dept_name : "", curr_courses : [], prev_courses : []};
  }

  callAPI() {
    const instructor_id = this.props.match.params.instructor_id;
    console.log(instructor_id)
    fetch(`http://localhost:8080/instructor/${instructor_id}`)
    .then(res => res.json())
    .then(res => {
      console.log(res.PreviousCourses);
      this.setState({
          name: res.InstructorInfo[0].name,
          dept_name: res.InstructorInfo[0].dept_name,
      });
      if(res.CurrentCourses.length!==0){
        var body = (
          <tbody>
            <tr>
              <th>Course Name</th>
              {res.CurrentCourses.map((records, i) =>
                  <td key={i}> <Link to={'/course/' + records.course_id} >{records.title}</Link></td>
              )}
            </tr>
            <tr>
              <th>Course ID</th>
              {res.CurrentCourses.map((records, i) =>
                <td key={i}> {records.course_id} </td>
              )}
            </tr>
          </tbody>
        );
        this.setState({
          curr_courses: <table className="table table-lg table-striped-columns table-bordered w-auto">
                          {body}
                        </table>
        });
      }
      else{
        this.setState({
          curr_courses: <p> No Current Courses </p>
        });
      }
      if(res.PreviousCourses.length!==0){
        var prev_body = (
          <tbody>
            <tr>
              <th>Course Name</th>
              {res.PreviousCourses.map((records, i) =>
                  <td key={i}> <Link to={'/course/' + records.course_id} >{records.title}</Link></td>
              )}
            </tr>
            <tr>
              <th>Course ID</th>
              {res.PreviousCourses.map((records, i) =>
                <td key={i}> {records.course_id} </td>
              )}
            </tr>
          </tbody>
        );
        this.setState({
          prev_courses: <table className="table table-lg table-striped-columns table-bordered w-auto">
                          {prev_body}
                        </table>
        });
      }
      else{
        this.setState({
          prev_courses:  <p> No Previous Courses </p>
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  componentDidMount() {
    this.callAPI();
  }

  render(){
    const userID = JSON.parse(window.localStorage.getItem("ID"));
    const Status = window.localStorage.getItem("Status");
    if(userID === null || Status !== "\"Yes\""){
      window.localStorage.removeItem("Status");
      return (<div className="Home"> <h1> Please <Link to={'/user/login'}> login </Link> to continue</h1> </div>);
    }
    else{
      return (
        <div className="Instructor_Info">
          <Navbar key={false} bg="light" expand={false} className="mb-3">
            <Container fluid>
              <Navbar.Brand href="#"> MyASC@IITB </Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} className="text-left" />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-false`}
                aria-labelledby={`offcanvasNavbarLabel-expand-false`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                    Navigation Menu
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/home">Home Page</Nav.Link>
                    <Nav.Link href="/home/registration"> Registration Page </Nav.Link>
                    <Nav.Link href="/course/running"> Department List </Nav.Link>
                    <Nav.Link href="/user/login" onClick={this.button}> Logout </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
          <h1> Homepage of Prof. {this.state.name} of the {this.state.dept_name} Department </h1>
          <h3> Current Courses </h3>
          <div className="prev"> {this.state.curr_courses} </div>
          <h3> Previous Courses </h3>
          <div className="prev"> {this.state.prev_courses} </div>
        </div>
      );
    }
  }
}

export default Instructor_Info;

