/* eslint-disable react/jsx-key */

import { useEffect, useState } from 'react';
import {   Link, useNavigate } from 'react-router-dom';
import './Afterloginhome.css'
import { FaGreaterThan } from "react-icons/fa";
function Afterloginhome() {
  const Navigate = useNavigate();
  
  const [question, setQuestions] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {    
        return;
    }

    fetch("https://forum-backend-xlvk.onrender.com/api/question/allquestion", {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }).then(res => res.json())
      .then(data => {
        setQuestions(data)
      })
      .catch(() => {
          
          alert("There was an error fetching the questions.");
      });
}, []) 

 
  const username = localStorage.getItem('username'); 

  const handleLogout = () => {   
    localStorage.removeItem('token'); 
     localStorage.removeItem('username'); 
        Navigate('/');
    };


const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

 
  return (
      <div  style={{fontFamily:"Lato,sans-serif"}}>
        <div className="header">
          <div className="headlogoandlinks">
              <div style={{cursor: 'pointer'}} className="headlogo">
                    <img src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png" alt="" />
              </div>
              <div className="headlinks">
                  <ul>
                     <li><Link to="/" exact activeClassName="activeLink">Home</Link></li>
                      <li><Link to="/how-it-works" activeClassName="activeLink">How it works</Link></li>
                    <li style={{color:"white"}} onClick={handleLogout} className="headsignin">SIGN OUT </li>
                  </ul>
              </div>
          </div>
    </div>
      <div className="askall">
      
              <Link to="/ask-question"><button className="askbutton">Ask Questions</button></Link>
            <input
          className="asksearch"
          type="text"
          placeholder="Search Questions"
          value={searchTerm}
          onChange={handleSearchChange} // Set up onChange handler
        />
              <span>Welcome {username}</span>
          </div>

          <div className="question">
                        <h1 className="questionh1">Questions</h1>
       
      </div>
         <hr />
    

        { question.questions?.filter(question => 
            question.title.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((question, i) => {
          let uniqueID = question.questionid;
            return (  
            
            <Link to={`/questions/${uniqueID}`} className="customLink" state={{ question: question }}>

               <div key={i} className="afterlogin">
                  <div className='usernamequestion'>
                     <img style={{width:"150px",height:"150px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUzmQxwKnYnWrAuIfaKoy_ojWhGy0-KZlH7fOkAU5WMH2D2OGafm6wsSSR0LJW--Es064&usqp=CAU" alt="" />
                    <p  className='afterloginusername'>{question.username}</p>
                   
                  
                 </div>
                  <p >{question.title}</p>
                  <div style={{display:"flex",justifyContent:"space-between",position:"absolute",right:"50px"}}>
                       < FaGreaterThan />
    </div>

                </div>
                <hr />
                     </Link>
)})
}

    </div>
  )
}

export default Afterloginhome


