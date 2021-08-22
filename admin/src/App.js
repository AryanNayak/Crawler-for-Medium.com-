import logo from './logo.svg';
import './App.css';
import  Loader  from "./admin_panel/loader";
import Navbar from "./admin_panel/nav";
import Details from "./admin_panel/details";
import History from "./admin_panel/history";
import NavTabs from "./admin_panel/admin";
import Bnav from "./blog/nav";
import Det from "./blog/details";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <Navbar  />
    
      {/* <Loader />
      <Details />
      <History></History>  */}
      <NavTabs ></NavTabs>

    </div>
  );
}

export default App;
