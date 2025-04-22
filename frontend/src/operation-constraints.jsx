
// "use client"
// import React, { useEffect, useState ,useRef} from "react";
// import { useNavigate } from "react-router-dom";
// import { FaPen } from 'react-icons/fa';  // Correct way to import FaPen


// import io from "socket.io-client"; // Import socket.io-client

// const OperatingConstraints = () => {
//   const [data, setData] = useState([]);  // State to store the data
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [editValues, setEditValues] = useState({ UB: "", LB: "" });
//   const navigate = useNavigate();
//   const socketRef = useRef(null); 
//   useEffect(() => {
//     socketRef.current = io('http://localhost:5000', {
//       transports: ['websocket'],
//     });


// const initialData = [
//   { id: 1, parameter: "C", type: "Hard", basis: "ARB", UB: 100.0, LB: 40.0 },
//   { id: 2, parameter: "H", type: "Hard", basis: "ARB", UB: 100.0, LB: 3.0 },
//   { id: 3, parameter: "N", type: "Hard", basis: "ARB", UB: 2.5, LB: 0.0 },
//   { id: 4, parameter: "O", type: "Hard", basis: "ARB", UB: 40.0, LB: 0.0 },
//   { id: 5, parameter: "HGI", type: "Hard", basis: "ARB", UB: 80.0, LB: 45.0 },
//   { id: 6, parameter: "IDT", type: "Hard", basis: "ARB", UB: 100000000000.0, LB: 1100.0 },
//   { id: 7, parameter: "TM", type: "Hard", basis: "ARB", UB: 45.0, LB: 0.0 },
//   { id: 8, parameter: "IM", type: "Hard", basis: "ARB", UB: 45.0, LB: 0.0 },
//   { id: 9, parameter: "Ash", type: "Hard", basis: "ARB", UB: 25.0, LB: 0.0 },
//   { id: 10, parameter: "VM", type: "Hard", basis: "ARB", UB: 45.0, LB: 18.0 },
//   { id: 11, parameter: "FC", type: "Hard", basis: "ARB", UB: 58.2, LB: 4.25 },
//   { id: 12, parameter: "GCV", type: "Hard", basis: "ARB", UB: 6615.0, LB: 4150.0 },
//   { id: 13, parameter: "Sulphur", type: "Hard", basis: "ARB", UB: 1.0, LB: 0.0 },
//   { id: 14, parameter: "SiO2", type: "Hard", basis: "ARB", UB: 70.0, LB: 0.0 },
//   { id: 15, parameter: "Base-acid ratio", type: "Hard", basis: "ARB", UB: 0.7, LB: 0.4 },
//   { id: 16, parameter: "Slagging Factor", type: "Hard", basis: "ARB", UB: 2.0, LB: 0.0 },
//   { id: 17, parameter: "Slagging Index", type: "Hard", basis: "ARB", UB: 10000000000.0, LB: 1125.0 },
//   { id: 18, parameter: "SO3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 19, parameter: "Al2O3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 20, parameter: "Fe2O3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 21, parameter: "CaO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 22, parameter: "MgO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 23, parameter: "K2O", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 24, parameter: "TiO2", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 25, parameter: "P2O5", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 26, parameter: "HDT", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 27, parameter: "SDT", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 28, parameter: "Ash Fusion", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 29, parameter: "T2O5 Temperature", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 30, parameter: "Iron Calcium Ratio", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 31, parameter: "Iron Plus Calcium", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 32, parameter: "Silica Per", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 33, parameter: "Base", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 34, parameter: "Acid", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 35, parameter: "M Mineral", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 36, parameter: "C Mineral", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 37, parameter: "SiO2 Plus Al2O3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 38, parameter: "Net Calorific VAlue", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 39, parameter: "Mn3O4", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 40, parameter: "BaO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 41, parameter: "ZnO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 42, parameter: "SrO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 43, parameter: "Mercury", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 44, parameter: "Arsenic", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 45, parameter: "Fluorine", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 46, parameter: "Phosphorus", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 47, parameter: "Chlorine", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 48, parameter: "Boron", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 49, parameter: "Total Reactives", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 50, parameter: "Total Inerts", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 51, parameter: "Vitrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 52, parameter: "Semi Vitrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 53, parameter: "Oxivitrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 54, parameter: "Liptinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 55, parameter: "Macrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 56, parameter: "Micrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 57, parameter: "Fusinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 58, parameter: "Semi Fusinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 59, parameter: "Mineral Matter", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 60, parameter: "Mean Maximum Reflectance", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
// ]

// setData(initialData);

//     // Listen for data from the server
//     socketRef.current.on("initialData", (data) => {
//       setData(data);
//     });

//     socketRef.current.on("updateConstraints", (updatedData) => {
//       setData(updatedData);
//     });

//     return () => {
//       socketRef.current.disconnect(); // Disconnect on unmount
//     };
//   }, []); // Only run once

//   const handleEditClick = (row) => {
//     setSelectedRow(row);
//     setEditValues({ UB: row.UB.toFixed(2), LB: row.LB.toFixed(2) });
//   };

//   const handleSave = () => {
//     const updated = {
//       ...selectedRow,
//       UB: parseFloat(editValues.UB),
//       LB: parseFloat(editValues.LB),
//     };

//     fetch(`/api/constraints/${selectedRow.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updated),
//     })
//       .then(() => {
//         socketRef.current.emit("updateConstraints", updated);
//       })
//       .catch((err) => console.error("Update error:", err));

//     setSelectedRow(null);
//   };

//   const handleTypeChange = (id, newType) => {
//     const row = data.find((item) => item.id === id);
//     const updated = { ...row, type: newType };

//     fetch(`/api/constraints/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updated),
//     })
//       .then(() => {
//         socketRef.current.emit("updateConstraints", updated);
//       })
//       .catch((err) => console.error("Type update error:", err));
//   };

// return (
//   <div className="constraints-container">
//     <h2 className="constraints-title">Operating Constraints</h2>
//     <button onClick={() => navigate("/coal")} className="nav-button">
//       Coal Analysis
//     </button>
//     <button onClick={() => navigate("/Logistics")} className="nav-button">
//       Logistics
//     </button>

//     <div className="constraints-table-container">
//       <table className="constraints-table">
//         <thead>
//           <tr>
//             <th>Parameter</th>
//             <th>Type</th>
//             <th>Basis</th>
//             <th>UB</th>
//             <th>LB</th>
//             <th>Edit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row) => (
//             <tr key={row.id}>
//               <td>{row.parameter}</td>
//               <td>
//                 <select
//                   className="constraints-select"
//                   value={row.type}
//                   onChange={(e) => handleTypeChange(row.id, e.target.value)}
//                 >
//                   <option value="Hard">Hard</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Soft">Soft</option>
//                 </select>
//               </td>
//               <td>{row.basis}</td>
//               <td>{Number(row.UB).toFixed(2)}</td>
//               <td>{Number(row.LB).toFixed(2)}</td>
//               <td>
//                 <button className="edit-button" onClick={() => handleEditClick(row)}>
//                   <FaPen className="pencil-icon" />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>

//     {/* Edit Modal */}
//     {selectedRow && (
//       <div className="modal-overlay" onClick={() => setSelectedRow(null)}>
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <div className="modal-header">
//             <h3 className="modal-title">Edit Constraints for {selectedRow.parameter}</h3>
//           </div>
//           <div className="modal-body">
//             <div className="form-group">
//               <label className="form-label">UB</label>
//               <input
//                 type="number"
//                 value={editValues.UB}
//                 onChange={(e) =>
//                   setEditValues({ ...editValues, UB: e.target.value })
//                 }
//                 className="form-input"
//               />
//             </div>
//             <div className="form-group">
//               <label className="form-label">LB</label>
//               <input
//                 type="number"
//                 value={editValues.LB}
//                 onChange={(e) =>
//                   setEditValues({ ...editValues, LB: e.target.value })
//                 }
//                 className="form-input"
//               />
//             </div>
//             <div className="modal-actions">
//               <button className="cancel-button" onClick={() => setSelectedRow(null)}>
//                 Cancel
//               </button>
//               <button className="save-button" onClick={handleSave}>
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
// );
// };

// export default OperatingConstraints;




"use client";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { io } from "socket.io-client";

const OperatingConstraints = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editValues, setEditValues] = useState({ UB: "", LB: "" });
  const navigate = useNavigate();
  const socketRef = useRef(null);

  // useEffect(() => {
  //   // Connect to WebSocket
  //   socketRef.current = new WebSocket("wss://localhost:8000/ws/constraints/");

  //   socketRef.current.onopen = () => {
  //     console.log("WebSocket connected ✅");
  //   };

  //   socketRef.current.onmessage = (event) => {
  //     const message = JSON.parse(event.data);
  //     if (message.type === "initial_data") {
  //       // Avoid re-setting data if already loaded
  //       if (data.length === 0) {
  //         setData(message.data);
  //       }
  //     } else if (message.type === "update_constraints") {
  //       // Update existing data with incoming updates
  //       setData((prevData) =>
  //         prevData.map((item) =>
  //           item.id === message.data.id ? message.data : item
  //         )
  //       );
  //     }
  //   };

  //   socketRef.current.onerror = (error) => {
  //     console.error("WebSocket error ❌", error);
  //   };

  //   socketRef.current.onclose = () => {
  //     console.log("WebSocket disconnected 🚫");
  //   };
  //   // Load initial data (if WebSocket server doesn't send it by default)
  //   const initialData = [
  //       { id: 1, parameter: "C", type: "Hard", basis: "ARB", UB: 100.0, LB: 40.0 },
  //       { id: 2, parameter: "H", type: "Hard", basis: "ARB", UB: 100.0, LB: 3.0 },
  //       { id: 3, parameter: "N", type: "Hard", basis: "ARB", UB: 2.5, LB: 0.0 },
  //       { id: 4, parameter: "O", type: "Hard", basis: "ARB", UB: 40.0, LB: 0.0 },
  //       { id: 5, parameter: "HGI", type: "Hard", basis: "ARB", UB: 80.0, LB: 45.0 },
  //       { id: 6, parameter: "IDT", type: "Hard", basis: "ARB", UB: 100000000000.0, LB: 1100.0 },
  //       { id: 7, parameter: "TM", type: "Hard", basis: "ARB", UB: 45.0, LB: 0.0 },
  //       { id: 8, parameter: "IM", type: "Hard", basis: "ARB", UB: 45.0, LB: 0.0 },
  //       { id: 9, parameter: "Ash", type: "Hard", basis: "ARB", UB: 25.0, LB: 0.0 },
  //       { id: 10, parameter: "VM", type: "Hard", basis: "ARB", UB: 45.0, LB: 18.0 },
  //       { id: 11, parameter: "FC", type: "Hard", basis: "ARB", UB: 58.2, LB: 4.25 },
  //       { id: 12, parameter: "GCV", type: "Hard", basis: "ARB", UB: 6615.0, LB: 4150.0 },
  //       { id: 13, parameter: "Sulphur", type: "Hard", basis: "ARB", UB: 1.0, LB: 0.0 },
  //       { id: 14, parameter: "SiO2", type: "Hard", basis: "ARB", UB: 70.0, LB: 0.0 },
  //       { id: 15, parameter: "Base-acid ratio", type: "Hard", basis: "ARB", UB: 0.7, LB: 0.4 },
  //       { id: 16, parameter: "Slagging Factor", type: "Hard", basis: "ARB", UB: 2.0, LB: 0.0 },
  //       { id: 17, parameter: "Slagging Index", type: "Hard", basis: "ARB", UB: 10000000000.0, LB: 1125.0 },
  //       { id: 18, parameter: "SO3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 19, parameter: "Al2O3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 20, parameter: "Fe2O3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 21, parameter: "CaO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 22, parameter: "MgO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 23, parameter: "K2O", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 24, parameter: "TiO2", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 25, parameter: "P2O5", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 26, parameter: "HDT", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 27, parameter: "SDT", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 28, parameter: "Ash Fusion", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 29, parameter: "T2O5 Temperature", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 30, parameter: "Iron Calcium Ratio", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 31, parameter: "Iron Plus Calcium", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 32, parameter: "Silica Per", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 33, parameter: "Base", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 34, parameter: "Acid", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 35, parameter: "M Mineral", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 36, parameter: "C Mineral", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 37, parameter: "SiO2 Plus Al2O3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 38, parameter: "Net Calorific VAlue", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 39, parameter: "Mn3O4", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 40, parameter: "BaO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 41, parameter: "ZnO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 42, parameter: "SrO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 43, parameter: "Mercury", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 44, parameter: "Arsenic", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 45, parameter: "Fluorine", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 46, parameter: "Phosphorus", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 47, parameter: "Chlorine", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 48, parameter: "Boron", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 49, parameter: "Total Reactives", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 50, parameter: "Total Inerts", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 51, parameter: "Vitrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 52, parameter: "Semi Vitrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 53, parameter: "Oxivitrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 54, parameter: "Liptinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 55, parameter: "Macrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 56, parameter: "Micrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 57, parameter: "Fusinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 58, parameter: "Semi Fusinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 59, parameter: "Mineral Matter", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //       { id: 60, parameter: "Mean Maximum Reflectance", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
    
  //   ];
  //   setData(initialData);

  //   return () => {
  //     socketRef.current.close();
  //   };
  // }, [data]);

  // const handleEditClick = (row) => {
  //   setSelectedRow(row);
  //   setEditValues({ UB: row.UB.toFixed(2), LB: row.LB.toFixed(2) });
  // };

  // const handleSave = () => {
  //   if (selectedRow) {
  //     const updated = {
  //       ...selectedRow,
  //       UB: parseFloat(editValues.UB),
  //       LB: parseFloat(editValues.LB),
  //     };

  //     fetch(`/api/constraints/${selectedRow.id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updated),
  //     })
  //       .then(() => {
  //         socketRef.current.send(
  //           JSON.stringify({
  //             type: "update_constraints",
  //             data: updated,
  //           })
  //         );
  //         // After saving, clear the selected row and reset form
  //         setSelectedRow(null);
  //         setEditValues({ UB: "", LB: "" });
  //       })
  //       .catch((err) => console.error("Update error:", err));
  //   }
  // };

  // const handleTypeChange = (id, newType) => {
  //   const updated = data.find((item) => item.id === id);
  //   updated.type = newType;

  //   fetch(`/api/constraints/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(updated),
  //   })
  //     .then(() => {
  //       socketRef.current.send(
  //         JSON.stringify({
  //           type: "update_constraints",
  //           data: updated,
  //         })
  //       );
  //     })
  //     .catch((err) => console.error("Type update error:", err));
  // };





  // useEffect(() => {
  //   // Hardcoded initial data
  //   const initialData = [
  //     { id: 1, parameter: "C", type: "Hard", basis: "ARB", UB: 100.0, LB: 40.0 },
  //     { id: 2, parameter: "H", type: "Hard", basis: "ARB", UB: 100.0, LB: 3.0 },
  //     { id: 3, parameter: "N", type: "Hard", basis: "ARB", UB: 2.5, LB: 0.0 },
  //     { id: 4, parameter: "O", type: "Hard", basis: "ARB", UB: 40.0, LB: 0.0 },
  //     { id: 5, parameter: "HGI", type: "Hard", basis: "ARB", UB: 80.0, LB: 45.0 },
  //     { id: 6, parameter: "IDT", type: "Hard", basis: "ARB", UB: 100000000000.0, LB: 1100.0 },
  //     { id: 7, parameter: "TM", type: "Hard", basis: "ARB", UB: 45.0, LB: 0.0 },
  //     { id: 8, parameter: "IM", type: "Hard", basis: "ARB", UB: 45.0, LB: 0.0 },
  //     { id: 9, parameter: "Ash", type: "Hard", basis: "ARB", UB: 25.0, LB: 0.0 },
  //     { id: 10, parameter: "VM", type: "Hard", basis: "ARB", UB: 45.0, LB: 18.0 },
  //     { id: 11, parameter: "FC", type: "Hard", basis: "ARB", UB: 58.2, LB: 4.25 },
  //     { id: 12, parameter: "GCV", type: "Hard", basis: "ARB", UB: 6615.0, LB: 4150.0 },
  //     { id: 13, parameter: "Sulphur", type: "Hard", basis: "ARB", UB: 1.0, LB: 0.0 },
  //     { id: 14, parameter: "SiO2", type: "Hard", basis: "ARB", UB: 70.0, LB: 0.0 },
  //     { id: 15, parameter: "Base-acid ratio", type: "Hard", basis: "ARB", UB: 0.7, LB: 0.4 },
  //     { id: 16, parameter: "Slagging Factor", type: "Hard", basis: "ARB", UB: 2.0, LB: 0.0 },
  //     { id: 17, parameter: "Slagging Index", type: "Hard", basis: "ARB", UB: 10000000000.0, LB: 1125.0 },
  //     { id: 18, parameter: "SO3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 19, parameter: "Al2O3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 20, parameter: "Fe2O3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 21, parameter: "CaO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 22, parameter: "MgO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 23, parameter: "K2O", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 24, parameter: "TiO2", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 25, parameter: "P2O5", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 26, parameter: "HDT", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 27, parameter: "SDT", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 28, parameter: "Ash Fusion", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 29, parameter: "T2O5 Temperature", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 30, parameter: "Iron Calcium Ratio", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 31, parameter: "Iron Plus Calcium", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 32, parameter: "Silica Per", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 33, parameter: "Base", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 34, parameter: "Acid", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 35, parameter: "M Mineral", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 36, parameter: "C Mineral", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 37, parameter: "SiO2 Plus Al2O3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 38, parameter: "Net Calorific Value", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 39, parameter: "Mn3O4", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 40, parameter: "BaO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 41, parameter: "ZnO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 42, parameter: "SrO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 43, parameter: "Mercury", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 44, parameter: "Arsenic", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 45, parameter: "Fluorine", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 46, parameter: "Phosphorus", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 47, parameter: "Chlorine", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 48, parameter: "Boron", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 49, parameter: "Total Reactives", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 50, parameter: "Total Inerts", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 51, parameter: "Vitrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 52, parameter: "Inertinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //     { id: 53, parameter: "Lignite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
  //   ];
  //   setData(initialData);
  // }, []);

  // useEffect(() => {
  //   socketRef.current = new WebSocket("wss://localhost:8000/ws/constraints/");

  //   socketRef.current.onopen = () => {
  //     console.log("WebSocket connected.");
  //   };

  //   socketRef.current.onmessage = (event) => {
  //     const message = JSON.parse(event.data);
  //     console.log("WebSocket message received:", message);
  //     if (message.type === "update_constraints") {
  //       const updatedData = message.data;
  //       setData(updatedData);
  //     }
  //   };

  //   return () => {
  //     if (socketRef.current) {
  //       socketRef.current.close();
  //     }
  //   };
  // }, []);

  // // const handleEditClick = (rowId) => {
  // //   const rowData = data.find((row) => row.id === rowId);
  // //   setSelectedRow(rowId);
  // //   setEditValues({ UB: rowData.UB, LB: rowData.LB });
  // // };
  // const handleEditClick = (row) => {
  //       setSelectedRow(row);
  //       setEditValues({ UB: row.UB.toFixed(2), LB: row.LB.toFixed(2) });
  //     };


// 2) add a new handler for changing the row’s "type":
const handleTypeChange = (id, newType) => {
  const updated = data.map(row =>
    row.id === id ? { ...row, type: newType } : row
  );
  setData(updated);
  socketRef.current?.emit("updateConstraints", updated);
};


  // const handleSaveClick = () => {
  //   // const updatedData = data.map((row) =>
  //   //   row.id === selectedRow
  //   //     ? { ...row, UB: parseFloat(editValues.UB), LB: parseFloat(editValues.LB) }
  //   //     : row
  //   // );
  //   // setData(updatedData);
  //   // setSelectedRow(null);
  //   // setEditValues({ UB: "", LB: "" });

  //   const updated = {
  //     ...selectedRow,
  //     UB: parseFloat(editValues.UB),
  //     LB: parseFloat(editValues.LB),
  //   };

  //   fetch(`/api/constraints/${selectedRow.id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(updated),
  //   })
  //     .then(() => {
  //       socketRef.current.emit("updateConstraints", updated);
  //     })
  //     .catch((err) => console.error("Update error:", err));

  //   setSelectedRow(null);
  // };
  
  useEffect(() => {
    // Connect to Socket.IO server
    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("connect", () => {
      console.log("✅ Connected to Socket.IO");
    });

    socketRef.current.on("initialData", (initialData) => {
      console.log("📦 Received initial data");
      setData(initialData);
    });

    socketRef.current.on("updateConstraints", (updatedData) => {
      console.log("🔄 Received updated constraints");
      setData(updatedData);
    });

    socketRef.current.on("disconnect", () => {
      console.log("🚫 Disconnected from server");
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleEditClick = (index) => {
    console.log("Index in Edit Click:", index); // Check the index
    if (typeof index !== "number" || !data[index]) {
      console.warn("Invalid index in handleEditClick:", index);
      return;
    }
    
    setSelectedRow(index);  // Update selected row
    setEditValues({
      UB: data[index].UB ?? '',
      LB: data[index].LB ?? '',
    });
  
    // Debug the updated state
    console.log("Selected Row:", index);
    console.log("Edit Values:", { UB: data[index].UB, LB: data[index].LB });
  };
  
  
  
  const handleSaveClick = () => {
    console.log("handleSaveClick called with selectedRow:", selectedRow);
    if (selectedRow === null || !data[selectedRow]) {
      console.warn("Invalid selectedRow or data[selectedRow] in handleSaveClick");
      return;
    }
  
    const newData = [...data];
    newData[selectedRow] = {
      ...newData[selectedRow],
      UB: parseFloat(editValues.UB),
      LB: parseFloat(editValues.LB),
    };
  
    // console.log("Updated Data:", newData);
    
    setData(newData);  // Save the updated data
    setSelectedRow(null);  // Clear selected row
  
    // Emit updated data to the server
    socketRef.current?.emit("updateConstraints", newData);
  };
  
  

  return (
    <div className="constraints-container">
      <h2 className="constraints-title">Operating Constraints</h2>
      <button onClick={() => navigate("/coal")} className="nav-button">
        Coal Analysis
      </button>
      <button onClick={() => navigate("/Logistics")} className="nav-button">
        Logistics
      </button>

      <div className="constraints-table-container">
        <table className="constraints-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Type</th>
              <th>Basis</th>
              <th>UB</th>
              <th>LB</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row,index) => (
              
              <tr key={row.id}>
                <td>{row.parameter}</td>
                <td>
                  <select
                    className="constraints-select"
                    value={row.type}
                    onChange={(e) => handleTypeChange(row.id, e.target.value)}
                  >
                    <option value="Hard">Hard</option>
                    <option value="Medium">Medium</option>
                    <option value="Soft">Soft</option>
                  </select>
                </td>
                <td>{row.basis}</td>
                <td>{Number(row.UB).toFixed(2)}</td>
                <td>{Number(row.LB).toFixed(2)}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(index)}
                  >
                    <FaPen className="pencil-icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRow !== null && (
  <div className="modal-overlay" onClick={() => setSelectedRow(null)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h3 className="modal-title">
          Edit Constraints for {data[selectedRow].parameter}
        </h3>
      </div>
      <div className="modal-body">
        <div className="form-group">
          <label className="form-label">UB</label>
          <input
            type="number"
            value={editValues.UB}
            onChange={(e) =>
              setEditValues({ ...editValues, UB: e.target.value })
            }
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">LB</label>
          <input
            type="number"
            value={editValues.LB}
            onChange={(e) =>
              setEditValues({ ...editValues, LB: e.target.value })
            }
            className="form-input"
          />
        </div>
        <div className="modal-actions">
          <button
            className="cancel-button"
            onClick={() => setSelectedRow(null)}
          >
            Cancel
          </button>
          <button className="save-button" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
)}
</div>
  );
};

export default OperatingConstraints;


