import "./App.css"
import Afterloginhome from "./Components/AfterLogin/Afterloginhome"
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import {  Routes, Route } from "react-router-dom"
import Home from "./Components/Home/Home"
import Askquestion from "./Components/Askquestion/Askquestion";
import Answerquestion from "./Components/Answerquestion/Answerquestion";
function App() {

    const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const authenticatedBasePaths = ['/afterlogin', '/ask-question'];
    const publicPaths = ['/'];
    
   
    const isAuthBasePath = authenticatedBasePaths.some(path => location.pathname.startsWith(path)) || location.pathname.startsWith('/questions/');

    if (token && !isAuthBasePath) {
      navigate('/afterlogin');
    } else if (!token && !publicPaths.includes(location.pathname)) {
      navigate('/'); 
    }
  }, [navigate, location.pathname]);

  
  return (
   
    <div>
        <Routes >
          <Route exact path="/" element={<Home />} />
        <Route exact path="/afterlogin" element={<Afterloginhome />} />
        <Route path="/ask-question" element={<Askquestion />} />
        
        <Route path="/questions/*" element={<Answerquestion />} />
        </Routes>
      
      </div>
     
  )
}

export default App