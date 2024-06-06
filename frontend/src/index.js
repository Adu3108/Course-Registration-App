import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import Course from './Components/Running_Course/course';
import Department from './Components/Department/department';
import Course_Info from './Components/Course_Info/course_info';
import Login from './Components/Login/login';
import Instructor_Info from './Components/Instructor_Info/instructor_info';
import Registration from './Components/Registration/registration';
import Home from './Components/Homepage/Home';
import reportWebVitals from './Components/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Switch>
      <Route path="/course/running/:dept_name" component={Course}/>
      <Route path="/course/running" component={Department} />
      <Route path="/course/:course_id" component={Course_Info} />
      <Route path="/instructor/:instructor_id" component={Instructor_Info} />
      <Route path="/user/login" component={Login} />
      <Route path="/home/registration" component={Registration} />
      <Route path="/home" component={Home} />
    </Switch>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
