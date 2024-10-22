import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { PropTypes } from 'prop-types'


const Nav = ({state}) => {

  const navLinks = [
    { name: 'Dashboard ', path: '/' },
    { name: 'Messages ', path: '/profile'},
    { name: 'Employers ', path: '/profile'},
    { name: 'Support ', path: '/'},
    { name: 'Settings ', path: '/'}
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