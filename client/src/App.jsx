import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './Components/Admin/Admin';
import '../src/Components/Admin/Admin.css';
import Employee from './Components/Employee/Employee';
import "../src/Components/Employee/Employee.css";
import Adduser from './Components/Adduser/Adduser';
import "../src/Components/Adduser/Adduser.css";
import Emailverification from './Components/Emailverfication/Emailverification';
import "./Components/Emailverfication/Emailverification.css";
import Login from './Components/login/login';
import "./Components/login/login.css";
import Singleview from './Components/singleview/Singleview';
import "./Components/singleview/Singleview.css"
import Resetpassword from './Components/resetpassword/resetpassword';
import "./Components/resetpassword/resetpassword.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/Employee" element={<Employee />} />
        <Route path="/Adduser" element={<Adduser />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/email-verification" element={<Emailverification />} /> 
        <Route path="/singleview/:id/:login" element={<Singleview />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        </Routes>
    </Router>
    
  );
}

export default App;


