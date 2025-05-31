import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg' 
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useLocation } from "react-router-dom"
import clsx from 'clsx'

interface  NavLink{ 
  name: string;
  path: string;
}

const Nav = () => {

  const location = useLocation()
  // Dispatch the action
  const  state = useSelector((state: RootState) => state.app.genMenu) // Get the state from the store

  const navLinks: NavLink[] = [
    { name: 'Dashboard ', path: '/' },
    { name: 'Jobs ', path: '/jobs'}, 
    { name: 'Saved ', path: '/saved-jobs'},
    { name: 'Settings ', path: '/profile'}
  ]
  
  return (
    <>

      
    <nav className={`pageNavigation ${state && 'show'}`}>
      <header className="navHeader">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
      </header>
      <div className="borderLine"></div>
      
      
        <div className="navCont">
        { navLinks.map((link, index) => (
          <Link key={index} className={clsx( 'navItem' , {
            'current-page': location.pathname === link.path
          })} to={link.path}
          >{link.name}</Link>
          ))}
          
        </div>
          
          
    </nav>
    </>
  )
}




export default Nav