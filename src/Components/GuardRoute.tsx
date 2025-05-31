import { Navigate } from 'react-router-dom' 
import { ReactElement } from 'react'

interface GuardRouteProps {
  element: React.ComponentType<any>
  auth: boolean
  [key: string]: any // This allows for additional props
}
const GuardRoute = ({ element: Element, auth, ...rest }: GuardRouteProps): ReactElement => {
  return auth ? <Element {...rest} /> : <Navigate to='/signin' replace />
}


export default GuardRoute