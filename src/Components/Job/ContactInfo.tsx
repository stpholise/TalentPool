import { Formik, Form, Field, ErrorMessage, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import Close from '../../assets/close.svg'
import 'animate.css'
import '../../styling/animated.css'


interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  location: string;
}
interface ContactInfoProps {
  userInfo: ContactFormValues;
  setUserInfo: (values: ContactFormValues) => void;
  initialContact: ContactFormValues;
  setContactModal: (show: boolean) => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ( {  setUserInfo, initialContact, setContactModal} ) => {
    

    const contactSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().matches(/^\d{11}$/, 'Phone number must be 11 digits').required('Phone number is required'),
        location: Yup.string().required('Location is required'),
    })
    const onSubmit = (values:ContactFormValues) => {
        setUserInfo(values) 
        setContactModal(false)
    }
    const closeModal = () => {
        setContactModal(false)
    }
  return (
    <div className="contactInfo modal skillModal lightShad bgF radius5px padd1">
          <div className="valueBoxTitle top spaceBet">
                    <h2 className='summaryTitle'> Contact information</h2>
                    <button aria-label="close" onClick={closeModal}> <img src={Close} alt=""  /> </button>
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



export default ContactInfo