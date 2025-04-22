// "use client"

// import { useState, useEffect } from "react";

// import "./coal.css"


// const parseValue = (key, data) => {
//   const item = data.find(row => row.parameter.toLowerCase() === key);
//   return item ? parseFloat(item.value) || 0 : 0;
// };
// const Coal= () => {
//   const [moistureValues, setMoistureValues] = useState({ TM: "", IM: "" })
//   const [moistureValue, setMoistureValue] = useState("");
//   const [otherValue, setOtherValue] = useState("");

//   const handleChangebasis = (value) => {
//     if (value === "Others") {
//       setMoistureValue("Others"); // Keep "Others" as selected
//     } else {
//       setMoistureValue(value);
//       setOtherValue(""); // Reset the input field if another option is selected
//     }
//   };
//   const handleOtherInputChange = (e) => {
//     const newValue = e.target.value;
//     setOtherValue(newValue);
//     setMoistureValue(newValue); // Update label and dropdown selection dynamically
//   };
//   // State for the table data
//   const [tableData, setTableData] = useState([
//     { parameter: "Moisture", arb: "", adb: "", db: "" },
//     { parameter: "Ash_PA", arb: "", adb: "", db: "" },
//     { parameter: "VM", arb: "", adb: "", db: "" },
//     { parameter: "FC", arb: "", adb: "", db: "" },
//   ])

//   const [ultimateData, setUltimateData] = useState([
//     { parameter: "Nitrogen", arb: "", adb: "", db: "" },
//     { parameter: "Oxygen", arb: "", adb: "", db: "" },
//     { parameter: "Carbon", arb: "", adb: "", db: "" },
//     { parameter: "Ash_UA_LAB", arb: "", adb: "", db: "" },
//     { parameter: "Sulphur", arb: "", adb: "", db: "" },
//     { parameter: "Hydrogen", arb: "", adb: "", db: "" },
//     // { parameter: "GCV", arb: "", adb: "", db: "" },
//   ])

//   const [ultimateData1, setUltimateData1] = useState([
//     { parameter: "Nitrogen", arb: "", adb: "", db: "" },
//     { parameter: "Oxygen", arb: "", adb: "", db: "" },
//     { parameter: "Carbon", arb: "", adb: "", db: "" },
//     { parameter: "Ash_UA_CALC", arb: "", adb: "", db: "" },
//     { parameter: "Sulphur", arb: "", adb: "", db: "" },
//     { parameter: "Hydrogen", arb: "", adb: "", db: "" },
//     // { parameter: "GCV", arb: "", adb: "", db: "" },
//   ])
//   const [petrographyData, setPetrographyData] = useState([
//     { parameter: "Vitrinite (Vol %)", value: "" },
//     { parameter: "Semi Vitrinite (Vol %)", value: "" },
//     { parameter: "Oxivitrinite", value: "" },
//     { parameter: "Liptinite", value: "" },
//     { parameter: "Inertinite", value: "" },
//     { parameter: "Macrinite", value: "" },
//     { parameter: "Micrinite", value: "" },
//     { parameter: "Fusinite", value: "" },
//     { parameter: "Semi fusinite", value: "" },
//     { parameter: "Mineral matter (Vol %)", value: "" },
//   ])
//   const [ashData, setAshData] = useState([
//     { parameter: "Silicon Dioxide", key: "sio2", value: "" },
//     { parameter: "Aluminum Oxide", key: "al2o3", value: "" },
//     { parameter: "Iron Oxide", key: "fe2o3", value: "" },
//     { parameter: "Calcium Oxide", key: "cao", value: "" },
//     { parameter: "Magnesium Oxide", key: "mgo", value: "" },
//     { parameter: "Sodium Oxide", key: "na2o", value: "" },
//     { parameter: "Potassium Oxide", key: "k2o", value: "" },
//     { parameter: "Manganese Dioxide", key: "mno2", value: "" },
//     { parameter: "Titanium Dioxide", key: "tio2", value: "" },
//     { parameter: "Phosphorus Pentoxide", key: "p2o5", value: "" },
//     { parameter: "Sulphur Trioxide", key: "so3", value: "" },
//   ]);

//   const [slaggingData, setSlaggingData] = useState([
//     { parameter: "Hemispherical Temperature", key: "hemispherical_temp", value: "" },
//     { parameter: "Initial Deformation Temperature", key: "initial_deformation_temp", value: "" },
//     { parameter: "Ash Fusion Temperature", key: "ash_fusion_temp", value: "" },
//   ]);



//   const handleInputChangeslagging = (index, value, table) => {
//     if (table === "ashData") {
//       const newData = [...ashData];
//       newData[index].value = value;
//       setAshData(newData);
//     } else {
//       const newData = [...slaggingData];
//       newData[index].value = value;
//       setSlaggingData(newData);
//     }
//   };

//   const base = ["cao", "mgo", "na2o", "k2o", "fe2o3"].reduce(
//     (sum, key) => sum + parseValue(key),
//     0
//   );
//   const acid = ["sio2", "al2o3", "tio2"].reduce(
//     (sum, key) => sum + parseValue(key),
//     0
//   );
//   const baseAcidRatio = acid !== 0 ? (base / acid).toFixed(2) : "0.00";

//   const M1 = 0.00835 * parseValue("sio2") + 0.00601 * parseValue("al2o3") - 0.109;
//   const C =
//     0.0415 * parseValue("sio2") +
//     0.0192 * parseValue("al2o3") +
//     0.276 * parseValue("fe2o3") +
//     0.016 * (parseValue("cao") - 3.92);
//   const T250Temp = isNaN(M1) || isNaN(C) ? "" : (Math.sqrt((M1 * 10000000) / Math.log(250) - C) + 150).toFixed(2);

//   const slaggingFactor = (Number.parseFloat(baseAcidRatio) * parseValue("so3")).toFixed(2);
//   const ironCalciumRatio = parseValue("cao") !== 0 ? (parseValue("fe2o3") / parseValue("cao")).toFixed(2) : "0.00";
//   const ironPlusCalcium = (parseValue("fe2o3") + parseValue("cao")).toFixed(2);
//   const slaggingIndex = parseValue("hemispherical_temp") + (4 * parseValue("initial_deformation_temp")) / 5;
//   const silicaPercent = isNaN(acid) ? "0.00" : ((parseValue("sio2") * 100) / (parseValue("sio2") + parseValue("fe2o3") + parseValue("cao") + parseValue("mgo"))).toFixed(2);

  
//   const [mmr, setMMR] = useState("") // Mean Maximum Reflectance input

//   // Regex to allow up to 6 digits before and 2 after the decimal
//   const numberRegex = /^\d*\.?\d{0,2}$/

//   // Function to handle TM and IM input changes
//   const handleMoistureChange = (key, value) => {
//     if (numberRegex.test(value) || value === "") {
//       setMoistureValues((prev) => ({ ...prev, [key]: value }))
//     }
//   }

//   // Function to update table values based on formulas
//   const handleValueChange = (index, key, value, data, setData) => {
//     if (value === "") {
//       const updatedData = [...data]
//       updatedData[index][key] = value
//       setData(updatedData)
//       return
//     }

//     if (numberRegex.test(value)) {
//       const updatedData = [...data]
//       updatedData[index][key] = value

//       const TM = Number.parseFloat(moistureValues.TM) || 0
//       const IM = Number.parseFloat(moistureValues.IM) || 0

//       let ADB, ARB, DB

//       if (key === "adb") {
//         ADB = Number.parseFloat(value) || 0
//         ARB = ((ADB * (100 - TM)) / (100 - IM)).toFixed(2)
//         DB = ((ADB * 100) / (100 - IM)).toFixed(2)
//       } else if (key === "arb") {
//         ARB = Number.parseFloat(value) || 0
//         ADB = ((ARB / (100 - TM)) * (100 - IM)).toFixed(2)
//         DB = (((ARB / (100 - TM)) * (100 - IM) * 100) / (100 - IM)).toFixed(2)
//       } else if (key === "db") {
//         DB = Number.parseFloat(value) || 0
//         ADB = ((DB / 100) * (100 - IM)).toFixed(2)
//         ARB = (((DB * (100 - TM)) / (100 - IM) / 100) * (100 - IM)).toFixed(2)
//       }

//       updatedData[index] = {
//         ...updatedData[index],
//         arb: key === "arb" ? value : ARB,
//         adb: key === "adb" ? value : ADB,
//         db: key === "db" ? value : DB,
//       }

//       setData(updatedData)
//     }
//   }

//   // Function to calculate FC/VM dynamically
//   const calculateFC_VM = (type) => {
//     const fcRow = tableData.find((row) => row.parameter === "FC")
//     const vmRow = tableData.find((row) => row.parameter === "VM")

//     const FC = Number.parseFloat(fcRow?.[type]) || 0
//     const VM = Number.parseFloat(vmRow?.[type]) || 0

//     return VM !== 0 ? (FC / VM).toFixed(2) : "" // Avoid division by zero
//   }
//   const calculateDulong = () => {
//     const carbon = Number.parseFloat(ultimateData.find((row) => row.parameter === "Carbon")?.db) || 0
//     const hydrogen = Number.parseFloat(ultimateData.find((row) => row.parameter === "Hydrogen")?.db) || 0
//     const oxygen = Number.parseFloat(ultimateData.find((row) => row.parameter === "Oxygen")?.db) || 0

//     return ((8080 * carbon + 34500 * (hydrogen - oxygen / 8) + 2240 * oxygen) / 100).toFixed(2)
//   }
//   const [remark, setRemark] = useState("");
//   const handleChange2 = (e) => {
//     if (e.target.value.length <= 10000) {
//       setRemark(e.target.value);
//     }
//   };
  

//   const calculateTotal = () => {
//     return petrographyData.reduce((sum, row) => sum + (Number.parseFloat(row.value) || 0), 0).toFixed(2)
//   }

//   const calculateTotal1 = () => {
//     return ashData.reduce((sum, row) => sum + (parseFloat(row.value) || 0), 0).toFixed(2);
//   };
//   // Function to calculate V+I (Vitrinite + Inertinite)
//   const calculateVI = () => {
//     const vitrinite =
//       Number.parseFloat(petrographyData.find((row) => row.parameter === "Vitrinite (Vol %)")?.value) || 0
//     const inertinite = Number.parseFloat(petrographyData.find((row) => row.parameter === "Inertinite")?.value) || 0
//     return (vitrinite + inertinite).toFixed(2)
//   }
//   const handleInputChange = (index, value) => {
//     const regex = /^\d*\.?\d{0,2}$/ // Allows up to 6 digits before decimal, 2 after
//     if (value === "" || regex.test(value)) {
//       const newData = [...petrographyData]
//       newData[index].value = value
//       setPetrographyData(newData)
//     }
//   }
//   const handleInputChange1 = (index, value) => {
//     const regex = /^\d*\.?\d{0,2}$/ // Allows up to 6 digits before decimal, 2 after
//     if (value === "" || regex.test(value)) {
//       const newData = [...ashData]
//       newData[index].value = value
//       setAshData(newData)
//     }
//   }
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault()
//       const inputs = Array.from(document.querySelectorAll("input"))
//       const currentIndex = inputs.indexOf(e.target)

//       if (currentIndex >= 0 && currentIndex < inputs.length - 1) {
//         inputs[currentIndex + 1].focus()
//       }
//     }
//   }
//   useEffect(() => {
//     // Extract user-input values for all three bases (arb, adb, db)
//     const moisture = tableData.find(row => row.parameter === "Moisture") || {};
//     const ash_PA = tableData.find(row => row.parameter === "Ash_PA") || {};
//     const vm = tableData.find(row => row.parameter === "VM") || {};
//     const fc = tableData.find(row => row.parameter === "FC") || {};
  
//     // Function to calculate ultimate analysis values based on formula
//     const calculateUltimate = (type) => {
//       const M = parseFloat(moisture[type]) || 0;
//       const A = parseFloat(ash_PA[type]) || 0;
//       const VM = parseFloat(vm[type]) || 0;
//       const FC = parseFloat(fc[type]) || 0;
  
//       // Carbon Calculation
//       const C = ((100 * FC) + (0.9 * ((100 * VM) - (13.7 * (100 - M))))) / 100;
  
//       // Hydrogen Calculation
//       const H = (VM * ((6.65 * (VM + FC)) - 0.013)) / ((122.5 * VM) + (10 * FC));
  
//       // Sulphur Calculation
//       const S = 0.009 * (VM + FC);
  
//       // Oxygen Calculation
//       const O = 100 - (M + (1.175 * A) + C + H + S + ((2.1 - (0.35 * VM)) / (100 - M)) * ((100 - FC) / 100));
  
//       // Ash is taken as entered from proximate analysis
//       const Ash_UA_CALC = A;
//       const sum = C + H + S + O + Ash_UA_CALC;
//       const N = 100 - sum;
  
//       return {
//         carbon: C.toFixed(2),
//         hydrogen: H.toFixed(2),
//         sulphur: S.toFixed(2),
//         oxygen: O.toFixed(2),
//         ash_UA_CALC: Ash_UA_CALC.toFixed(2),
//         nitrogen: N.toFixed(2)
//       };
//     };
    
  
//     // Base/Acid Ratio Calculation
//     const base = ["cao", "mgo", "na2o", "k2o", "fe2o3"].reduce((sum, key) => sum + parseValue(key), 0);
//     const acid = ["sio2", "al2o3", "tio2"].reduce((sum, key) => sum + parseValue(key), 0);
//     const baseAcidRatio = acid !== 0 ? (base / acid).toFixed(2) : "0.00";
  
//     // T250 Temperature Calculation
//     const M = 0.00835 * parseValue("sio2") + 0.00601 * parseValue("al2o3") - 0.109;
//     const C = 0.0415 * parseValue("sio2") + 0.0192 * parseValue("al2o3") + 0.276 * parseValue("fe2o3") + 0.016 * (parseValue("cao") - 3.92);
//     const T250Temp = isNaN(M) || isNaN(C) ? "" : (Math.sqrt((M * 10000000) / Math.log(250) - C) + 150).toFixed(2);
  
//     // Slagging Factor Calculation
//     const slaggingFactor = (Number.parseFloat(baseAcidRatio) * parseValue("so3")).toFixed(2);
  
//     // Iron/Calcium Ratio
//     const ironCalciumRatio = parseValue("cao") !== 0 ? (parseValue("fe2o3") / parseValue("cao")).toFixed(2) : "0.00";
  
//     // Iron + Calcium
//     const ironPlusCalcium = (parseValue("fe2o3") + parseValue("cao")).toFixed(2);
  
//     // Slagging Index Calculation
//     const hemisphericalTemp = parseFloat(slaggingData.find((item) => item.key === "hemispherical_temp")?.value) || 0;
//     const initialDeformationTemp = parseFloat(slaggingData.find((item) => item.key === "initial_deformation_temp")?.value) || 0;
//     const slaggingIndex = hemisphericalTemp + (4 * initialDeformationTemp) / 5;
  
//     // Silica Percentage Calculation
//     const silicaPercent = isNaN(acid) ? "0.00" : ((parseValue("sio2") * 100) / (parseValue("sio2") + parseValue("fe2o3") + parseValue("cao") + parseValue("mgo"))).toFixed(2);
  
//     setUltimateData1([
//       { parameter: "Carbon", arb: calculateUltimate("arb").carbon, adb: calculateUltimate("adb").carbon, db: calculateUltimate("db").carbon },
//       { parameter: "Hydrogen", arb: calculateUltimate("arb").hydrogen, adb: calculateUltimate("adb").hydrogen, db: calculateUltimate("db").hydrogen },
//       { parameter: "Sulphur", arb: calculateUltimate("arb").sulphur, adb: calculateUltimate("adb").sulphur, db: calculateUltimate("db").sulphur },
//       { parameter: "Oxygen", arb: calculateUltimate("arb").oxygen, adb: calculateUltimate("adb").oxygen, db: calculateUltimate("db").oxygen },
//       { parameter: "Ash", arb: calculateUltimate("arb").ash_UA_CALC, adb: calculateUltimate("adb").ash_UA_CALC, db: calculateUltimate("db").ash_UA_CALC },
//       { parameter: "Nitrogen", arb: calculateUltimate("arb").nitrogen, adb: calculateUltimate("adb").nitrogen, db: calculateUltimate("db").nitrogen }
//     ]);
  
//     // Update Slagging Data (Preserve Manual Inputs)
//     setSlaggingData((prevData) =>
//       prevData.map((item) => ({ ...item })).concat([
//         { parameter: "Base/Acid Ratio", key: "baseAcidRatio", value: baseAcidRatio },
//         { parameter: "T250 Temperature", key: "T250Temp", value: T250Temp },
//         { parameter: "Slagging Factor", key: "slaggingFactor", value: slaggingFactor },
//         { parameter: "Iron/Calcium Ratio", key: "ironCalciumRatio", value: ironCalciumRatio },
//         { parameter: "Iron + Calcium", key: "ironPlusCalcium", value: ironPlusCalcium },
//         { parameter: "Slagging Index", key: "slaggingIndex", value: slaggingIndex },
//         { parameter: "Silica Percent", key: "silicaPercent", value: silicaPercent }
//       ])
//     );
//   }, [ tableData, ashData, slaggingData, moistureValues]); // Dependencies
  

//   return (
//     <div className="coal-container">
//       <h2 className="title">Coal Analysis</h2>
//       <div className="form-container">
//         {/* <div className="form-title">Analysis Parameters</div> */}
//         <div className="row">
//   {["Vessel Name", "Vessel Type", "Origin", "Load Port", "Destination Port", "TM", "IM", "GCV", "NCV"].map((label) => (
//     <div className="input-pair" key={label}>
//       <label>{label}:</label>
//       <input
//         type="text"
//         value={moistureValues[label]}
//         onChange={(e) => handleMoistureChange(label, e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder={`Enter ${label}`}
//       />
//     </div>
//   ))}

//   {/* Dropdown for Basis of Measurement */}
//   <div className="input-pair">
//     <label>Basis of Measurement:</label>
//     <select
//           className="moisture-select"
//           value={moistureValue === "Others" && otherValue ? otherValue : moistureValue}
//           onChange={(e) => 
// (e.target.value)}
//         >
//           <option value="">Select Basis</option>
//           <option value="Load Port">Load Port</option>
//           <option value="Discharge Port">Discharge Port</option>
//           <option value="As Fired">As Fired</option>
//           <option value="Others">Others</option>
//         </select>

//         {moistureValue === "Others" && (
//           <input
//             className="moisture-other-input"
//             type="text"
//             placeholder="Enter your measurement"
//             value={otherValue}
//             onChange={handleOtherInputChange}
//           />
//         )}
//   </div>
// </div>
// </div>

//       <div className="analysis-container">
//         <div className="analysis-section">
//           <h3 className="section-title">Proximate Analysis</h3>
//           <table className="coal-table">
//             <thead>
//               <tr>
//                 <th>Parameter</th>
//                 <th>ARB</th>
//                 <th>ADB</th>
//                 <th>DB</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((row, rowIndex) => (
//                 <tr key={row.parameter}>
//                   <td>{row.parameter}</td>
//                   {["arb", "adb", "db"].map((colType) => (
//                     <td key={colType}>
//                       <input
//                         type="text"
//                         value={row[colType]}
//                         onChange={(e) => handleValueChange(rowIndex, colType, e.target.value, tableData, setTableData)}
//                         onKeyDown={handleKeyDown}
//                       />
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//               <tr className="calculated-row">
//                 <td>
//                   <b>FC/VM</b>
//                 </td>
//                 <td>{calculateFC_VM("arb")}</td>
//                 <td>{calculateFC_VM("adb")}</td>
//                 <td>{calculateFC_VM("db")}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div className="analysis-section">
//           <h3 className="section-title">Ultimate Analysis (LAB)</h3>
//           <table className="coal-table">
//             <thead>
//               <tr>
//                 <th>Parameter</th>
//                 <th>ARB</th>
//                 <th>ADB</th>
//                 <th>DB</th>
//               </tr>
//             </thead>
//             <tbody>
//               {ultimateData.map((row, rowIndex) => (
//                 <tr key={row.parameter}>
//                   <td>{row.parameter}</td>
//                   {["arb", "adb", "db"].map((colType) => (
//                     <td key={colType}>
//                       <input
//                         type="text"
//                         value={row[colType]}
//                         onChange={(e) =>
//                           handleValueChange(rowIndex, colType, e.target.value, ultimateData, setUltimateData)
//                         }
//                         onKeyDown={handleKeyDown}
//                       />
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//               <tr className="calculated-row">
//                 <td>
//                   <b>DULONG</b>
//                 </td>
//                 <td></td>
//                 <td></td>
//                 <td>{calculateDulong()} Kcal/kg</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

        
//         <div className="analysis-section">
//           <h3 className="section-title">Ultimate Analysis (CALCULATED)</h3>
//           <table className="coal-table">
//             <thead>
//               <tr>
//                 <th>Parameter</th>
//                 <th>ARB</th>
//                 <th>ADB</th>
//                 <th>DB</th>
//               </tr>
//             </thead>
//             <tbody>
//               {ultimateData1.map((row, rowIndex) => (
//                 <tr key={row.parameter}>
//                   <td>{row.parameter}</td>
//                   {["arb", "adb", "db"].map((colType) => (
//                     <td key={colType}>
//                       <input
//                         type="text"
//                         value={row[colType]}
//                         onChange={(e) =>
//                           handleValueChange(rowIndex, colType, e.target.value, ultimateData1, setUltimateData1)
//                         }
//                         onKeyDown={handleKeyDown}
//                       />
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//               <tr className="calculated-row">
//                 <td>
//                   <b>DULONG</b>
//                 </td>
//                 <td></td>
//                 <td></td>
//                 <td>{calculateDulong()} Kcal/kg</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div className="analysis-section">
//           <h3 className="section-title">Petrography Analysis</h3>
//           <table className="coal-table">
//             <thead>
//               <tr>
//                 <th>Parameter</th>
//                 <th>Value</th>
//               </tr>
//             </thead>
//             <tbody>
//               {petrographyData.map((row, index) => (
//                 <tr key={row.parameter}>
//                   <td>{row.parameter}</td>
//                   <td>
//                     <input
//                       type="text"
//                       className="petrography-input"
//                       value={row.value}
//                       onChange={(e) => handleInputChange(index, e.target.value)}
//                       onKeyDown={handleKeyDown}
//                     />
//                   </td>
//                 </tr>
//               ))}
//               <tr className="calculated-row">
//                 <td>
//                   <b>Total</b>
//                 </td>
//                 <td>{calculateTotal()}</td>
//               </tr>
//               <tr>
//                 <td>
//                   <b>Mean Maximum Reflectance (MMR), %</b>
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     className="petrography-input"
//                     value={mmr}
//                     onChange={(e) => setMMR(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                   />
//                 </td>
//               </tr>
//               <tr className="calculated-row">
//                 <td>
//                   <b>V+I</b>
//                 </td>
//                 <td>{calculateVI()}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//       <div className="analysis-section">
//       <h3 className="section-title">ASH ELEMENTARY ANALYSIS</h3>
//       <table className="coal-table">
//         <thead>
//           <tr>
//             <th>Parameter</th>
//             <th>Value</th>
//           </tr>
//         </thead>
//         <tbody>
//           {ashData.map((row, index) => (
//             <tr key={row.parameter}>
//               <td>{row.parameter}</td>
//               <td>
//                 <input
//                   type="text"
//                   className="input"
//                   value={row.value}
//                   onChange={(e) => handleInputChange1(index, e.target.value)}
//                   onKeyDown={handleKeyDown}
//                 />
//               </td>
//             </tr>
//           ))}
//           <tr className="calculated-row">
//             <td>
//               <b>Total</b>
//             </td>
//             <td>{calculateTotal1()}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     <div className="analysis-section">
//       <h3 className="section-title">Slagging or Fouling Propensity</h3>
//       <table className="coal-table">
//         <thead>
//           <tr>
//             <th>Parameter</th>
//             <th>Value</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Manual Input Fields */}
//           <tr>
//             <td>Hemispherical Temperature</td>
//             <td>
//               <input
//                 type="text"
//                 className="input"
//                 value={slaggingData.hemispherical_temp}
//                 onChange={(e) => handleInputChangeslagging("hemispherical_temp", e.target.value)}
//               />
//             </td>
//           </tr>
//           <tr>
//             <td>Initial Deformation Temperature</td>
//             <td>
//               <input
//                 type="text"
//                 className="input"
//                 value={slaggingData.initial_deformation_temp}
//                 onChange={(e) => handleInputChangeslagging("initial_deformation_temp", e.target.value)}
//               />
//             </td>
//           </tr>
//           <tr>
//             <td>Ash Fusion Temperature</td>
//             <td>
//               <input
//                 type="text"
//                 className="input"
//                 value={slaggingData.ash_fusion_temp}
//                 onChange={(e) => handleInputChangeslagging("ash_fusion_temp", e.target.value)}
//               />
//             </td>
//           </tr>

//           {/* Auto-calculated values */}
//           <tr>
//             <td>Base Acid Ratio</td>
//             <td>{baseAcidRatio}</td>
//           </tr>
//           <tr>
//             <td>T250 Temperature</td>
//             <td>{T250Temp}</td>
//           </tr>
//           <tr>
//             <td>Slagging Factor</td>
//             <td>{slaggingFactor}</td>
//           </tr>
//           <tr>
//             <td>Iron Calcium Ratio</td>
//             <td>{ironCalciumRatio}</td>
//           </tr>
//           <tr>
//             <td>Iron + Calcium</td>
//             <td>{ironPlusCalcium}</td>
//           </tr>
//           <tr>
//             <td>Slagging Index</td>
//             <td>{isNaN(slaggingIndex) ? "0.00" : slaggingIndex.toFixed(2)}</td>
//           </tr>
//           <tr>
//             <td>Silica Percent</td>
//             <td>{silicaPercent}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//       </div>
//       <div className="remark-container">
//       <h3 className="remark-title">Remarks</h3>
//       <textarea
//         className="remark-input"
//         value={remark}
//         onChange={handleChange2}
//         placeholder="Enter your remarks..."
//       />
//       {/* <p className="char-count">{remark.length} / 10,000 characters</p> */}
//     </div>
//     </div>
//   );
// };

// export default Coal;







"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./styles.css"

const parseValue = (key, data) => {
  const item = data.find((row) => row.key === key);
  
  if (!item || item.value === undefined || item.value === "N/A") {
    return null; // ✅ Return null if value is missing or "N/A"
  }

  const parsedValue = Number.parseFloat(item.value);
  
  return isNaN(parsedValue) ? null : parsedValue; // ✅ Handle invalid numbers safely
};


const Coal = () => {
  const [moistureValues, setMoistureValues] = useState({
    TM: "",
    IM: "",
    "Vessel Name": "",
    "Vessel Type": "",
    Origin: "",
    "Load Port": "",
    "Destination Port": "",
    GCV: "",
    NCV: "",
    HGI:"",
  })
  const [moistureValue, setMoistureValue] = useState("");
const [otherValue, setOtherValue] = useState("");

const handleChangebasis = (value) => {
    setMoistureValue(value);
    if (value !== "Others") {
        setOtherValue(""); // Clear input when "Others" is not selected
    }
};

const handleOtherInputChange = (e) => {
    setOtherValue(e.target.value);
};

// Include both values when sending data


  // State for the table data
  const [tableData, setTableData] = useState([
    { parameter: "Moisture", arb: "", adb: "", db: "0.00" },
    { parameter: "Ash_PA", arb: "", adb: "", db: "" },
    { parameter: "VM", arb: "", adb: "", db: "" },
    { parameter: "FC", arb: "", adb: "", db: "" },
  ])

  const [ultimateData, setUltimateData] = useState([
    { parameter: "Nitrogen", arb: "", adb: "", db: "" },
    { parameter: "Oxygen", arb: "", adb: "", db: "" },
    { parameter: "Carbon", arb: "", adb: "", db: "" },
    { parameter: "Ash_UA_LAB", arb: "", adb: "", db: "" },
    { parameter: "Sulphur", arb: "", adb: "", db: "" },
    { parameter: "Hydrogen", arb: "", adb: "", db: "" },
  ])

  const [ultimateData1, setUltimateData1] = useState([
    { parameter: "Carbon", arb: "", adb: "", db: "" },
    { parameter: "Hydrogen", arb: "", adb: "", db: "" },
    { parameter: "Sulphur", arb: "", adb: "", db: "" },
    { parameter: "Oxygen", arb: "", adb: "", db: "" },
    { parameter: "Ash_UA_CALC", arb: "", adb: "", db: "" },
    { parameter: "Nitrogen", arb: "", adb: "", db: "" },
  ])

  const [petrographyData, setPetrographyData] = useState([
    { parameter: "Vitrinite (Vol %)", value: "" },
    { parameter: "Semi Vitrinite (Vol %)", value: "" },
    { parameter: "Oxivitrinite", value: "" },
    { parameter: "Liptinite", value: "" },
    { parameter: "Inertinite", value: "" },
    { parameter: "Macrinite", value: "" },
    { parameter: "Micrinite", value: "" },
    { parameter: "Fusinite", value: "" },
    { parameter: "Semi fusinite", value: "" },
    { parameter: "Mineral matter (Vol %)", value: "" },
  ])

  const [ashData, setAshData] = useState([
    { parameter: "Silicon Dioxide", key: "sio2", value: "" },
    { parameter: "Aluminum Oxide", key: "al2o3", value: "" },
    { parameter: "Iron Oxide", key: "fe2o3", value: "" },
    { parameter: "Calcium Oxide", key: "cao", value: "" },
    { parameter: "Magnesium Oxide", key: "mgo", value: "" },
    { parameter: "Sodium Oxide", key: "na2o", value: "" },
    { parameter: "Potassium Oxide", key: "k2o", value: "" },
    { parameter: "Manganese Dioxide", key: "mno2", value: "" },
    { parameter: "Titanium Dioxide", key: "tio2", value: "" },
    { parameter: "Phosphorus Pentoxide", key: "p2o5", value: "" },
    { parameter: "Sulphur Trioxide", key: "so3", value: "" },
  ])

  const [slaggingData, setSlaggingData] = useState([
    { parameter: "Hemispherical Temperature", key: "hemispherical_temp", value: "" },
    { parameter: "Initial Deformation Temperature", key: "initial_deformation_temp", value: "" },
    { parameter: "Ash Fusion Temperature", key: "ash_fusion_temp", value: "" },
  ])

  const handleInputChangeslagging = (key, value) => {
    const newData = [...slaggingData]
    const index = newData.findIndex((item) => item.key === key)
    if (index !== -1) {
      newData[index].value = value
      setSlaggingData(newData)
    }
  }

  const [mmr, setMMR] = useState("") // Mean Maximum Reflectance input

  // Regex to allow up to 6 digits before and 2 after the decimal
  const numberRegex = /^\d*\.?\d{0,2}$/

  // Function to handle TM and IM input changes
  const handleMoistureChange = (key, value) => {
    const numberFields = ["TM", "IM", "GCV", "NCV", "HGI"] // Fields that should allow only numbers
  
    if (numberFields.includes(key)) {
      // Allow only numeric input for TM, IM, GCV, NCV
      if (numberRegex.test(value) || value === "") {
        setMoistureValues((prev) => ({ ...prev, [key]: value }))
      }
    } else {
      // Allow any input for text fields like Vessel Name, Origin, etc.
      setMoistureValues((prev) => ({ ...prev, [key]: value }))
    }
  }
  

  // Function to update table values based on formulas
  const handleValueChange = (index, key, value, data, setData) => {
    if (value === "") {
      const updatedData = [...data]
      updatedData[index][key] = value
      setData(updatedData)
      return
    }

    if (numberRegex.test(value)) {
      const updatedData = [...data]
      updatedData[index][key] = value

      const TM = Number.parseFloat(moistureValues.TM) || 0
      const IM = Number.parseFloat(moistureValues.IM) || 0

      let ADB, ARB, DB

      if (key === "adb") {
        ADB = Number.parseFloat(value) || 0
        ARB = ((ADB * (100 - TM)) / (100 - IM)).toFixed(2)
        DB = ((ADB * 100) / (100 - IM)).toFixed(2)
      } else if (key === "arb") {
        ARB = Number.parseFloat(value) || 0
        ADB = ((ARB / (100 - TM)) * (100 - IM)).toFixed(2)
        DB = (((ARB / (100 - TM)) * (100 - IM) * 100) / (100 - IM)).toFixed(2)
      } else if (key === "db") {
        DB = Number.parseFloat(value) || 0
        ADB = ((DB / 100) * (100 - IM)).toFixed(2)
        ARB = ((((DB * (100 - TM)) / 100) * (100 - IM)) / 100).toFixed(2)
      }

      updatedData[index] = {
        ...updatedData[index],
        arb: key === "arb" ? value : ARB,
        adb: key === "adb" ? value : ADB,
        db: key === "db" ? value : DB,
      }
      updatedData.forEach((row) => {
        if (row.parameter === "Moisture") {
          row.db = "0.00";
        }
      });
      setData(updatedData)
    }
  }

  // Function to calculate FC/VM dynamically
  const calculateFC_VM = (type) => {
    const fcRow = tableData.find((row) => row.parameter === "FC")
    const vmRow = tableData.find((row) => row.parameter === "VM")

    const FC = Number.parseFloat(fcRow?.[type]) || 0
    const VM = Number.parseFloat(vmRow?.[type]) || 0

    return VM !== 0 ? (FC / VM).toFixed(2) : "" // Avoid division by zero
  }

  const calculateDulong = () => {
    const carbon = Number.parseFloat(ultimateData.find((row) => row.parameter === "Carbon")?.db) || 0
    const hydrogen = Number.parseFloat(ultimateData.find((row) => row.parameter === "Hydrogen")?.db) || 0
    const oxygen = Number.parseFloat(ultimateData.find((row) => row.parameter === "Oxygen")?.db) || 0

    return ((8080 * carbon + 34500 * (hydrogen - oxygen / 8) + 2240 * oxygen) / 100).toFixed(2)
  }
  

  const calculateDulong1 = () => {
    const carbon = Number.parseFloat(ultimateData1.find((row) => row.parameter === "Carbon")?.db) || 0
    const hydrogen = Number.parseFloat(ultimateData1.find((row) => row.parameter === "Hydrogen")?.db) || 0
    const oxygen = Number.parseFloat(ultimateData1.find((row) => row.parameter === "Oxygen")?.db) || 0

    return ((8080 * carbon + 34500 * (hydrogen - oxygen / 8) + 2240 * oxygen) / 100).toFixed(2)
  }

  const [remark, setRemark] = useState("")

  const handleChange2 = (e) => {
    if (e.target.value.length <= 10000) {
      setRemark(e.target.value)
    }
  }

  const calculateTotal = () => {
    return petrographyData.reduce((sum, row) => sum + (Number.parseFloat(row.value) || 0), 0).toFixed(2)
  }

  const calculateTotal1 = () => {
    return ashData.reduce((sum, row) => sum + (Number.parseFloat(row.value) || 0), 0).toFixed(2)
  }

  // Function to calculate V+I (Vitrinite + Inertinite)
  const calculateVI = () => {
    const vitrinite =
      Number.parseFloat(petrographyData.find((row) => row.parameter === "Vitrinite (Vol %)")?.value) || 0
    const inertinite = Number.parseFloat(petrographyData.find((row) => row.parameter === "Inertinite")?.value) || 0
    return (vitrinite + inertinite).toFixed(2)
  }

  const handleInputChange = (index, value) => {
    const regex = /^\d*\.?\d{0,2}$/ // Allows up to 6 digits before decimal, 2 after
    if (value === "" || regex.test(value)) {
      const newData = [...petrographyData]
      newData[index].value = value
      setPetrographyData(newData)
    }
  }

  const handleInputChange1 = (index, value) => {
    const regex = /^\d*\.?\d{0,5}$/ // Allows up to 6 digits before decimal, 5 after
    if (value === "" || regex.test(value)) {
      const newData = [...ashData]
      newData[index].value = value
      setAshData(newData)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const inputs = Array.from(document.querySelectorAll("input"))
      const currentIndex = inputs.indexOf(e.target)

      if (currentIndex >= 0 && currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus()
      }
    }
  }
  const boilereff = ({ ash_PA, ultimateData, moistureData }) => {
    try {
      // Log to check the structure of ash_PA
      
      // Extract Ash_PA parameter and get its arb value
      const ash_PA_value = ash_PA.find(item => item.parameter === "Ash_PA")?.arb || 0;
      
      
      // Extract values from the parameters and log them
      const tm_arb = moistureData.TM || 0;  // Accessing TM directly
      const gcv = moistureData.GCV || 1; 
      const hydrogen = ultimateData.find(item => item.parameter === "Hydrogen")?.arb || 0;
      
  
      // Log each value before the calculation
      console.log("💡 ash_PA_value:", ash_PA_value);
      console.log("💡 tm_arb:", tm_arb);
      console.log("💡 hydrogen:", hydrogen);
      console.log("💡 gcv:", gcv);
  
      // Formula from Django: 
      // eff = 92.5 - (50 * ash_arb + 630 * (tm_arb + 9 * hydrogen)) / gcv
      const eff = 92.5 - (
        (50 * parseFloat(ash_PA_value || 0)) +
        630 * (parseFloat(tm_arb) + 9 * parseFloat(hydrogen))
      ) / Math.max(parseFloat(gcv), 1);
  
      const roundedEff = Math.round(eff * 100) / 100;
      console.log("✅ Calculated Boiler Efficiency:", roundedEff);
      return roundedEff;
  
    } catch (error) {
      console.error("⚠️ Boiler efficiency calculation failed:", error);
      return null;
    }
  };
  
  
  
  // Calculate slagging metrics
  const calculateSlaggingMetrics = () => {
    const base = ["cao", "mgo", "na2o", "k2o", "fe2o3"].reduce((sum, key) => sum + parseValue(key, ashData), 0)

    const acid = ["sio2", "al2o3", "tio2"].reduce((sum, key) => sum + parseValue(key, ashData), 0)

    const baseAcidRatio = acid !== 0 ? (base / acid).toFixed(2) : "0.00"

    const sio2Value = parseValue("sio2", ashData)
    const al2o3Value = parseValue("al2o3", ashData)
    const fe2o3Value = parseValue("fe2o3", ashData)
    const caoValue = parseValue("cao", ashData)
    const mgoValue = parseValue("mgo", ashData)
    const so3Value = parseValue("so3", ashData)

    const M1 = (0.00835 * sio2Value + 0.00601 * al2o3Value - 0.109).toFixed(5)
    const C1 = (0.0415 * sio2Value + 0.0192 * al2o3Value + 0.276 * fe2o3Value + 0.016 * (caoValue - 3.92)).toFixed(5)

    const logValue = Math.log10(250).toFixed(5)
    const sqrtValue = (M1 * 1e7) / logValue - C1

    const T250Temp = isNaN(M1) || isNaN(C1) || sqrtValue <= 0 ? "" : (Math.sqrt(sqrtValue) + 150).toFixed(5)



    const slaggingFactor = (Number.parseFloat(baseAcidRatio) * so3Value).toFixed(2)

    const ironCalciumRatio = caoValue !== 0 ? (fe2o3Value / caoValue).toFixed(2) : "0.00"
    const ironPlusCalcium = (fe2o3Value + caoValue).toFixed(2)

    const hemisphericalTemp =
      Number.parseFloat(slaggingData.find((item) => item.key === "hemispherical_temp")?.value) || 0
    const initialDeformationTemp =
      Number.parseFloat(slaggingData.find((item) => item.key === "initial_deformation_temp")?.value) || 0
    const slaggingIndex = (hemisphericalTemp + (4 * initialDeformationTemp) / 5).toFixed(2)

    const silicaPercent = isNaN(acid)
      ? "0.00"
      : ((sio2Value * 100) / (sio2Value + fe2o3Value + caoValue + mgoValue)).toFixed(2)

    return {
      baseAcidRatio,
      M1,
      C1,
      T250Temp,
      slaggingFactor,
      ironCalciumRatio,
      ironPlusCalcium,
      slaggingIndex,
      silicaPercent,
    }
  }

  useEffect(() => {
    try {
      // Extract user-input values for all three bases (arb, adb, db)
      const moisture = tableData.find((row) => row.parameter === "Moisture") || {}
      const ash_PA = tableData.find((row) => row.parameter === "Ash_PA") || {}
      const vm = tableData.find((row) => row.parameter === "VM") || {}
      const fc = tableData.find((row) => row.parameter === "FC") || {}

      // Function to calculate ultimate analysis values based on formula
      const calculateUltimate = (type) => {
        const M = Number.parseFloat(moisture[type]) || 0
        const A = Number.parseFloat(ash_PA[type]) || 0
        const VM = Number.parseFloat(vm[type]) || 0
        const FC = Number.parseFloat(fc[type]) || 0

        // Carbon Calculation
        const C = (100 * FC + 0.9 * (100 * VM - 13.7 * (100 - M))) / 100

        // Hydrogen Calculation
        const H = (VM * (6.65 * (VM + FC) - 0.013)) / (122.5 * VM + 10 * FC)

        // Sulphur Calculation
        const S = 0.009 * (VM + FC)

        // Oxygen Calculation
        const O = 100 - (M + 1.175 * A + C + H + S + ((2.1 - 0.35 * VM) / (100 - M)) * ((100 - FC) / 100))

        // Ash is taken as entered from proximate analysis
        const Ash_UA_CALC = A

        // Calculate sum of all components
        const sum = C + H + S + O + Ash_UA_CALC

        // Nitrogen is calculated as the remainder to make total 100%
        const N = 100 - sum

        return {
          carbon: isNaN(C) ? "0.00" : C.toFixed(2),
          hydrogen: isNaN(H) ? "0.00" : H.toFixed(2),
          sulphur: isNaN(S) ? "0.00" : S.toFixed(2),
          oxygen: isNaN(O) ? "0.00" : O.toFixed(2),
          ash_UA_CALC: isNaN(Ash_UA_CALC) ? "0.00" : Ash_UA_CALC.toFixed(2),
          nitrogen: isNaN(N) ? "0.00" : N.toFixed(2),
        }
      }

      // Calculate values for all three bases
      const arbCalc = calculateUltimate("arb")
      const adbCalc = calculateUltimate("adb")
      const dbCalc = calculateUltimate("db")

      // Update the ultimateData1 state with calculated values
      setUltimateData1([
        { parameter: "Carbon", arb: arbCalc.carbon, adb: adbCalc.carbon, db: dbCalc.carbon },
        { parameter: "Hydrogen", arb: arbCalc.hydrogen, adb: adbCalc.hydrogen, db: dbCalc.hydrogen },
        { parameter: "Sulphur", arb: arbCalc.sulphur, adb: adbCalc.sulphur, db: dbCalc.sulphur },
        { parameter: "Oxygen", arb: arbCalc.oxygen, adb: adbCalc.oxygen, db: dbCalc.oxygen },
        { parameter: "Ash_UA_CALC", arb: arbCalc.ash_UA_CALC, adb: adbCalc.ash_UA_CALC, db: dbCalc.ash_UA_CALC },
        { parameter: "Nitrogen", arb: arbCalc.nitrogen, adb: adbCalc.nitrogen, db: dbCalc.nitrogen },
      ])
    } catch (error) {
      console.error("Error calculating ultimate analysis:", error)
    }
  }, [tableData]) // Only depend on tableData to avoid infinite loops

  const navigate = useNavigate()
  const handleSave = async () => {
    try {
        console.log("moistureValue before sending:", moistureValue);
        console.log("otherValue before sending:", otherValue);

        // Determine the correct basis_of_measurement value
        const finalBasisValue = moistureValue === "Others" ? otherValue : moistureValue;

        // Helper function to replace empty strings with null or 0.00
        const sanitizeNumericFields = (data) => {
            return data.map(item => ({
                ...item,
                arb: item.arb === "" ? "0.00" : item.arb,
                adb: item.adb === "" ? "0.00" : item.adb,
                db: item.db === "" ? "0.00" : item.db,
                value: item.value === "" ? "0.00" : item.value
            }));
        };

        // Construct request payload
        const requestData = {
          moistureValues: {
            ...moistureValues,
            basis_of_measurement: finalBasisValue,
          },
          tableData: sanitizeNumericFields(tableData),
          ultimateData: sanitizeNumericFields(ultimateData),
          ultimateData1: sanitizeNumericFields(ultimateData1),
          petrographyData: sanitizeNumericFields(petrographyData),
          ashData: sanitizeNumericFields(ashData),
          slaggingData: sanitizeNumericFields(slaggingData),
          mmr: mmr || "0.00", // Include MMR at the top level
          remark: remark,
        }
  
        console.log("Request Payload:", JSON.stringify(requestData, null, 2))
  
        const response = await fetch("https://127.0.0.1:8000/save-coal1-report/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        })
  
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Server error: ${response.status} ${response.statusText} - ${errorText}`)
        }
  
        const result = await response.json()
        console.log("Server Response:", result)
        alert("Coal report saved successfully!")
      } catch (error) {
        console.error("Error:", error)
        alert("Failed to save coal report. Please try again.")
      }
    }
  
  return (
    <div className="coal-container">
      <h2 className="title">Coal Analysis</h2>
      <button onClick={() => navigate("/Logistics")} className="nav-button">
        Logistics
      </button>
      <button onClick={() => navigate("/operation-constraints")} className="nav-button">
        operation constraints
      </button>
      <div className="form-container">
        <div className="row">
          {["Vessel Name", "Vessel Type", "Origin", "Load Port", "Destination Port", "TM", "IM", "GCV", "NCV", "HGI"].map(
            (label) => (
              <div className="input-pair" key={label}>
                <label>{label}:</label>
                <input
                  type="text"
                  value={moistureValues[label] || ""}
                  onChange={(e) => handleMoistureChange(label, e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Enter ${label}`}
                />
              </div>
            ),
          )}

          {/* Dropdown for Basis of Measurement */}
          <div className="input-pair">
            <label>Basis of Measurement:</label>
            <select
              className="moisture-select"
              value={moistureValue}
              onChange={(e) => handleChangebasis(e.target.value)}
            >
              <option value="">Select Basis</option>
              <option value="Load Port">Load Port</option>
              <option value="Discharge Port">Discharge Port</option>
              <option value="As Fired">As Fired</option>
              <option value="Others">Others</option>
            </select>

            {moistureValue === "Others" && (
              <input
                className="moisture-other-input"
                type="text"
                placeholder="Enter your measurement"
                value={otherValue}
                onChange={handleOtherInputChange}
              />
            )}
          </div>
        </div>
      </div>

      <div className="analysis-container">
        <div className="analysis-section">
          <h3 className="section-title">Proximate Analysis</h3>
          <table className="coal-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>ARB</th>
                <th>ADB</th>
                <th>DB</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={row.parameter}>
                  <td>{row.parameter}</td>
                  {["arb", "adb", "db"].map((colType) => (
                    <td key={colType}>
                      <input
                        type="text"
                        value={row[colType]}
                        onChange={(e) => handleValueChange(rowIndex, colType, e.target.value, tableData, setTableData)}
                        onKeyDown={handleKeyDown}
                        disabled={row.parameter === "Moisture" && colType === "db"} // Disable input
                      />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="calculated-row">
                <td>
                  <b>FC/VM</b>
                </td>
                <td>{calculateFC_VM("arb")}</td>
                <td>{calculateFC_VM("adb")}</td>
                <td>{calculateFC_VM("db")}</td>
              </tr>
              <tr className="calculated-row">
              <td>
                  <b>Boiler Efficiency </b>
                </td>             
                <td>
                {
      // Calling boilereff function to calculate and return only the boiler efficiency
      boilereff({
        ash_PA: tableData, // Dynamic value from your component state or props
        moistureData: moistureValues, // Dynamic value from your component state or props
        ultimateData: ultimateData, // Dynamic value from your component state or props
      })
    }
                </td>
                </tr>
            </tbody>
          </table>
        </div>

        <div className="analysis-section">
          <h3 className="section-title">Ultimate Analysis (LAB)</h3>
          <table className="coal-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>ARB</th>
                <th>ADB</th>
                <th>DB</th>
              </tr>
            </thead>
            <tbody>
              {ultimateData.map((row, rowIndex) => (
                <tr key={row.parameter}>
                  <td>{row.parameter}</td>
                  {["arb", "adb", "db"].map((colType) => (
                    <td key={colType}>
                      <input
                        type="text"
                        value={row[colType]}
                        onChange={(e) =>
                          handleValueChange(rowIndex, colType, e.target.value, ultimateData, setUltimateData)
                        }
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="calculated-row">
                <td>
                  <b>DULONG</b>
                </td>
                <td></td>
                <td></td>
                <td>{calculateDulong()} Kcal/kg</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="analysis-section">
          <h3 className="section-title">Ultimate Analysis (CALCULATED)</h3>
          <table className="coal-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>ARB</th>
                <th>ADB</th>
                <th>DB</th>
              </tr>
            </thead>
            <tbody>
              {ultimateData1.map((row) => (
                <tr key={row.parameter}>
                  <td>{row.parameter}</td>
                  {["arb", "adb", "db"].map((colType) => (
                    <td key={colType}>{row[colType]}</td>
                  ))}
                </tr>
              ))}
              <tr className="calculated-row">
                <td>
                  <b>DULONG</b>
                </td>
                <td></td>
                <td></td>
                <td>{calculateDulong1()} Kcal/kg</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="analysis-section">
          <h3 className="section-title">Petrography Analysis</h3>
          <table className="coal-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {petrographyData.map((row, index) => (
                <tr key={row.parameter}>
                  <td>{row.parameter}</td>
                  <td>
                    <input
                      type="text"
                      className="petrography-input"
                      value={row.value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                </tr>
              ))}
              <tr className="calculated-row">
                <td>
                  <b>Total</b>
                </td>
                <td>{calculateTotal()}</td>
              </tr>
              <tr>
                <td>
                  <b>Mean Maximum Reflectance (MMR), %</b>
                </td>
                <td>
                  <input
                    type="text"
                    className="petrography-input"
                    value={mmr}
                    onChange={(e) => {
                      if (numberRegex.test(e.target.value) || e.target.value === "") {
                        setMMR(e.target.value)
                      }
                    }}
                    onKeyDown={handleKeyDown}
                  />
                </td>
              </tr>
              <tr className="calculated-row">
                <td>
                  <b>V+I</b>
                </td>
                <td>{calculateVI()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="analysis-section">
          <h3 className="section-title">ASH ELEMENTARY ANALYSIS</h3>
          <table className="coal-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {ashData.map((row, index) => (
                <tr key={row.parameter}>
                  <td>{row.parameter}</td>
                  <td>
                    <input
                      type="text"
                      className="input"
                      value={row.value}
                      onChange={(e) => handleInputChange1(index, e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                </tr>
              ))}
              <tr className="calculated-row">
                <td>
                  <b>Total</b>
                </td>
                <td>{calculateTotal1()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="analysis-section">
          <h3 className="section-title">Slagging or Fouling Propensity</h3>
          <table className="coal-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {slaggingData.map((item) => (
                <tr key={item.key}>
                  <td>{item.parameter}</td>
                  <td>
                    <input
                      type="text"
                      className="input"
                      value={item.value}
                      onChange={(e) => handleInputChangeslagging(item.key, e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                </tr>
              ))}

              {/* Calculated values */}
              {(() => {
                const metrics = calculateSlaggingMetrics()
                return (
                  <>
                    <tr>
                      <td>Base Acid Ratio</td>
                      <td>{metrics.baseAcidRatio}</td>
                    </tr>
                    <tr>
                      <td>M</td>
                      <td>{metrics.M1}</td>
                    </tr>
                    <tr>
                      <td>C</td>
                      <td>{metrics.C1}</td>
                    </tr>
                    <tr>
                      <td>T250 Temperature</td>
                      <td>{metrics.T250Temp}</td>
                    </tr>
                    <tr>
                      <td>Slagging Factor</td>
                      <td>{metrics.slaggingFactor}</td>
                    </tr>
                    <tr>
                      <td>Iron Calcium Ratio</td>
                      <td>{metrics.ironCalciumRatio}</td>
                    </tr>
                    <tr>
                      <td>Iron + Calcium</td>
                      <td>{metrics.ironPlusCalcium}</td>
                    </tr>
                    <tr>
                      <td>Slagging Index</td>
                      <td>{metrics.slaggingIndex}</td>
                    </tr>
                    <tr>
                      <td>Silica Percent</td>
                      <td>{metrics.silicaPercent}</td>
                    </tr>
                  </>
                )
              })()}
            </tbody>
          </table>
        </div>
      </div>

      <div className="remark-container">
        <h3 className="remark-title">Remarks</h3>
        <textarea
          className="remark-input"
          value={remark}
          onChange={handleChange2}
          placeholder="Enter your remarks..."
        />
      </div>
      <button onClick={handleSave} className="nav-button">Save</button>
      
      <button onClick={() => navigate("/slagging")} className="nav-button">Slagging Report</button>
    </div>
  )
}

export default Coal

