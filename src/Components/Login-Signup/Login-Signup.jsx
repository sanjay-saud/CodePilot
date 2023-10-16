import React, { useState } from 'react'
import './Login-Signup.css'
import logo from '../Assets/logo.png'

import email_icon from '../Assets/email.png'
import person_icon from '../Assets/person.png'
import password_icon from '../Assets/password.png'

export const Login_Signup = () => {


// js for functionality
// to check the page and change the color
  const [action,setAction] = useState("Sign Up")

  return (
    <div className='container'>
        <div className='logo'><img src={logo} alt="Code Pilot Logo" /></div>
        <div className='header'>
            {/* {action} changes the heading according to the aciton */}
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>

        <div className="inputs">
            {action==="Login"?<div></div>:
            <div className="input">
                <img src={person_icon} alt="" />
                <input type="text" placeholder="Name"/>
            </div>}


            <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" placeholder="Email"/>
            </div>


            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" placeholder="Password" />
            </div>


            {action==="Sign Up"?<div></div>:<div className="forget-password">Forget Password ? <span>Click Here</span></div>}

            <div className="submit-container">

                {/* if action equals login our classname will be submit grey else submit */}
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>

            </div>
        </div>
    </div>

  )
}
