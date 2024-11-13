
import Vector from '../assets/Vector.svg'
import ExpandMore from '../assets/Expand_more.svg'
import RectangleImg from '../assets/Rectangle 85.png'
import Hamboger from '../assets/Group 50.svg'
import UserCircle from '../assets/User_cicrle_duotone.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from  'react'
import { clearUserState} from '../store/UserSlice'
import {toggleGenMenu, clearAppState, logUserOut} from '../store/AppSlice'
import { useDispatch } from 'react-redux'


const Header = () => {

    const [available, setAvailable] = useState(false)
    const [show, setShow] = useState(false)
    const [profileMenu, setProfileMenu] = useState(false)
    const Navigate = useNavigate()

    const dispatch = useDispatch() 

    const handleProfileShow = () => {
        setShow(!show)
        console.log('show', show)
    }

    const toggleProfileMenu = () => {
        setProfileMenu(!profileMenu)
    }

    const closeHeaderPops = () => {
        setShow(false);
        setAvailable(false)
        setProfileMenu(false)
    }
   

    const profileLinks = [
        { name: 'Profile ', path: '/profile', id: 0},
        { name: 'Share Profile ', path: '/profile', id: 1},
        { name: 'Sign out ', path: '/signin', id:2, 
            onClick: ()=> {
                dispatch(clearUserState()); 
                dispatch(clearAppState()); 
                dispatch(logUserOut())} 
            }
    ]


  

  return (
    <header    className="pageHeader " >
        <div className="smallScreenMenu menuBtn">
            <button className=" transBtn" onClick={() => dispatch(toggleGenMenu())}> <img src={Hamboger} alt="" style={{width:'24px', height:'24px'}}/></button>
            <div className="grouping2">
                <button className="notification transBtn smallScreenNotification">
                    <img src={Vector} className='notifi' alt="profile image" />
                </button>
                <button className='profDis ballCont' onClick={() => toggleProfileMenu()}>
                    <img src={UserCircle} className={`ball ${profileMenu ? 'active' : ''} `} />
                    <img src={ExpandMore} className={`expan ${profileMenu ? 'active' : ''} `} />
                </button>
            </div>
        </div>
        { profileMenu && <div className="profileOverlay" onClick={() => closeHeaderPops()}></div>}
        <div className={`headerContent ${profileMenu ? 'show' : ''}`}>
            <div className="availabilityCont">
                <button onClick={() => setAvailable(!available)} className="availability transBtn">
                    <span className="dotCont"><span className={`dot  ${available ? 'active': ''} `}></span></span>
                    <p className="availabilityText">available for hire</p>
                </button>
            </div>
            <div className="notificationIcon transBtn bigScreen">
                        <button className="notification transBtn">
                        <img src={Vector} className='notifi' alt="profile image" />
                        </button>
            </div>
            <div className="profile">
                <button className="profileBtn transBtn smallScreen" onClick={() => Navigate('/profile')}>  
                    <img src={RectangleImg} alt="profile image" className='pimage' />
                    <div className="profileDetail">
                        <h5 className="profileName">Genesis Anosike</h5>
                        <p className="profileRole">Employee</p>
                    </div>
                </button>
                <button className="profileBtn transBtn bigScreen" onClick={handleProfileShow}> 
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
                                profileLinks.map((link)=> (
                                    <Link to={link.path} 
                                        className={`profileLink profileLink${link.id}`} 
                                        key={link.id}
                                        onClick={link.onClick}
                                        >{link.name}</Link>

                                ))
                            }
                       
                    </div>
                   
                    </>)
                     }
                    </div>
                    <img src={ExpandMore} alt="icon" />
                </button>
            </div>
            <div className="profileBtn transBtn smallScreen" >
                        <button  
                            style={{color:'#C23826', textAlign:'center'}} 
                            onClick={profileLinks[2].onClick}> 
                            {profileLinks[2].name}
                        </button>
            </div>
        </div>
        
    </header>
  )
}


export default Header