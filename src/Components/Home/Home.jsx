import  { useState } from 'react';
import Signup from './Signup';
import Signin from './Signin';
import Forgot from './Forgot';
import './Home.css';
import Describe from './Describe';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Home() {
  const [borderActive, setBorderActive] = useState(false);

  const toggleBorder = () => {
    setBorderActive(!borderActive);
  };

    const [currentView, setCurrentView] = useState('signin'); // Default to 'signin'
  const switchview = (view) => {
    
    setCurrentView(view);
  };

  return (
    <div>
      <Header toggleBorder={toggleBorder} switchView={switchview}  signlog="Sign In"/>
        <div className='hometotal' style={{backgroundImage: "url(https://www.evangadi.com/themes/humans/assets/images/misc/bg-svg-f.svg)", backgroundSize: 'cover',height: '100vh'}} >
      <div className="home">
      <div className='view-container'>
       {currentView === 'signin' && <Signin  borderActive={borderActive} switchView={switchview} />}
      {currentView === 'forgot' && <Forgot switchView={switchview} />  }
      {currentView === 'signup' && <Signup switchView={switchview} />}
    </div>
    <div>
      <Describe />
    </div>
      </div>
      
      </div>
      <Footer/>
  </div>
  )
}

export default Home