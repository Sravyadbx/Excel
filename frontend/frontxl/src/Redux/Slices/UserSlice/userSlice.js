import { combineSlices, createSlice } from "@reduxjs/toolkit";
import {
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
} from "../../APIS/userApis/userApi";
import { AiOutlineConsoleSql } from "react-icons/ai";

// const makeLogout=()=>
// {
//     localStorage.
// }

const userSlice = createSlice({
  name: "user",

  initialState: {
    userData: {}, // no use right now
    // roles: [], // put all the roles
    reports:[],
    selectedReportData:{},
    selectedReportRolesData:{},
    finalSelectedRoleData :{},
    // selectedRoleData: {}, // selcted role data like report_id,report_name  selected form the drop down
    // selctedRoleReportsData: [], // all ther reports regrading to the particular role id
    finalSelectedReportData: {}, // final report id and name while making the generate pai calling
    startCell: "",
    tokens: {},
    listOfAllSpreadSheets: [""],
    finalSelectedReportLastUpdatedTime :"",
    showLoad: false, // to show the loading state while generating the report
    isImporting: false, // NEW: Track import state
    abortController: null,
  },


  

  reducers: {
    // setRoleData: (state, action) => {
    //   state.selectedRoleData = action.payload;
    // },
    setSelectedReportData:(state,action)=>
    {
      console.log(action.payload)
      state.selectedReportData = action.payload;
    },
    setFinalSelctedRoleData :(state,action)=>
    {
      // console.log(action?.payload);
      state.finalSelectedRoleData = action.payload;
    },

    // setSelectedRoleReportData: (state, action) => {
    //   state.selctedRoleReportsData = action.payload;
    // },

    // setFinalSelctedReportData: (state, action) => {
    //   state.finalSelectedReportData = action.payload;
    // },
    

    setStartCell: (state, action) => {
      state.startCell = action.payload;
    },
    setshowLoad:(state,action)=>
    {
      state.showLoad = false;
    },
    startImporting: (state, action) => {
      state.isImporting = true;
      state.abortController = action.payload; // Store AbortController instance
    },

    stopImporting: (state) => {
      if (state.abortController) {
        state.abortController.abort(); // Abort the API request
      }
      state.isImporting = false;
      state.abortController = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(validateAccessTokenApi.fulfilled, (state, action) => {

      console.log(action.payload);
      state.userData = action.payload?.message;
      console.log(state.userData)
    });

    // builder.addCase(validateAccessTokenApi.pending, (state, action) => {
    //   console.log(action)
    // });
    // builder.addCase(getAllPermissionRolesApi.fulfilled, (state, action) => {
    //   console.log(action.payload);
    //   // if (action.payload?.status === 200)
    //   // {
    //   //   state.roles = action.payload?.message;
    //   //   console.log(action.payload.message)
    //   // }
    //   if (action.payload?.status === 0)
    //     {
    //       state.roles = action.payload?.message;
    //       console.log(action.payload.message)
    //     }
    // });

    // builder.addCase(getAllReportForSelectedRole.fulfilled, (state, action) => {
    //   if (action.payload?.status === 200) {
    //     console.log(state.selectedRoleData.role_id);
    //     state.selctedRoleReportsData = action.payload?.message;
    //   }
    //   // else if(action.payload?.status === 401) makeLogout();
    // });
    builder.addCase(getAllReports.fulfilled, (state, action) => {
      console.log(action?.payload?.message)
      if (action.payload?.status === 200) {
        state.reports = action.payload?.message;
        // console.log(state.reports);
      }
      // else if(action.payload?.status === 401) makeLogout();
    });
    builder.addCase(getAllRolesForSelectedReport.fulfilled,(state,action)=>
    {
      console.log(action.payload);
      if (action.payload?.status === 200) {
        state.selectedReportRolesData = action?.payload?.data;
        console.log(state.selectedReportRolesData)
      }
    })
    


    builder.addCase(loginOauthApi.fulfilled, (state, action) => {
      console.log("auth url for redirection", action.payload);
      const authUrl = action?.payload?.data?.authUrl;

      if (authUrl) {
        window.location.href = authUrl;
      }
      // if (authUrl) {
      //   window.open(authUrl, "_blank", "width=500,height=600");
      // }
    });

    builder.addCase(callCallBackAp.fulfilled, (state, action) => {
      console.log(action?.payload)
      let tokens = action?.payload?.tokens;
      console.log("tokens----",tokens)
      if (tokens) {
        state.tokens = tokens;
        localStorage.setItem("tokens", JSON.stringify(tokens));
        prompt("tokens are set")
        // Ensure permission is granted
if (Notification.permission !== "granted") {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted!");
    }
  });
}

// Send notification
if (Notification.permission === "granted") {
  new Notification("Success", {
    body: "Tokens are set successfully!",
  });
}

        
      }

    });

    builder.addCase(handelCheckStatusApi.pending, (state, action) => {
      state.showLoad = true;
      console.log(action);
    });

    builder.addCase(handelCheckStatusApi.fulfilled, (state, action) => {
      console.log(
        "res of status",
        action?.payload?.appendResponse?.appendResponse?.data?.spreadsheetId
      );
      const spredId =
        action?.payload?.appendResponse?.appendResponse?.data?.spreadsheetId;
      state.showLoad = false;
      state.isImporting = false;

      if(spredId!==undefined)
      {
        
        //   state.dispatch(
        //     getLastUpdatedSheetTime({
        //       reportId: state.selectedReportData?.report_id,
        //       roleId: state.finalSelectedRoleData?.role_id,
        //     })
        //   );
        // }
        console.log(state.finalSelectedReportLastUpdatedTime);
      }

      // if (spredId !== undefined)
      // {
      //   console.log("sfogobdogodtootdhoho------------------------------",spredId)
        
      //   window.open(
      //     `https://docs.google.com/spreadsheets/d/${spredId}`,
      //     "_blank"
      //   );
      // }
    });
    builder.addCase(getLastUpdatedSheetTime.fulfilled, (state, action) => {
      console.log("sheet updated at---", action.payload);
      state.finalSelectedReportLastUpdatedTime = action.payload?.lastUpdatedAt;
    });
    builder.addCase(getAllSpreadSheetsApi.fulfilled, (state, action) => {
      console.log("all spredasheets api---", action.payload);
      state.listOfAllSpreadSheets = action.payload?.spreadsheets;
    });
  },
});

export const {
  // setRoleData,
  // setSelectedRoleReportData,
  setFinalSelctedReportData,
  setStartCell,
  setshowLoad,
  startImporting,
  stopImporting,
  setSelectedReportData,
  setFinalSelctedRoleData
} = userSlice.actions;

export default userSlice.reducer;





