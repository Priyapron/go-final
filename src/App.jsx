// App.jsx
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import UserManagement from './component/User';
import StudentManagement from './component/Student';
import SubjectManagement from './component/Subject';
import TeacherManagement from './component/Teacher';
import MainMenu from './MainMenu';
import AddStudentPopup from './component/Student/AddStudentPopup';
import EditStudent from './component/Student/EditStudent';
import AddSubject from './component/Subject/AddSubjectPopup'; 
import EditSubject from './component/Subject/EditSubject';
import AddTeacher from './component/Teacher/AddTeacherPopup'; 
import EditTeacher from './component/Teacher/EditTeacher';
import AddUserPopup from './component/User/AddUserPopup'; 
import EditUser from './component/User/EditUser';


function App() {
  return (
    <Router>
      <MainMenu/>
      <div>
        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<UserManagement />} />
          <Route path="/student" element={<StudentManagement />} />
          <Route path="/subject" element={<SubjectManagement />} />
          <Route path="/teacher" element={<TeacherManagement />} />
          <Route path="/mainMenu" element={<MainMenu />} />
          <Route path="/addStudent" element={<AddStudentPopup />} />
          <Route path="/editStudent/:id" element={<EditStudent />} />
          <Route path="/addSubject" element={<AddSubject />} />
          <Route path="/editSubject/:id" element={<EditSubject />} />
          <Route path="/addTeacher" element={<AddTeacher />} />
          <Route path="/editTeachers/:id" element={<EditTeacher />} />
          <Route path="/addUser" element={<AddUserPopup />} />
          <Route path="/editUser/:id" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
