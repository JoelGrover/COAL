
// "use client"
// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import "./styles.css"
// const initialSections = [
//   {
//         title: "Ash Realization",
//         columns: ["Parameter", "UOM", "Value", "Edit"],
//         rows: [
//           ["VJN-Revenue-Domestic", "INR/MT", "128"],
//           ["VJN-Revenue-Export", "USD/MT", "1.6"],
//           ["VJN-Penalty", "INR/MT", "-180"],
//           ["VJN-Ash Placed", "%", "73"],
//           ["Ash Exported", "%", "0"],
//         ],
//       },
//       {
//         title: "Losses",
//         columns: ["Loss", "UOM", "Value", "Edit"],
//         rows: [
//           ["Transit loss", "%", "1"],
//           ["Handling losses", "%", "0.5"],
//           ["CV Quality loss", "%", "0.8"],
//         ],
//       },
//       {
//         title: "Holding Period",
//         columns: ["Parameter", "UOM", "Value", "Edit"],
//         rows: [
//           ["LC Opening to Discharge", "MT", "40"],
//           ["Unloading at Port", "Days", "5"],
//           ["Road-Rake Movement", "Days", "5"],
//           ["Consumption for single port", "Days", "16"],
//           ["Extra-Addition for Twin-Port-Movement", "Days", "12"],
//         ],
//       },
//       {
//         title: "Rake Transit Time",
//         columns: ["Discharge Port", "No. of Days", "Edit"],
//         rows: [],
//       },
//       {
//         title: "Commerical Fixed Inputs",
//         columns: ["Parameter", "UOM", "Value", "Edit"],
//         rows: [
//           ["JITPL Margin", "%", "1.00"],
//           ["Clean Energy Cess", "INR/MT", "400"],
//           ["Stamp Duty", "%", "0.10"],
//           ["Demmurage", "USD/MT", "0.00"],
//           ["Manufacture Margin", "%", "0.00"],
//         ],
//       },
//       {
//         title: "Technical Fixed Inputs",
//         columns: ["Parameter", "UOM", "Value", "Edit"],
//         rows: [
//           ["Reference Air Temperature", "degree C", "33.7994"],
//           ["Partial Pressure", "KSC", "0.0703"],
//           ["Weight of water vapour per kg of dry air", "Kg/Kg", "0.210"],
//           ["Temp of bottom ash above ambient", "degree C","600.00"],
//           ["Distribution of fly ash", "%", "90.00"],
//           ["Instantaneous SP heat of flue gas at TRA", "Kg/Kg/degree C", "0.9920"],
//           ["Instantaneous SP heat of flue gas at Tg", "Kg/Kg/degree C", "1.0780"],
//           ["Sensible heat of bottom ash","Kg/Kg/degree C","0.2500"],
//           ["Specific head of fly ash","Kg/Kg/degree C","0.2000"],
//           ["Manufacture margin and upaccounted","%","0.7400"],
//         ],
//       },
//       {
//         title: "Financing Cost",
//         columns: ["Parameter", "UOM", "Value", "Edit"],
//         rows: [
//           ["LC", "%", "1.00"],
//           ["Imported Cost of Capital", "%p.a.", "0.50"],
//           ["Supplier's Cost", "%p.a.", "5.1"],
//           ["Hedging Cost", "%p.a.", "0.60"],
//           ["Free Cashflows Cost of Capital", "%p.a.", "4.50"],
//           ["Credit Line Cost","%p.a.","8.75"],
//         ],
//       },
//       {
//         title: "Import Duties",
//         columns: ["Parameter", "UOM", "Value", "Edit"],
//         rows: [
//           ["Australia", "%", "0.00"],
//           ["South African", "%", "2.75"],
//           ["Mozambique","%","0.00"],
//           ["Indonesia","%","0.00"],
//           ["Colombia","%","2.75"],
//           ["Russsian Fedration","%","2.75"],
          
//         ],
//       },
//       {
//         title: "GST on Import Duty and Freight",
//         columns: ["Parameter", "UOM", "Value", "Edit"],
//         rows: [
//           ["JSW Steel", "%", "0.00"],
//           ["JSW Energy", "%", "5.00"],
          
//         ],
//       },
//       {
//         title: "GST on PDA",
//         columns: ["Parameter", "UOM", "Value", "Edit"],
//         rows: [
//           ["JSW Steel", "%", "0.00"],
//           ["JSW Energy", "%", "18.00"],
          
//         ],
//       },
//       {
//         title: "Load Port Options",
//         columns: ["Country", "Load Port", "Edit"],
//         rows: [],
//       },
//       {
//         title: "Discharge Port Options",
//         columns: ["Country", "Discharge Port", "Edit"],
//         rows: [],
//       },
//       {
//         title: "Discharge Rate Options",
//         columns: [ "Discharge Port","Vessel Type","MT/Hours" ,"Edit"],
//         rows: [],
//       },
//       {
//         title: "Vessel",
//         columns: [ "Type","UOM","Value" ,"Edit"],
//         rows: [
//           ["Cape","kT","150000.00"],
//           ["Panamax","kT","75000.00"],
//         ],
//       },
//       {
//         title: "Ocean Freight",
//         columns: [ "Load Port","Destination Port","Plant","Vessel Type","USD/MT","Edit"],
//         rows: [
//         ],
//       },
//       {
//         title: "Rail/Road Transport(Inland Freight)",
//         columns: [ "Port of Discharge","Vessel Type","INR/MT" ,"Edit"],
//         rows: [
    
//         ],
//       },
//       {
//         title: "Indices",
//         columns: [ "Coal Indices" ,"Edit"],
//         rows: [
    
//         ],
//       },
//       {
//         title: "Port PDA for Full Shipment",
//         columns: [ "Port","Vessel Type","Value" ,"Edit"],
//         rows: [],
//       },
//       {
//         title: "Port Handling Charges",
//         columns: [ "Port","Vessel Type","Value" ,"Edit"],
//         rows: [],
//       },
    
 
// ]

// export default function Logistics() {
//   const [sections, setSections] = useState(() => {
//     const savedData = localStorage.getItem("logisticsSections")
//     return savedData ? JSON.parse(savedData) : initialSections
//   })

//   const [openSection, setOpenSection] = useState(null)
//   const [editData, setEditData] = useState({ sectionIndex: null, rowIndex: null, value: "" })
//   const [newRakeData, setNewRakeData] = useState({ port: "", days: "" })
//   const [newLoadPortData, setNewLoadPortData] = useState({ country: "", port: "" })
//   const [newDischargePortData, setNewDischargePortData] = useState({ country: "", dischargePort: "" })
//   const [newDischargeRateData, setNewDischargeRateData] = useState({ port: "", vessel: "", rate: "" })
//   const [newOceanFreightData, setNewOceanFreightData] = useState({
//     loadPort: "",
//     destinationPort: "",
//     plant: "",
//     vesselType: "",
//     usdPerMT: "",
//   })
//   const [newRailRoadData, setNewRailRoadData] = useState({
//     port: "",
//     vessel: "",
//     rate: "",
//   })
//   const [newIndicesData, setNewIndicesData] = useState({
//     index: "",
//   })
//   const [newPortPDAData, setNewPortPDAData] = useState({
//     port: "",
//     vessel: "",
//     value: "",
//   })
//   const [newPortHandlingData, setNewPortHandlingData] = useState({
//     port: "",
//     vessel: "",
//     value: "",
//   })

//   const navigate = useNavigate()

//   useEffect(() => {
//     localStorage.setItem("logisticsSections", JSON.stringify(sections))
//   }, [sections])

//   const toggleSection = (index) => {
//     setOpenSection(openSection === index ? null : index)
//   }

//   const openEditDialog = (sectionIndex, rowIndex, value) => {
//     setEditData({ sectionIndex, rowIndex, value })
//   }

//   const updateValue = () => {
//     if (editData.sectionIndex !== null && editData.rowIndex !== null) {
//       const updatedSections = [...sections]
//       const sectionTitle = updatedSections[editData.sectionIndex].title

//       // Determine which column to update based on the section title
//       let columnIndex = 2 // Default to "Value" column

//       if (sectionTitle === "Load Port Options") {
//         columnIndex = 1 // "Load Port" column
//       } else if (sectionTitle === "Discharge Port Options") {
//         columnIndex = 1 // "Discharge Port" column
//       } else if (sectionTitle === "Discharge Rate Options") {
//         columnIndex = 2 // "MT/Hours" column
//       } else if (sectionTitle === "Ocean Freight") {
//         columnIndex = 4 // "USD/MT" column
//       } else if (sectionTitle === "Rail/Road Transport(Inland Freight)") {
//         columnIndex = 2 // "INR/MT" column
//       } else if (sectionTitle === "Indices") {
//         columnIndex = 0 // "Coal Indices" column
//       } else if (sectionTitle === "Rake Transit Time") {
//         columnIndex = 1
//        } 


//       // Update the correct column in the selected row
//       updatedSections[editData.sectionIndex].rows[editData.rowIndex][columnIndex] = editData.value

//       // Update the state
//       setSections(updatedSections)
//       setEditData({ sectionIndex: null, rowIndex: null, value: "" })
//     }
//   }

//   const addRakeEntry = () => {
//     if (newRakeData.port && newRakeData.days) {
//       const updatedSections = [...sections]
//       const rakeIndex = updatedSections.findIndex((s) => s.title === "Rake Transit Time")

//       if (rakeIndex !== -1) {
//         updatedSections[rakeIndex].rows.push([newRakeData.port, newRakeData.days])
//       }

//       setSections(updatedSections)
//       setNewRakeData({ port: "", days: "" })
//     }
//   }

//   const addLoadPortEntry = () => {
//     if (newLoadPortData.country && newLoadPortData.port) {
//       const updatedSections = [...sections]
//       const loadPortIndex = updatedSections.findIndex((s) => s.title === "Load Port Options")

//       if (loadPortIndex !== -1) {
//         updatedSections[loadPortIndex].rows.push([newLoadPortData.country, newLoadPortData.port])
//       }

//       setSections(updatedSections)
//       setNewLoadPortData({ country: "", port: "" })
//     }
//   }

//   const addDischargePortEntry = () => {
//     if (newDischargePortData.country && newDischargePortData.dischargePort) {
//       const updatedSections = [...sections]
//       const dischargePortIndex = updatedSections.findIndex((s) => s.title === "Discharge Port Options")

//       if (dischargePortIndex !== -1) {
//         updatedSections[dischargePortIndex].rows.push([
//           newDischargePortData.country,
//           newDischargePortData.dischargePort,
//         ])
//       }

//       setSections(updatedSections)
//       setNewDischargePortData({ country: "", dischargePort: "" })
//     }
//   }

//   const addDischargeRateEntry = () => {
//     if (newDischargeRateData.port && newDischargeRateData.vessel && newDischargeRateData.rate) {
//       const updatedSections = [...sections]
//       const dischargeRateIndex = updatedSections.findIndex((s) => s.title === "Discharge Rate Options")

//       if (dischargeRateIndex !== -1) {
//         updatedSections[dischargeRateIndex].rows.push([
//           newDischargeRateData.port,
//           newDischargeRateData.vessel,
//           newDischargeRateData.rate,
//         ])
//       }

//       setSections(updatedSections)
//       setNewDischargeRateData({ port: "", vessel: "", rate: "" })
//     }
//   }

//   const addOceanFreightEntry = () => {
//     if (
//       newOceanFreightData.loadPort &&
//       newOceanFreightData.destinationPort &&
//       newOceanFreightData.plant &&
//       newOceanFreightData.vesselType &&
//       newOceanFreightData.usdPerMT
//     ) {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.title === "Ocean Freight"
//             ? { ...section, rows: [...section.rows, Object.values(newOceanFreightData)] }
//             : section,
//         ),
//       )

//       // Reset the input fields
//       setNewOceanFreightData({
//         loadPort: "",
//         destinationPort: "",
//         plant: "",
//         vesselType: "",
//         usdPerMT: "",
//       })
//     }
//   }

//   const addRailRoadEntry = () => {
//     if (newRailRoadData.port && newRailRoadData.vessel && newRailRoadData.rate) {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.title === "Rail/Road Transport(Inland Freight)"
//             ? {
//                 ...section,
//                 rows: [...section.rows, [newRailRoadData.port, newRailRoadData.vessel, newRailRoadData.rate]],
//               }
//             : section,
//         ),
//       )
//       setNewRailRoadData({ port: "", vessel: "", rate: "" })
//     }
//   }

//   const addIndicesEntry = () => {
//     if (newIndicesData.index) {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.title === "Indices" ? { ...section, rows: [...section.rows, [newIndicesData.index]] } : section,
//         ),
//       )
//       setNewIndicesData({ index: "" })
//     }
//   }

//   const addPortPDAEntry = () => {
//     if (newPortPDAData.port && newPortPDAData.vessel && newPortPDAData.value) {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.title === "Port PDA for Full Shipment"
//             ? {
//                 ...section,
//                 rows: [...section.rows, [newPortPDAData.port, newPortPDAData.vessel, newPortPDAData.value]],
//               }
//             : section,
//         ),
//       )
//       setNewPortPDAData({ port: "", vessel: "", value: "" })
//     }
//   }

//   const addPortHandlingEntry = () => {
//     if (newPortHandlingData.port && newPortHandlingData.vessel && newPortHandlingData.value) {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.title === "Port Handling Charges"
//             ? {
//                 ...section,
//                 rows: [
//                   ...section.rows,
//                   [newPortHandlingData.port, newPortHandlingData.vessel, newPortHandlingData.value],
//                 ],
//               }
//             : section,
//         ),
//       )
//       setNewPortHandlingData({ port: "", vessel: "", value: "" })
//     }
//   }
//   return (
//     <div className="logistics-container">
//       <h1 className="logistics-title">Logistical & Financial Inputs</h1>
//       <button onClick={() => navigate("/coal")} className="nav-button">
//         Coal Analysis
//       </button>
//       <button onClick={() => navigate("/operation-constraints")} className="nav-button">
//         Operating Constraints
//       </button>

//       {sections.map((section, index) => (
//         <div key={index} className="card">
//           <div className="card-header">
//             <div className="card-title">
//               {section.title}
//               <button className="toggle-button" onClick={() => toggleSection(index)}>
//                 {openSection === index ? "▲" : "▼"}
//               </button>
//             </div>
//           </div>
//           {openSection === index && (
//             <div className="card-content">
//               <table className="logistics-table">
//                 <thead>
//                   <tr>
//                     {section.columns.map((col, i) => (
//                       <th key={i}>{col}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {section.rows.length > 0 ? (
//                     section.rows.map((row, i) => (
//                       <tr key={i}>
//                         {row.map((cell, j) => (
//                           <td key={j}>{cell}</td>
//                         ))}
//                         <td>
//                           <button className="edit-button" onClick={() => openEditDialog(index, i, row[2])}>
//                             Edit
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={section.columns.length} className="empty-message">
//                         No Data Available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>

//               {section.title === "Rake Transit Time" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Discharge Port"
//                     value={newRakeData.port}
//                     onChange={(e) => setNewRakeData({ ...newRakeData, port: e.target.value })}
//                     className="input"
//                   />
//                   <input
//                     type="number"
//                     placeholder="No. of Days"
//                     value={newRakeData.days}
//                     onChange={(e) => setNewRakeData({ ...newRakeData, days: e.target.value })}
//                     className="input"
//                   />
//                   <button className="add-button" onClick={addRakeEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}

//               {section.title === "Load Port Options" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Country"
//                     value={newLoadPortData.country}
//                     onChange={(e) => setNewLoadPortData({ ...newLoadPortData, country: e.target.value })}
//                     className="input"
//                   />
//                   <input
//                     placeholder="Load Port"
//                     value={newLoadPortData.port}
//                     onChange={(e) => setNewLoadPortData({ ...newLoadPortData, port: e.target.value })}
//                     className="input"
//                   />
//                   <button className="add-button" onClick={addLoadPortEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}

//               {section.title === "Discharge Port Options" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Country"
//                     value={newDischargePortData.country}
//                     onChange={(e) => setNewDischargePortData({ ...newDischargePortData, country: e.target.value })}
//                     className="input"
//                   />
//                   <input
//                     placeholder="Discharge Port"
//                     value={newDischargePortData.dischargePort}
//                     onChange={(e) =>
//                       setNewDischargePortData({ ...newDischargePortData, dischargePort: e.target.value })
//                     }
//                     className="input"
//                   />
//                   <button className="add-button" onClick={addDischargePortEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}

//               {section.title === "Discharge Rate Options" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Discharge Port"
//                     value={newDischargeRateData.port}
//                     onChange={(e) => setNewDischargeRateData({ ...newDischargeRateData, port: e.target.value })}
//                     className="input"
//                   />
//                   <input
//                     placeholder="Vessel Type"
//                     value={newDischargeRateData.vessel}
//                     onChange={(e) => setNewDischargeRateData({ ...newDischargeRateData, vessel: e.target.value })}
//                     className="input"
//                   />
//                   <input
//                     type="number"
//                     placeholder="MT/Hours"
//                     value={newDischargeRateData.rate}
//                     onChange={(e) => setNewDischargeRateData({ ...newDischargeRateData, rate: e.target.value })}
//                     className="input"
//                   />
//                   <button className="add-button" onClick={addDischargeRateEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}

//               {section.title === "Ocean Freight" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Load Port"
//                     value={newOceanFreightData.loadPort}
//                     onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, loadPort: e.target.value })}
//                     className="input"
//                   />
//                   <input
//                     placeholder="Destination Port"
//                     value={newOceanFreightData.destinationPort}
//                     onChange={(e) =>
//                       setNewOceanFreightData({ ...newOceanFreightData, destinationPort: e.target.value })
//                     }
//                     className="input"
//                   />
//                   <input
//                     placeholder="Plant"
//                     value={newOceanFreightData.plant}
//                     onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, plant: e.target.value })}
//                     className="input"
//                   />
//                   <input
//                     placeholder="Vessel Type"
//                     value={newOceanFreightData.vesselType}
//                     onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, vesselType: e.target.value })}
//                     className="input"
//                   />
//                   <input
//                     type="number"
//                     placeholder="USD/MT"
//                     value={newOceanFreightData.usdPerMT}
//                     onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, usdPerMT: e.target.value })}
//                     className="input"
//                   />
//                   <button className="add-button" onClick={addOceanFreightEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}

//               {section.title === "Rail/Road Transport(Inland Freight)" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Port of Discharge"
//                     value={newRailRoadData.port}
//                     onChange={(e) => setNewRailRoadData({ ...newRailRoadData, port: e.target.value })}
//                     className="input"
//                   />
//                   <input
//                     placeholder="Vessel Type"
//                     value={newRailRoadData.vessel}
//                     onChange={(e) => setNewRailRoadData({ ...newRailRoadData, vessel: e.target.value })}
//                     className="input"
//                   />
//                   <input
//                     type="number"
//                     placeholder="INR/MT"
//                     value={newRailRoadData.rate}
//                     onChange={(e) => setNewRailRoadData({ ...newRailRoadData, rate: e.target.value })}
//                     className="input"
//                   />
//                   <button className="add-button" onClick={addRailRoadEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}

//               {section.title === "Indices" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Coal Index Name"
//                     value={newIndicesData.index}
//                     onChange={(e) => setNewIndicesData({ ...newIndicesData, index: e.target.value })}
//                     className="input"
//                   />
//                   <button className="add-button" onClick={addIndicesEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}

//               {section.title === "Port PDA for Full Shipment" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Port"
//                     value={newPortPDAData.port}
//                     onChange={(e) => setNewPortPDAData({ ...newPortPDAData, port: e.target.value })}
//                     className="input"
//                   />
//                   <input
//                     placeholder="Vessel Type"
//                     value={newPortPDAData.vessel}
//                     onChange={(e) => setNewPortPDAData({ ...newPortPDAData, vessel: e.target.value })}
//                     className="input"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Value"
//                     value={newPortPDAData.value}
//                     onChange={(e) => setNewPortPDAData({ ...newPortPDAData, value: e.target.value })}
//                     className="input"
//                   />
//                   <button className="add-button" onClick={addPortPDAEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}

//               {section.title === "Port Handling Charges" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Port"
//                     value={newPortHandlingData.port}
//                     onChange={(e) => setNewPortHandlingData({ ...newPortHandlingData, port: e.target.value })}
//                     className="input"
//                   />
//                   <input
//                     placeholder="Vessel Type"
//                     value={newPortHandlingData.vessel}
//                     onChange={(e) => setNewPortHandlingData({ ...newPortHandlingData, vessel: e.target.value })}
//                     className="input"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Value"
//                     value={newPortHandlingData.value}
//                     onChange={(e) => setNewPortHandlingData({ ...newPortHandlingData, value: e.target.value })}
//                     className="input"
//                   />
//                   <button className="add-button" onClick={addPortHandlingEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       ))}

//       {/* Edit Dialog */}
//       {editData.sectionIndex !== null && (
//         <div className="modal-overlay" onClick={() => setEditData({ sectionIndex: null, rowIndex: null, value: "" })}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h3 className="modal-title">Edit Value</h3>
//             </div>
//             <div className="modal-body">
//               <input
//                 className="form-input"
//                 placeholder="Value"
//                 value={editData.value}
//                 onChange={(e) => setEditData({ ...editData, value: e.target.value })}
//               />
//               <div className="modal-actions">
//                 <button
//                   className="cancel-button"
//                   onClick={() => setEditData({ sectionIndex: null, rowIndex: null, value: "" })}
//                 >
//                   Cancel
//                 </button>
//                 <button className="save-button" onClick={updateValue}>
//                   Update
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }



// export default function Logistics() {
//   const [sections, setSections] = useState(() => {
//     const savedData = localStorage.getItem("logisticsSections");
//     return savedData ? JSON.parse(savedData) : initialSections;
//   });
  
//   const [openSection, setOpenSection] = useState(null);
//   const [editData, setEditData] = useState({ sectionIndex: null, rowIndex: null, value: "" });
//   const [newRakeData, setNewRakeData] = useState({ port: "", days: "" });
//   const [newLoadPortData, setNewLoadPortData] = useState({ country: "", port: "" });
//   const [newDischargePortData, setNewDischargePortData] = useState({ country: "", dischargePort: "" });
//   const [newDischargeRateData, setNewDischargeRateData] = useState({ port: "", vessel: "", rate: "" });
//   const [newOceanFreightData, setNewOceanFreightData] = useState({
//     loadPort: "",
//     destinationPort: "",
//     plant: "",
//     vesselType: "",
//     usdPerMT: "",
//   });
//   const [newRailRoadData, setNewRailRoadData] = useState({
//     port: "",
//     vessel: "",
//     rate: "",
//   });
//   const [newIndicesData, setNewIndicesData] = useState({
//     index: "",
//   });
//   const [newPortPDAData, setNewPortPDAData] = useState({
//     port: "",
//     vessel: "",
//     value: "",
//   });
//   const [newPortHandlingData, setNewPortHandlingData] = useState({
//     port: "",
//     vessel: "",
//     value: "",
//   });
  
//   const navigate = useNavigate();
//   useEffect(() => {
//     localStorage.setItem("logisticsSections", JSON.stringify(sections));
//   }, [sections]);

//   const toggleSection = (index) => {
//     setOpenSection(openSection === index ? null : index);
//   };

//   const openEditDialog = (sectionIndex, rowIndex, value) => {
//     setEditData({ sectionIndex, rowIndex, value });
//   };

//   // const updateValue = () => {
//   //   if (editData.sectionIndex !== null && editData.rowIndex !== null) {
//   //     const updatedSections = [...sections];
//   //     updatedSections[editData.sectionIndex].rows[editData.rowIndex][2] = editData.value;
//   //     setSections(updatedSections);
//   //     setEditData({ sectionIndex: null, rowIndex: null, value: "" });
//   //   }
//   // };

//   const updateValue = () => {
//     if (editData.sectionIndex !== null && editData.rowIndex !== null) {
//       const updatedSections = [...sections];
  
//       // Identify the section being updated
//       const sectionTitle = updatedSections[editData.sectionIndex].title;
  
//       // Determine which column to update based on the section title
//       let columnIndex;
//       switch (sectionTitle) {
//         case "GST on Import Duty and Freight":
//         case "GST on PDA":
//         case "Port PDA for Full Shipment":
//         case "Port Handling Charges":
//         case "Rake Transit Time":
//         case "Commerical Fixed Inputs":
//         case "Technical Fixed Inputs":
//         case "Financing Cost":
//         case "Import Duties":
//         case "Vessel":
//           columnIndex = 2; // "Value" column
//           break;
  
//         case "Load Port Options":
//           columnIndex = 1; // "Load Port" column
//           break;
//         case "Discharge Port Options":
//           columnIndex = 1; // "Discharge Port" column
//           break;
  
//         case "Discharge Rate Options":
//           columnIndex = 2; // "MT/Hours" column
//           break;
  
//         case "Ocean Freight":
//           columnIndex = 4; // "USD/MT" column
//           break;
  
//         case "Rail/Road Transport(Inland Freight)":
//           columnIndex = 2; // "INR/MT" column
//           break;
  
//         case "Indices":
//           columnIndex = 0; // "Coal Indices" column
//           break;
//         case "Ash Realization":
//           columnIndex = 2; 
//           break;
//         case "Losses":
//           columnIndex = 2; 
//           break;
//         case "Holding Period":
//           columnIndex = 2; 
//           break;
//         default:
//           columnIndex = 2; // Default to "Value" column
//       }
  
//       // Update the correct column in the selected row
//       updatedSections[editData.sectionIndex].rows[editData.rowIndex][columnIndex] = editData.value;
  
//       // Update the state
//       setSections(updatedSections);
//       setEditData({ sectionIndex: null, rowIndex: null, value: "" });
//     }
//   };
  
//   const addRakeEntry = () => {
//     if (newRakeData.port && newRakeData.days) {
//       const updatedSections = [...sections];
//       const rakeIndex = updatedSections.findIndex((s) => s.title === "Rake Transit Time");

//       if (rakeIndex !== -1) {
//         updatedSections[rakeIndex].rows.push([newRakeData.port, newRakeData.days]);
//       }

//       setSections(updatedSections);
//       setNewRakeData({ port: "", days: "" });
//     }
//   };
//   const addLoadPortEntry = () => {
//     if (newLoadPortData.country && newLoadPortData.loadPort) {
//       const updatedSections = [...sections];
//       const loadPortIndex = updatedSections.findIndex((s) => s.title === "Load Port Options");

//       if (loadPortIndex !== -1) {
//         updatedSections[loadPortIndex].rows.push([newLoadPortData.country, newLoadPortData.loadPort]);
//       }

//       setSections(updatedSections);
//       setNewLoadPortData({ country: "", loadPort: "" });
//     }
//   };
//   const addDischargePortEntry = () => {
//     if (newDischargePortData.country && newDischargePortData.dischargePort) {
//       const updatedSections = [...sections];
//       const dischargePortIndex = updatedSections.findIndex((s) => s.title === "Discharge Port Options");
  
//       if (dischargePortIndex !== -1) {
//         updatedSections[dischargePortIndex].rows.push([newDischargePortData.country, newDischargePortData.dischargePort]);
//       }
  
//       setSections(updatedSections);
//       setNewDischargePortData({ country: "", dischargePort: "" });
//     }
//   };
//   const addDischargeRateEntry = () => {
//     if (newDischargeRateData.port && newDischargeRateData.vessel && newDischargeRateData.rate) {
//       const updatedSections = [...sections];
//       const dischargeRateIndex = updatedSections.findIndex((s) => s.title === "Discharge Rate Options");
  
//       if (dischargeRateIndex !== -1) {
//         updatedSections[dischargeRateIndex].rows.push([
//           newDischargeRateData.port,
//           newDischargeRateData.vessel,
//           newDischargeRateData.rate,
//         ]);
//       }
  
//       setSections(updatedSections);
//       setNewDischargeRateData({ port: "", vessel: "", rate: "" });
//     }
//   };
//   const addOceanFreightEntry = () => {
//     if (
//       newOceanFreightData.loadPort &&
//       newOceanFreightData.destinationPort &&
//       newOceanFreightData.plant &&
//       newOceanFreightData.vesselType &&
//       newOceanFreightData.usdPerMT
//     ) {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.title === "Ocean Freight"
//             ? { ...section, rows: [...section.rows, Object.values(newOceanFreightData)] }
//             : section
//         )
//       );
  
//       // Reset the input fields
//       setNewOceanFreightData({
//         loadPort: "",
//         destinationPort: "",
//         plant: "",
//         vesselType: "",
//         usdPerMT: "",
//       });
//     }
//   };
//   const addRailRoadEntry = () => {
//     if (newRailRoadData.port && newRailRoadData.vessel && newRailRoadData.rate) {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.title === "Rail/Road Transport (Inland Freight)"
//             ? {
//                 ...section,
//                 rows: [...section.rows, [newRailRoadData.port, newRailRoadData.vessel, newRailRoadData.rate]],
//               }
//             : section
//         )
//       );
//       setNewRailRoadData({ port: "", vessel: "", rate: "" }); // Reset input fields
//     }
//   };
//   const addIndicesEntry = () => {
//     if (newIndicesData.index) {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.title === "Indices"
//             ? { ...section, rows: [...section.rows, [newIndicesData.index]] }
//             : section
//         )
//       );
//       setNewIndicesData({ index: "" }); // Reset input field
//     }
//   };
//   const addPortPDAEntry = () => {
//     if (newPortPDAData.port && newPortPDAData.vessel && newPortPDAData.value) {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.title === "Port PDA for Full Shipment"
//             ? { ...section, rows: [...section.rows, [newPortPDAData.port, newPortPDAData.vessel, newPortPDAData.value]] }
//             : section
//         )
//       );
//       setNewPortPDAData({ port: "", vessel: "", value: "" }); // Reset input fields
//     }
//   };
//   const addPortHandlingEntry = () => {
//     if (newPortHandlingData.port && newPortHandlingData.vessel && newPortHandlingData.value) {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.title === "Port Handling Charges"
//             ? { ...section, rows: [...section.rows, [newPortHandlingData.port, newPortHandlingData.vessel, newPortHandlingData.value]] }
//             : section
//         )
//       );
//       setNewPortHandlingData({ port: "", vessel: "", value: "" }); // Reset input fields
//     }
//   };
  
//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Logistical & Financial Inputs</h1>
    
//         <button onClick={() => navigate("/operation-constraints")} className="nav-button">
//         Operating Constraints
//       </button>
//       {sections.map((section, index) => (
//         <Card key={index} className="mb-6 border border-gray-200 shadow-lg rounded-xl">
//           <CardHeader>
//             <CardTitle className="flex justify-between items-center text-lg font-medium text-gray-700">
//               {section.title}
//               <Button variant="ghost" onClick={() => toggleSection(index)}>
//                 {openSection === index ? "▲" : "▼"}
//               </Button>
//             </CardTitle>
//           </CardHeader>
//           {openSection === index && (
//             <CardContent>
//               <table className="w-full border-collapse text-gray-700 rounded-lg">
//                 <thead>
//                   <tr className="bg-gray-100 text-sm font-semibold text-gray-600">
//                     {section.columns.map((col, i) => (
//                       <th key={i} className="py-2 px-4 border-b">{col}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {section.rows.length > 0 ? (
//                     section.rows.map((row, i) => (
//                       <tr key={i} className="border-b hover:bg-gray-50 transition">
//                         {row.map((cell, j) => (
//                           <td key={j} className="py-2 px-4 pl-4 text-center">{cell}</td>
//                         ))}
//                         <td className="text-center">
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => openEditDialog(index, i, row[2])}
//                           >
//                             Edit
//                           </Button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={section.columns.length} className="py-3 text-center text-gray-500">
//                         No Data Available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>

//               {section.title === "Rake Transit Time" && (
//                 <div className="mt-4 flex gap-3">
//                   <Input
//                     placeholder="Discharge Port"
//                     value={newRakeData.port}
//                     onChange={(e) => setNewRakeData({ ...newRakeData, port: e.target.value })}
//                     className="flex-1"
//                   />
//                   <Input
//                     type="number"
//                     placeholder="No. of Days"
//                     value={newRakeData.days}
//                     onChange={(e) => setNewRakeData({ ...newRakeData, days: e.target.value })}
//                     className="w-24"
//                   />
//                   <Button size="sm" onClick={addRakeEntry}>
//                     Add
//                   </Button>
//                 </div>
//               )}
//               {section.title === "Load Port Options" && (
//                 <div className="mt-4 flex gap-3">
//                   <Input
//                     placeholder="Country"
//                     value={newLoadPortData.country}
//                     onChange={(e) => setNewLoadPortData({ ...newLoadPortData, country: e.target.value })}
//                     className="flex-1"
//                   />
//                   <Input
//                     placeholder="Load Port"
//                     value={newLoadPortData.loadPort}
//                     onChange={(e) => setNewLoadPortData({ ...newLoadPortData, loadPort: e.target.value })}
//                     className="flex-1"
//                   />
//                   <Button size="sm" onClick={addLoadPortEntry}>
//                     Add
//                   </Button>
//                 </div>
//               )}
//               {section.title === "Load Port Options" && (
//   <div className="mt-4 flex gap-3">
//     <Input
//       placeholder="Country"
//       value={newLoadPortData.country}
//       onChange={(e) => setNewLoadPortData({ ...newLoadPortData, country: e.target.value })}
//       className="flex-1"
//     />
//     <Input
//       placeholder="Load Port"
//       value={newLoadPortData.loadPort}
//       onChange={(e) => setNewLoadPortData({ ...newLoadPortData, loadPort: e.target.value })}
//       className="flex-1"
//     />
//     <Button size="sm" onClick={addLoadPortEntry}>
//       Add
//     </Button>
//   </div>
// )}
//   {section.title === "Discharge Port Options" && (
//   <div className="mt-4 flex gap-3">
//     <Input
//       placeholder="Country"
//       value={newDischargePortData.country}
//       onChange={(e) => setNewDischargePortData({ ...newDischargePortData, country: e.target.value })}
//       className="flex-1"
//     />
//     <Input
//       placeholder="Discharge Port"
//       value={newDischargePortData.dischargePort}
//       onChange={(e) => setNewDischargePortData({ ...newDischargePortData, dischargePort: e.target.value })}
//       className="flex-1"
//     />
//     <Button size="sm" onClick={addDischargePortEntry}>
//       Add
//     </Button>
//   </div>
// )}
// {section.title === "Discharge Rate Options" && (
//   <div className="mt-4 flex gap-3">
//     <Input
//       placeholder="Discharge Port"
//       value={newDischargeRateData.port}
//       onChange={(e) => setNewDischargeRateData({ ...newDischargeRateData, port: e.target.value })}
//       className="flex-1"
//     />
//     <Input
//       placeholder="Vessel Type"
//       value={newDischargeRateData.vessel}
//       onChange={(e) => setNewDischargeRateData({ ...newDischargeRateData, vessel: e.target.value })}
//       className="flex-1"
//     />
//     <Input
//       type="number"
//       placeholder="MT/Hours"
//       value={newDischargeRateData.rate}
//       onChange={(e) => setNewDischargeRateData({ ...newDischargeRateData, rate: e.target.value })}
//       className="w-24"
//     />
//     <Button size="sm" onClick={addDischargeRateEntry}>
//       Add
//     </Button>

//   </div>
// )}
// {section.title === "Ocean Freight" && (
//   <div className="mt-4 flex gap-3">
//     <Input
//       placeholder="Load Port"
//       value={newOceanFreightData.loadPort}
//       onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, loadPort: e.target.value })}
//       className="flex-1"
//     />
//     <Input
//       placeholder="Destination Port"
//       value={newOceanFreightData.destinationPort}
//       onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, destinationPort: e.target.value })}
//       className="flex-1"
//     />
//     <Input
//       placeholder="Plant"
//       value={newOceanFreightData.plant}
//       onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, plant: e.target.value })}
//       className="flex-1"
//     />
//     <Input
//       placeholder="Vessel Type"
//       value={newOceanFreightData.vesselType}
//       onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, vesselType: e.target.value })}
//       className="flex-1"
//     />
//     <Input
//       type="number"
//       placeholder="USD/MT"
//       value={newOceanFreightData.usdPerMT}
//       onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, usdPerMT: e.target.value })}
//       className="w-24"
//     />
//     <Button size="sm" onClick={addOceanFreightEntry}>
//       Add
//     </Button>
//   </div>
// )}

// {section.title === "Rail/Road Transport (Inland Freight)" && (
//   <div className="mt-4 flex gap-3">
//     <Input
//       placeholder="Port of Discharge"
//       value={newRailRoadData.port}
//       onChange={(e) => setNewRailRoadData({ ...newRailRoadData, port: e.target.value })}
//       className="flex-1"
//     />
//     <Input
//       placeholder="Vessel Type"
//       value={newRailRoadData.vessel}
//       onChange={(e) => setNewRailRoadData({ ...newRailRoadData, vessel: e.target.value })}
//       className="flex-1"
//     />
//     <Input
//       type="number"
//       placeholder="INR/MT"
//       value={newRailRoadData.rate}
//       onChange={(e) => setNewRailRoadData({ ...newRailRoadData, rate: e.target.value })}
//       className="w-24"
//     />
//     <Button size="sm" onClick={addRailRoadEntry}>
//       Add
//     </Button>
//   </div>
// )}

// {section.title === "Indices" && (
//   <div className="mt-4 flex gap-3">
//     <Input
//       placeholder="Coal Index Name"
//       value={newIndicesData.index}
//       onChange={(e) => setNewIndicesData({ ...newIndicesData, index: e.target.value })}
//       className="flex-1"
//     />
//     <Button size="sm" onClick={addIndicesEntry}>
//       Add
//     </Button>
//   </div>
// )}
// {section.title === "Port PDA for Full Shipment" && (
//   <div className="mt-4 flex gap-3">
//     <Input
//       placeholder="Port"
//       value={newPortPDAData.port}
//       onChange={(e) => setNewPortPDAData({ ...newPortPDAData, port: e.target.value })}
//       className="flex-1"
//     />
//     <Input
//       placeholder="Vessel Type"
//       value={newPortPDAData.vessel}
//       onChange={(e) => setNewPortPDAData({ ...newPortPDAData, vessel: e.target.value })}
//       className="flex-1"
//     />
//     <Input
//       type="number"
//       placeholder="Value"
//       value={newPortPDAData.value}
//       onChange={(e) => setNewPortPDAData({ ...newPortPDAData, value: e.target.value })}
//       className="w-24"
//     />
//     <Button size="sm" onClick={addPortPDAEntry}>
//       Add
//     </Button>
//   </div>
// )}
// {section.title === "Port Handling Charges" && (
//   <div className="mt-4 flex gap-3">
//     <Input
//       placeholder="Port"
//       value={newPortHandlingData.port}
//       onChange={(e) => setNewPortHandlingData({ ...newPortHandlingData, port: e.target.value })}
//       className="flex-1"
//     />
//     <Input
//       placeholder="Vessel Type"
//       value={newPortHandlingData.vessel}
//       onChange={(e) => setNewPortHandlingData({ ...newPortHandlingData, vessel: e.target.value })}
//       className="flex-1"
//     />
//     <Input
//       type="number"
//       placeholder="Value"
//       value={newPortHandlingData.value}
//       onChange={(e) => setNewPortHandlingData({ ...newPortHandlingData, value: e.target.value })}
//       className="w-24"
//     />
//     <Button size="sm" onClick={addPortHandlingEntry}>
//       Add
//     </Button>
//   </div>
// )}
//  </CardContent>
//           )}
//         </Card>
//       ))}

//       <Dialog open={editData.sectionIndex == "Ash Realization" || editData.sectionIndex == "Losses" ||editData.sectionIndex == "Holding Period "||editData.sectionIndex == "Commerical Fixed Inputs"||editData.sectionIndex =="Technical Fixed Inputs"|| editData.sectionIndex == "Financing Cost"||editData.sectionIndex =="Import Duties"||editData.sectionIndex =="GST on Import Duty and Freight"||editData.sectionIndex =="GST on PDA"||editData.sectionIndex =="Vessel"} onOpenChange={() => setEditData({ sectionIndex: null, rowIndex: null, value: "" })}>
//         <DialogContent className="p-6 rounded-lg shadow-lg">
//           <DialogHeader>
//             <DialogTitle className="text-xl font-semibold text-gray-800">Edit Value</DialogTitle>
//           </DialogHeader>
//           <Input
//             value={editData.value}
//             onChange={(e) => setEditData({ ...editData, value: e.target.value })}
//             className="mt-3 p-2 border rounded-md"
//           />
//           <Button className="mt-4" onClick={updateValue}>
//             Update
//           </Button>
//         </DialogContent>
//       </Dialog>


//      <Dialog 
//   open={editData.sectionIndex === "Load Port Options"} 
//   onOpenChange={(isOpen) => {
//     if (!isOpen) {
//       setEditData({ sectionIndex: null, rowIndex: null, country: "", loadPort: "" });
//     }
//   }}
// >
//   <DialogContent className="p-6 rounded-lg shadow-lg">
//     <DialogHeader>
//       <DialogTitle className="text-xl font-semibold text-gray-800">
//         Edit Load Port
//       </DialogTitle>
//     </DialogHeader>

   
//     <Input
//       placeholder="Country"
//       value={editData.country}
//       onChange={(e) => setEditData({ ...editData, country: e.target.value })}
//       className="mt-3 p-2 border rounded-md"
//     />

   
//     <Input
//       placeholder="Load Port"
//       value={editData.loadPort}
//       onChange={(e) => setEditData({ ...editData, loadPort: e.target.value })}
//       className="mt-3 p-2 border rounded-md"
//     />

   
//     <Button 
//       className="mt-4" 
//       onClick={() => {
//         console.log("Updating Load Port with:", editData);
//         addLoadPortEntry(editData);  // Ensure addLoadPortEntry properly updates state
//       }}
//     >
//       Update Load Port
//     </Button>
//   </DialogContent>
// </Dialog>
//       <Dialog open={editData.sectionIndex !== null} onOpenChange={() => setEditData({ sectionIndex: null, rowIndex: null, value: "" })}>
//   <DialogContent className="p-6 rounded-lg shadow-lg">
//     <DialogHeader>
//       <DialogTitle className="text-xl font-semibold text-gray-800">Edit Value</DialogTitle>
//     </DialogHeader>
//     <Input
//       value={editData.value}
//       onChange={(e) => setEditData({ ...editData, value: e.target.value })}
//       className="mt-3 p-2 border rounded-md"
//     />
//     <Button className="mt-4" onClick={updateValue}>
//       Update
//     </Button>
//   </DialogContent>
// </Dialog>
// <Dialog open={editData.sectionIndex === "Rail/Road Transport (Inland Freight)"} onOpenChange={() => setEditData({ sectionIndex: null, rowIndex: null, value: "" })}>
//   <DialogContent className="p-6 rounded-lg shadow-lg">
//     <DialogHeader>
//       <DialogTitle className="text-xl font-semibold text-gray-800">
//         {editData.rowIndex !== null ? "Edit INR/MT" : "Add New Entry"}
//       </DialogTitle> 
//     </DialogHeader>

//     {editData.rowIndex !== null ? (
      
//       <Input
//         type="number"
//         value={editData.value}
//         onChange={(e) => setEditData({ ...editData, value: e.target.value })}
//         className="mt-3 p-2 border rounded-md"
//       />
//     ) : (
     
//       <div className="mt-4 flex gap-3">
//         <Input
//           placeholder="Port of Discharge"
//           value={newRailRoadData.port}
//           onChange={(e) => setNewRailRoadData({ ...newRailRoadData, port: e.target.value })}
//           className="flex-1"
//         />
//         <Input
//           placeholder="Vessel Type"
//           value={newRailRoadData.vessel}
//           onChange={(e) => setNewRailRoadData({ ...newRailRoadData, vessel: e.target.value })}
//           className="flex-1"
//         />
//         <Input
//           type="number"
//           placeholder="INR/MT"
//           value={newRailRoadData.rate}
//           onChange={(e) => setNewRailRoadData({ ...newRailRoadData, rate: e.target.value })}
//           className="w-24"
//         />
//       </div>
//     )}

//     <Button className="mt-4" onClick={editData.rowIndex !== null ? updateValue : addRailRoadEntry}>
//       {editData.rowIndex !== null ? "Update" : "Add"}
//     </Button>
//   </DialogContent>
// </Dialog> 

// <Dialog open={editData.sectionIndex !== null} onOpenChange={() => setEditData({ sectionIndex: null, rowIndex: null, value: "" })}>
//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle>Edit Value</DialogTitle>
//     </DialogHeader>
//     <Input 
//       placeholder="Value" 
//       value={editData.value} 
//       onChange={(e) => setEditData({ ...editData, value: e.target.value })} 
//     />
//     <Button onClick={updateValue}>Update</Button>  {/* This must be here */}
//   </DialogContent>
// </Dialog>



//     </div>
    
//   );
// }



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./styles.css";

// const initialSections = [
//   {
//     title: "Ash Realization",
//     columns: ["Parameter", "UOM", "Value", "Edit"],
//     rows: [
//       ["VJN-Revenue-Domestic", "INR/MT", "128"],
//       ["VJN-Revenue-Export", "USD/MT", "1.6"],
//       ["VJN-Penalty", "INR/MT", "-180"],
//       ["VJN-Ash Placed", "%", "73"],
//       ["Ash Exported", "%", "0"],
//     ],
//   },
//   {
//     title: "Losses",
//     columns: ["Loss", "UOM", "Value", "Edit"],
//     rows: [
//       ["Transit loss", "%", "1"],
//       ["Handling losses", "%", "0.5"],
//       ["CV Quality loss", "%", "0.8"],
//     ],
//   },
//   {
//     title: "Holding Period",
//     columns: ["Parameter", "UOM", "Value", "Edit"],
//     rows: [
//       ["LC Opening to Discharge", "MT", "40"],
//       ["Unloading at Port", "Days", "5"],
//       ["Road-Rake Movement", "Days", "5"],
//       ["Consumption for single port", "Days", "16"],
//       ["Extra-Addition for Twin-Port-Movement", "Days", "12"],
//     ],
//   },
//   {
//     title: "Rake Transit Time",
//     columns: ["Discharge Port", "No. of Days", "Edit"],
//     rows: [],
//   },
//   {
//     title: "Commerical Fixed Inputs",
//     columns: ["Parameter", "UOM", "Value", "Edit"],
//     rows: [
//       ["JITPL Margin", "%", "1.00"],
//       ["Clean Energy Cess", "INR/MT", "400"],
//       ["Stamp Duty", "%", "0.10"],
//       ["Demmurage", "USD/MT", "0.00"],
//       ["Manufacture Margin", "%", "0.00"],
//     ],
//   },
//   {
//     title: "Technical Fixed Inputs",
//     columns: ["Parameter", "UOM", "Value", "Edit"],
//     rows: [
//       ["Reference Air Temperature", "degree C", "33.7994"],
//       ["Partial Pressure", "KSC", "0.0703"],
//       ["Weight of water vapour per kg of dry air", "Kg/Kg", "0.210"],
//       ["Temp of bottom ash above ambient", "degree C", "600.00"],
//       ["Distribution of fly ash", "%", "90.00"],
//       ["Instantaneous SP heat of flue gas at TRA", "Kg/Kg/degree C", "0.9920"],
//       ["Instantaneous SP heat of flue gas at Tg", "Kg/Kg/degree C", "1.0780"],
//       ["Sensible heat of bottom ash", "Kg/Kg/degree C", "0.2500"],
//       ["Specific head of fly ash", "Kg/Kg/degree C", "0.2000"],
//       ["Manufacture margin and upaccounted", "%", "0.7400"],
//     ],
//   },
//   {
//     title: "Financing Cost",
//     columns: ["Parameter", "UOM", "Value", "Edit"],
//     rows: [
//       ["LC", "%", "1.00"],
//       ["Imported Cost of Capital", "%p.a.", "0.50"],
//       ["Supplier's Cost", "%p.a.", "5.1"],
//       ["Hedging Cost", "%p.a.", "0.60"],
//       ["Free Cashflows Cost of Capital", "%p.a.", "4.50"],
//       ["Credit Line Cost", "%p.a.", "8.75"],
//     ],
//   },
//   {
//     title: "Import Duties",
//     columns: ["Parameter", "UOM", "Value", "Edit"],
//     rows: [
//       ["Australia", "%", "0.00"],
//       ["South African", "%", "2.75"],
//       ["Mozambique", "%", "0.00"],
//       ["Indonesia", "%", "0.00"],
//       ["Colombia", "%", "2.75"],
//       ["Russsian Fedration", "%", "2.75"],
//     ],
//   },
//   {
//     title: "GST on Import Duty and Freight",
//     columns: ["Parameter", "UOM", "Value", "Edit"],
//     rows: [
//       ["JSW Steel", "%", "0.00"],
//       ["JSW Energy", "%", "5.00"],
//     ],
//   },
//   {
//     title: "GST on PDA",
//     columns: ["Parameter", "UOM", "Value", "Edit"],
//     rows: [
//       ["JSW Steel", "%", "0.00"],
//       ["JSW Energy", "%", "18.00"],
//     ],
//   },
//   {
//     title: "Load Port Options",
//     columns: ["Country", "Load Port", "Edit"],
//     rows: [],
//   },
//   {
//     title: "Discharge Port Options",
//     columns: ["Country", "Discharge Port", "Edit"],
//     rows: [],
//   },
//   {
//     title: "Discharge Rate Options",
//     columns: ["Discharge Port", "Vessel Type", "MT/Hours", "Edit"],
//     rows: [],
//   },
//   {
//     title: "Vessel",
//     columns: ["Type", "UOM", "Value", "Edit"],
//     rows: [
//       ["Cape", "kT", "150000.00"],
//       ["Panamax", "kT", "75000.00"],
//     ],
//   },
//   {
//     title: "Ocean Freight",
//     columns: ["Load Port", "Destination Port", "Plant", "Vessel Type", "USD/MT", "Edit"],
//     rows: [],
//   },
//   {
//     title: "Rail/Road Transport(Inland Freight)",
//     columns: ["Port of Discharge", "Vessel Type", "INR/MT", "Edit"],
//     rows: [],
//   },
//   {
//     title: "Indices",
//     columns: ["Coal Indices", "Edit"],
//     rows: [],
//   },
//   {
//     title: "Port PDA for Full Shipment",
//     columns: ["Port", "Vessel Type", "Value", "Edit"],
//     rows: [],
//   },
//   {
//     title: "Port Handling Charges",
//     columns: ["Port", "Vessel Type", "Value", "Edit"],
//     rows: [],
//   },
// ];

// export default function Logistics() {
//   const [sections, setSections] = useState([]);



//   useEffect(() => {
//     const socket = new WebSocket('ws://localhost:8000/ws/sections/');
  
//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
  
//       if (data.type === 'initialSections') {
//         setSections(data.sections);
//       }
  
//       if (data.type === 'section_updated') {
//         setSections(prevSections => {
//           return prevSections.map(sec => 
//             sec.title === data.section.title ? data.section : sec
//           );
//         });
//       }
//     };
  
//     return () => socket.close();
//   }, []);
  
//   // Instead of tracking which section is open, we'll make all sections visible
//   const [editData, setEditData] = useState({ sectionIndex: null, rowIndex: null, value: "" });
//   const [newRakeData, setNewRakeData] = useState({ port: "", days: "" });
//   const [newLoadPortData, setNewLoadPortData] = useState({ country: "", port: "" });
//   const [newDischargePortData, setNewDischargePortData] = useState({ country: "", dischargePort: "" });
//   const [newDischargeRateData, setNewDischargeRateData] = useState({ port: "", vessel: "", rate: "" });
//   const [newOceanFreightData, setNewOceanFreightData] = useState({
//     loadPort: "",
//     destinationPort: "",
//     plant: "",
//     vesselType: "",
//     usdPerMT: "",
//   });
//   const [newRailRoadData, setNewRailRoadData] = useState({
//     port: "",
//     vessel: "",
//     rate: "",
//   });
//   const [newIndicesData, setNewIndicesData] = useState({
//     index: "",
//   });
//   const [newPortPDAData, setNewPortPDAData] = useState({
//     port: "",
//     vessel: "",
//     value: "",
//   });
//   const [newPortHandlingData, setNewPortHandlingData] = useState({
//     port: "",
//     vessel: "",
//     value: "",
//   });

//   const navigate = useNavigate();



//   const openEditDialog = (sectionIndex, rowIndex, value) => {
//     setEditData({ sectionIndex, rowIndex, value });
//   };

//   const updateValue = () => {
//     if (editData.sectionIndex !== null && editData.rowIndex !== null) {
//       const updatedSections = [...sections];
//       const sectionTitle = updatedSections[editData.sectionIndex].title;

//       // Determine which column to update based on the section title
//       let columnIndex;
//       switch (sectionTitle) {
//         case "GST on Import Duty and Freight":
//         case "GST on PDA":
//         case "Port PDA for Full Shipment":
//         case "Port Handling Charges":
//         case "Rake Transit Time":
//         case "Commerical Fixed Inputs":
//         case "Technical Fixed Inputs":
//         case "Financing Cost":
//         case "Import Duties":
//         case "Vessel":
//           columnIndex = 2; // "Value" column
//           break;

//         case "Load Port Options":
//           columnIndex = 1; // "Load Port" column
//           break;
//         case "Discharge Port Options":
//           columnIndex = 1; // "Discharge Port" column
//           break;

//         case "Discharge Rate Options":
//           columnIndex = 2; // "MT/Hours" column
//           break;

//         case "Ocean Freight":
//           columnIndex = 4; // "USD/MT" column
//           break;

//         case "Rail/Road Transport(Inland Freight)":
//           columnIndex = 2; // "INR/MT" column
//           break;

//         case "Indices":
//           columnIndex = 0; // "Coal Indices" column
//           break;
//         case "Ash Realization":
//           columnIndex = 2;
//           break;
//         case "Losses":
//           columnIndex = 2;
//           break;
//         case "Holding Period":
//           columnIndex = 2;
//           break;
//         default:
//           columnIndex = 2; // Default to "Value" column
//       }

//       // Update the correct column in the selected row
//       updatedSections[editData.sectionIndex].rows[editData.rowIndex][columnIndex] = editData.value;

//       // Update the state
//       setSections(updatedSections);
//       setEditData({ sectionIndex: null, rowIndex: null, value: "" });
//     }
//   };

//   const addRakeEntry = () => {
//     if (newRakeData.port && newRakeData.days) {
//       const updatedSections = [...sections];
//       const rakeIndex = updatedSections.findIndex((s) => s.title === "Rake Transit Time");

//       if (rakeIndex !== -1) {
//         updatedSections[rakeIndex].rows.push([newRakeData.port, newRakeData.days]);
//       }

//       setSections(updatedSections);
//       setNewRakeData({ port: "", days: "" });
//     }
//   };

//   const addLoadPortEntry = () => {
//     if (newLoadPortData.country && newLoadPortData.port) {
//       const updatedSections = [...sections];
//       const loadPortIndex = updatedSections.findIndex((s) => s.title === "Load Port Options");

//       if (loadPortIndex !== -1) {
//         updatedSections[loadPortIndex].rows.push([newLoadPortData.country, newLoadPortData.port]);
//       }

//       setSections(updatedSections);
//       setNewLoadPortData({ country: "", port: "" });
//     }
//   };

//   const addDischargePortEntry = () => {
//     if (newDischargePortData.country && newDischargePortData.dischargePort) {
//       const updatedSections = [...sections];
//       const dischargePortIndex = updatedSections.findIndex((s) => s.title === "Discharge Port Options");

//       if (dischargePortIndex !== -1) {
//         updatedSections[dischargePortIndex].rows.push([
//           newDischargePortData.country,
//           newDischargePortData.dischargePort,
//         ]);
//       }

//       setSections(updatedSections);
//       setNewDischargePortData({ country: "", dischargePort: "" });
//     }
//   };

//   const addDischargeRateEntry = () => {
//     if (newDischargeRateData.port && newDischargeRateData.vessel && newDischargeRateData.rate) {
//       const updatedSections = [...sections];
//       const dischargeRateIndex = updatedSections.findIndex((s) => s.title === "Discharge Rate Options");

//       if (dischargeRateIndex !== -1) {
//         updatedSections[dischargeRateIndex].rows.push([
//           newDischargeRateData.port,
//           newDischargeRateData.vessel,
//           newDischargeRateData.rate,
//         ]);
//       }

//       setSections(updatedSections);
//       setNewDischargeRateData({ port: "", vessel: "", rate: "" });
//     }
//   };

//   const addOceanFreightEntry = () => {
//     if (
//       newOceanFreightData.loadPort &&
//       newOceanFreightData.destinationPort &&
//       newOceanFreightData.plant &&
//       newOceanFreightData.vesselType &&
//       newOceanFreightData.usdPerMT
//     ) {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.title === "Ocean Freight"
//             ? { ...section, rows: [...section.rows, Object.values(newOceanFreightData)] }
//             : section
//         )
//       );

//       // Reset the input fields
//       setNewOceanFreightData({
//         loadPort: "",
//         destinationPort: "",
//         plant: "",
//         vesselType: "",
//         usdPerMT: "",
//       });
//     }
//   };

//   const addRailRoadEntry = () => {
//     if (newRailRoadData.port && newRailRoadData.vessel && newRailRoadData.rate) {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.title === "Rail/Road Transport(Inland Freight)"
//             ? {
//                 ...section,
//                 rows: [...section.rows, [newRailRoadData.port, newRailRoadData.vessel, newRailRoadData.rate]],
//               }
//             : section
//         )
//       );
//       setNewRailRoadData({ port: "", vessel: "", rate: "" });
//     }
//   };

//   const addIndicesEntry = () => {
//     if (newIndicesData.index) {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.title === "Indices"
//             ? { ...section, rows: [...section.rows, [newIndicesData.index]] }
//             : section
//         )
//       );
//       setNewIndicesData({ index: "" });
//     }
//   };

//   const addPortPDAEntry = () => {
//     if (newPortPDAData.port && newPortPDAData.vessel && newPortPDAData.value) {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.title === "Port PDA for Full Shipment"
//             ? {
//                 ...section,
//                 rows: [...section.rows, [newPortPDAData.port, newPortPDAData.vessel, newPortPDAData.value]],
//               }
//             : section
//         )
//       );
//       setNewPortPDAData({ port: "", vessel: "", value: "" });
//     }
//   };

//   const addPortHandlingEntry = () => {
//     if (newPortHandlingData.port && newPortHandlingData.vessel && newPortHandlingData.value) {
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.title === "Port Handling Charges"
//             ? {
//                 ...section,
//                 rows: [...section.rows, [newPortHandlingData.port, newPortHandlingData.vessel, newPortHandlingData.value]],
//               }
//             : section
//         )
//       );
//       setNewPortHandlingData({ port: "", vessel: "", value: "" });
//     }
//   };

//   return (
//     <div className="logistics-container">
//       <h1 className="logistics-title">Logistical & Financial Inputs</h1>
//       <button onClick={() => navigate("/coal")} className="nav-button">
//         Coal Analysis
//       </button>
//       <button onClick={() => navigate("/operation-constraints")} className="nav-button">
//         Operating Constraints
//       </button>

//       {sections.map((section, index) => (
//         <div key={index} className="card">
//           <div className="card-header">
//             <div className="card-title">
//               {section.title}
//             </div>
//           </div>
//           <div className="card-content">
//             <table className="logistics-table">
//               <thead>
//                 <tr>
//                   {section.columns.map((col, i) => (
//                     <th key={i}>{col}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {section.rows.length > 0 ? (
//                   section.rows.map((row, i) => (
//                     <tr key={i}>
//                       {row.map((cell, j) => (
//                         <td key={j}>{cell}</td>
//                       ))}
//                       <td>
//                         <button className="edit-button" onClick={() => openEditDialog(index, i, row[2])}>
//                           Edit
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={section.columns.length} className="empty-message">
//                       No Data Available
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>

//             {section.title === "Rake Transit Time" && (
//               <div className="input-group">
//                 <input
//                   placeholder="Discharge Port"
//                   value={newRakeData.port}
//                   onChange={(e) => setNewRakeData({ ...newRakeData, port: e.target.value })}
//                   className="form-input"
//                 />
//                 <input
//                   type="number"
//                   placeholder="No. of Days"
//                   value={newRakeData.days}
//                   onChange={(e) => setNewRakeData({ ...newRakeData, days: e.target.value })}
//                   className="form-input"
//                 />
//                 <button className="add-button" onClick={addRakeEntry}>
//                   Add
//                 </button>
//               </div>
//             )}

//             {section.title === "Load Port Options" && (
//               <div className="input-group">
//                 <input
//                   placeholder="Country"
//                   value={newLoadPortData.country}
//                   onChange={(e) => setNewLoadPortData({ ...newLoadPortData, country: e.target.value })}
//                   className="form-input"
//                 />
//                 <input
//                   placeholder="Load Port"
//                   value={newLoadPortData.port}
//                   onChange={(e) => setNewLoadPortData({ ...newLoadPortData, port: e.target.value })}
//                   className="form-input"
//                 />
//                 <button className="add-button" onClick={addLoadPortEntry}>
//                   Add
//                 </button>
//               </div>
//             )}

//             {section.title === "Discharge Port Options" && (
//               <div className="input-group">
//                 <input
//                   placeholder="Country"
//                   value={newDischargePortData.country}
//                   onChange={(e) => setNewDischargePortData({ ...newDischargePortData, country: e.target.value })}
//                   className="form-input"
//                 />
//                 <input
//                   placeholder="Discharge Port"
//                   value={newDischargePortData.dischargePort}
//                   onChange={(e) =>
//                     setNewDischargePortData({ ...newDischargePortData, dischargePort: e.target.value })
//                   }
//                   className="form-input"
//                 />
//                 <button className="add-button" onClick={addDischargePortEntry}>
//                   Add
//                 </button>
//               </div>
//             )}

//             {section.title === "Discharge Rate Options" && (
//               <div className="input-group">
//                 <input
//                   placeholder="Discharge Port"
//                   value={newDischargeRateData.port}
//                   onChange={(e) => setNewDischargeRateData({ ...newDischargeRateData, port: e.target.value })}
//                   className="form-input"
//                 />
//                 <input
//                   placeholder="Vessel Type"
//                   value={newDischargeRateData.vessel}
//                   onChange={(e) => setNewDischargeRateData({ ...newDischargeRateData, vessel: e.target.value })}
//                   className="form-input"
//                 />
//                 <input
//                   type="number"
//                   placeholder="MT/Hours"
//                   value={newDischargeRateData.rate}
//                   onChange={(e) => setNewDischargeRateData({ ...newDischargeRateData, rate: e.target.value })}
//                   className="form-input"
//                 />
//                 <button className="add-button" onClick={addDischargeRateEntry}>
//                   Add
//                 </button>
//               </div>
//             )}

//             {section.title === "Ocean Freight" && (
//               <div className="input-group">
//                 <input
//                   placeholder="Load Port"
//                   value={newOceanFreightData.loadPort}
//                   onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, loadPort: e.target.value })}
//                   className="form-input"
//                 />
//                 <input
//                   placeholder="Destination Port"
//                   value={newOceanFreightData.destinationPort}
//                   onChange={(e) =>
//                     setNewOceanFreightData({ ...newOceanFreightData, destinationPort: e.target.value })
//                   }
//                   className="form-input"
//                 />
//                 <input
//                   placeholder="Plant"
//                   value={newOceanFreightData.plant}
//                   onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, plant: e.target.value })}
//                   className="form-input"
//                 />
//                 <input
//                   placeholder="Vessel Type"
//                   value={newOceanFreightData.vesselType}
//                   onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, vesselType: e.target.value })}
//                   className="form-input"
//                 />
//                 <input
//                   type="number"
//                   placeholder="USD/MT"
//                   value={newOceanFreightData.usdPerMT}
//                   onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, usdPerMT: e.target.value })}
//                   className="form-input"
//                 />
//                 <button className="add-button" onClick={addOceanFreightEntry}>
//                   Add
//                 </button>
//               </div>
//             )}

//             {section.title === "Rail/Road Transport(Inland Freight)" && (
//               <div className="input-group">
//                 <input
//                   placeholder="Port of Discharge"
//                   value={newRailRoadData.port}
//                   onChange={(e) => setNewRailRoadData({ ...newRailRoadData, port: e.target.value })}
//                   className="form-input"
//                 />
//                 <input
//                   placeholder="Vessel Type"
//                   value={newRailRoadData.vessel}
//                   onChange={(e) => setNewRailRoadData({ ...newRailRoadData, vessel: e.target.value })}
//                   className="form-input"
//                 />
//                 <input
//                   type="number"
//                   placeholder="INR/MT"
//                   value={newRailRoadData.rate}
//                   onChange={(e) => setNewRailRoadData({ ...newRailRoadData, rate: e.target.value })}
//                   className="form-input"
//                 />
//                 <button className="add-button" onClick={addRailRoadEntry}>
//                   Add
//                 </button>
//               </div>
//             )}

//             {section.title === "Indices" && (
//               <div className="input-group">
//                 <input
//                   placeholder="Coal Index Name"
//                   value={newIndicesData.index}
//                   onChange={(e) => setNewIndicesData({ ...newIndicesData, index: e.target.value })}
//                   className="form-input"
//                 />
//                 <button className="add-button" onClick={addIndicesEntry}>
//                   Add
//                 </button>
//               </div>
//             )}

//             {section.title === "Port PDA for Full Shipment" && (
//               <div className="input-group">
//                 <input
//                   placeholder="Port"
//                   value={newPortPDAData.port}
//                   onChange={(e) => setNewPortPDAData({ ...newPortPDAData, port: e.target.value })}
//                   className="form-input"
//                 />
//                 <input
//                   placeholder="Vessel Type"
//                   value={newPortPDAData.vessel}
//                   onChange={(e) => setNewPortPDAData({ ...newPortPDAData, vessel: e.target.value })}
//                   className="form-input"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Value"
//                   value={newPortPDAData.value}
//                   onChange={(e) => setNewPortPDAData({ ...newPortPDAData, value: e.target.value })}
//                   className="form-input"
//                 />
//                 <button className="add-button" onClick={addPortPDAEntry}>
//                   Add
//                 </button>
//               </div>
//             )}

//             {section.title === "Port Handling Charges" && (
//               <div className="input-group">
//                 <input
//                   placeholder="Port"
//                   value={newPortHandlingData.port}
//                   onChange={(e) => setNewPortHandlingData({ ...newPortHandlingData, port: e.target.value })}
//                   className="form-input"
//                 />
//                 <input
//                   placeholder="Vessel Type"
//                   value={newPortHandlingData.vessel}
//                   onChange={(e) => setNewPortHandlingData({ ...newPortHandlingData, vessel: e.target.value })}
//                   className="form-input"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Value"
//                   value={newPortHandlingData.value}
//                   onChange={(e) => setNewPortHandlingData({ ...newPortHandlingData, value: e.target.value })}
//                   className="form-input"
//                 />
//                 <button className="add-button" onClick={addPortHandlingEntry}>
//                   Add
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}

//       {/* Edit Dialog */}
//       {editData.sectionIndex !== null && (
//         <div className="modal-overlay" onClick={() => setEditData({ sectionIndex: null, rowIndex: null, value: "" })}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h3 className="modal-title">Edit Value</h3>
//             </div>
//             <div className="modal-body">
//               <input
//                 className="form-input"
//                 placeholder="Value"
//                 value={editData.value}
//                 onChange={(e) => setEditData({ ...editData, value: e.target.value })}
//               />
//               <div className="modal-actions">
//                 <button
//                   className="cancel-button"
//                   onClick={() => setEditData({ sectionIndex: null, rowIndex: null, value: "" })}
//                 >
//                   Cancel
//                 </button>
//                 <button className="save-button" onClick={updateValue}>
//                   Update
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useState, useEffect,useRef } from "react";
// import { io } from 'socket.io-client';
// import { useNavigate } from "react-router-dom";
// import "./styles.css";

// // Define the sections structure
// const initialSections = [
//   {
//     title: "Ash Realization",
//     columns: ["Parameter", "UOM", "Value", "Edit"],
//     rows: [
//       ["VJN-Revenue-Domestic", "INR/MT", "128"],
//       ["VJN-Revenue-Export", "USD/MT", "1.6"],
//       ["VJN-Penalty", "INR/MT", "-180"],
//       ["VJN-Ash Placed", "%", "73"],
//       ["Ash Exported", "%", "0"],
//     ],
//   },
//   {
//     title: "Losses",
//     columns: ["Loss", "UOM", "Value", "Edit"],
//     rows: [
//       ["Transit loss", "%", "1"],
//       ["Handling losses", "%", "0.5"],
//       ["CV Quality loss", "%", "0.8"],
//     ],
//   },
//   {
//     title: "Holding Period",
//     columns: ["Parameter", "UOM", "Value", "Edit"],
//     rows: [
//       ["LC Opening to Discharge", "MT", "40"],
//       ["Unloading at Port", "Days", "5"],
//       ["Road-Rake Movement", "Days", "5"],
//       ["Consumption for single port", "Days", "16"],
//       ["Extra-Addition for Twin-Port-Movement", "Days", "12"],
//     ],
//   },
//   {
//     title: "Rake Transit Time",
//     columns: ["Discharge Port", "No. of Days", "Edit"],
//     rows: [],
//   },
//   {
//     title: "Commerical Fixed Inputs",
//     columns: ["Parameter", "UOM", "Value", "Edit"],
//     rows: [
//       ["JITPL Margin", "%", "1.00"],
//       ["Clean Energy Cess", "INR/MT", "400"],
//       ["Stamp Duty", "%", "0.10"],
//       ["Demmurage", "USD/MT", "0.00"],
//       ["Manufacture Margin", "%", "0.00"],
//     ],
//   },
//   {
//     title: "Technical Fixed Inputs",
//     columns: ["Parameter", "UOM", "Value", "Edit"],
//     rows: [
//       ["Reference Air Temperature", "degree C", "33.7994"],
//       ["Partial Pressure", "KSC", "0.0703"],
//       ["Weight of water vapour per kg of dry air", "Kg/Kg", "0.210"],
//       ["Temp of bottom ash above ambient", "degree C", "600.00"],
//       ["Distribution of fly ash", "%", "90.00"],
//       ["Instantaneous SP heat of flue gas at TRA", "Kg/Kg/degree C", "0.9920"],
//       ["Instantaneous SP heat of flue gas at Tg", "Kg/Kg/degree C", "1.0780"],
//       ["Sensible heat of bottom ash", "Kg/Kg/degree C", "0.2500"],
//       ["Specific head of fly ash", "Kg/Kg/degree C", "0.2000"],
//       ["Manufacture margin and upaccounted", "%", "0.7400"],
//     ],
//   },
//   {
//     title: "Financing Cost",
//     columns: ["Parameter", "UOM", "Value", "Edit"],
//     rows: [
//       ["LC", "%", "1.00"],
//       ["Imported Cost of Capital", "%p.a.", "0.50"],
//       ["Supplier's Cost", "%p.a.", "5.1"],
//       ["Hedging Cost", "%p.a.", "0.60"],
//       ["Free Cashflows Cost of Capital", "%p.a.", "4.50"],
//       ["Credit Line Cost", "%p.a.", "8.75"],
//     ],
//   },
//   {
//     title: "Import Duties",
//     columns: ["Parameter", "UOM", "Value", "Edit"],
//     rows: [
//       ["Australia", "%", "0.00"],
//       ["South African", "%", "2.75"],
//       ["Mozambique", "%", "0.00"],
//       ["Indonesia", "%", "0.00"],
//       ["Colombia", "%", "2.75"],
//       ["Russsian Fedration", "%", "2.75"],
//     ],
//   },
//   {
//     title: "GST on Import Duty and Freight",
//     columns: ["Parameter", "UOM", "Value", "Edit"],
//     rows: [
//       ["JSW Steel", "%", "0.00"],
//       ["JSW Energy", "%", "5.00"],
//     ],
//   },
//   {
//     title: "GST on PDA",
//     columns: ["Parameter", "UOM", "Value", "Edit"],
//     rows: [
//       ["JSW Steel", "%", "0.00"],
//       ["JSW Energy", "%", "18.00"],
//     ],
//   },
//   {
//     title: "Load Port Options",
//     columns: ["Country", "Load Port", "Edit"],
//     rows: [],
//   },
//   {
//     title: "Discharge Port Options",
//     columns: ["Country", "Discharge Port", "Edit"],
//     rows: [],
//   },
//   {
//     title: "Discharge Rate Options",
//     columns: ["Discharge Port", "Vessel Type", "MT/Hours", "Edit"],
//     rows: [],
//   },
//   {
//     title: "Vessel",
//     columns: ["Type", "UOM", "Value", "Edit"],
//     rows: [
//       ["Cape", "kT", "150000.00"],
//       ["Panamax", "kT", "75000.00"],
//     ],
//   },
//   {
//     title: "Ocean Freight",
//     columns: ["Load Port", "Destination Port", "Plant", "Vessel Type", "USD/MT", "Edit"],
//     rows: [],
//   },
//   {
//     title: "Rail/Road Transport(Inland Freight)",
//     columns: ["Port of Discharge", "Vessel Type", "INR/MT", "Edit"],
//     rows: [],
//   },
//   {
//     title: "Indices",
//     columns: ["Coal Indices", "Edit"],
//     rows: [],
//   },
//   {
//     title: "Port PDA for Full Shipment",
//     columns: ["Port", "Vessel Type", "Value", "Edit"],
//     rows: [],
//   },
//   {
//     title: "Port Handling Charges",
//     columns: ["Port", "Vessel Type", "Value", "Edit"],
//     rows: [],
//   },
// ];
// const socket = io('http://localhost:5000'); 


// export default function Logistics() {
//   // Initialize with initialSections data
//   const [sections, setSections] = useState(initialSections);
//   // Track which sections are open (initially all are open)
//   const [openSections, setOpenSections] = useState(
//     initialSections.map((_, index) => index)
//   );
//   const [editData, setEditData] = useState({ sectionIndex: null, rowIndex: null, value: "" });
//   const [newRakeData, setNewRakeData] = useState({ port: "", days: "" });
//   const [newLoadPortData, setNewLoadPortData] = useState({ country: "", port: "" });
//   const [newDischargePortData, setNewDischargePortData] = useState({ country: "", dischargePort: "" });
//   const [newDischargeRateData, setNewDischargeRateData] = useState({ port: "", vessel: "", rate: "" });
//   const [newOceanFreightData, setNewOceanFreightData] = useState({
//     loadPort: "",
//     destinationPort: "",
//     plant: "",
//     vesselType: "",
//     usdPerMT: "",
//   });
//   const [newRailRoadData, setNewRailRoadData] = useState({
//     port: "",
//     vessel: "",
//     rate: "",
//   });
//   const [newIndicesData, setNewIndicesData] = useState({
//     index: "",
//   });
//   const [newPortPDAData, setNewPortPDAData] = useState({
//     port: "",
//     vessel: "",
//     value: "",
//   });
//   const [newPortHandlingData, setNewPortHandlingData] = useState({
//     port: "",
//     vessel: "",
//     value: "",
//   });
//   const socketRef = useRef(null);

//   useEffect(() => {
//     socketRef.current = io('http://localhost:5000'); // Adjust URL if needed

//     const socket = socketRef.current;

//     socket.on('connect', () => {
//       console.log('🟢 Connected to socket server');
//     });

//     // socket.on('initialData', (data) => {
//     //   console.log('📦 Initial constraint data:', data);
//     // });

//     socket.on('updateConstraints', (updated) => {
//       console.log('♻️ Constraints updated:', updated);
//     });

//     socket.on('disconnect', () => {
//       console.log('🔴 Disconnected from socket server');
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);
//   const navigate = useNavigate();

  

//   // Function to toggle section visibility
//   const toggleSection = (index) => {
//     setOpenSections(prev => {
//       if (prev.includes(index)) {
//         return prev.filter(i => i !== index);
//       } else {
//         return [...prev, index];
//       }
//     });
//   };

//   const openEditDialog = (sectionIndex, rowIndex, value) => {
//     setEditData({ sectionIndex, rowIndex, value });
//   };

//   const updateValue = () => {
//     if (editData.sectionIndex !== null && editData.rowIndex !== null) {
//       const updatedSections = [...sections];
//       const sectionTitle = updatedSections[editData.sectionIndex].title;

//       // Determine which column to update based on the section title
      // let columnIndex;
      // switch (sectionTitle) {
      //   case "GST on Import Duty and Freight":
      //   case "GST on PDA":
      //   case "Port PDA for Full Shipment":
      //   case "Port Handling Charges":
      //   case "Commerical Fixed Inputs":
      //   case "Technical Fixed Inputs":
      //   case "Financing Cost":
      //   case "Import Duties":
      //   case "Vessel":
      //     columnIndex = 2; // "Value" column
      //     break;

      //   case "Load Port Options":
      //     columnIndex = 1; // "Load Port" column
      //     break;
      //   case "Discharge Port Options":
      //     columnIndex = 1; // "Discharge Port" column
      //     break;

      //   case "Discharge Rate Options":
      //     columnIndex = 2; // "MT/Hours" column
      //     break;

      //   case "Ocean Freight":
      //     columnIndex = 4; // "USD/MT" column
      //     break;

      //   case "Rail/Road Transport(Inland Freight)":
      //     columnIndex = 2; // "INR/MT" column
      //     break;

      //   case "Indices":
      //     columnIndex = 0; // "Coal Indices" column
      //     break;
      //   case "Rake Transit Time":
      //     columnIndex = 1; // "No. of Days" column
      //     break;
      //   case "Ash Realization":
      //     columnIndex = 2; 
      //     break;
      //   case "Losses":
      //     columnIndex = 2; 
      //     break;
      //   case "Holding Period":
      //     columnIndex = 2; 
      //     break;
        
      //   default:
      //     columnIndex = 2; // Default to "Value" column
      // }

//       // Update the correct column in the selected row
//       updatedSections[editData.sectionIndex].rows[editData.rowIndex][columnIndex] = editData.value;

//       // Update the state
//       setSections(updatedSections);
      
//       // Send update to server via WebSocket
//       if (socket && socket.readyState === WebSocket.OPEN) {
//         socket.send(JSON.stringify({
//           type: 'update_section',
//           section: updatedSections[editData.sectionIndex]
//         }));
//       }
      
//       setEditData({ sectionIndex: null, rowIndex: null, value: "" });
//     }
//   };

//   const addRakeEntry = () => {
//     if (newRakeData.port && newRakeData.days) {
//       const updatedSections = [...sections];
//       const rakeIndex = updatedSections.findIndex((s) => s.title === "Rake Transit Time");

//       if (rakeIndex !== -1) {
//         updatedSections[rakeIndex].rows.push([newRakeData.port, newRakeData.days]);
        
//         // Update state and send to server
//         setSections(updatedSections);
//         if (socket && socket.readyState === WebSocket.OPEN) {
//           socket.send(JSON.stringify({
//             type: 'update_section',
//             section: updatedSections[rakeIndex]
//           }));
//         }
//       }

//       setNewRakeData({ port: "", days: "" });
//     }
//   };

//   const addLoadPortEntry = () => {
//     if (newLoadPortData.country && newLoadPortData.port) {
//       const updatedSections = [...sections];
//       const loadPortIndex = updatedSections.findIndex((s) => s.title === "Load Port Options");

//       if (loadPortIndex !== -1) {
//         updatedSections[loadPortIndex].rows.push([newLoadPortData.country, newLoadPortData.port]);
        
//         // Update state and send to server
//         setSections(updatedSections);
//         if (socket && socket.readyState === WebSocket.OPEN) {
//           socket.send(JSON.stringify({
//             type: 'update_section',
//             section: updatedSections[loadPortIndex]
//           }));
//         }
//       }

//       setNewLoadPortData({ country: "", port: "" });
//     }
//   };

//   const addDischargePortEntry = () => {
//     if (newDischargePortData.country && newDischargePortData.dischargePort) {
//       const updatedSections = [...sections];
//       const dischargePortIndex = updatedSections.findIndex((s) => s.title === "Discharge Port Options");

//       if (dischargePortIndex !== -1) {
//         updatedSections[dischargePortIndex].rows.push([
//           newDischargePortData.country,
//           newDischargePortData.dischargePort,
//         ]);
        
//         // Update state and send to server
//         setSections(updatedSections);
//         if (socket && socket.readyState === WebSocket.OPEN) {
//           socket.send(JSON.stringify({
//             type: 'update_section',
//             section: updatedSections[dischargePortIndex]
//           }));
//         }
//       }

//       setNewDischargePortData({ country: "", dischargePort: "" });
//     }
//   };

//   const addDischargeRateEntry = () => {
//     if (newDischargeRateData.port && newDischargeRateData.vessel && newDischargeRateData.rate) {
//       const updatedSections = [...sections];
//       const dischargeRateIndex = updatedSections.findIndex((s) => s.title === "Discharge Rate Options");

//       if (dischargeRateIndex !== -1) {
//         updatedSections[dischargeRateIndex].rows.push([
//           newDischargeRateData.port,
//           newDischargeRateData.vessel,
//           newDischargeRateData.rate,
//         ]);
        
//         // Update state and send to server
//         setSections(updatedSections);
//         if (socket && socket.readyState === WebSocket.OPEN) {
//           socket.send(JSON.stringify({
//             type: 'update_section',
//             section: updatedSections[dischargeRateIndex]
//           }));
//         }
//       }

//       setNewDischargeRateData({ port: "", vessel: "", rate: "" });
//     }
//   };

//   const addOceanFreightEntry = () => {
//     if (
//       newOceanFreightData.loadPort &&
//       newOceanFreightData.destinationPort &&
//       newOceanFreightData.plant &&
//       newOceanFreightData.vesselType &&
//       newOceanFreightData.usdPerMT
//     ) {
//       const updatedSections = [...sections];
//       const oceanFreightIndex = updatedSections.findIndex((s) => s.title === "Ocean Freight");
      
//       if (oceanFreightIndex !== -1) {
//         updatedSections[oceanFreightIndex].rows.push(Object.values(newOceanFreightData));
        
//         // Update state and send to server
//         setSections(updatedSections);
//         if (socket && socket.readyState === WebSocket.OPEN) {
//           socket.send(JSON.stringify({
//             type: 'update_section',
//             section: updatedSections[oceanFreightIndex]
//           }));
//         }
//       }

//       // Reset the input fields
//       setNewOceanFreightData({
//         loadPort: "",
//         destinationPort: "",
//         plant: "",
//         vesselType: "",
//         usdPerMT: "",
//       });
//     }
//   };

//   const addRailRoadEntry = () => {
//     if (newRailRoadData.port && newRailRoadData.vessel && newRailRoadData.rate) {
//       const updatedSections = [...sections];
//       const railRoadIndex = updatedSections.findIndex((s) => s.title === "Rail/Road Transport(Inland Freight)");
      
//       if (railRoadIndex !== -1) {
//         updatedSections[railRoadIndex].rows.push([
//           newRailRoadData.port, 
//           newRailRoadData.vessel, 
//           newRailRoadData.rate
//         ]);
        
//         // Update state and send to server
//         setSections(updatedSections);
//         if (socket && socket.readyState === WebSocket.OPEN) {
//           socket.send(JSON.stringify({
//             type: 'update_section',
//             section: updatedSections[railRoadIndex]
//           }));
//         }
//       }
      
//       setNewRailRoadData({ port: "", vessel: "", rate: "" });
//     }
//   };

//   const addIndicesEntry = () => {
//     if (newIndicesData.index) {
//       const updatedSections = [...sections];
//       const indicesIndex = updatedSections.findIndex((s) => s.title === "Indices");
      
//       if (indicesIndex !== -1) {
//         updatedSections[indicesIndex].rows.push([newIndicesData.index]);
        
//         // Update state and send to server
//         setSections(updatedSections);
//         if (socket && socket.readyState === WebSocket.OPEN) {
//           socket.send(JSON.stringify({
//             type: 'update_section',
//             section: updatedSections[indicesIndex]
//           }));
//         }
//       }
      
//       setNewIndicesData({ index: "" });
//     }
//   };

//   const addPortPDAEntry = () => {
//     if (newPortPDAData.port && newPortPDAData.vessel && newPortPDAData.value) {
//       const updatedSections = [...sections];
//       const portPDAIndex = updatedSections.findIndex((s) => s.title === "Port PDA for Full Shipment");
      
//       if (portPDAIndex !== -1) {
//         updatedSections[portPDAIndex].rows.push([
//           newPortPDAData.port,
//           newPortPDAData.vessel,
//           newPortPDAData.value
//         ]);
        
//         // Update state and send to server
//         setSections(updatedSections);
//         if (socket && socket.readyState === WebSocket.OPEN) {
//           socket.send(JSON.stringify({
//             type: 'update_section',
//             section: updatedSections[portPDAIndex]
//           }));
//         }
//       }
      
//       setNewPortPDAData({ port: "", vessel: "", value: "" });
//     }
//   };

//   const addPortHandlingEntry = () => {
//     if (newPortHandlingData.port && newPortHandlingData.vessel && newPortHandlingData.value) {
//       const updatedSections = [...sections];
//       const portHandlingIndex = updatedSections.findIndex((s) => s.title === "Port Handling Charges");
      
//       if (portHandlingIndex !== -1) {
//         updatedSections[portHandlingIndex].rows.push([
//           newPortHandlingData.port,
//           newPortHandlingData.vessel,
//           newPortHandlingData.value
//         ]);
        
//         // Update state and send to server
//         setSections(updatedSections);
//         if (socket && socket.readyState === WebSocket.OPEN) {
//           socket.send(JSON.stringify({
//             type: 'update_section',
//             section: updatedSections[portHandlingIndex]
//           }));
//         }
//       }
      
//       setNewPortHandlingData({ port: "", vessel: "", value: "" });
//     }
//   };

//   return (
//     <div className="logistics-container">
//       <h1 className="logistics-title">Logistical & Financial Inputs</h1>
//       <button onClick={() => navigate("/coal")} className="nav-button">
//         Coal Analysis
//       </button>
//       <button onClick={() => navigate("/operation-constraints")} className="nav-button">
//         Operating Constraints
//       </button>

//       {sections.map((section, index) => (
//         <div key={index} className="card">
//           <div className="card-header">
//             <div className="card-title">
//               {section.title}
//               <button className="toggle-button" onClick={() => toggleSection(index)}>
//                 {openSections.includes(index) ? "▲" : "▼"}
//               </button>
//             </div>
//           </div>
//           {openSections.includes(index) && (
//             <div className="card-content">
//               <table className="logistics-table">
//                 <thead>
//                   <tr>
//                     {section.columns.map((col, i) => (
//                       <th key={i}>{col}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {section.rows.length > 0 ? (
//                     section.rows.map((row, i) => (
//                       <tr key={i}>
//                         {row.map((cell, j) => (
//                           <td key={j}>{cell}</td>
//                         ))}
//                         <td>
//                           <button className="edit-button" onClick={() => openEditDialog(index, i, row[2])}>
//                             Edit
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={section.columns.length} className="empty-message">
//                         No Data Available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>

//               {section.title === "Rake Transit Time" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Discharge Port"
//                     value={newRakeData.port}
//                     onChange={(e) => setNewRakeData({ ...newRakeData, port: e.target.value })}
//                     className="form-input"
//                   />
//                   <input
//                     type="number"
//                     placeholder="No. of Days"
//                     value={newRakeData.days}
//                     onChange={(e) => setNewRakeData({ ...newRakeData, days: e.target.value })}
//                     className="form-input"
//                   />
//                   <button className="add-button" onClick={addRakeEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}

//               {section.title === "Load Port Options" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Country"
//                     value={newLoadPortData.country}
//                     onChange={(e) => setNewLoadPortData({ ...newLoadPortData, country: e.target.value })}
//                     className="form-input"
//                   />
//                   <input
//                     placeholder="Load Port"
//                     value={newLoadPortData.port}
//                     onChange={(e) => setNewLoadPortData({ ...newLoadPortData, port: e.target.value })}
//                     className="form-input"
//                   />
//                   <button className="add-button" onClick={addLoadPortEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}

//               {section.title === "Discharge Port Options" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Country"
//                     value={newDischargePortData.country}
//                     onChange={(e) => setNewDischargePortData({ ...newDischargePortData, country: e.target.value })}
//                     className="form-input"
//                   />
//                   <input
//                     placeholder="Discharge Port"
//                     value={newDischargePortData.dischargePort}
//                     onChange={(e) =>
//                       setNewDischargePortData({ ...newDischargePortData, dischargePort: e.target.value })
//                     }
//                     className="form-input"
//                   />
//                   <button className="add-button" onClick={addDischargePortEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}

//               {section.title === "Discharge Rate Options" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Discharge Port"
//                     value={newDischargeRateData.port}
//                     onChange={(e) => setNewDischargeRateData({ ...newDischargeRateData, port: e.target.value })}
//                     className="form-input"
//                   />
//                   <input
//                     placeholder="Vessel Type"
//                     value={newDischargeRateData.vessel}
//                     onChange={(e) => setNewDischargeRateData({ ...newDischargeRateData, vessel: e.target.value })}
//                     className="form-input"
//                   />
//                   <input
//                     type="number"
//                     placeholder="MT/Hours"
//                     value={newDischargeRateData.rate}
//                     onChange={(e) => setNewDischargeRateData({ ...newDischargeRateData, rate: e.target.value })}
//                     className="form-input"
//                   />
//                   <button className="add-button" onClick={addDischargeRateEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}

//               {section.title === "Ocean Freight" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Load Port"
//                     value={newOceanFreightData.loadPort}
//                     onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, loadPort: e.target.value })}
//                     className="form-input"
//                   />
//                   <input
//                     placeholder="Destination Port"
//                     value={newOceanFreightData.destinationPort}
//                     onChange={(e) =>
//                       setNewOceanFreightData({ ...newOceanFreightData, destinationPort: e.target.value })
//                     }
//                     className="form-input"
//                   />
//                   <input
//                     placeholder="Plant"
//                     value={newOceanFreightData.plant}
//                     onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, plant: e.target.value })}
//                     className="form-input"
//                   />
//                   <input
//                     placeholder="Vessel Type"
//                     value={newOceanFreightData.vesselType}
//                     onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, vesselType: e.target.value })}
//                     className="form-input"
//                   />
//                   <input
//                     type="number"
//                     placeholder="USD/MT"
//                     value={newOceanFreightData.usdPerMT}
//                     onChange={(e) => setNewOceanFreightData({ ...newOceanFreightData, usdPerMT: e.target.value })}
//                     className="form-input"
//                   />
//                   <button className="add-button" onClick={addOceanFreightEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}

//               {section.title === "Rail/Road Transport(Inland Freight)" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Port of Discharge"
//                     value={newRailRoadData.port}
//                     onChange={(e) => setNewRailRoadData({ ...newRailRoadData, port: e.target.value })}
//                     className="form-input"
//                   />
//                   <input
//                     placeholder="Vessel Type"
//                     value={newRailRoadData.vessel}
//                     onChange={(e) => setNewRailRoadData({ ...newRailRoadData, vessel: e.target.value })}
//                     className="form-input"
//                   />
//                   <input
//                     type="number"
//                     placeholder="INR/MT"
//                     value={newRailRoadData.rate}
//                     onChange={(e) => setNewRailRoadData({ ...newRailRoadData, rate: e.target.value })}
//                     className="form-input"
//                   />
//                   <button className="add-button" onClick={addRailRoadEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}

//               {section.title === "Indices" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Coal Index Name"
//                     value={newIndicesData.index}
//                     onChange={(e) => setNewIndicesData({ ...newIndicesData, index: e.target.value })}
//                     className="form-input"
//                   />
//                   <button className="add-button" onClick={addIndicesEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}

//               {section.title === "Port PDA for Full Shipment" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Port"
//                     value={newPortPDAData.port}
//                     onChange={(e) => setNewPortPDAData({ ...newPortPDAData, port: e.target.value })}
//                     className="form-input"
//                   />
//                   <input
//                     placeholder="Vessel Type"
//                     value={newPortPDAData.vessel}
//                     onChange={(e) => setNewPortPDAData({ ...newPortPDAData, vessel: e.target.value })}
//                     className="form-input"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Value"
//                     value={newPortPDAData.value}
//                     onChange={(e) => setNewPortPDAData({ ...newPortPDAData, value: e.target.value })}
//                     className="form-input"
//                   />
//                   <button className="add-button" onClick={addPortPDAEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}

//               {section.title === "Port Handling Charges" && (
//                 <div className="input-group">
//                   <input
//                     placeholder="Port"
//                     value={newPortHandlingData.port}
//                     onChange={(e) => setNewPortHandlingData({ ...newPortHandlingData, port: e.target.value })}
//                     className="form-input"
//                   />
//                   <input
//                     placeholder="Vessel Type"
//                     value={newPortHandlingData.vessel}
//                     onChange={(e) => setNewPortHandlingData({ ...newPortHandlingData, vessel: e.target.value })}
//                     className="form-input"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Value"
//                     value={newPortHandlingData.value}
//                     onChange={(e) => setNewPortHandlingData({ ...newPortHandlingData, value: e.target.value })}
//                     className="form-input"
//                   />
//                   <button className="add-button" onClick={addPortHandlingEntry}>
//                     Add
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       ))}

//       {/* Edit Dialog */}
//       {editData.sectionIndex !== null && (
//         <div className="modal-overlay" onClick={() => setEditData({ sectionIndex: null, rowIndex: null, value: "" })}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h3 className="modal-title">Edit Value</h3>
//             </div>
//             <div className="modal-body">
//               <input
//                 className="form-input"
//                 placeholder="Value"
//                 value={editData.value}
//                 onChange={(e) => setEditData({ ...editData, value: e.target.value })}
//               />
//               <div className="modal-actions">
//                 <button
//                   className="cancel-button"
//                   onClick={() => setEditData({ sectionIndex: null, rowIndex: null, value: "" })}
//                 >
//                   Cancel
//                 </button>
//                 <button className="save-button" onClick={updateValue}>
//                   Update
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// } 


import React, { useState, useEffect ,useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const CollapsibleTables = () => {
  const [sections, setSections] = useState([]);
  const initialSections = [
    {
      title: "Ash Realization",
      columns: ["Parameter", "UOM", "Value", "Edit"],
      rows: [
        ["VJN-Revenue-Domestic", "INR/MT", "128"],
        ["VJN-Revenue-Export", "USD/MT", "1.6"],
        ["VJN-Penalty", "INR/MT", "-180"],
        ["VJN-Ash Placed", "%", "73"],
        ["Ash Exported", "%", "0"],
      ],
    },
    {
      title: "Losses",
      columns: ["Loss", "UOM", "Value", "Edit"],
      rows: [
        ["Transit loss", "%", "1"],
        ["Handling losses", "%", "0.5"],
        ["CV Quality loss", "%", "0.8"],
      ],
    },
    {
      title: "Holding Period",
      columns: ["Parameter", "UOM", "Value", "Edit"],
      rows: [
        ["LC Opening to Discharge", "MT", "40"],
        ["Unloading at Port", "Days", "5"],
        ["Road-Rake Movement", "Days", "5"],
        ["Consumption for single port", "Days", "16"],
        ["Extra-Addition for Twin-Port-Movement", "Days", "12"],
      ],
    },
    {
      title: "Rake Transit Time",
      columns: ["Discharge Port", "No. of Days", "Edit"],
      rows: [],
    },
    {
      title: "Commerical Fixed Inputs",
      columns: ["Parameter", "UOM", "Value", "Edit"],
      rows: [
        ["JITPL Margin", "%", "1.00"],
        ["Clean Energy Cess", "INR/MT", "400"],
        ["Stamp Duty", "%", "0.10"],
        ["Demmurage", "USD/MT", "0.00"],
        ["Manufacture Margin", "%", "0.00"],
      ],
    },
    {
      title: "Technical Fixed Inputs",
      columns: ["Parameter", "UOM", "Value", "Edit"],
      rows: [
        ["Reference Air Temperature", "degree C", "33.7994"],
        ["Partial Pressure", "KSC", "0.0703"],
        ["Weight of water vapour per kg of dry air", "Kg/Kg", "0.210"],
        ["Temp of bottom ash above ambient", "degree C", "600.00"],
        ["Distribution of fly ash", "%", "90.00"],
        ["Instantaneous SP heat of flue gas at TRA", "Kg/Kg/degree C", "0.9920"],
        ["Instantaneous SP heat of flue gas at Tg", "Kg/Kg/degree C", "1.0780"],
        ["Sensible heat of bottom ash", "Kg/Kg/degree C", "0.2500"],
        ["Specific head of fly ash", "Kg/Kg/degree C", "0.2000"],
        ["Manufacture margin and upaccounted", "%", "0.7400"],
      ],
    },
    {
      title: "Financing Cost",
      columns: ["Parameter", "UOM", "Value", "Edit"],
      rows: [
        ["LC", "%", "1.00"],
        ["Imported Cost of Capital", "%p.a.", "0.50"],
        ["Supplier's Cost", "%p.a.", "5.1"],
        ["Hedging Cost", "%p.a.", "0.60"],
        ["Free Cashflows Cost of Capital", "%p.a.", "4.50"],
        ["Credit Line Cost", "%p.a.", "8.75"],
      ],
    },
    {
      title: "Import Duties",
      columns: ["Parameter", "UOM", "Value", "Edit"],
      rows: [
        ["Australia", "%", "0.00"],
        ["South African", "%", "2.75"],
        ["Mozambique", "%", "0.00"],
        ["Indonesia", "%", "0.00"],
        ["Colombia", "%", "2.75"],
        ["Russsian Fedration", "%", "2.75"],
      ],
    },
    {
      title: "GST on Import Duty and Freight",
      columns: ["Parameter", "UOM", "Value", "Edit"],
      rows: [
        ["JSW Steel", "%", "0.00"],
        ["JSW Energy", "%", "5.00"],
      ],
    },
    {
      title: "GST on PDA",
      columns: ["Parameter", "UOM", "Value", "Edit"],
      rows: [
        ["JSW Steel", "%", "0.00"],
        ["JSW Energy", "%", "18.00"],
      ],
    },
    {
      title: "Load Port Options",
      columns: ["Country", "Load Port", "Edit"],
      rows: [],
    },
    {
      title: "Discharge Port Options",
      columns: ["Country", "Discharge Port", "Edit"],
      rows: [],
    },
    {
      title: "Discharge Rate Options",
      columns: ["Discharge Port", "Vessel Type", "MT/Hours", "Edit"],
      rows: [],
    },
    {
      title: "Vessel",
      columns: ["Type", "UOM", "Value", "Edit"],
      rows: [
        ["Cape", "kT", "150000.00"],
        ["Panamax", "kT", "75000.00"],
      ],
    },
    {
      title: "Ocean Freight",
      columns: ["Load Port", "Destination Port", "Plant", "Vessel Type", "USD/MT", "Edit"],
      rows: [],
    },
    {
      title: "Rail/Road Transport(Inland Freight)",
      columns: ["Port of Discharge", "Vessel Type", "INR/MT", "Edit"],
      rows: [],
    },
    {
      title: "Indices",
      columns: ["Coal Indices", "Edit"],
      rows: [],
    },
    {
      title: "Port PDA for Full Shipment",
      columns: ["Port", "Vessel Type", "Value", "Edit"],
      rows: [],
    },
    {
      title: "Port Handling Charges",
      columns: ["Port", "Vessel Type", "Value", "Edit"],
      rows: [],
    },
  ];


  
  const getColumnIndex = (title) => {
    switch (title) {
      case "GST on Import Duty and Freight":
      case "GST on PDA":
      case "Port PDA for Full Shipment":
      case "Port Handling Charges":
      case "Commerical Fixed Inputs":
      case "Technical Fixed Inputs":
      case "Financing Cost":
      case "Import Duties":
      case "Vessel":
      case "Ash Realization":
      case "Losses":
      case "Holding Period":
        return 2;
      case "Load Port Options":
      case "Discharge Port Options":
        return 1;
      case "Discharge Rate Options":
        return 2;
      case "Ocean Freight":
        return 4;
      case "Rail/Road Transport(Inland Freight)":
        return 2;
      case "Indices":
        return 0;
      case "Rake Transit Time":
        return 1;
      default:
        return 2;
    }
  };  

  const fetchSections = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/sections/`);
      const data = await response.json();
      console.log("Fetched data:", data);
      if (Array.isArray(data) && data.length > 0) {
        setSections(data);
      } else {
        console.warn("Fetched data is empty, loading defaults...");
        setSections(initialSections); // fallback
      }
    } catch (error) {
      console.error("Error fetching sections", error);
      setSections(initialSections); // fallback
    }
  }, []);
  
  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const handleDeleteRow = async (sectionIndex, rowIndex) => {
    try {
      // DELETE request to remove the row from the backend
      await fetch(`${BACKEND_URL}/api/delete-row/`, {
        method: 'DELETE',
        body: JSON.stringify({
          sectionTitle: sections[sectionIndex].title,
          rowIndex: rowIndex,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // After successful deletion, remove the row locally from the state
      const updatedSections = [...sections];
      updatedSections[sectionIndex].rows.splice(rowIndex, 1);
      setSections(updatedSections);
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };
  
  
  const handleInputChange = async (sectionIndex, rowIndex, value) => {
    const updatedSections = [...sections];
    const colIndex = getColumnIndex(updatedSections[sectionIndex].title);
    updatedSections[sectionIndex].rows[rowIndex][colIndex] = value;
    setSections(updatedSections);
  
    try {
      await fetch(`${BACKEND_URL}/api/update-row/`, {
        method: 'POST',
        body: JSON.stringify({
          sectionTitle: updatedSections[sectionIndex].title,
          rowIndex,
          columnIndex: colIndex,
          newValue: value
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error updating value:', error);
    }
  };
  
  const handleAddRow = async (sectionIndex, inputs) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].rows.push(inputs);
    setSections(updatedSections);
  
    try {
      await fetch(`${BACKEND_URL}/api/add-row/`, {
        method: 'POST',
        body: JSON.stringify({
          sectionTitle: updatedSections[sectionIndex].title,
          row: inputs
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };
  

  const handleSave = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/save-sections/`, {
        method: 'POST',
        body: JSON.stringify({ sections }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        console.log('Data saved successfully');
      } else {
        console.log('Error saving data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index) => {
    setOpenSections(prev => ({ ...prev, [index]: !prev[index] }));
  };
  const navigate = useNavigate()


  return (
    <div className="logistics-container">
       <h1 className="logistics-title">Logistical & Financial Inputs</h1>
      <div className="logistics-nav-buttons">
        <button onClick={() => navigate("/coal")} className="nav-button">
          Coal Analysis
        </button>
        <button onClick={() => navigate("/operation-constraints")} className="nav-button">
          Operating Constraints
        </button>

    </div>
      {sections.map((section, sIdx) => (
        <div key={sIdx} className="logistics-section">
          <div className="logistics-section-header" onClick={() => toggleSection(sIdx)}>
            {section.title}
          </div>

          {openSections[sIdx] && (
            <div className="logistics-section-content">
              <table className="logistics-data-table">
                <thead>
                  <tr>
                    {section.columns.map((col, idx) => (
                      <th key={idx}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows.length > 0 ? (
                    section.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => {
                          const isEditable = cIdx === getColumnIndex(section.title);
                          return (
                            <td key={cIdx}>
                              {isEditable ? (
                                <input
                                  type="text"
                                  value={cell}
                                  onChange={(e) =>
                                    handleInputChange(sIdx, rIdx, e.target.value)
                                  }
                                />
                              ) : (
                                cell
                              )}
                            </td>
                          );
                        })}
                        <td>
                        <button
                            onClick={() => handleDeleteRow(sIdx, rIdx)}
                            className="logistics-delete-button"
                          >
                            Delete
                          </button>
                        </td>
                        
                      </tr>
                    ))
                  ) : (
                    <tr>
                      {section.columns.slice(0, section.columns.length - 1).map((_, i) => (
                        <td key={i}>
                          <input
                            type="text"
                            placeholder={`Enter ${section.columns[i]}`}
                            id={`input-${sIdx}-${i}`}
                          />
                        </td>
                      ))}
                      <td>
                        <button
                          className="logistics-add-button"
                          onClick={() => {
                            const inputs = section.columns
                              .slice(0, section.columns.length - 1)
                              .map((_, i) =>
                                document.getElementById(`input-${sIdx}-${i}`)?.value || ""
                              );
                            handleAddRow(sIdx, inputs);
                          }}
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  )}
                  {/* Always show Add button */}
                  {section.rows.length > 0 && (
                    <tr>
                      {section.columns.slice(0, section.columns.length - 1).map((_, i) => (
                        <td key={i}>
                          <input
                            type="text"
                            placeholder={`Enter ${section.columns[i]}`}
                            id={`input-${sIdx}-add-${i}`}
                          />
                        </td>
                      ))}
                      <td>
                        <button
                          className="logistics-add-button"
                          onClick={() => {
                            const inputs = section.columns
                              .slice(0, section.columns.length - 1)
                              .map((_, i) =>
                                document.getElementById(`input-${sIdx}-add-${i}`)?.value || ""
                              );
                            handleAddRow(sIdx, inputs);
                          }}
                        >
                          Add New Row
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}

      <div className="logistics-save-container">
        <button className="logistics-save-button" onClick={handleSave}>
          Save All
        </button>
      </div>
    </div>
  );
};

export default CollapsibleTables;