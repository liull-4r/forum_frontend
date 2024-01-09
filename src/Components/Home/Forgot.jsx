import { Link } from "react-router-dom"
// eslint-disable-next-line react/prop-types
function Forgot({ switchView }) {
  return (
 <div style={{fontFamily:"Lato"}} className="reset">
          <h3 className="resetcommand">Reset your password</h3>
      <p className="fill">Fill in your e-mail address below and we will send you  <br /> 
       an email with
              further instructions.
</p>
     <form action="" method="post">
              <input type="email" placeholder="Email adress" />
              <br />
              <button className="resetbutton" type="submit">Reset Your Password</button>
          </form>
        <p className="alreadyanddonthave">
        <div className="alreadyreset">

          <Link onClick={() => switchView('signin')}>Already have an account?</Link>
        </div>
       
        <Link onClick={() => switchView('signup')}>Don’t have an account?</Link>
      </p>
         
    </div>
  )
}

export default Forgot