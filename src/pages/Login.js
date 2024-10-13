import React from 'react';
import './Login.css';
import LoginImage from'../images/LoginImage.png';

const LoginComponent = () => {
    return (
        <div className='wrapper'>
            <div className="container">
                <div className="imageContainer">
                    <img
                        src={LoginImage}
                        alt="Gaming Illustration"
                        className="image"
                    />
                </div>
                <div className="formContainer">
                    <h2 className="title">Welcome Back!</h2>
                    <p className="subtitle">Find awesome games<br />Explore new dimensions</p>
                    <form className="form">
                        <input type="email" placeholder="Email" className="input" />
                        <input type="password" placeholder="Password" className="input" />
                        <button type="submit" className="loginButton">Log in</button>
                    </form>
                    <div className="footer">
                        <a href="/forgot-password" className="link">Forgot Password</a>
                        <span className="divider"> | </span>
                        <a href="/sign-up" className="link">Sign Up</a>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default LoginComponent;
