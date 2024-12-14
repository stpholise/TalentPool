
import { Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import Close from '../../assets/close.svg'
import 'animate.css'
import '../../styling/animated.css'
import { PropTypes } from 'prop-types'

const ContactInfo = ( {  setUserInfo, initialContact, setContactModal} ) => {
    

   
    const contactSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().matches(/^\d{11}$/, 'Phone number must be 11 digits').required('Phone number is required'),
        location: Yup.string().required('Location is required'),
    })
    const onSubmit = (values) => {
        setUserInfo(values)
        console.log('values', values)
        setContactModal(false)
    }
    const closeModal = () => {
        setContactModal(false)
    }
  return (
    <div className="contactInfo modal skillModal lightShad bgF radius5px padd1">
          <div className="valueBoxTitle top spaceBet">
                    <h2 className='summaryTitle'> Contact information</h2>
                    <button onClick={closeModal}> <img src={Close} alt=""  /> </button>
                </div>
        <Formik
            initialValues={initialContact}
            validationSchema={contactSchema}
            onSubmit={onSubmit}
        >
            {
                () => (
                    <Form>
                        <div className="formControl ">
                            <label htmlFor="name">Name</label>
                            <Field type="text" id="name" name="name" />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>
                        <div className="formControl">
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>
                        <div className="formControl">
                            <label htmlFor="phone">Phone</label>
                            <Field type="text" id="phone" name="phone" />
                            <ErrorMessage name="phone" component="div" className="error" />
                        </div>
                        <div className="formControl">
                            <label htmlFor="location">Location</label>
                            <Field type="text" id="location" name="location" />
                            <ErrorMessage name="location" component="div" className="error" />
                        </div>
                        <button type="submit" className="applyLink blueBg jobApplicationBtn">Save</button>
                    </Form>
                )
            }
        </Formik>
    </div>
  )
}

ContactInfo.propTypes = {
    setUserInfo: PropTypes.func.isRequired,
    setContactModal: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
    initialContact: PropTypes.object.isRequired,
}

export default ContactInfo