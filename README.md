## Installation

### 1. Install the necessary packages

```bash
pip3 install -r requirements.txt
```

### 2. Install the required node modules

### Frontend
```bash
npm install
```

### Backend
```bash
npm install --legacy-peer-deps
mv ./node_modules ../               // Move the node modules into the root directory
```

- After installing the node_modules for backend, take it out to the root directory in order to run our code. 
- Thus, the root directory of our project after running the above commands would look like -
<pre>
.
├── backend
├── frontend
└── node_modules (backend)
</pre>

## Setting up Postgres Server

### 1. Starting Postgres Server
```bash
pg_ctl -D /usr/local/var/postgres start
```

### 2. Create Database
```sql
CREATE DATABASE lab4db;
```

### 3. Create Database Schema
```sql
\c lab4db
\i backend/Services/database/schema.ddl
```

### 4. Add Data
#### Small Database
```sql
\c lab4db
\i backend/Services/database/small_data.ddl
```

#### Large Database
```sql
\c lab4db
\i backend/Services/database/large_data.ddl
```

## Starting the App 

### 1. Backend Server
```bash
cd backend
npm run server
```

- Hosted at ```http://localhost:8080```

### 2. Frontend Server
```bash
cd frontend
npm start
```

- Hosted at ```http://localhost:3000```

## Available Endpoints

### 1. User Registration
```bash
http://localhost:8080/user/register
```
- Register a particular student using the student Id and setting a password. You can view the existing student's IDs using the following command on postgres :-

```sql
\c lab4db
SELECT id FROM student;
```

### 2. User Login
```bash
http://localhost:3000/user/login
```

- Using the same credentials entered during registration, you can login as that student.

### 3. Homepage
```bash
http://localhost:3000/home
```

- Homepage displaying the student details and registered courses.
- You also have the option to drop registered courses.

### 4. Course Registration
```bash
http://localhost:3000/home/registration
```

- You can search for courses to register by entering the course id in the search bar.
- You can then register for the searched courses if you pass their prerequisites.

### 5. Running Courses (All)
```bash
http://localhost:3000/course/running
```

- Displays the list of departments offering different courses.
- Each hyperlink redirects to another page displaying the courses offered by that department

### 6. Running Courses (Department-specific)
```bash
http://localhost:3000/course/running/:dept_name
```

- Displays the list of courses offered by that department.

### 7. Course Page
```bash
http://localhost:3000/course/:course_id
```

- A page displaying the course details, instructor details and the prerequisites of that course.

### 8. Instructor Page
```bash
http://localhost:3000/instructor/:instructor_id
```

- A page displaying the details of the instructor, the current and previous courses taken by that instructor.

## References

| | |
| ------- | ------- |
| [Login Authentication](https://dev.to/shreshthgoyal/user-authorization-in-nodejs-using-postgresql-4gl) | [Sessions](https://www.tutorialspoint.com/localstorage-in-reactjs) |
| [React Bootstrap](https://react-bootstrap.github.io/) | [Search Bar](https://stackoverflow.com/questions/66411539/how-to-make-logo-navbar-and-search-bar-all-in-one-row-in-bootstrap-and-in-react) |
| [Divider](https://stackoverflow.com/questions/66110604/does-bootstrap-5-have-a-built-in-horizontal-line) | [Dropdown Menu](https://react-bootstrap.github.io/forms/select/) |
| [Tables](https://getbootstrap.com/docs/4.0/content/tables/) | [Navbar](https://react-bootstrap.github.io/components/navbar/) |

## Notes 

We are using config.js instead of config.txt in the backend folder 