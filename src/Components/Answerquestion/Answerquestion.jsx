import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import AfterloginHeader from "../AfterLogin/AfterloginHeader"
import "../Askquestion/Askquestion.css"
import axios from "axios";
import "./Answerquestion.css"
import ReactQuill from "react-quill"
import Footer from "../Footer/Footer"
import { useEffect, useState } from "react";
function Answerquestion() {
        const location = useLocation();
    const { question } = location.state || {}; 
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [posted, setPosted] = useState(false);
     const [postanswer, setPostAnswer] = useState('');
  const [getAnswer, setGetAnswer] = useState([])
  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (!token) {
        console.error("No token found");
        alert("You're not logged in!");
        return;
    }

    fetch(`https://forum-backend-xlvk.onrender.com/api/answer/oneeanswer/${question.questionid}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json())
      .then(data => {
        setGetAnswer(data)
      })
      .catch(error => {
          console.error('Error fetching the questions:', error);
          alert("There was an error fetching the questions.");
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posted]); 
      const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }
 const plainTextanswer = stripHtml(postanswer);
     const postAnswer = async () => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            console.error("No token found");
            alert("You're not logged in!");
            return;
        }
         try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post('https://forum-backend-xlvk.onrender.com/api/answer/oneanswer', {
            questionid: question.questionid,
            answer: plainTextanswer
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
       setShowSuccessMessage(true); 
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 1000);
        setPosted(prev => !prev); 
    } catch (error) {
    
        alert("There was an error posting your answer.");
    }
    }
  
  return (
      <>     
          <AfterloginHeader />
          <div className="answerquestion">
              <h1 >Question</h1>
              <h1>{question?.title}</h1>
              <p style={{marginTop:"10px"}}>{question?.description}</p>
           
              <hr style={{width:"100%"}} />
              <h1 style={{marginTop:"20px",textAlign:"center"}} >ANSWERS FROM THE COMUNITY</h1>
              <hr style={{width:"100%"}} />

              
        {
getAnswer.answer?.map((answerfinal, i) => {
            return (  
               // eslint-disable-next-line react/jsx-key
               <><div style={{width:"100%"}} key={i} className="afterlogin">
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                         <img style={{ width: "150px", height: "150px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUzmQxwKnYnWrAuIfaKoy_ojWhGy0-KZlH7fOkAU5WMH2D2OGafm6wsSSR0LJW--Es064&usqp=CAU" alt="" />
                    <p>{answerfinal.username}</p>
                   </div>
                    <span>{answerfinal.answer}</span>
                    <br />
                    
                </div><hr style={{width:"100%"}} /></>
                
)})
}

              
          </div>
         <div className="askquestionpublic">
              <h2>Answer The Top Question</h2>
           <Link to='/afterlogin'><p>Go to Question page</p></Link>
          </div>

          <div className="answerform">
              {showSuccessMessage && (
                <div className="success-message">Answer successfully posted!</div>
            )}
              <form onSubmit={(e) => {
                    e.preventDefault();
                    postAnswer();
                }}>
               <ReactQuill style={{marginTop:"100px"}} value={postanswer}
                        onChange={setPostAnswer} className="descritpion" theme="snow" placeholder="Answer Description" />
                  <br />
                  <button className="postbutton">Post Your Question</button>
</form>
          </div>
          <Footer/>
    </>
  )
}

export default Answerquestion