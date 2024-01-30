import { useState } from "react";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"; // Import iziToast styles
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faEye, faKey } from "@fortawesome/free-solid-svg-icons";

function Signup() {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.password !== formData.confirmPassword) {
      iziToast.error({
        title: "Error",
        message: "Password and confirm password do not match",
        position: "topCenter",
      });
      return;
    }

    try {
      // Make a POST request to your backend for user registration
      const response = await fetch("http://localhost:8000/user/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 400) {
        // Handle the error, show a message, or perform other actions
        iziToast.error({
          title: "Error",
          message: "User Already Exists!",
          position: "topCenter",
        });
      }

      if (response.status === 201) {
        console.log("Response:", response);
        const result = await response.json();
        console.log("User registered successfully:", result);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        iziToast.success({
          title: "Success",
          message: "Register Successfull!",
          position: "topCenter",
        });

        // redirect to login page
        navigateTo("/login");
      } else {
        console.error("User registration failed:", response.statusText);
        // Handle the error, show a message, or perform other actions
        iziToast.error({
          title: "Error",
          message: "User registration failed",
          position: "topCenter",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      // Handle the error, show a message, or perform other actions
    }
  };

  const handleShowConfirmPassword = () => {
    const confirmPasswordInput = document.querySelector(".confirm-password");
    const showConfirmPassword = document.querySelector(".show-confirm-password");
    if (confirmPasswordInput.type === "password") {
      confirmPasswordInput.type = "text";
      showConfirmPassword.style.color = "#1DA1F2";
    } else {
      confirmPasswordInput.type = "password";
      showConfirmPassword.style.color = "#111";
    }
  }

  const handleGoogleLogin = async () => {
    window.open("http://localhost:8000/user/auth/google", "_self");
  };

  const handleGithubLogin = async () => {
    window.open("http://localhost:8000/user/auth/github", "_self");
  };

  const handleOpenSignInPage = () => {
    navigateTo("/login");
  }

  return (
    <div className="sign-up-container animate__animated animate__fadeInRight">
      <form action="/user/create-user" method="post" className="form-container" onSubmit={handleSubmit} >
        <div className="sign-up-form-heading">
          <h1>Create your account</h1>
        </div>
        <div className="input-container">
          <div className="i">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <input type="text" name="name" placeholder="Name" required onChange={handleChange} value={formData.name}/>
        </div>
        <div className="input-container">
          <div className="i">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} value={formData.email} />
        </div>
        <div className="input-container">
          <div className="i">
            <FontAwesomeIcon icon={faKey} />
          </div>
          <input type="password" name="password" placeholder="Password" minLength="8" required onChange={handleChange} value={formData.password} />
        </div>
        <div className="confirm-input-container">
          <div className="i">
            <FontAwesomeIcon icon={faKey} />
          </div>
          <input type="password" name="confirmPassword" placeholder="Confirm Password" className="confirm-password" required onChange={handleChange} value={formData.confirmPassword} />
          <div className="show-confirm-password" onClick={handleShowConfirmPassword}>
            <FontAwesomeIcon icon={faEye} />
          </div>
        </div>
        <input type="submit" value="Sign Up" className="sign-in-btn" />
        <div className="divider">
          <div className="line-left"></div>
          <p>Or</p>
          <div className="line-right"></div>
        </div>
        <div className="other-login-method-container">
          <div onClick={handleGoogleLogin}>
            <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png " alt="" width="20px" height="20px" />
          </div>
          <div onClick={handleGithubLogin}>
            <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png " alt="" width="20px" height="20px" />
          </div>
        </div>
        <p className="sign-up-para">
          Already have an Accout ?
          <span className="toggle-sign-in-page" onClick={handleOpenSignInPage}> Sign In</span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
