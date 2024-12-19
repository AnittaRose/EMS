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
// import LeaveForm from './Components/Leaves/Leaves';
// import './Components/Leaves/Leaves.css'
import AddDepartment from './Components/Category/AddCategory';

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
      {/* <Route path={'/LeaveForm'}exact element={<LeaveForm />}/> */}
      <Route path={'/AddDepartment'}exact element={<AddDepartment />}/>
      </Routes>
    </Router>
   </>
  )
}

export default App
