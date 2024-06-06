import './course.css';
import { Component } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

class Course extends Component{
  constructor(props) {
    super(props);
    this.state = { records : [] };
    this.button = this.button.bind(this);
  }

  button(event){
    event.preventDefault();
    window.localStorage.removeItem("ID");
    window.localStorage.removeItem("Status");
    window.location.replace("/user/login");
  }

  callAPI() {
    const dept_name = this.props.match.params.dept_name;
    fetch(`http://localhost:8080/course/running/${dept_name}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({
          records: res
      });
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
        <div className="Course">
          <Navbar key={false} bg="light" expand={false} className="mb-3">
            <Container fluid>
              <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
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
          <table className="table table-lg table-striped-columns table-bordered w-auto">
            <tbody>
              <tr>
                <th>Course Name</th>
                  {this.state.records.map((records, i) =>
                    <td key={i}>
                      <Link to={'/course/' + records.course_id}> {records.title} </Link>
                    </td>
                  )}
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Course;
