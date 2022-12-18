import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux'
import WebFont from 'webfontloader';
import { Loaduser, Logoutuser } from './Redux/UserRed/Actions'
import Navbar from './Components/Navbar';
import GlobalStyles from './GlobalStyles';
import DashBoard from './Pages/DashBoard';
import LandingPage from './Pages/LandingPage';
import store from './Redux/Store';
import CreateBlogPage from './Pages/CreateBlog';
import ViewArticle from './Pages/ViewArticle';

function App() {

  const { isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Cuprum", "Oswald"]
      }
    })
    store.dispatch(Loaduser());
  }, [])

  const HandleLogout = () => {
    store.dispatch(Logoutuser());
  }
  return (
    <Router>
      <GlobalStyles />
      <Navbar HandleLogout={HandleLogout} isAuth={isAuthenticated} />
      <Routes>
        <Route index element={<LandingPage HandleLogout={HandleLogout} isAuthenticated={isAuthenticated} />} />
        <Route path='/dashboard' element={isAuthenticated && <DashBoard />} />
        <Route path="/addtopic" element={isAuthenticated && <CreateBlogPage />} />
        <Route path="/topic/:id" element={isAuthenticated && <ViewArticle />} />
      </Routes>
    </Router>
  );
}

export default App;
