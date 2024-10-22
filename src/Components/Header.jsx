import Vector from '../assets/Vector.svg'
import ExpandMore from '../assets/Expand_more.svg'
import RectangleImg from '../assets/Rectangle 85.png'
import Hamboger from '../assets/Group 50.svg'
import UserCircle from '../assets/User_cicrle_duotone.svg'
import { Link } from 'react-router-dom'
import { useState} from 'react'
import { PropTypes } from 'prop-types'


const Header = ({state , setState}) => {

    const [menuToggle, setMenuToggle] = useState(false)

    const profileLinks = [
    { name: 'Profile ', path: '/profile' },
    { name: 'Share Profile ', path: '/profile'},
    { name: 'Sign out ', path: '/signout'}
    ]

    const closeToggle = () => {
        setMenuToggle(false)
    }
    const handleToggle = () => {
        setMenuToggle(!menuToggle)
    }

    const handlemenuToggle = () => {
        setState(!state)
    }

    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(!show)
    }

  return (
    <header className="pageHeader">
        <div className="smallScreenMenu menuBtn">
            <button className=" transBtn" onClick={handlemenuToggle}> <img src={Hamboger} alt="" style={{width:'24px', height:'24px'}}/></button>
            <button className='profDis ballCont' onClick={handleShow}>
                 <img src={UserCircle} className={`ball ${show ? 'active' : ''} `} />
                 <img src={ExpandMore} className={`expan ${show ? 'active' : ''} `} />
            </button>
        </div>
        { show && <div className="profileOverlay" onClick={() => {setShow(false)}}></div>}
        <div className={`headerContent ${show ? 'show' : ''}`}>
            <div className="availabilityCont">
                <button className="availability transBtn">
                    <span className="dotCont"><span className='dot active'></span></span>
                    <p className="availabilityText">Available for hire</p>
                </button>
            </div>
            <div className="notificationIcon">
                <button className="notification transBtn">
                <img src={Vector} className='notifi' alt="profile image" />
                </button>
            </div>
            <div className="profile">
                <button className="profileBtn transBtn" onClick={handleToggle}> 
                    <div className="profileLft">
                    <img src={RectangleImg} alt="profile image" className='pimage' />
                    <div className="profileDetail">
                        <h5 className="profileName">Genesis Anosike</h5>
                        <p className="profileRole">Employee</p>
                    </div>
                    {

                   menuToggle &&(
                    <>
                    <div className="overlay headOver" onClick={closeToggle}> </div>
                    <div className="toggleMenu">
                        
                            {
                                profileLinks.map((link, index)=> (
                                    <Link to={link.path} className={`profileLink profileLink${index}`} key={index}>{link.name}</Link>
                                ))
                            }
                       
                    </div>
                   
                    </>)
                     }
                    </div>
                    <img src={ExpandMore} alt="icon" />
                </button>
            </div>
        </div>

    </header>
  )
}

Header.propTypes = {
    state: PropTypes.bool.isRequired,
    setState: PropTypes.func.isRequired
}

export default Header