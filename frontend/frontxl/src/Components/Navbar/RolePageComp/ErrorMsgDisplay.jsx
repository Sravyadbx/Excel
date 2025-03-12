import React from 'react'

function ErrorMsgDisplay({errorMessage , closeErrorPopup}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
      {/* Error Icon and Title */}
      <div className="flex flex-col items-center">
        <svg
          className="w-12 h-12 text-red-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 14a1 1 0 110 2 1 1 0 010-2zm-.707-6.707a1 1 0 011.414 0l.003.003A1 1 0 0113 8v4a1 1 0 01-2 0V8a1 1 0 01.293-.707z"
            clipRule="evenodd"
          />
        </svg>
        <div className="text-gray-700 text-lg font-bold mt-2">Error</div>
      </div>

      {/* Error Message */}
      <p className="text-gray-700 mt-3">{errorMessage}</p>

      {/* OK Button */}
      <button
        onClick={closeErrorPopup}
        className="w-full mt-4 px-4 py-2 bg-red-700 text-white rounded-lg"
      >
        OK
      </button>
    </div>
  </div>
  )
}

export default ErrorMsgDisplay