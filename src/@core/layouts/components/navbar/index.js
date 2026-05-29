// ** React Imports
import { Fragment } from "react"

// ** Custom Components
import NavbarUser from "./NavbarUser"

// ** Third Party Components
import { Sun, Moon } from "react-feather"

// ** Reactstrap Imports
import { CardTitle } from "reactstrap"

const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === "dark") {
      return <Sun className="ficon" onClick={() => setSkin("light")} />
    } else {
      return <Moon className="ficon" onClick={() => setSkin("dark")} />
    }
  }

  return (
    <Fragment>
      <div className="ms-2 d-flex align-items-center justify-items-center">
        <CardTitle tag="h4" className="fw-bold mb-0">
          HERRAMIENTA DE EVALUACIÓN BASADA EN LA  ISO 27001:2022
        </CardTitle>
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
