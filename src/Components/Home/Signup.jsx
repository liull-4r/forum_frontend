import { useState } from "react"
import { Link} from "react-router-dom"
import axios from 'axios';
import { IoMdEye } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa6";
// eslint-disable-next-line react/prop-types
function Signup({ switchView }) {
   const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState("")
 async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  try {
    const response = await axios.post('https://forum-backend-xlvk.onrender.com/api/users/register', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
if (response.status === 200 || response.status === 201) {
      setSuccess("User registered successfully");
      setTimeout(() => {
        switchView('signin');
      }, 2000);
    } 
  } catch (error) {
    if (error.response) {
     
      setSuccess(`Error: - ${error.response.data.message}`);
    } else if (error.request) {
   
      setSuccess("No response received from the server.");
    } else {      
      
      setSuccess("An unexpected error occurred.");
    }
    setTimeout(() => {
      setSuccess("");
    }, 1000);
  }
}

  return (
   <div style={{fontFamily:"Lato"}} className="signup">
          <h3 className="signupcommand">Join the network</h3>
          <p className="donthave">Already have an account?
        <Link style={{cursor:"pointer"}} onClick={() => switchView('signin')} className="signin">
          Sign in
        </Link>                                                                                                       </p>
          <form onSubmit={handleSubmit}>
              <input  type="email" placeholder="Email adress" name="email"  />
               <div className="firstlast">
              <input  placeholder="First name" name="firstname" /> <br />
                  <input type="text" placeholder="last name" name="lastname" /> <br />
        </div>
        <input placeholder="Username" name="username" /> <br />
         <div className="password-container">
          <input
          name="password"
         
            type={visible ? "text" : "password"}
            placeholder="Password"
            className="password-input"
          />
          {visible ? (
            <IoMdEye onClick={() => setVisible(false)} className="eye-icon" />
          ) : (
            <FaRegEyeSlash onClick={() => setVisible(true)} className="eye-icon" />
          )}
        </div>
            
              <br />
              <p className="termsandpolicy">I agree to the <Link>privacy policy</Link> and <Link>terms of service</Link> .</p>
              <button className="signupbutton" type="submit">Agree and Join</button>
          </form>
      <p className="already"> <Link onClick={() => switchView('signin')}>Already have an account?</Link></p>
      {success && <p className="success">{success}</p>}
    </div>
  )
}

export default Signup