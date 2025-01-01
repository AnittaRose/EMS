import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login/Login';
import './Components/Login/Login.css';
import Admin from './Components/AdminDashboard';
import './Components/AdminDashboard.css';
import Manage from './Components/ManageEmploye/Manageemployee';
import './Components/ManageEmploye/ManageEmploye.css';
import Addpage from './Components/AddEmployees/Addemploye';
import './Components/AddEmployees/Addemploye.css';
import Categories from './Components/Category/Category';
import './Components/Category/Category.css'
import Single from './Components/SingleEmploye/SingleEmploye';
import './Components/SingleEmploye/SingleEmploye.css'
import Edit from './Components/Update/UpdateEmploye';
import './Components/Update/UpdateEmploye.css'
import AddDepartment from './Components/Category/AddCategory';
import WelcomeEmployee from './Components/Welcome/EmployeWelcome';
import AddLeaves from './Components/Leaves/Addleave';
import ViewLeaves from './Components/AddEmployees/LeaveList';
import WelcomeAdmin from './Components/Welcome/AdminWelcomepage';
import ViewLeavesinAdmin from './Components/Leaves/viewLeavesinadmin';
import './Components/Leaves/viewLeavesinadmin.css'
import Salaries from './Components/Salary/Salary';
import SalaryForm from './Components/Salary/Form';
import MarkAttendanceAdmin from './Components/Attendence/MarkAttendanceAdmin';
import AllAttendance from './Components/Attendence/AllAttendance';
import EmployeeAttendance from './Components/Attendence/EmployeeAttendance';
import EmailVerification from './Components/Forgot/ForgotPassword';
import './Components/Forgot/Forgot.css'
import SingleemployeAdmin from './Components/ManageEmploye/Single';
import './Components/ManageEmploye/Single.css'
import Reset from './Components/Reset/Reset';
import './Components/Salary/Salary.css';
import './Components/Welcome/EmployeWelcomepage.css'
// import './Components/Leaves/'
import './Components/Leaves/Addleaves.css'
import Employesingle from './Components/Employe/Employe';
import './Components/Employe/Employe.css'
import './Components/Reset/Reset.css'
import './Components/Salary/Form.css'
import './Components/AddEmployees/LeaveList.css'
import PaySalaries from './Components/Salary/PaySalaries';
import './Components/Salary/PaySalaries.css'
function App() {


  return (
   <>
    <Router>
      <Routes>
      <Route path={'/'} exact element={<Login />} />
      <Route path={'/Login'} exact element={<Login />} />
      <Route path={'/Admin'} exact element={<Admin/>}/>
      <Route path={'/Manage'} exact element={<Manage />}/>
      <Route path={'/Addpage'} exact element={<Addpage />}/>
      <Route path={'/Categories'} exact element={<Categories />}/>
      <Route path={'/Single'} exact element={<Single/>}/>
      <Route path={'/Edit'} exact element={<Edit/>}/>
      <Route path={'/AddDepartment'}exact element={<AddDepartment />}/>
      <Route path={'/Employesingle'}exact element={<Employesingle />}/>
      <Route path={'/WelcomeEmployee'}exact element={<WelcomeEmployee />}/>
      <Route path={'/AddLeaves'} exact element={<AddLeaves />}/>
      <Route path={'/ViewLeaves'} exact element={<ViewLeaves />}/>
      <Route path={'/WelcomeAdmin'} exact element={<WelcomeAdmin />}/>
      <Route path={'/ViewLeavesinAdmin'} exact element={<ViewLeavesinAdmin />}/>
      <Route path={'/Salaries'} exact element={<Salaries />}/>
      <Route path={'/SalaryForm'}exact element={<SalaryForm />}/>
      {/* <Route path={'/SalaryList'}exact element={< SalaryList/>}/> */}
      <Route path={'/MarkAttendanceAdmin'}exact element={<MarkAttendanceAdmin />}/>
      <Route path={'/AllAttendance'}  exact element={<AllAttendance />}/>
      <Route path={'/EmployeeAttendance'} exact element={<EmployeeAttendance />}/>
      <Route path={'/EmailVerification'}exact element={<EmailVerification />}/>
      <Route path={'/SingleemployeAdmin'} exact element={<SingleemployeAdmin />}/>
      <Route path={'/PaySalaries'} exact element={<PaySalaries />}/>
      <Route path={'/Reset'} exact element={<Reset />}/>
      </Routes>
    </Router>
   </>
  )
}

export default App
