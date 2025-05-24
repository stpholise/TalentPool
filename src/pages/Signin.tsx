import { Link, useNavigate } from 'react-router-dom'
import SignUpImg from '../assets/woman-in-blue-suit-jacket-2422293 1.png'
import Facebook from '../assets/fb-icon.svg'
import { logUserIn } from '../store/AppSlice'
import { useDispatch, useSelector } from 'react-redux'
import '../styling/Signup.css'
import {  useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import { RootState } from '../store'

interface Values {
    email: string;
    password: string;
}

const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  

    const initialValues = {
        email: '',
        password: '',
    }
    const validationSchema = Yup.object({
        email: Yup.string()
        .email("Invalid email address") 
        .required('Required'),
        password: Yup.string()
        .matches(/.{8,}/, "At least 8 characters")
        .matches(/[A-Z]/, "At least one uppercase letter")
        .matches(/[0-9]/, "At least one number")
        .matches(/[!@#$%^&*]/, "At least one special character")
        .required("Password is required"),
    })
 
    const handleSignin = (values: Values, onSubmitProps: FormikHelpers<Values>) => {
        console.log('submit',onSubmitProps)
        console.log('login values', values)
        dispatch(logUserIn())
        onSubmitProps.resetForm()
        isLogedin && navigate('/')
    } 
    const isLogedin = useSelector((state: RootState) => state.app.isLogedin)
    
    useEffect(
        ()=> {
            isLogedin && navigate('/')
            console.log('isLogedin', isLogedin)
        }
        ,[isLogedin, navigate]
    )
  return (
    <div  className="signinFlex">
        <aside className="signImg">
            <img src={SignUpImg} className="coverImage" alt="" />
        </aside>
        <section className="signUpSection">
            <div className="signText">
                <h2 className="signHeading"> 
                Welcome Back
                </h2>
                <p>Enter your email and password to access account
                </p>
            </div>
            <Formik
                initialValues={initialValues} 
                validationSchema={validationSchema}
                onSubmit={handleSignin} 
            >
                {
                    ( formik) =>(
                  
            <Form className='signUpForm' >
                       {/* {console.log(formik)} */}
                    <div className="inputCont">
                        <label htmlFor="email">Email</label>
                        <Field  
                            type="text"
                            name='email'
                            placeholder="example@gmail.com"
                            id="email" 
                            className="signupInput radius5px"      
                        />
                        <ErrorMessage name='email' component={'div'} className='error' />
                    </div>
             
                    <div className="inputCont">
                        <label htmlFor="password">Password</label>
                        <Field  
                            type="password"
                            name='password'
                            className="signupInput radius5px"
                            placeholder="enter password"
                            id="password" 
                        />
                        <ErrorMessage name='password' component={'div'} className='error' />
                    </div>
            

                <div className="inputCont checkFlex">
                    <input id='agree' type="checkbox" />
                    <label htmlFor='agree'>Remember me</label>
                </div>

                <div className="inputCont">
                <button 
                                    type="submit"  
                                    aria-label="sign in"
                    className={`signupInput radius5px blueBg ${(!formik.isValid || formik.isSubmitting)? 'grayBg':'blueBg'}`} 
                    disabled={!(formik.isValid && !formik.isSubmitting )}
                    // aria-disabled={!(formik.isValid && !formik.isSubmitting) ? false: true}
                >                       
                 Log In
                 </button>
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

            </Form>
  )
                
            }
            </Formik>
            <p className='centerText smallTxt'>
                Don&apos;t have an account with us? 
              <Link to={'/signup'} className='blueTxt'>Sign Up</Link> 
            </p>
        </section>
    </div>
  )
}


export default Signup