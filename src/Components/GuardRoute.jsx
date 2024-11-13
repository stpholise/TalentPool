import { Navigate } from 'react-router-dom'
import { PropTypes } from 'prop-types'

const GuardRoute = ({ element: Element, auth, ...rest }) => {
  return auth ? <Element {...rest} /> : <Navigate to='/signin' replace />
}

GuardRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  auth: PropTypes.bool.isRequired
}

export default GuardRoute