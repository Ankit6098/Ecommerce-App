import { useState } from "react";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"; // Import iziToast styles
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faEye } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    // console.log(event.target.name, event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      // Make a POST request to your backend for user registration
      const response = await fetch(
        "http://localhost:8000/user/create-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

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
      }

      navigateTo("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    window.open("http://localhost:8000/user/auth/google", "_self");
  };

  const handleGithubLogin = async () => {
    window.open("http://localhost:8000/user/auth/github", "_self");
  };

  const handleShowPassword = () => {
    const passwordInput = document.querySelector(".password");
    const showPasswordBtn = document.querySelector(".show-password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      showPasswordBtn.style.color = "#1DA1F2";
    } else {
      passwordInput.type = "password";
      showPasswordBtn.style.color = "#111";
    }
  };

  const handleOpenSignUpPage = () => {
    navigateTo("/sign-up");
  };

  return (
    <div className="sign-in-container animate__animated animate__fadeInLeft">
      <form action="/user/create-session" method="post" className="form-container" onSubmit={handleSubmit} >
        <div className="form-heading">
          <h1>Sign In</h1>
          <h1 className="last-h1">Login to manage your account</h1>
        </div>
        <div className="input-container">
          <div className="i">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        </div>
        <div className="password-input-container">
          <div className="i">
            <FontAwesomeIcon icon={faKey} />
          </div>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="password" required />
          <div className="show-password" onClick={handleShowPassword}>
            <FontAwesomeIcon icon={faEye} />
          </div>
        </div>
        <div className="forget-password-container">forgot password</div>
        <input type="submit" value="Sign In" className="sign-in-btn" />
        <div className="divider">
          <div className="line-left"></div>
          <p>Or</p>
          <div className="line-right"></div>
        </div>
        <div className="other-login-method-container">
          <div onClick={handleGoogleLogin}>
            <img
              src="   https://cdn-icons-png.flaticon.com/512/281/281764.png "
              alt=""
              width="20px"
              height="20px"
            />
          </div>
          <div onClick={handleGithubLogin}>
            <img
              src="   https://cdn-icons-png.flaticon.com/512/733/733553.png "
              alt=""
              width="20px"
              height="20px"
            />
          </div>
        </div>
        <p className="sign-up-para">
          Don't have an account ?
          <span className="toggle-sign-up-page" onClick={handleOpenSignUpPage}> Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
