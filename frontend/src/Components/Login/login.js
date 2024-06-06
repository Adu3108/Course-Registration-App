import { Component } from "react";

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {ID: '', Password: ''};
    this.handleChangeID = this.handleChangeID.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logoutbutton = this.logoutbutton.bind(this);
    this.homebutton = this.homebutton.bind(this);
  }

  handleChangeID(event) {
    this.setState({ID: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({Password: event.target.value});
  }

  logoutbutton(event){
    event.preventDefault();
    window.localStorage.removeItem("ID");
    window.localStorage.removeItem("Status");
    window.location.reload();
  }

  homebutton(event){
    event.preventDefault();
    window.location.replace("/home");
  }

  handleSubmit(event) {
    event.preventDefault();
    window.localStorage.setItem('ID', JSON.stringify(this.state.ID));
    var isValid = this.callAPI();
    isValid.then(res => {
      var keys = Object.keys(res);
      if(keys[0] === 'error'){
        window.localStorage.setItem('Status', JSON.stringify("No"));
        window.location.reload();
      }
      else if(keys[0] === 'status'){
        window.localStorage.setItem('Status', JSON.stringify("Yes"));
        window.location.replace("/home");
      }
    });
  }

  async callAPI() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID: this.state.ID, password : this.state.Password })
    };
    return await fetch('http://localhost:8080/user/login', requestOptions)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  componentDidMount() {
    // const Status = window.localStorage.getItem('Status');
    // if (Status == "\"No\""){
    //  window.localStorage.removeItem('Status');
    // }
  }

  render(){
    const Status = window.localStorage.getItem("Status");
    if (Status == null){
      return (
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <label>
              ID:
              <input type="text" value={this.state.ID} onChange={this.handleChangeID} />
            </label> <br></br>
            <label>
              Password:
              <input type="text" value={this.state.Password} onChange={this.handleChangePassword} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
    else if (Status === "\"No\""){
      return (
        <div className="Login">
          <h1> Please enter the correct ID or password </h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              ID:
              <input type="text" value={this.state.ID} onChange={this.handleChangeID} />
            </label> <br></br>
            <label>
              Password:
              <input type="text" value={this.state.Password} onChange={this.handleChangePassword} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
    else{
      const userID = JSON.parse(window.localStorage.getItem("ID"));
      return (
        <div className="Login">
          <h1> You are already logged in with ID {userID}, you need to log out before logging in as different user. </h1>
          <button type="button" onClick={this.logoutbutton}> Logout </button> <button type="button" onClick={this.homebutton}> Home Page </button> 
        </div>
      )
    }
  }
}

export default Login;
