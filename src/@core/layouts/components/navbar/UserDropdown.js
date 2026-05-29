// ** React Imports
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Third Party Components
import {
  Power
} from "react-feather"

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap"

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/profile.png"
import { useEffect, useState } from "react"
import { executeAsyncAction } from "../../../../utility/Utils"
import { useDispatch, useSelector } from "react-redux"
import { getUserConfig } from "../../../../store/UsuarioConfigStore"
import Loading from "../../../../views/common/Loading"

const UserDropdown = () => {
  const handleLogout = () => {
    localStorage.clear()
  }
  const dispatch = useDispatch()
  const userConfigStore = useSelector((state) => state.UsuarioConfigStore)
  const { user } = userConfigStore
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (!user) {
      executeAsyncAction(getUserConfig(), dispatch, setIsLoading)
    }

  }, [])
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      {isLoading && <Loading />}
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          {user ? (
            <>
              <span className="user-name fw-bold">{user.nombre_encargado}</span>
              <span className="user-status">{user.usuario}</span>
            </>
          ) : (
            <span>Cargando datos del usuario...</span>
          )}

        </div>
        <Avatar
          img={defaultAvatar}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/login" onClick={handleLogout}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
