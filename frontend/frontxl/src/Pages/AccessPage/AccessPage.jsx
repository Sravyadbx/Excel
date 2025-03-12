import React, { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { validateAccessTokenApi } from "../../Redux/APIS/userApis/userApi";
import { useDispatch} from "react-redux";
import darwinboxlogo from "../../assets/Darwinbox.png";
import {toast} from "react-toastify"
const AccessPage = () => {
  const [addInToken, setaddInToken] = useState("");
  const [error, setError] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addInToken)
    if (!addInToken.trim()) {
      setError("Please enter an access token.");
      return;
    }
  
    try {
      const response = dispatch(validateAccessTokenApi(addInToken));
      // const response = dispatch(validateAccessTokenApi(availableTokens[1].token));
  
      response.then((val) => {
        if (val?.payload?.status === 200) {
          localStorage.setItem("accessToken", addInToken);
          localStorage.setItem("userId",val.payload.message.userId)
          // localStorage.setItem("accessToken",availableTokens[1].token)
        toast.success("Login Successful");
          navigate("/rolePage");
        } else {
          setError("Invalid access token.");
        }
      });
    } catch (error) {
      console.error("Token validation error:", error);
      setError("Invalid access token.");
    }
  };
  
  

  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">


      
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-lg text-center flex flex-col items-center">
        <img src={darwinboxlogo} alt="Darwinbox Logo" className="w-25 mb-8" />

        <h2 className="text-xl text-gray-600 mt-5">
          Pairing Darwinbox's capabilities with Excel's versatility
        </h2>

        <hr className="border-gray-300 w-full my-4" />

        <p className="text-lg font-medium text-gray-700 mb-7">
          Seamlessly Import Reports builder Builder data into Excel
        </p>

        <form onSubmit={handleSubmit} className="w-full text-left">
          <label className="text-gray-800 font-medium flex items-center mb-3">
            Enter your Access Code
            <div
              className="relative flex items-center ml-1"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <FiInfo className="text-blue-500 text-lg cursor-pointer" />
              {showTooltip && (
                <span className="absolute -top-15 w-64 text-center text-sm ml-1">
                  The access code will be available in the Reports Builder if
                  your organization has subscribed to the Studio module.
                </span>
              )}
            </div>
          </label>

          <input
  type="text"
  value={addInToken}
  onChange={(e) => {
    setaddInToken(e.target.value);
    setError(""); // Clear error when user starts typing
  }}
  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 
    text-gray-800 font-medium mt-3 ${
      error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
    }`}
  placeholder="Enter your Access Token"
/>



          {error && (
            <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
          )}

          <div className="w-full mt-3">
            <div className="text-right mb-4">
              <a
                href="#"
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                Get Access Code
              </a>
            </div>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="w-1/2 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition mt-4"
              >
                Get Started
              </button>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default AccessPage;

