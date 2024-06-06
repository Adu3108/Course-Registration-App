import { Component } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './registration.css';

class Registration extends Component{
  constructor(props) {
    super(props);
    this.state = {cID: '', section: '', current_courses: [], search_courses: [], search: ''};
    this.handleChangeSection = this.handleChangeSection.bind(this);
    this.handleChangeCourseID = this.handleChangeCourseID.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.search = this.search.bind(this);
    this.search_submit = this.search_submit.bind(this);
  }

  handleChangeSection(event) {
    this.setState({section: event.target.value});
  }

  handleChangeCourseID(event){
    this.setState({cID: event.target.value});
  }

  search(event){
    this.setState({search: event.target.value});
  }

  search_submit(event){
    event.preventDefault();
    const search = this.state.search;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({search_term: search })
    };
    fetch(`http://localhost:8080/search`, requestOptions)
    .then(res => res.json())
    .then(res => {
      this.setState({
        search_courses: res
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const userID = JSON.parse(window.localStorage.getItem("ID"));
    const sec_id = this.state.section;
    const cID = event.target.value;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID: userID, cID: cID, section: sec_id })
    };
    fetch(`http://localhost:8080/home/registration`, requestOptions)
    .then(res => res.json())
    .then(res => {
        alert(res.message);
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  componentDidMount() {
    fetch(`http://localhost:8080/current_courses`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({
          current_courses: res
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  render(){
    const userID = JSON.parse(window.localStorage.getItem("ID"));
    const Status = window.localStorage.getItem("Status");
    if(userID === null || Status !== "\"Yes\""){
      window.localStorage.removeItem("Status");
      return (<div className="Login"> <h1> Please <Link to={'/user/login'}> login </Link> to continue</h1> </div>);
    }
    else{
      const result = this.state.search_courses;
      const condition = Object.keys(result)[0];
      if(condition === "error"){
        return (
          <div className="Registration">
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
                      <Nav.Link href="/course/running"> Department List </Nav.Link>
                      <Nav.Link href="/user/login" onClick={this.button}> Logout </Nav.Link>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
            <h1> Registration Page </h1>
            <Form className="text-center">
                <div className="form"> <Form.Control type="text" placeholder="Search Course ID" className="text-center w-auto" value={this.state.search} onChange={this.search}/></div>
                <Button variant="outline-success" onClick={this.search_submit}>Search</Button>
            </Form>
          </div>
        );
      }
      else{
        return (
          <div className="Registration">
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
            <h1> Registration Page </h1> <br></br>
            <Form className="text-center">
                <div className="form"> <Form.Control type="text" placeholder="Search Course ID" className="text-center w-auto" value={this.state.search} onChange={this.search}/></div>
                <Button variant="outline-success" onClick={this.search_submit}>Search</Button>
            </Form>
            <br></br>
            <hr class="bg-danger border-2 border-top border-primary"/>
            <h2 className="title"> Results </h2>
            <table className="table table-lg table-striped-columns table-bordered w-auto">
              <tbody>
                <tr>
                  <th>Running Courses</th>
                  {this.state.search_courses.map((records, i) =>
                    <td className="cell" key={i}> 
                      <Link to={'/course/' + records.course_id}> {records.title} </Link>
                    </td>
                  )}
                </tr>
                <tr>
                  <th>Course ID</th>
                  {this.state.search_courses.map((records, i) =>
                    <td className="cell" key={i}> 
                      {records.course_id}
                    </td>
                  )}
                </tr>
                <tr>
                  <th>Section</th>
                  {this.state.search_courses.map((records, i) =>
                    <td className="button" key={i} value={this.state.section} onChange={this.handleChangeSection}> 
                      <Form.Select aria-label="Default select example">
                        <option>Choose Section</option>
                        <option>{records.sec_id}</option>
                      </Form.Select>
                    </td>
                  )}
                </tr>
                <tr>
                  <th>Section</th>
                  {this.state.search_courses.map((records, i) =>
                    <td className="button" key={i}> 
                      <Button variant="primary" value={records.course_id} onClick={this.handleSubmit}>Register</Button>
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
}

export default Registration;
