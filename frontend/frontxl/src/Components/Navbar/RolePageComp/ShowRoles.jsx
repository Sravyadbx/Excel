
// import { useDispatch } from "react-redux";
// import { setFinalSelctedReportData } from "../../../Redux/Slices/UserSlice/userSlice";

// function ShowReports({ Roles }) {
//   console.log(Roles)
//   const dispatch = useDispatch();

//   const setRole = (event) => {
//     const selectedIndex = event.target.selectedIndex;
//     const selectedOption = event.target.options[selectedIndex];

//     if (selectedOption.value === "") return; // Prevents selecting the placeholder

//     const data = JSON.parse(selectedOption.getAttribute("data-all"));
//     dispatch(setFinalSelctedReportData(data));
//   };

//   return (
    
//     <div className="w-full">
//       {console.log(Roles)}
//       <label htmlFor="selectRole" 
//       className ="text-lg font-medium text-gray-700"
//       >
//         Select Role
//       </label>
//       <select
//         name="Roles"
//         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white mt-2"
//         onChange={setRole}
//         defaultValue=""
//       >
//         <option value="" disabled className="text-gray-500">
//           Select a role
//         </option>
//         {/* {Roles.map((role, index) => (
//           <option
//             key={role.role_id + index}
//             data-all={JSON.stringify(role)}
//             value={role.role_id}
//             className="p-2 hover:bg-blue-100"
//           >
//             {role.role_label}
//           </option>
//         ))} */}
//       </select>
//       {/* <div className="w-full mt-3">
//             <div className="text-right">
//               <a
//                 href="#"
//                 className="text-blue-600 text-sm font-semibold hover:underline"
//               >
//                 Edit Role
//               </a>
//             </div>
//           </div> */}
//     </div>
   
//   );
// }

// export default ShowReports;



import { useDispatch } from "react-redux";
import { setFinalSelctedReportData  , setFinalSelctedRoleData} from "../../../Redux/Slices/UserSlice/userSlice";

function ShowReports({Roles}) {
  const dispatch = useDispatch();

  const setRole = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];

    if (selectedOption.value === "") return; // Prevents selecting the placeholder

    const data = JSON.parse(selectedOption.getAttribute("data-all"));
    // dispatch(setFinalSelctedReportData(data));
    dispatch(setFinalSelctedRoleData(data));
  };

  return (
    <div className="w-full">
      <label htmlFor="selectRole" className="text-lg font-medium text-gray-700">
        Select Role
      </label>
      <select
        name="Roles"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white mt-2"
        onChange={setRole}
        defaultValue=""
      >
        <option value="" disabled className="text-gray-500">
          Select a role
        </option>
        {Roles &&
          Roles.map((role, index) => (
            <option
              key={role.role_id + index}
              data-all={JSON.stringify(role)}
              value={role.role_id}
              className="p-2 hover:bg-blue-100"
            >
              {role.role_label}
            </option>
          ))}
      </select>
    </div>
  );
}

export default ShowReports;
