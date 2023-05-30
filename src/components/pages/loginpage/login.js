import React, {useState} from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import './login.css'
import users from "../../data/users.json"

const Login = () => {

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the email and password match any user entry
    const matchedUser = users.find(
      (user) => user.email === email && user.password === pwd
    );
  
    if (matchedUser) {
      // Navigate to the dashboard if there is a match
      navigate(`/dashboard/${matchedUser.name}`);
    } else {
      // Handle the case when email and password do not match
      console.log('Invalid credentials');
    }
  };

  const contactSubmit = async (e) => {
    e.preventDefault()
    navigate('/contact');
  }


  return(
    <div className="loginwrapper">
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <br/>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email"></input>
            <input value={pwd} onChange={(e) => setPwd(e.target.value)} type="password" placeholder="Password" id="password" name="password"></input>
            <br/>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Want to know more?</h1>
              <p>Enquire below to speak to Oloids founders</p>
              <button type="submit" className="ghost" id="contact"><NavLink to="/contact" activeclassname="active">Contact Us</NavLink></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Login;