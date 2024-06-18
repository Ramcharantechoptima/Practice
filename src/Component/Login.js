import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
// import Config from "../../Config/Config";
// import { useNavigate } from "react-router-dom";

const Login = () => {
//   const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const LoginUrl = `${Config.apiBaseUrl}auth/login`;

  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const getEndDate = () => {
      let endDate = localStorage.getItem("endDate");
      if (!endDate) {
        const now = new Date();
        const twoMonthsLater = new Date(
          now.getFullYear(),
          now.getMonth() + 2,
          now.getDate()
        );
        endDate = twoMonthsLater.toISOString();
        localStorage.setItem("endDate", endDate);
      }
      return new Date(endDate);
    };

    const calculateCountdown = () => {
      const endDate = getEndDate();
      const now = new Date();
      const timeLeft = endDate - now;
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  //   useEffect(() => {
  //     document.getElementById("main").style.display = "none";
  //   }, []);

  //   const onSignIn = async (event) => {
  //     event.preventDefault();
  //     const userNameText = document.getElementById("usernameErrorText");
  //     const passwordText = document.getElementById("passwordErrorText");
  //     if (email == "") {
  //       userNameText.style.display = "block";
  //       userNameText.innerHTML = "Please Enter Username / Email";
  //       return;
  //     } else {
  //       userNameText.style.display = "none";
  //       userNameText.innerHTML = "";
  //     }
  //     if (password == "") {
  //       passwordText.style.display = "block";
  //       passwordText.innerHTML = "Please Enter Password";
  //       return;
  //     } else {
  //       passwordText.style.display = "none";
  //       passwordText.innerHTML = "";
  //     }
  //     var responseDetails = {};
  //     try {
  //       const response = await axios.post(
  //         LoginUrl,
  //         {
  //           email_id: email,
  //           password: password,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       console.log("Login successful", response.data);
  //       // sessionStorage.setItem("userinfo", JSON.stringify(response.data));
  //       // sessionStorage.setItem("email", JSON.stringify(response.data.email));
  //       // sessionStorage.setItem(
  //       //   "image_names",
  //       //   JSON.stringify(response.data.image_names)
  //       // );

  //       responseDetails = response;
  //     } catch (error) {
  //       if (error.response) {
  //         setError(`Server responded with status code ${error.response.status}`);
  //       } else if (error.request) {
  //         setError("No response received from server.");
  //       } else {
  //         setError(`Error: ${error.message}`);
  //       }
  //       console.error("Error uploading file:", error);
  //     }

  //     var inputBoxes = document.getElementsByClassName("loginInput");
  //     if (responseDetails.status == "200") {
  //       for (let i = 0; i < inputBoxes.length; i++) {
  //         inputBoxes[i].classList.remove("error");
  //       }
  //       document.getElementById("main").style.display = "grid";
  //       navigate("/CompanyProfile");
  //     } else {
  //       for (let i = 0; i < inputBoxes.length; i++) {
  //         inputBoxes[i].classList.add("error");
  //       }
  //     }

  return (
    <div className="container-fluid" id="loginContent">
      <div className="welcomemessage">We are comming</div>
      <div className="countdown">Time remaining: {countdown}</div>
      <div className="container-fluid" id="divForm">
        <h3 class="head">Optima AI Hiring</h3>
        <h3 class="head">Sign in to Optima AI Hiring</h3>
        <p class="greyText">
          Continue with the Google account or email address you to sign in.
        </p>
        <label class="loginLabel">User Name</label>
        <input
          type="email"
          class="loginInput"
          placeholder="Enter Username"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p id="usernameErrorText" class="errorText"></p>
        <label class="loginLabel">Password</label>
        <input
          type="password"
          class="loginInput"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p id="passwordErrorText" class="errorText"></p>
        <p id="forgot">Forgot Passowrd?</p>
        <div className="container-fluid" id="divLoginBtns">
          <button id="btnReset">Reset</button>
          <button id="btnLoginSubmit">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
