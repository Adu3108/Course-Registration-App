import './course_info.css';
import { Component } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

class Course_Info extends Component{
  constructor(props) {
    super(props);
    this.state = { title : "", course_id : "", credits : "", building : "", room_number : "", instructor_name : "", instructor_ID : "", prereq : [] };
    this.button = this.button.bind(this);
  }

  button(event){
    event.preventDefault();
    window.localStorage.removeItem("ID");
    window.localStorage.removeItem("Status");
    window.location.replace("/user/login");
  }

  callAPI() {
    const course_id = this.props.match.params.course_id;
    fetch(`http://localhost:8080/course/${course_id}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
          title: res.course[0].title,
          course_id: res.course[0].course_id,
          credits: res.course[0].credits,
          building: res.course[0].building,
          room_number: res.course[0].room_number,
          instructor_name: res.instructor[0].name,
          instructor_ID: res.instructor[0].id
      });
      if(res.prereq.length!==0){
        console.log("PREREQS PRESENT");
        var column1 = res.prereq.map((records, i) =>
          <td key={i}> <Link to={'/course/' + records.course_id} >{records.title}</Link></td>
        );
        var column2 = res.prereq.map((records, i) =>
          <td key={i}> {records.course_id} </td>
        );
        this.setState({
          prereq: <table className="table table-lg table-striped-columns table-bordered w-auto">
          <tbody>
          <tr>
            <th>Prerequisite Course Name</th>
            {column1}
          </tr>
          <tr>
            <th>Course ID</th>
            {column2}
          </tr>
          </tbody>
        </table>
        });
      }
      else{
        console.log("NO PREREQS");
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
        <div className="Course_Info">
          <Navbar key={false} bg="light" expand={false} className="mb-3">
            <Container fluid>
              <Navbar.Brand href="#">MyASC@IITB</Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} class="text-left" />
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
          <h1> Welcome to {this.state.title}</h1>
          <h2> Course Details </h2>
          <table className="table table-lg table-striped-columns table-bordered w-auto">
            <tbody>
              <tr>
                <th>Course Name</th>
                <td> {this.state.title} </td>
              </tr>
              <tr>
                <th>Course ID</th>
                <td> {this.state.course_id} </td>
              </tr>
              <tr>
                <th>Credits</th>
                <td> {this.state.credits} </td>
              </tr>
            </tbody>
          </table>

          <h2> Instructor Details </h2>
          <table className="table table-lg table-striped-columns table-bordered w-auto">
            <tbody>
              <tr>
                <th>Instructor Name</th>
                <td> <Link to={"/instructor/" + this.state.instructor_ID}> {this.state.instructor_name} </Link> </td>
              </tr>
              <tr>
                <th>Instructor ID</th>
                <td> {this.state.instructor_ID} </td>
              </tr>
            </tbody>
          </table>

          <h2> Prerequisites </h2>
          {this.state.prereq}
        </div>
      );
    }
  }
}

export default Course_Info;
