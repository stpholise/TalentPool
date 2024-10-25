import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import SignUpImg from '../assets/Rectangle 562.png'
import Facebook from '../assets/fb-icon.svg'
import './Signup.css'


const Signup = ({scrollToTop}) => {
    
    scrollToTop()

    const handleSignUp = () => {

    }

  return (
    <div  className="signinFlex">
        <aside className="signImg">
            <img src={SignUpImg} className="coverImage" alt="" />
        </aside>
        <section className="signUpSection">
            <div className="signText">
                <h2 className="signHeading"> 
                    Connect great talents with top organizations
                </h2>
                <p>create a profile to stay connected with the 1,000+ 
                    graduates and potentail employers
                </p>
            </div>
            <form action="#" className='signUpForm' onSubmit={handleSignUp}>
                <div className="inputCont">
                    <label htmlFor="fullName">Full Name</label>
                    <input 
                        type="text"
                        placeholder="e.g john doe"
                        className="signupInput radius5px"
                        id="fullName"
                    />
                </div>
                <div className="inputGrid">
                    <div className="inputCont">
                        <label htmlFor="email">Email</label>
                        <input  
                            type="text"
                            className="signupInput radius5px"
                            placeholder="example@gmail.com"
                            id="email" 
                        />
                    </div>
                    <div className="inputCont">
                        <label htmlFor="adminId">Admin ID</label>
                        <input  
                            type="text"
                            className="signupInput radius5px"
                            placeholder="e.g ADM 000"
                            id="adminId" 
                        />
                    </div>
                    <div className="inputCont">
                        <label htmlFor="password">Password</label>
                        <input  
                            type="text"
                            className="signupInput radius5px"
                            placeholder="at least 8 characters"
                            id="password" 
                        />
                    </div>
                    <div className="inputCont">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input  
                            type="text"
                            className="signupInput radius5px"
                            placeholder="at least 8 characters"
                            id="confirmPassword" 
                        />
                    </div>
                </div>

                <div className="inputCont checkFlex">
                    <input id='agree' type="checkbox" />
                    <label htmlFor='agree'>i agree to the <Link deepblueTxt to={'/'}>Terms Policy Conditions </Link> </label>
                </div>

                <div className="inputCont">
                    <button className='signupInput radius5px blueBg'>Sign Up</button>
                </div>

                <div className="inputCont orSect">
                    <div className="line"></div>
                    OR 
                    <div className="line"></div>
                </div>
                <div className="inputCont inputGrid fbGo">

                    <Link className="signupInput signFb flexBtn  radius5px" to={'/profile'}>
                        <img src={Facebook} alt="" />
                        <p>Log in with Facebook </p>
                    </Link>
                    <Link className="signupInput signGo flexBtn radius5px" to={'/'}>
                        <img src="" alt="" />
                        <p>Log in using Google </p>
                    </Link>

                </div>

            </form>
            <p className='centerText smallTxt'>
                Don&apos;t have an account with us? 
              <Link to={'/signup'} className='blueTxt'>Sign Up</Link> 
            </p>
        </section>
    </div>
  )
}

Signup.propTypes = {
    scrollToTop: PropTypes.func.isRequired
  }

export default Signup