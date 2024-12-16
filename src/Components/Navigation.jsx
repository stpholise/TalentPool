import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { PropTypes } from 'prop-types'
import {  useSelector } from 'react-redux'


const Nav = () => {

  // Dispatch the action
  const  state = useSelector((state) => state.app.genMenu) // Get the state from the store

  const navLinks = [
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
            <Link key={index} className='navItem' to={link.path}>{link.name}</Link>
          ))}
          
        </div>
          
          
    </nav>
    </>
  )
}


Nav.propTypes = {
  state: PropTypes.bool
}


export default Nav