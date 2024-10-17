import Vector from '../assets/Vector.svg'
import ExpandMore from '../assets/Expand_more.svg'
import RectangleImg from '../assets/Rectangle 85.png'

import { Link } from 'react-router-dom'
import { useState} from 'react'


const Header = () => {

    const [menuToggle, setMenuToggle] = useState(false)

    const profileLinks = [
    { name: 'Profile ', path: '/profile' },
    { name: 'Share Profile ', path: '/profile'},
    { name: 'Sign out ', path: '/signout'}
    ]

  return (
    <header className="pageHeader">
        <div className="headerContent">
            <div className="availabilityCont">
                <button className="availability transBtn">
                    <span className="dotCont"><span className='dot active'></span></span>
                    <p className="availabilityText">Available for hire</p>
                </button>
            </div>
            <div className="notificationIcon">
                <button className="notification transBtn">
                <img src={Vector} alt="profile image" />
                </button>
            </div>
            <div className="profile">
                <button className="profileBtn transBtn" onClick={() => {setMenuToggle(!menuToggle)}}> 
                    <div className="profileLft">
                    <img src={RectangleImg} alt="profile image" />
                    <div className="profileDetail">
                        <h5 className="profileName">Genesis Anosike</h5>
                        <p className="profileRole">Employee</p>
                    </div>
                    {

                   menuToggle &&
                    <div className="toggleMenu">
                        
                            {
                                profileLinks.map((link, index)=> (
                                    <Link to={link.path} className={`profileLink profileLink${index}`} key={index}>{link.name}</Link>
                                ))
                            }
                       
                    </div>
                     }
                    </div>
                    <img src={ExpandMore} alt="icon" />
                </button>
            </div>
        </div>

    </header>
  )
}

export default Header