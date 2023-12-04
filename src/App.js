import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import EmployeePortal from './EmployeePortal'
import ManagerPortal from './ManagerPortal'
import ReviewTable from './ReviewTable';
import HrPortal from './HrPortal'
import HrView from './HrView';
import Main from './Main';
import EmployeeView from './EmployeeView';
import EmployeegetData from './EmloyeegetData'
import HrReviewTable from './HrReviewTable';
import Practice from './Practice'
import Performance from './Performance';
import DataTable from './DataTable';
import Question from './Question'
import Pdquestion from './Pdquestion'
import Boquestion from './Boquestion'
import Dpquestions from './Dpquestions'
import Maquestions from './Maquestions'

import NavigationComponent from './NavigationComponent';
import TabComponent from './TabComponent'
import SubTabs from './SubTabs';
import Mform from './Mform';
import Eform from './Eform';
import Mview from './Mview';
import Eview from './Eview';

import Mget from './Mget';
import Medataview from './Medataview';
import Eget from './Eget';
import Mratings from './Mratings';
import ManagerCommentsPost from './ManagerCommentsPost';
import AdminloginForm from './AdminloginForm';
import AdminView from './AdminView';
import EmployeeKPIsComponent from './EmployeeKPIsComponent';
import ManagerKPIsComponent from './ManagerKPIsComponent';
import DirectorView from './DirectorView';
import DirectorPortal from './DirectorPortal';
import DirectorManagersView from './DirectorManagersView';
import DirectorManagerDetails from './DirectorManagerDetails';
import DirectorEmployeeDetails from './DirectorEmployeeDetails';
import DirectorMngEmpDetails from './DirectorMngEmpDetails';
import PasswordResetForm from './PasswordResetForm';
import ChangePasswordForm from './ChangePassword';
import VicePresidentPortal from './VicePresidentPortal';
import VicePresidentView from './VicePresidentView';
import DirectorKPIsComponent from './DirectorKPIsComponent';
import DirectorForm from './DirectorForm';
import DirectorGet from './DirectorGet';
import VicePresidentComments from './VicePresidentComments';
import VicePresidentDirectorComments from './VicePresidentDirectorComments';


function App() {
  return (
    <div >
      <Router>
        <Routes>

          <Route path="/employee" element={<EmployeePortal />} />
          <Route path="/manager" element={<ManagerPortal />} />
          <Route path="/review/:empid" element={<ReviewTable />} />
          <Route path="/hr/:empId" element={<HrPortal />} />
          <Route path="/hrview" element={<HrView />} />
          <Route path="/employeeview" element={<EmployeeView />} />
          <Route path="/empget" element={<EmployeegetData />} />
          <Route path="/hrreview/:empid" element={<HrReviewTable />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/datatable" element={<DataTable />} />
          <Route path="/question" element={<Question />} />
          <Route path="/pdquestion" element={<Pdquestion />} />
          <Route path="/boquestion" element={<Boquestion />} />
          <Route path="/dpquestion" element={<Dpquestions />} />
          <Route path="/maquestion" element={<Maquestions />} />
          <Route path="/navigation" element={<NavigationComponent />} />
          <Route path="/tab" element={<TabComponent />} />
          <Route path="/sub" element={<SubTabs />} />
          <Route path="/mrating" element={<Mratings />} />
        



        

          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Main />} />
          <Route path="/eview" element={<Eview />} />
          <Route path="/eform" element={<Eform />} />
          <Route path="/eget/:empid" element={<Eget />} />   {/* needs to change the table and buttons position */}
          <Route path="/mview" element={<Mview />} />
          <Route path="/mform" element={<Mform />} />
          <Route path="/mget/:empid" element={<Mget />} />
          <Route path="/meview" element={<Medataview />} />
          <Route path="/mcomments/:empId" element={<ManagerCommentsPost />} />    {/* needs to change the table and buttons position and also reduce the sidebar size */}
          <Route path="/directorview" element={<DirectorView />} />
          <Route path="/directorportal" element={<DirectorPortal />} />
          <Route path="/dform" element={<DirectorForm />} />
          <Route path="/dget/:empid" element={<DirectorGet />} />
          <Route path="/directormanagerview" element={<DirectorManagersView />} />
          <Route path="/directormanagerdetails/:empId" element={<DirectorManagerDetails />} />   {/* needs to add toggle to the sidebar  */}
          <Route path="/directoremployeedetails" element={<DirectorEmployeeDetails />} />
          <Route path="/directormngempdetails/:empId" element={<DirectorMngEmpDetails />} />
          <Route path="/VPPortal" element={<VicePresidentPortal />} />
          <Route path="/VPView" element={<VicePresidentView />} />
          <Route path="/VPComments/:empId" element={<VicePresidentComments />} />
          <Route path="/VPDirectorComments/:empId" element={<VicePresidentDirectorComments />} />
          <Route path="/adminLogin" element={<AdminloginForm />} />
          <Route path="/adminview" element={<AdminView />} />    {/* needs to adjust the sidebar and buttons */}
          <Route path="/EmployeeKPIsComponent" element={<EmployeeKPIsComponent />} />
          <Route path="/ManagerKPIsComponent" element={<ManagerKPIsComponent />} />
          <Route path="/DirectorKPIsComponent" element={<DirectorKPIsComponent />} />
          <Route path="/resetpwd" element={<PasswordResetForm />} />
          <Route path="/changepwd" element={<ChangePasswordForm />} />























        </Routes>
      </Router>
    </div>
  );
}

export default App;
