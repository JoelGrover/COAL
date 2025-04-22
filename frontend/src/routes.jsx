import { createBrowserRouter } from "react-router-dom"
import Coal from "./coal"
import VesselDropdown from "./slagging"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Coal />,
  },
  {
    path: "/slagging",
    element: <VesselDropdown />,
  },
  {
    path: "/slagging/:vesselName",
    element: <VesselDropdown />,
  },
])

export default router

