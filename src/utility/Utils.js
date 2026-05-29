import { DefaultRoute } from "../router/routes"
// ** Create swal alerts
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = (num) => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "")

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: "short", day: "numeric", year: "numeric" }
) => {
  if (!value) return value
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: "short", day: "numeric" }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" }
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem("userData")
export const getUserData = () => JSON.parse(localStorage.getItem("userData"))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === "admin") return DefaultRoute
  if (userRole === "client") return "/access-control"
  return "/home"
}

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a", // for option hover bg-color
    primary: "#7367f0", // for selected option bg-color
    neutral10: "#7367f0", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed" // for input hover border-color
  }
})
const MySwal = withReactContent(Swal)

// Función reutilizable para mostrar alertas
export const handleAlert = ({
  title = '',
  text,
  icon,
  confirmButtonText = 'OK',
  onConfirm,
  redirectUrl,
  showConfirmButton = true, // Control para mostrar el botón de confirmación
  showCancelButton = false, // Control para mostrar el botón de cancelación
  cancelButtonText = 'Cancel',
  onCancel
}) => {
  switch (icon) {
    case 'success':
      title = title || '¡Éxito!'
      break
    case 'error':
      title = title || '¡Error!'
      break
    case 'warning':
      title = title || '¡Advertencia!'
      break
    case 'info':
      title = title || '¡Información!'
      break
    case 'question':
      title = title || '¡Pregunta!'
      break
    default:
      title = title || ''
      break
  }

  return MySwal.fire({
    title,
    text,
    icon,
    showConfirmButton,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-secondary ms-1'
    },
    buttonsStyling: false
  }).then((result) => {
    if (result.isConfirmed && showConfirmButton) {
      if (onConfirm) {
        onConfirm()
      }
      if (redirectUrl) {
        window.location.href = redirectUrl
      }
    } else if (result.dismiss === Swal.DismissReason.cancel && showCancelButton && onCancel) {
      onCancel()
    }
  })
}

export const executeAsyncAction = async (action, dispatch, setIsLoading) => {
  try {
    setIsLoading(true)
    await dispatch(action).unwrap()
  } catch (error) {
    handleAlert({
      text: error.message || 'Ha ocurrido un error',
      icon: 'error'
    })
    console.error(error)
  } finally {
    setIsLoading(false)
  }
}