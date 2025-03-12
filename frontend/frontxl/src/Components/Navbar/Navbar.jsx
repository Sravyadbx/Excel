

// import React, { useEffect, useState } from "react";
// import { AiOutlineMore } from "react-icons/ai";
// import { IoLogOutOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";

// function Navbar({ navbarTitle }) {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [token, setToken] = useState(localStorage.getItem("tokens"));

//   useEffect(() => {
//     const storedToken = localStorage.getItem("accessToken");
//     setToken(storedToken);
//     if (!storedToken) setOpen(false);
//   }, []);

//   const handleOpen = () => {
//     if (token) setOpen(!open);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("tokens");
//     setOpen(false);
//     navigate("/");
//   };

//   return (
//     <div className="w-full p-5 border-2 bg-blue-500 relative z-50">
//       <div className="flex justify-start items-center">
//         <AiOutlineMore
//           className="w-[5%] mr-5 text-white cursor-pointer"
//           onClick={handleOpen}
//         />
//         <h1 className="text-lg font-semibold w-[95%] text-center text-white">
//           {navbarTitle}
//         </h1>
//       </div>

//       {open && (
//         <div className="absolute top-[85%] left-10 w-24 border bg-white shadow-lg rounded-md p-2 flex justify-center items-center gap-2 cursor-pointer z-50"
//           onClick={handleLogout}
//         >
//           <IoLogOutOutline />
//           <h3>Logout</h3>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;




import React, { useEffect, useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Navbar({ navbarTitle }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("tokens"));

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
    if (!storedToken) setOpen(false);
  }, []);

  const handleOpen = () => {
    if (token) setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("consent");
    localStorage.removeItem("userId")
    localStorage.removeItem("isAdmin");
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full p-5 border-2 bg-blue-500 z-50">
      <div className="flex justify-start items-center">
        <AiOutlineMore
          className="w-[5%] mr-5 text-white cursor-pointer"
          onClick={handleOpen}
        />
        <h1 className="text-lg font-semibold w-[95%] text-center text-white">
          {navbarTitle}
        </h1>
      </div>

      {open && (
        <div className="absolute top-[85%] left-10 w-24 border bg-white shadow-lg rounded-md p-2 flex justify-center items-center gap-2 cursor-pointer z-50"
          onClick={handleLogout}
        >
          <IoLogOutOutline />
          <h3>Logout</h3>
        </div>
      )}
    </div>
  );
}

export default Navbar;
