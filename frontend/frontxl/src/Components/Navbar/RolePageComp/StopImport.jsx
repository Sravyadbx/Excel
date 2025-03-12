import React from 'react'

function StopImport({handleStopImport}) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end bg-white bg-opacity-20 backdrop-blur-[1px] z-10">
    
    <div className="mt-3 flex justify-center">
      <button
        onClick={()=>handleStopImport()}
        className="w-[50%] p-3 text-lg bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-900"
      >
        Stop Import
      </button>
    </div>
    <div className="mb-4"></div>
    <div className="w-full px-4 text-center">
      <div className="border border-black relative overflow-hidden rounded-md">
        
        <div className="bg-white p-2 text-gray-900 text-sm border border-gray-500">
          Importing data from Client_URL
        </div>
        <div className="absolute left-0 w-full h-[2px] bg-blue-600 animate-[moveBorder_1.5s_linear_infinite]"></div>
        <div className="bg-white p-2 text-gray-900 text-sm border border-gray-500">
          Generating the Report
        </div>
      </div>
    </div>
    <style>
      {`
        @keyframes moveBorder {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}
    </style>
  </div>
  )
}

export default StopImport