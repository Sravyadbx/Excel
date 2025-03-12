
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setshowLoad, setStartCell } from "../../../Redux/Slices/UserSlice/userSlice";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  handelCheckStatusApi,
  loginOauthApi,
  getLastUpdatedSheetTime,
} from "../../../Redux/APIS/userApis/userApi";
import Loading from "../../Loading/Loading";
import ConsentPopup from "./ConsentPopup";
import StopImport from "./StopImport";
import ErrorMsgDisplay from "./ErrorMsgDisplay";

function RolePageDataDisplayComp({userData}) {
  const {
    finalSelectedRoleData,
    selectedReportData,
    finalSelectedReportData,
    showLoad,
    startCell,
    selectedRoleData,
    finalSelectedReportLastUpdatedTime,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [inputCell, setInputCell] = useState(startCell || "A1");
  const [isValidCell, setIsValidCell] = useState(true);
  const [status, setStatus] = useState("Idle");
  const [requestId, setRequestId] = useState(null);
  const [errorMessage , setErrorMessage] = useState("")
  const [showConsentPopup, setShowConsentPopup] = useState(false);

  //   const [lastUpdatedAt,setLastUpdatedAt] = useState(null);
  const navigate = useNavigate();
  const validateCellInput = (cell) => /^[A-Z]+[1-9][0-9]*$/.test(cell);
  console.log(selectedReportData)
  const handleInputChange = (e) => {
    let cellValue = e.target.value.toUpperCase();
    setInputCell(cellValue);
    setIsValidCell(validateCellInput(cellValue));
    if (isValidCell) dispatch(setStartCell(inputCell));
  };

  const handelGenReport = async () => {
    if (!isValidCell) return;
    dispatch(setStartCell(inputCell));
    dispatch(setshowLoad(true));
    
    let tokens = JSON.parse(localStorage.getItem("tokens"));
    let result;
    
    try {
      const newRequestId = `req-${Date.now()}`; // Generate a unique request ID
      setRequestId(newRequestId);
      if (tokens) {
        result = await dispatch(
          handelCheckStatusApi({
           selectedReportData,
            startCell: inputCell,
            role_id: finalSelectedRoleData.role_id,
           requestId : newRequestId
          })
        ).unwrap();
      } else if (finalSelectedRoleData) {
        await dispatch(loginOauthApi());
        result = await dispatch(
          handelCheckStatusApi({
            selectedReportData,
            startCell: inputCell,
            role_id: finalSelectedRoleData.role_id,
          })
        ).unwrap();
      }
      console.log(result.status)
      console.log("result",result);
      if(result?.appendResponse?.appendResponse?.status==200 || result?.data?.status==200)
      {
        if (selectedReportData?.report_id && finalSelectedRoleData?.role_id) {
          dispatch(
            getLastUpdatedSheetTime({
              reportId: selectedReportData.report_id,
              roleId: finalSelectedRoleData.role_id,
            })
          );
      }
    }
    else{
      setErrorMessage(result.message);
    }
      // if(result.status ==500 || result.status ==400 || result.status==408)
      // {
      //   setErrorMessage(result.message); // Set error message if API returns an error
      // }
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong!"); // Handle unexpected errors
    }
    finally {
      setRequestId(null); // Reset the request ID
    }
  }


  const abortLongPolling = async () => {
    console.log("abort called")
    dispatch(setshowLoad(false));
    if (requestId) {
      let pushNotifuSubscription=localStorage.getItem("pushNotifuSubscription");
      try {

        await axios.post("https://excel-1-65tp.onrender.com/abort-request", { requestId,pushNotifuSubscription });
        setStatus("Request aborted.");
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    }
  };




  const handleConsent = () => {
    console.log("userData", userData.userId);
    const userId =localStorage.getItem("userId")
    let consentData = JSON.parse(localStorage.getItem("consent")) || {};
  
    if (consentData[userId]) {
      handelGenReport();
    } else {
      setShowConsentPopup(true);
    }
  };
  
  const handleConfirmConsent = (dontAskAgain) => {
    if (dontAskAgain) {
      const userId = localStorage.getItem("userId")
      let consentData = JSON.parse(localStorage.getItem("consent")) || {};
      consentData[userId] = true; // Store consent for this userId
  
      localStorage.setItem("consent", JSON.stringify(consentData));
    }
  
    setShowConsentPopup(false);
    handelGenReport();
  };
  


  // const handleStopImport = () => {
  //   dispatch(setshowLoad(false));
    
  // };

  useEffect(() => {
    if (selectedReportData?.report_id && finalSelectedRoleData?.role_id) {
      dispatch(
        getLastUpdatedSheetTime({
          reportId: selectedReportData.report_id,
          roleId: finalSelectedRoleData.role_id,
        })
      );
    }
  }, [selectedReportData?.report_id, finalSelectedRoleData?.role_id,finalSelectedReportLastUpdatedTime, dispatch]);



  // useEffect(() => {
  //   fetchLastUpdatedTimestamp(); // Call API when component mounts or dependencies change
  // }, [finalSelectedReportData?.report_id, selectedRoleData?.role_id]);
  

  return (
    <div className="p-0 m-0 relative flex flex-col justify-between flex-grow min-h-[65vh] gap-4 rounded-lg">

  {/* Error Popup */}
{errorMessage && ( <ErrorMsgDisplay errorMessage={errorMessage}  closeErrorPopup={()=>setErrorMessage("")}/>
)}
      {/* Overlay with dim effect */}
      {/* {showLoad && (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-20 backdrop-blur-[1px] z-10">
    <p className="text-gray-900 text-lg mb-4">Importing Data...</p>
    <button
      onClick={handleStopImport}
      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
    >
      Stop Import
    </button>
  </div>
)} */}

{showLoad && (  <StopImport handleStopImport = {abortLongPolling} />
)}


      <div className={`flex-grow overflow-auto ${showLoad ? "pointer-events-none" : ""}`}>
        {selectedReportData?.report_description && (
          <div className="mb-2 mt-2">
            <label htmlFor="Description" className="text-lg font-medium text-gray-600">
              Description
            </label>
            <p className="text-gray-900 mt-1">{selectedReportData.report_description}</p>
          </div>
        )}

        <div className="flex flex-col gap-2 mb - 1">
          <label htmlFor="startCell" className="text-lg font-medium text-gray-600">
            Start Cell
          </label>
          <input
            type="text"
            id="startCell"
            value={inputCell}
            onChange={handleInputChange}
            placeholder="e.g., A1, B2, Z99, AA12"
            className={`w-full mb-1 p-3 border rounded-md focus:outline-none ${
              isValidCell
                ? "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500"
                : "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500"
            }`}
          />
          {!isValidCell && (
            <p className="text-red-500 text-xs">Invalid cell format. Use format like "A1", "AAA1", etc.</p>
          )}
        </div>

        {finalSelectedReportLastUpdatedTime && (
          <div className="gap-2">
            <label className="text-lg font-medium text-gray-600">Last Updated:</label>
            <p className="text-gray-800">{`${finalSelectedReportLastUpdatedTime}`}</p>
          </div>
        )}
      </div>

      <div className="p-4 ">
        {selectedReportData?.report_name && (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <p className="text-gray-1000">
              {`Click on Refresh Data to import data in ${selectedReportData.report_name}`}
            </p>
          </div>
        )}
        

        {!showLoad && (
  <div className="flex justify-center">
    <button
      className="w-1/2 py-3 font-semibold rounded-md text-white 
                 bg-blue-600 hover:bg-blue-700 
                 disabled:bg-gray-400 disabled:cursor-not-allowed"
      onClick={handleConsent}
      disabled={!isValidCell}
    >
      {finalSelectedReportLastUpdatedTime ? "Refresh Data" : "Get Data"}
    </button>
  </div>
)}




{showConsentPopup && (
        <ConsentPopup
          onConfirm={handleConfirmConsent}
          onCancel={() => setShowConsentPopup(false)}
        />
      )}
      </div>
    </div>
  );
}

export default RolePageDataDisplayComp;

