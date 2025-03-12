// import React, { useEffect } from "react";
// import {
//   getAllSpreadSheetsApi,
//   getAllPermissionRolesApi,
// } from "../../Redux/APIS/userApis/userApi";
// import { setRoleData } from "../../Redux/Slices/UserSlice/userSlice";
// import { useSelector, useDispatch } from "react-redux";

// const Spreadsheet = () => {
 

//   // Redux state and dispatch logic
//   const { selectedRoleData, listOfAllSpreadSheets, roles } = useSelector(
//     (state) => state.user
//   );
//   const dispatch = useDispatch();

//   const role_id = selectedRoleData?.role_id;

//   useEffect(() => {
//     if (role_id) dispatch(getAllSpreadSheetsApi(role_id));
//     else {
//       dispatch(getAllPermissionRolesApi());
//     }
//   }, [role_id]);

//   const handleSelection = (e) => {
//     const selectedSheetId = e.target.value;
//     if (selectedSheetId) {
//       window.open(
//         `https://docs.google.com/spreadsheets/d/${selectedSheetId}`,
//         "_blank"
//       );
//     }
//   };

//   const handleSelectionRole = (e) => {
//     const role_id = e.target.value;
//     const role_label = e.target.selectedOptions[0].text;
//     dispatch(setRoleData({ role_id, role_label }));
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       {!role_id && (
//         <div>
//           <label
//             htmlFor="selectRole"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Select Role
//           </label>
//           <select
//             id="selectRole"
//             name="role"
//             className="w-full px-4 py-2 mt-1 border rounded-md focus:border-blue-500"
//             onChange={handleSelectionRole}
//             defaultValue=""
//           >
//             <option value="" disabled>
//               select role
//             </option>
//             {roles.map((ele, index) => (
//               <option key={index} value={ele.role_id}>
//                 {ele.role_label}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       <h2 className="text-lg font-semibold mb-2">Select a Spreadsheet</h2>

//       {listOfAllSpreadSheets?.length > 0 ? (
//         <select
//           onChange={handleSelection}
//           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           defaultValue=""
//         >
//           <option value="" disabled>
//             Choose a spreadsheet...
//           </option>

//           {listOfAllSpreadSheets.length > 0 &&
//             listOfAllSpreadSheets.map((file, index) => (
//               <option key={file + index} value={file?.spreadSheetId}>
//                 {file.fileName}
//               </option>
//             ))}
//         </select>
//       ) : (
//         <p>No spreadsheets available.</p>
//       )}
//     </div>
//   );
// };

// export default Spreadsheet;
