import { Home, List } from "react-feather"

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home"
  },
  {
    id: "controlList",
    title: "Lista de Controles",
    icon: <List size={20} />,
    navLink: "/control-list"
  }
]
