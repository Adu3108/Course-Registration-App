import './Home.css';
import { Component } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';

class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {ID: "", name: "", dept_name: "", total_credits: "", previous_courses: [[]], current_courses: [[]] };
    this.button = this.button.bind(this);
    this.dropbutton = this.dropbutton.bind(this);
  }

  button(event){
    event.preventDefault();
    window.localStorage.removeItem("ID");
    window.localStorage.removeItem("Status");
    window.location.replace("/user/login");
  }

  dropbutton(event){
    event.preventDefault();
    const courseID = event.target.value;
    const userID = JSON.parse(window.localStorage.getItem("ID"));
    console.log(userID);
    console.log(courseID);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID: userID, cID: courseID})
    };
    fetch(`http://localhost:8080/drop_course`, requestOptions)
    .then(res => res.json())
    .then(res => {
        console.log(res);
    })
    .catch((error) => {
      console.log(error.message);
    });
    window.location.reload();
  }

  callAPI() {
    const userID = JSON.parse(window.localStorage.getItem("ID"));
    fetch(`http://localhost:8080/student_info/${userID}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({
        ID: userID,
        name: res.student_details[0].name,
        dept_name: res.student_details[0].dept_name,
        total_credits: res.student_details[0].tot_cred,
      });
      if(res.previous_courses.length!==0){
        var course = res.previous_courses.map((courses, i) => {
          return (
            <div>
              <h2> {courses.semester} semester, Year {courses.year} </h2>
              <table className="table table-lg table-striped-columns table-bordered w-auto" key={i}> 
                <tbody>  
                  <tr> 
                    <th>Course Name</th> 
                    {courses.courses.split(", ").map((inner_course, j) => 
                      <td key={j}> {inner_course} </td> 
                    )}
                  </tr> 
                  <tr> 
                    <th>Course ID</th> 
                    {courses.course_ids.split(", ").map((cID, j) => 
                      <td key={j}> <Link to={'/course/' + cID}> {cID} </Link> </td> 
                    )}
                  </tr> 
                </tbody>
              </table>
            </div>
          )
        }
          
        );
        this.setState({
          previous_courses : course
        });
        if(res.current_courses.length!==0){
          var course2 = res.current_courses.map((courses, i) => {
            return (
              <div>
                <h2> {courses.semester} semester, Year {courses.year} </h2>
                <table className="table table-lg table-striped-columns table-bordered w-auto" key={i}> 
                  <tbody>  
                    <tr> 
                      <th>Course Name</th> 
                      {courses.courses.split(", ").map((inner_course, j) => 
                        <td className="button" key={j}> {inner_course} </td> 
                      )}
                    </tr> 
                    <tr> 
                      <th>Course ID</th> 
                      {courses.course_ids.split(", ").map((cID, j) => 
                        <td className="button" key={j}> <Link to={'/course/' + cID}> {cID} </Link> </td> 
                      )}
                    </tr> 
                    <tr> 
                      <th>Drop</th> 
                      {courses.course_ids.split(", ").map((cID, j) => 
                        <td className="button" key={j}>
                          <Button variant="danger" value={cID} onClick={this.dropbutton}> Drop </Button>
                        </td>
                      )}
                    </tr> 
                  </tbody>
                </table>
              </div>
            )
          });
        }
        else{
          var course2 = <div> <h3> You haven't registered for any courses in the current semester. </h3> <h3> Go to <Link to="/home/registration"> Registration </Link> page </h3></div>;
        }
        this.setState({
          current_courses : course2
        });
      }
      else{
        this.setState({
          prereq: <h3> No Prerequisites for this course </h3>
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  componentDidMount() {
    // const reload = window.localStorage.getItem('Reload');
    // console.log(reload);
    const userID = JSON.parse(window.localStorage.getItem("ID"));
    if(userID != null){
      this.callAPI();
    }
  }
  
  render(){
    const userID = JSON.parse(window.localStorage.getItem("ID"));
    const Status = window.localStorage.getItem("Status");
    if(userID === null || Status !== "\"Yes\""){
      window.localStorage.removeItem("Status");
      return (<div className="Login"> <h1> Please <Link to={'/user/login'}> login </Link> to continue</h1> </div>);
    }
    else{
      return (
        <div className="Home">
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
          <h1> Welcome to your homepage </h1> <br></br>
          <table className="table table-lg table-striped table-bordered w-auto">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Department</th>
              </tr>
              <tr>
                <td>{this.state.ID}</td>
                <td>{this.state.dept_name}</td>
              </tr>
              <tr>
                <th>Name</th>
                <th>Total Credits</th>
              </tr>
              <tr>
                <td>{this.state.name}</td>
                <td>{this.state.total_credits}</td>
              </tr>
            </tbody>
          </table> <br></br>
          <hr class="bg-danger border-2 border-top border-primary"/>
          <br></br>
          <h1> Current Semester</h1>
          {this.state.current_courses}
          <br></br>
          <hr class="bg-danger border-2 border-top border-primary"/>
          <br></br>
          <h1> Previous Semesters </h1>
          {this.state.previous_courses}
        </div>
      );
    }
  }
}

export default Home;
