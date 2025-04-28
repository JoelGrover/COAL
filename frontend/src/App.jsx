import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Coal from "./coal"
import OperatingConstraints from "./operation-constraints"
import CollapsibleTables from "./Logistics"
import "./styles.css"
import VesselDropdown from "./slagging"
import Login from './Login'
import Register from './Register'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Coal />} />
        <Route path="/coal" element={<Coal />} />
        <Route path="/operation-constraints" element={<OperatingConstraints />} />
        <Route path="/logistics" element={< CollapsibleTables/>} />
        <Route path="/slagging" element={<VesselDropdown />} />
        <Route path="/reportpage/:vesselName" element={<VesselDropdown />} />
        <Route path="/coal/login" element={<Login />} />
        <Route path="/coal/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App

