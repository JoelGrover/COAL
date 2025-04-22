import { useEffect, useState } from "react";
// import { useParams  } from "react-router-dom";
import "./VesselDropdown.css"; // Import the CSS file
// import axios from "axios";
import {  fetchVesselData } from "../api";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



const VesselDropdown = () => {
  // const { vesselName } = useParams();
  const [vessels, setVessels] = useState([]);
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [vesselData, setVesselData] = useState(null);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();
  useEffect(() => {
    const fetchVessels = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/vessels/`);

        const data = await response.json();
        setVessels(data);
      } catch (error) {
        console.error("Error fetching vessels:", error);
      }
    };
  
    fetchVessels();
  }, []); // Runs once on mount // this is working in dropdown 

  useEffect(() => {
    const fetchVesselData = async () => {
      if (!selectedVessel) return;  // Don't fetch if no vessel is selected
      try {
        const response = await fetch(`${BACKEND_URL}/vessel-data/${selectedVessel}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch vessel data");
        }
        const data = await response.json();
        console.log("Fetched Vessel Data:", data);  // Inspect the data here
        setVesselData(data); // Set data as received (as an object)
      } catch (error) {
        console.error("Error fetching vessel data:", error);
        setError("Error fetching vessel data");
      }
    };
  
    fetchVesselData();
  }, [selectedVessel]); // Dependency array ensures it runs when selectedVessel changes
   // Dependency array ensures it runs when selectedVessel changes
  
  // Error message
  if (error) {
    return <div>Error: {error}</div>;
  }


  console.log(vesselData);  // Check if 'fc_vm_arb' is in vesselData

const handleChange = async (event) => {
  const vesselName = event.target.value;
  setSelectedVessel(vesselName);
  
  try {
    const data = await fetchVesselData(vesselName);
    console.log("Fetched Data:", data); // Debugging log
    setVesselData(data);
  } catch (error) {
    console.error(`Failed to fetch data for ${vesselName}:`, error);
  }
};
    // Fixed permissible ranges
    const proximityAnalysis = {
        "TM-ARB": { Permissible: "> 5 to <40", NonPermissible: ">40" },
        "ASH-ARB": { Permissible: "<4%", NonPermissible: ">25%" },
        "VM-ARB": { Permissible: "<20.04", NonPermissible: ">45%" },
        "Sulphur": { Permissible: "<0.9", NonPermissible: ">0.9" },
        "GCV of Coal (Load Port)_ARB": { Permissible: "3800 to <6300", NonPermissible: ">6300" },
        "HGI": { Permissible: ">45", NonPermissible: "<70" },
        "FC-ARB": { Permissible: ">20", NonPermissible: "<35" },
        "FC/VM Ratio":{Permissible:"",NonPermissible:""},
    };

    // Fixed permissible ranges for Ultimate Analysis
    const ultimateAnalysis = {
        "Carbon": { Permissible: ">40", NonPermissible: "<40" },
        "Hydrogen": { Permissible: ">3", NonPermissible: "<3" },
        "Nitrogen": { Permissible: "<2", NonPermissible: ">2" },
        "Oxygen": { Permissible: "<40", NonPermissible: ">40" },
        "TM-ARB": { Permissible: "<40", NonPermissible: ">40" },
        "ASH-ARB": { Permissible: "<25", NonPermissible: ">25" },
        "Sulphur": { Permissible: "<0.75", NonPermissible: ">0.6" }
    };

    // Fixed permissible ranges for Slagging or Fouling Propensity (Control Index)
    const slaggingControlIndex = {
        "Ash Fusion FT": { mergedLowMedium: ">1350", mergedHighSevere: "<1350" },
        "Base-acid ratio": { mergedLowMedium: "<0.4 or >0.7", High: "0.4 to 0.7" },
        "T250 Temperature": { Low: ">1400", Medium: "1400 to 1245", High: "1245 to 1120", Severe: "<1120" },
        "Slagging Factor": { Low: "<0.6", Medium: "0.6 to 2.0", High: "2.0 to 2.6", Severe: ">2.6" },
        "Iron Calcium Ratio": { mergedLowMedium: "<0.3 or >3.0", mergedHighSevere: "0.3 to 3.0" },
        "Iron plus Calcium": { mergedLowMedium: "<10%", mergedHighSevere: ">10%" },
        "Slagging Index": { Low: ">1340", Medium: "1340 to 1230", High: "1230 to 1150", Severe: "<1150" },
        "Silica %": { Low: "72-80", Medium: "65-72", High: "", Severe: "50-65" }
    };
    const properties = {
        "CaO": "",
        "MgO": "",
        "Na₂O": "",
        "K₂O": "",
        "SiO₂": "",
        "Al₂O₃": "",
        "TiO₂": "",
        "Fe₂O₃": "",
        "Sulphur": "",
        "Hemispherical Temp HT": "",
        "INITIAL Deformation Temp IT": "",     
    };
    const calculateSlaggingStatus = (param, value) => {
      if (!slaggingControlIndex[param]) return "N/A";
  
      const conditions = slaggingControlIndex[param];
  
      if (conditions.mergedLowMedium) {
          const [lowCond, highCond] = conditions.mergedLowMedium.split(" or ");
          if ((lowCond.startsWith("<") && value < parseFloat(lowCond.slice(1))) ||
              (highCond && highCond.startsWith(">") && value > parseFloat(highCond.slice(1)))) {
              return "Permissible";
          }
      }
      
      if (conditions.mergedHighSevere) {
          const [lowCond, highCond] = conditions.mergedHighSevere.split(" or ");
          if ((lowCond.startsWith("<") && value < parseFloat(lowCond.slice(1))) ||
              (highCond && highCond.startsWith(">") && value > parseFloat(highCond.slice(1)))) {
              return "Non-Permissible";
          }
      }
  
      if (conditions.Low && conditions.Low.startsWith(">") && value > parseFloat(conditions.Low.slice(1))) {
          return "Permissible";
      }
  
      if (conditions.High && conditions.High.includes(" to ")) {
          const [low, high] = conditions.High.split(" to ").map(Number);
          if (value >= low && value <= high) {
              return "Non-Permissible";
          }
      }
  
      return "Non-Permissible"; // Default fallback
  };


  const getStatus = (param, value) => {
    if (value === undefined || value === null || value === "N/A" || value === "") {
        return "No value obtained";
    }

    const rule = proximityAnalysis[param];
    if (!rule) return "No value obtained";

    let isPermissible = false;
    let isNonPermissible = false;

    // ✅ Function to extract numerical conditions correctly
    const parseCondition = (condition) => {
        if (!condition) return null;

        // Match range conditions like "30 to 50"
        let rangeMatch = condition.match(/(\d+)\s*to\s*(\d+)/);
        if (rangeMatch) {
            return { type: "range", min: parseFloat(rangeMatch[1]), max: parseFloat(rangeMatch[2]) };
        }

        // Match "greater than" conditions (e.g., ">30")
        let greaterMatch = condition.match(/>\s*(\d+)/);
        if (greaterMatch) {
            return { type: "greater", min: parseFloat(greaterMatch[1]) };
        }

        // Match "less than" conditions (e.g., "<50")
        let lessMatch = condition.match(/<\s*(\d+)/);
        if (lessMatch) {
            return { type: "less", max: parseFloat(lessMatch[1]) };
        }

        // No valid condition found
        return null;
    };

    const permissibleCondition = parseCondition(rule.Permissible);
    const nonPermissibleCondition = parseCondition(rule.NonPermissible);

    // ✅ Check if the value falls into permissible range
    if (permissibleCondition) {
        if (permissibleCondition.type === "range") {
            isPermissible = value >= permissibleCondition.min && value <= permissibleCondition.max;
        } else if (permissibleCondition.type === "greater") {
            isPermissible = value > permissibleCondition.min;
        } else if (permissibleCondition.type === "less") {
            isPermissible = value < permissibleCondition.max;
        }
    }

    // ✅ Check if the value falls into non-permissible range
    if (nonPermissibleCondition) {
        if (nonPermissibleCondition.type === "range") {
            isNonPermissible = value >= nonPermissibleCondition.min && value <= nonPermissibleCondition.max;
        } else if (nonPermissibleCondition.type === "greater") {
            isNonPermissible = value > nonPermissibleCondition.min;
        } else if (nonPermissibleCondition.type === "less") {
            isNonPermissible = value < nonPermissibleCondition.max;
        }
    }

    // Debugging logs (Check in console)
    console.log(`Param: ${param}, Value: ${value}, Permissible: ${isPermissible}, Non-Permissible: ${isNonPermissible}`);

    if (isNonPermissible) return "Non-Permissible";
    if (isPermissible) return "Permissible";

    return "No value obtained";
};
const determineUltimateStatus = (param, value) => {
  if (value === undefined || value === null || value === "N/A" || value === "") {
      return "No value obtained";
  }

  // Get permissible and non-permissible conditions
  const rule = ultimateAnalysis[param];
  if (!rule) return "No value obtained";

  let isPermissible = false;
  let isNonPermissible = false;

  // ✅ Function to check if value meets a condition
  const checkCondition = (condition, val) => {
      if (!condition) return false; // No condition means we can't check

      // Handle ">" or "<" cases
      if (condition.includes(">") || condition.includes("<")) {
          let operator = condition.includes(">") ? ">" : "<";
          let num = parseFloat(condition.replace(/[^\d.]/g, "")); // Extract numeric part

          return operator === ">" ? val > num : val < num;
      }

      return false;
  };

  isPermissible = checkCondition(rule.Permissible, value);
  isNonPermissible = checkCondition(rule.NonPermissible, value);

  return isNonPermissible ? "Non-Permissible" : isPermissible ? "Permissible" : "";
};


    return (
        <div className="vessel-container">
            <h3 className="report-heading">Vessel Analysis Report</h3>

            {/* Dropdown Section */}
            <div className="vessel-dropdown-section">
                <label htmlFor="vesselDropdown" className="vessel-label">
                    Select Vessel:
                </label>
                <select
                    id="vesselDropdown"
                    value={selectedVessel}
                    onChange={handleChange}
                    className="vessel-select"
                >
                    <option value="">-- Select --</option>
                    {vessels.map((vessel, index) => (
                        <option key={index} value={vessel} className="vessel-option">
                            {vessel}
                        </option>
                    ))}
                </select>
            </div>

            <h3 className="report-heading">Proximate Analysis</h3>
<table className="vessel-table">
  <thead>
    <tr className="vessel-table-header">
      <th className="vessel-table-cell">Parameter</th>
      <th className="vessel-table-cell">Permissible Range</th>
      <th className="vessel-table-cell">Non-Permissible Range</th>
      <th className="vessel-table-cell">Value</th>
      <th className="vessel-table-cell">Status</th>
    </tr>
  </thead>
  <tbody>
  {Object.keys(proximityAnalysis).map((param, index) => {
      // Check if the parameter is FC/VM Ratio, skip status for it
      const mappedParam = param === "FC/VM Ratio" ? "FC/VM Ratio" : param;
      
      // Access the value of the parameter directly from vesselData
      const rawValue = vesselData?.[mappedParam] || "N/A";  // Use dynamic property access
      const value = rawValue !== "N/A" ? rawValue : "N/A";
      
      // Convert to numeric value if possible
      const numericValue = value !== "N/A" && !isNaN(value) ? parseFloat(value) : null;

      // Set status only if the value is numeric and not "N/A", except for FC/VM Ratio
      let status = "";
      if (param !== "FC/VM Ratio" && numericValue !== null) {
        status = getStatus(param, numericValue);
      }

      // Only display the status column if there's a valid numeric value
      return (
        <tr key={index} className="vessel-table-row">
          <td className="vessel-table-cell">{param}</td>
          <td className="vessel-table-cell">{proximityAnalysis[param].Permissible}</td>
          <td className="vessel-table-cell">{proximityAnalysis[param].NonPermissible}</td>
          <td className="vessel-table-cell">{value}</td>
          {/* Leave status empty for FC/VM Ratio */}
          <td className="vessel-table-cell">{param === "FC/VM Ratio" ? "" : status}</td>
        </tr>
      );
    })}
  </tbody>
</table>





            {/* Section: Ultimate Analysis */}
            <h3 className="report-heading">Ultimate Analysis</h3>
            <table className="vessel-table">
                <thead>
                    <tr className="vessel-table-header">
                        <th className="vessel-table-cell">Parameter</th>
                        <th className="vessel-table-cell">Permissible Range</th>
                        <th className="vessel-table-cell">Non-Permissible Range</th>
                        <th className="vessel-table-cell">Value</th>
                        <th className="vessel-table-cell">Status</th>
                    </tr>
                </thead>
                <tbody>
        {Object.keys(ultimateAnalysis).map((param, index) => {
            // ✅ Get value from vesselData
            let value = vesselData?.[param] !== undefined ? vesselData[param] : "N/A";

            // ✅ Convert value to number (if possible)
            const numericValue = value !== "N/A" && !isNaN(value) ? parseFloat(value) : null;

            // ✅ Get correct status using determineUltimateStatus
            let status = numericValue !== null ? determineUltimateStatus(param, numericValue) : "";

            return (
                <tr key={index} className="vessel-table-row">
                    <td className="vessel-table-cell">{param}</td>
                    <td className="vessel-table-cell">{ultimateAnalysis[param]["Permissible"]}</td>
                    <td className="vessel-table-cell">{ultimateAnalysis[param]["NonPermissible"]}</td>
                    <td className="vessel-table-cell">{value}</td>
                    <td className="vessel-table-cell">{status}</td> {/* ✅ Updated Status */}
                </tr>
            );
        })}
    </tbody>
            </table>

            {/* Section: Slagging or Fouling Propensity */}
            <h3 className="report-heading">Slagging or Fouling Propensity</h3>
            <table className="vessel-table">
                <thead>
                    <tr className="vessel-table-header">
                        <th className="vessel-table-cell" rowSpan="2">Parameter</th>
                        <th className="vessel-table-cell" colSpan="2" style={{ borderRight: "2px solid black" }}>Low - Medium</th>
                        <th className="vessel-table-cell" colSpan="2">High - Severe</th>
                        <th className="vessel-table-cell" rowSpan="2">Value</th>
                        <th className="vessel-table-cell" rowSpan="2">Status</th>
                    </tr>
                    <tr className="vessel-table-header">
                        <th className="vessel-table-cell" style={{ borderRight: "1px solid black" }}>Low</th>
                        <th className="vessel-table-cell" style={{ borderRight: "2px solid black" }}>Medium</th>
                        <th className="vessel-table-cell" style={{ borderRight: "1px solid black" }}>High</th>
                        <th className="vessel-table-cell">Severe</th>
                    </tr>
                </thead>
                <tbody>
  {Object.keys(slaggingControlIndex).map((param, index) => {
    const value = vesselData?.[param] ?? "N/A"; // Ensure safe access
    const status = value !== "N/A" ? calculateSlaggingStatus(param, value) : "N/A"; // Avoid error in function call

    return (
      <tr key={index} className="vessel-table-row">
        <td className="vessel-table-cell">{param}</td>

        {/* Low-Medium Merged Cases */}
        {slaggingControlIndex?.[param]?.["mergedLowMedium"] ? (
          <td className="vessel-table-cell" colSpan="2" style={{ borderRight: "2px solid black", textAlign: "center" }}>
            {slaggingControlIndex?.[param]?.["mergedLowMedium"] ?? "N/A"}
          </td>
        ) : (
          <>
            <td className="vessel-table-cell" style={{ borderRight: "1px solid black" }}>
              {slaggingControlIndex?.[param]?.["Low"] ?? "N/A"}
            </td>
            <td className="vessel-table-cell" style={{ borderRight: "2px solid black" }}>
              {slaggingControlIndex?.[param]?.["Medium"] ?? "N/A"}
            </td>
          </>
        )}

        {/* High-Severe Merged Cases */}
        {slaggingControlIndex?.[param]?.["mergedHighSevere"] ? (
          <td className="vessel-table-cell" colSpan="2" style={{ textAlign: "center" }}>
            {slaggingControlIndex?.[param]?.["mergedHighSevere"] ?? "N/A"}
          </td>
        ) : (
          <>
            <td className="vessel-table-cell" style={{ borderRight: "1px solid black" }}>
              {slaggingControlIndex?.[param]?.["High"] ?? "N/A"}
            </td>
            <td className="vessel-table-cell">
              {slaggingControlIndex?.[param]?.["Severe"] ?? "N/A"}
            </td>
          </>
        )}

        {/* Display value and status */}
        <td className="vessel-table-cell">{value}</td>
        <td className={`vessel-table-cell ${status === "Permissible" ? "permissible" : "non-permissible"}`}>
          {status}
        </td>
      </tr>
    );
  })}
</tbody>
      </table>


      <h3 className="report-heading">Properties</h3>
<table className="vessel-table">
  <thead>
    <tr className="vessel-table-header">
      <th className="vessel-table-cell">Property</th>
      <th className="vessel-table-cell">Value</th>
      <th className="vessel-table-cell">Property</th>
      <th className="vessel-table-cell">Value</th>
    </tr>
  </thead>
  <tbody>
    {Object.keys(properties).map((property, index, arr) => {
      // Only render for even index (pair the properties in each row)
      if (index % 2 === 0) {
        const nextProperty = arr[index + 1]; // Get the next property for the second column
        const nextValue = nextProperty ? vesselData && vesselData[nextProperty] : null;

        return (
          <tr key={index} className="vessel-table-row">
            <td className="vessel-table-cell">{property}</td>
            <td className="vessel-table-cell">
              {vesselData && vesselData[property] ? vesselData[property] : "N/A"}
            </td>
            <td className="vessel-table-cell">
              {nextProperty ? nextProperty : ""}
            </td>
            <td className="vessel-table-cell">
              {nextValue ? nextValue : (nextProperty ? "N/A" : "")}
            </td>
          </tr>
        );
      }
      return null; // Skip rendering odd indexes
    })}
  </tbody>
</table>


{/* <button onClick={handleSubmit}>Submit</button> */}
        </div>
    );
};

export default VesselDropdown;



