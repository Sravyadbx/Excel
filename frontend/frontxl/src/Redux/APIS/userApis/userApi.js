import { createAsyncThunk } from "@reduxjs/toolkit";

const validateAccessTokenApi = createAsyncThunk(
  "validateAccessTokenApi",
  async (token) => {
    try {
      const response = await fetch(
        `https://reports.qa.darwinbox.io/ms/reportapi/validateAccessToken`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addInToken: token,
          }),
        }
      );

      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
);

// const getAllPermissionRolesApi = createAsyncThunk(
//   "getAllPermissionRolesApi",
//   async (token) => {
//     try {
//       // token =
//       //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMDQwMzAiLCJ0ZW5hbnRJZCI6IjczIiwiaWF0IjoxNzM4MDY1NDM0LCJleHAiOjE3NDU4NDE0MzR9.sP3riRyRp1MEJGmmqxnnt12WqpyVIfCb7C19C32n4C8";
//       token = localStorage.getItem("accessToken")
//           if(!token) return;

//       const response = await fetch(
//         `https://reports.qa.darwinbox.io/ms/reportapi/get_permission_roles`,
//         {
//           method: "post",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             addInToken: token,
//           }),
//         }
//       );

//       return response.json();
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// const getAllReportForSelectedRole = createAsyncThunk(
//   "getAllReportForSelectedRole",
//   async (data) => {
//     try {
//       // let token =
//       //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMDQwMzAiLCJ0ZW5hbnRJZCI6IjczIiwiaWF0IjoxNzM4MDY1NDM0LCJleHAiOjE3NDU4NDE0MzR9.sP3riRyRp1MEJGmmqxnnt12WqpyVIfCb7C19C32n4C8";
//       let token = localStorage.getItem("accessToken")
//           if(!data.role_id)return;


//       const response = await fetch(
//         `https://reports.qa.darwinbox.io/ms/reportapi/allReports`,
//         {
//           method: "post",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             addInToken: token,
//             viewAs: {
//               role_id: data.role_id,
//               role_label: data.role_label,
//             },
//           }),
//         }
//       );

//       return response.json();
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const getAllReports= createAsyncThunk(
  "getAllReports",
  async (data) => {
    try {
      // let token =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMDQwMzAiLCJ0ZW5hbnRJZCI6IjczIiwiaWF0IjoxNzM4MDY1NDM0LCJleHAiOjE3NDU4NDE0MzR9.sP3riRyRp1MEJGmmqxnnt12WqpyVIfCb7C19C32n4C8";
      let token = localStorage.getItem("accessToken")


      const response = await fetch(
        `https://reports.qa.darwinbox.io/ms/reportapi/allReports`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addInToken: token,
          }),
        }
      );

      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
);


const getAllRolesForSelectedReport= createAsyncThunk(
  "getAllRolesForSelectedReport",
  async (data) => {
    try {
      // let token =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMDQwMzAiLCJ0ZW5hbnRJZCI6IjczIiwiaWF0IjoxNzM4MDY1NDM0LCJleHAiOjE3NDU4NDE0MzR9.sP3riRyRp1MEJGmmqxnnt12WqpyVIfCb7C19C32n4C8";
      let token = localStorage.getItem("accessToken")
      if(!data.report_id)return;


      const response = await fetch(
        `https://reports.qa.darwinbox.io/ms/reportapi/rolesForReports`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addInToken: token,
            report_id: data.report_id,
          }),
        }
      );

      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
);



const loginOauthApi = createAsyncThunk("loginOauthApi", async (data) => {
  try {
    // let token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMDQwMzAiLCJ0ZW5hbnRJZCI6IjczIiwiaWF0IjoxNzM4MDY1NDM0LCJleHAiOjE3NDU4NDE0MzR9.sP3riRyRp1MEJGmmqxnnt12WqpyVIfCb7C19C32n4C8";

    const response = await fetch(`http://localhost:8080/loginUserToOAuth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
});



const callCallBackAp = createAsyncThunk("callCallBackAp", async (code) => {
  try {
    // let token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMDQwMzAiLCJ0ZW5hbnRJZCI6IjczIiwiaWF0IjoxNzM4MDY1NDM0LCJleHAiOjE3NDU4NDE0MzR9.sP3riRyRp1MEJGmmqxnnt12WqpyVIfCb7C19C32n4C8";

    const response = await fetch(
      `http://localhost:8080/auth/callback?code=${code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
});

// const handelCheckStatusApi = createAsyncThunk(
//   "handelCheckStatusApi",
//   async (data) => {
//     console.log("status" , data);
//     try {
//       // let token =
//       //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMDQwMzAiLCJ0ZW5hbnRJZCI6IjczIiwiaWF0IjoxNzM4MDY1NDM0LCJleHAiOjE3NDU4NDE0MzR9.sP3riRyRp1MEJGmmqxnnt12WqpyVIfCb7C19C32n4C8";
//       let token = localStorage.getItem("accessToken");
//       const range = data.startCell;

//       let pushNotifuSubscription=localStorage.getItem("pushNotifuSubscription");


//       console.log("subscription at front--",pushNotifuSubscription)
//       const { report_id } = data?.selectedReportData;
//       const {role_id}=data;

   

//       const tokens = localStorage.getItem("tokens");

//       if (!report_id ) return;

//       const response = await fetch(`http://localhost:8080/checkReportStatus`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           addInToken: token,
//           report_id,
//           tokens,
//           range,
//           role_id,
//           pushNotifuSubscription
//         }),
//       });
//       // console.log(response.json());
//       return response.json();
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const handelCheckStatusApi = createAsyncThunk(
  "handelCheckStatusApi",
  async (data) => {
    console.log("status" , data);
    try {
      // let token =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMDQwMzAiLCJ0ZW5hbnRJZCI6IjczIiwiaWF0IjoxNzM4MDY1NDM0LCJleHAiOjE3NDU4NDE0MzR9.sP3riRyRp1MEJGmmqxnnt12WqpyVIfCb7C19C32n4C8";
      let token = localStorage.getItem("accessToken");
      const range = data.startCell;

      let pushNotifuSubscription=localStorage.getItem("pushNotifuSubscription");


      console.log("subscription at front--",pushNotifuSubscription)
      const { report_id } = data?.selectedReportData;
      const {role_id}=data;
      const {requestId} = data;
    

   

      const tokens = localStorage.getItem("tokens");

      if (!report_id ) return;

      const response = await fetch(`http://localhost:8080/checkReportStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addInToken: token,
          report_id,
          tokens,
          range,
          role_id,
          requestId,
          pushNotifuSubscription
        }),
      });
      // console.log(response.json());
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
);

const getAllSpreadSheetsApi=createAsyncThunk(
  "getAllSpreadSheetsApi",
  async (data) => {

    try {

  
      const response = await fetch(`http://localhost:8080/getAllSpreadSheets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roleId:data
        }),
      });

      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
);


const getLastUpdatedSheetTime=createAsyncThunk(
  "getLastUpdatedSheetTime",
  async (data) => {
    try {
      const response = await fetch(`http://localhost:8080/gsheetLastUpdated`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roleId: data.roleId,
          reportId: data.reportId,
        }),
      });

      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
);

export {
  validateAccessTokenApi,
  // getAllPermissionRolesApi,
  // getAllReportForSelectedRole,
  loginOauthApi,
  callCallBackAp,
  handelCheckStatusApi,
  getAllSpreadSheetsApi,
  getLastUpdatedSheetTime,
  getAllReports,
  getAllRolesForSelectedReport
};





// export const handelCheckStatusApi = createAsyncThunk(
//   "user/handelCheckStatusApi",
//   async ({ finalSelectedReportData, startCell, role_id, signal }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "https://your-api-url.com/generate-report",
//         {
//           reportData: finalSelectedReportData,
//           startCell,
//           role_id,
//         },
//         { signal } // Pass AbortController.signal
//       );

//       return response.data;
//     } catch (error) {
//       if (axios.isCancel(error)) {
//         console.log("API call aborted");
//         return rejectWithValue("Request cancelled");
//       }
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
