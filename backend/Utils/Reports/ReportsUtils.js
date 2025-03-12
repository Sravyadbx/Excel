import fetch from "node-fetch";


const CallGenReportApi = async (payload) => {
  try {

     const {  addInToken ,id} =payload;
    
          const response=await fetch(`https://reports.qa.darwinbox.io/ms/reportapi/reports/generate/${id}`,{
            method:"POST",
            headers:{
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                addInToken
            })
          })
    
          const data=await response.json();
    
         return data;
  

  } catch (error) {
    return new Error(error);
  }
};

const CallStatusApi = async (payload) => {
  try {
    const { addInToken, report_id } = payload;

    let data =await fetch(
      `https://reports.qa.darwinbox.io/ms/reportapi/reports/statuses`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addInToken,
          report_id,
        }),
      }
    );

    return await data.json();
  } catch (error) {
    return new Error(error);
  }
};


const CallDownUrl=async(payload)=>{
  try {

     const {report_id,addInToken}=payload;

     const response=await fetch(`https://reports.qa.darwinbox.io/ms/reportapi/getDownloadUrl`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addInToken,
        report_id,
      }),
    });

    const data=await response.json();
      
    return data;
  
    
  } catch (error) {
    return new Error(error);
  }
}

export { CallStatusApi, CallGenReportApi ,CallDownUrl};
