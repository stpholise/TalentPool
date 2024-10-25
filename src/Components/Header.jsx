import Vector from '../assets/Vector.svg'
import ExpandMore from '../assets/Expand_more.svg'
import RectangleImg from '../assets/Rectangle 85.png'
import Hamboger from '../assets/Group 50.svg'
import UserCircle from '../assets/User_cicrle_duotone.svg'
import { Link } from 'react-router-dom'

import {toggleGenMenu,toggleProfileMenu, handleShow, handleAvailability, closeAll } from './store'
import { useDispatch, useSelector } from 'react-redux'


const Header = () => {
    


    const handleProfileShow = () => {
        console.log('handleProfileShow')
        dispatch(handleShow())
    }

   
    const dispatch = useDispatch() 
   
    const show = useSelector((state) => state.count.show)
    const available = useSelector((state) => state.count.available)
    const profileMenu = useSelector((state) => state.count.profileMenu)

  

    const profileLinks = [
    { name: 'Profile ', path: '/profile' },
    { name: 'Share Profile ', path: '/profile'},
    { name: 'Sign out ', path: '/signout'}
    ]


  

  return (
    <header className="pageHeader">
        <div className="smallScreenMenu menuBtn">
            <button className=" transBtn" onClick={() => dispatch(toggleGenMenu())}> <img src={Hamboger} alt="" style={{width:'24px', height:'24px'}}/></button>
            <button className='profDis ballCont' onClick={() => dispatch(toggleProfileMenu())}>
                 <img src={UserCircle} className={`ball ${profileMenu ? 'active' : ''} `} />
                 <img src={ExpandMore} className={`expan ${profileMenu ? 'active' : ''} `} />
            </button>
        </div>
        { profileMenu && <div className="profileOverlay" onClick={() => dispatch(closeAll())}></div>}
        <div className={`headerContent ${profileMenu ? 'show' : ''}`}>
            <div className="availabilityCont">
                <button onClick={() => dispatch(handleAvailability())} className="availability transBtn">
                    <span className="dotCont"><span className={`dot  ${available ? 'active': ''} `}></span></span>
                    <p className="availabilityText">available for hire</p>
                </button>
            </div>
            <div className="notificationIcon">
                <button className="notification transBtn">
                <img src={Vector} className='notifi' alt="profile image" />
                </button>
            </div>
            <div className="profile">
                <button className="profileBtn transBtn" onClick={handleProfileShow}> 
                    <div className="profileLft">
                    <img src={RectangleImg} alt="profile image" className='pimage' />
                    <div className="profileDetail">
                        <h5 className="profileName">Genesis Anosike</h5>
                        <p className="profileRole">Employee</p>
                    </div>
                    {

                   show &&(
                    <>
                    <div className="overlay headOver" > </div> 
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


export default Header