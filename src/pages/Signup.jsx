import { Link, useNavigate } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import SignUpImg from '../assets/Rectangle 562.png'
import Facebook from '../assets/fb-icon.svg'
import '../styling/Signup.css'
import { logUserIn } from '../store/AppSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useEffect } from 'react'


const Signup = ({scrollToTop}) => {
    scrollToTop()
    const dispatch = useDispatch()
    const isLogedin = useSelector((state) => state.app.isLogedin)
    const navigate = useNavigate()
    const initialValues = {
        fullName: '',
        email: '',
        adminId: '',
        password: '',
        confirmPassword: '',
        acceptTerms:false,
    }
    const signupSchema = Yup.object({
        fullName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Email is Required'),
        adminId: Yup.string().required('Admin Id is Required'),
        password: Yup.string()
            .matches(/.{8,}/, "At least 8 characters")
            .matches(/[A-Z]/, "At least one uppercase letter")
            .matches(/[0-9]/, "At least one number")
            .matches(/[!@#$%^&*]/, "At least one special character")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
        createdOn: Yup.date().default(() => new Date())
    })

    const handleSignUp = async (values, action) => {
       await dispatch(logUserIn())
       console.log(values.createdOn)
       console.log(values)
        action.resetForm()
      
    }

    useEffect(() => {
        if (isLogedin) {
          navigate('/');
        }
      }, [isLogedin, navigate]);


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
            <Formik 
                initialValues={initialValues}
                validationSchema={signupSchema}
                onSubmit={handleSignUp}
            >
                {
                    (formik) => (

                  
            <Form className='signUpForm' >
                <div className="inputCont">
                    <label htmlFor="fullName">Full Name</label>
                    <Field 
                        type="text"
                        placeholder="e.g john doe"
                        className="signupInput radius5px"
                        id="fullName"
                        name='fullName'
                    />
                    <ErrorMessage name='fullName' component={'div'} className='error' />
                </div>
                <div className="inputGrid">
                    <div className="inputCont">
                        <label htmlFor="email">Email</label>
                        <Field  
                            type="text"
                            className="signupInput radius5px"
                            placeholder="example@gmail.com"
                            id="email" 
                            name='email'
                        />
                        <ErrorMessage name='email' component={'div'} className='error' />     
                    </div>
                    <div className="inputCont">
                        <label htmlFor="adminId">Admin ID</label>
                        <Field  
                            type="text"
                            className="signupInput radius5px"
                            placeholder="e.g ADM 000"
                            id="adminId" 
                            name='adminId'
                        />
                        <ErrorMessage name='adminId' component={'div'} className='error' />
                    </div>
                    <div className="inputCont">
                        <label htmlFor="password">Password</label>
                        <Field  
                            type="password"
                            className="signupInput radius5px"
                            placeholder="at least 8 characters"
                            id="password" 
                            name='password'
                        />
                        <ErrorMessage name='password' component={'div'} className='error' />
                    </div>
                    <div className="inputCont">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Field  
                            type="password"
                            className="signupInput radius5px"
                            placeholder="at least 8 characters"
                            id="confirmPassword" 
                            name='confirmPassword'
                        />
                        <ErrorMessage name='confirmPassword' component={'div'} className='error' />
                    </div>
                </div>

                <div className="inputCont checkFlex">
                    <Field name="acceptTerms" id='acceptTerms' type="checkbox" />
                    <label htmlFor='agree'>i agree to the <Link deepblueTxt to={'/'}>Terms Policy Conditions </Link> </label>
                </div>

                <div className="inputCont">
                    <button type='submit' 
                           className={`signupInput radius5px blueBg ${(!formik.isValid || formik.isSubmitting)? 'grayBg':'blueBg'}`} 
                           disabled={!(formik.isValid && !formik.isSubmitting )}
                           aria-disabled={!(formik.isValid && !formik.isSubmitting)}
                    >Sign Up</button>
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

Signup.propTypes = {
    scrollToTop: PropTypes.func.isRequired
  }

export default Signup