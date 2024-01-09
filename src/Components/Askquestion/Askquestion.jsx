import { Link,useNavigate } from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AfterloginHeader from "../AfterLogin/AfterloginHeader"
import axios from "axios";

import "./Askquestion.css"
import Footer from "../Footer/Footer";
import { useState } from "react";
function Askquestion() {
    const [title, setTitle] = useState('');
    const [alert, setAlert] = useState("");
    const Navigate=useNavigate()
    const [description, setDescription] = useState('');
      const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }
 const plainTextDescription = stripHtml(description);
     const postQuestion = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (!token) {
            // console.error("No token found");
            setAlert("You're not logged in!");
            return;
        }

        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post('https://forum-backend-xlvk.onrender.com/api/question/onequestion', {
                title,
                description:plainTextDescription
            }, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });

            // console.log(response.data);
setTimeout(() => {
      Navigate("/afterlogin")
}, 1000);
setAlert("Question successfully posted!")
   
        } catch (error) {
            // console.error('Error posting the question:', error);
             console.error('Error posting the question:', error.response ? error.response.data : error);
            setAlert("There was an error posting your question.");
        }
    }
  return (
      <div>
     
          <AfterloginHeader />
          <div className="askquestionguides">
              <h2>Steps to write a good question</h2>
              <ul>
                <li>Summerize your problem in a one-line title.</li>
                <li>Describe your problem in more detail.</li>
                <li>Describe what you tried and what you expected to happen.</li>
                <li>Review your question and post it to the site.</li>
              </ul>
          </div>

          <div className="askquestionpublic">
              <h2>Ask a public question</h2>
           <Link to='/afterlogin'><p>Go to Question page</p></Link>
          </div>

          <div className="questionform">
              <h1>{alert}</h1>
              <form onSubmit={(e) => {
                    e.preventDefault();
                    postQuestion();
                }}>
                  <input  value={title}
                        onChange={(e) => setTitle(e.target.value)} style={{fontSize:`25px` }} className="titlequestion" type="text" placeholder="Title" name="title" />
                 
                  <ReactQuill  theme="snow"
                        value={description}
                        onChange={setDescription} className="descritpion" placeholder="Question Description" />
                  <br />
                  <button className="postbutton">Post Your Question</button>
              </form>
          </div>

      <Footer/>
      </div>
  )
}

export default Askquestion