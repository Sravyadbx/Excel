import React, { useState } from "react";

const ConsentPopup = ({ onConfirm, onCancel }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white  p-6 rounded-lg shadow-lg text-center w-96">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900">Replace Data?</h2>
        <p className="text-gray-600 mt-2">
          Data to the right of the Start Cell and below will be replaced.
          Are you sure you want to continue?
        </p>

        {/* Checkbox: "Do not ask me again" */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <input
            type="checkbox"
            id="dontAskAgain"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="w-5 h-5"
          />
          <label htmlFor="dontAskAgain" className="text-gray-700 cursor-pointer">
            Do not ask me again.
          </label>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => onConfirm(isChecked)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Continue
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentPopup;
