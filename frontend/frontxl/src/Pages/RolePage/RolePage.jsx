
import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation  , useNavigate} from "react-router-dom";
import {
  getAllPermissionRolesApi,
  getAllReportForSelectedRole,
  callCallBackAp,
  getAllReports,
  getAllRolesForSelectedReport
} from "../../Redux/APIS/userApis/userApi";
import {
  setRoleData,
  setStartCell,
  setFinalSelctedReportData,
  setFinalSelctedRoleData,
  setSelectedReportData

} from "../../Redux/Slices/UserSlice/userSlice";
import ShowRoles from "../../Components/Navbar/RolePageComp/ShowRoles";
import RolePageDataDisplayComp from "../../Components/Navbar/RolePageComp/RolePageDataDisplayComp";
import Loading from "../../Components/Loading/Loading";

import {requestNotificationPermission} from "../../Supportrs/webPushSupport";
function RolePage() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { reports , selectedReportData, selectedReportRolesData, selectedRoleData,  finalSelectedReportData , finalSelectedRoleData , userData , showLoad } = useSelector((state) => state.user);
  const [showNoReportAvailable, setShowNoReportAvailable] = useState(false);
  const [showNoRolesAvailable, setShowNoRolesAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("IsAdmin");
    // if(userData.isAdmin)
    if(isAdmin)
    {
      const role_id="";
      const role_label="Admin";
      dispatch(setFinalSelctedRoleData({role_id,role_label}));
    }
    const token = localStorage.getItem("accessToken");
    console.log("token",token)
    // dispatch(getAllPermissionRolesApi(token)).finally(() => setLoading(false));
    dispatch(getAllReports(token)).finally(()=>setLoading(false));
  }, []);

  // const handleSelectionReport = (e) => {
  //   dispatch(setSelectedReportData({}));
  //   const report_id = e.target.value;
  //   const report_name = e.target.selectedOptions[0].text;
  //   dispatch(setSelectedReportData({report_id , report_name}));
  //   // setShowNoReportAvailable(false);
  //   console.log(selectedReportData)
  //   setShowNoRolesAvailable(false)
  //   dispatch(setStartCell(""));
  //   // dispatch(setFinalSelctedReportData(null));
  // };

  const handleSelectionReport = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
  
    if (selectedOption.value === "") return; // Prevent selecting the placeholder option
  
    const data = JSON.parse(selectedOption.getAttribute("data-all")); // Get full report object
  
    dispatch(setSelectedReportData(data)); // Store entire report object
    setShowNoRolesAvailable(false);
    dispatch(setStartCell(""));
  };
  
  useEffect(() => {
   console.log(selectedReportData)
   const isAdmin = localStorage.getItem("isAdmin");
    // if (!userData.isAdmin && selectedReportData?.report_id)
    if (!isAdmin && selectedReportData?.report_id)
       {
      console.log(selectedReportData);
      dispatch(getAllRolesForSelectedReport(selectedReportData)).then((val) => {
        setShowNoRolesAvailable(val?.payload?.data?.length === 0);
      });
    }
  }, [selectedReportData.report_id]);

  useEffect(() => {
    const pathName = location.search;
    let tokens = localStorage.getItem("tokens");
    const code = pathName.split("=")[1];
    console.log(code , window.location.href);
    // if (code && !tokens) dispatch(callCallBackAp(code));
    if (code && !tokens)
    {
      dispatch(callCallBackAp(code));
      // navigate('rolepage');
    }
  }, [window.location.href]);

  return (
//     <div className="pt-[80px] flex justify-center  min-h-screen overflow-auto bg-gray-100 p-4 relative">
//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl min-h-[80vh] flex flex-col">
//         <div className="flex flex-col min-h-[100vh] space-y-4 min-h-[70vh] flex-growpb-20 h-full overflow-auto">
//         {showLoad && (
//   <div className="absolute inset-0 flex flex-col justify-end bg-white bg-opacity-20 backdrop-blur-[1px] z-10">
    
//   </div>
// )}

//           {loading ? (
//             <Loading />
//           ) : roles.length > 0 ? (
//             <div>
//               <label htmlFor="selectRole" 
//                 className ="text-lg font-medium text-gray-600"
//               >
//                 Select Role
//               </label>
//               <select
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white mt-2 mb-3"
//                 onChange={handleSelectionRole}
//                 defaultValue=""
//               >
//                 <option value="" disabled>
//                   Select role
//                 </option>
//                 {roles.map((ele, index) => (
//                   <option key={index} value={ele.role_id}>
//                     {ele.role_label}
//                   </option>
//                 ))}
//               </select>
              
//               {selectedRoleData?.role_id && (
//                 <>
//                   {selctedRoleReportsData.length > 0 ? (
//                     <ShowReports Reports={selctedRoleReportsData} />
//                   ) : (
//                     showNoReportAvailable && <div className="text-red-600 mt-2">No Reports Available</div>
//                   )}
//                 </>
//               )}

//               {selectedRoleData?.role_id && finalSelectedReportData?.report_id && (
//                 <RolePageDataDisplayComp  userData={userData}/>
//               )}
//             </div>
//           ) : (
//             <div className="text-red-600 text-center text-lg font-semibold">No Roles Assigned</div>
//           )}
//         </div>
      

//       <div>
//         {/* list all the spreadsheets */}

//         {/* {
//           selectedRoleData.role_id &&
//           <button
//             className={`py-2 px-4 text-white font-semibold rounded-md transition  bg-blue-600 `}
//             onClick={() => {
//               navigate("/spreadsheets");
//             }}
//           >
//             See All SpreadSheets
//           </button>
//         } */}


        
//       </div>
//     </div>
//     </div>

    <div className="pt-[80px] flex justify-center  min-h-screen overflow-auto bg-gray-100 p-4 relative">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl min-h-[80vh] flex flex-col">
        <div className="flex flex-col min-h-[100vh] space-y-4 min-h-[70vh] flex-growpb-20 h-full overflow-auto">
        {showLoad && (
  <div className="absolute inset-0 flex flex-col justify-end bg-white bg-opacity-20 backdrop-blur-[1px] z-10">
    
  </div>
)}

          {loading ? (
            <Loading />
          ) : reports.length > 0 ? (
            <div>
              <label htmlFor="selectReport" 
                className ="text-lg font-medium text-gray-600"
              >
                Select Report
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white mt-2 mb-3"
                onChange={handleSelectionReport}
                defaultValue=""
              >
                <option value="" disabled>
                  Select report
                </option>
                {reports.map((report, index) => (
                  // <option key={index} value={ele.report_id}>
                  //   {ele.report_name}
                  // </option>
                  <option
              key={report.report_id+ index}
              data-all={JSON.stringify(report)}
              value={report.report_id}
              className="p-2 hover:bg-blue-100"
            >
              {report.report_name}
            </option>
                ))}
              </select>
              { selectedReportRolesData?.length>0 && (
  <>
    {Object.keys(selectedReportData).length > 0 ? (
      <ShowRoles Roles={selectedReportRolesData} />
    ) : (
      showNoRolesAvailable && <div className="text-red-600 mt-2">No Roles Available</div>
    )}
  </>
)}


              {selectedReportData?.report_id &&  (localStorage.getItem("isAdmin") || finalSelectedRoleData?.role_id) && (
                <RolePageDataDisplayComp  userData={userData}/>
              )}
            </div>
          ) : (
            <div className="text-red-600 text-center text-lg font-semibold">No Reports Available</div>
          )}
        </div>
      

      <div>
       


        
      </div>
    </div>
    </div>



  );
}

export default RolePage;