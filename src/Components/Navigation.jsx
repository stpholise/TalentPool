import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'

const Nav = () => {

  const navLinks = [
    { name: 'Dashboard ', path: '/' },
    { name: 'Messages ', path: '/profile'},
    { name: 'Employers ', path: '/profile'},
    { name: 'Support ', path: '/'},
    { name: 'Settings ', path: '/'}
  ]

  return (
    <nav className="pageNavigation">
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
  )
}

export default Nav