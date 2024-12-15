import JobDocs from './JobDocs'
import { useState } from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { PropTypes } from 'prop-types'
import ArrowBack from '../../assets/arrow_back.svg'  


const DocUpload = ({setProgress, uploadedDoc, setUploadedDoc }) => {
    const [ resume, setResume ] = useState(uploadedDoc?.resume || null)
    const [ coverLetter, setCoverLetter ] = useState(uploadedDoc?.coverLetter || null)
    
    const initialValues = {
        resume: uploadedDoc?.resume || '',
        coverLetter: uploadedDoc?.coverLetter || '',
      }
    const jobSchema = Yup.object({
        resume: Yup.mixed().required('Resume is required')
        .test('fileSize', 'File is too large', (value) => value && value.size <= 5000000)
        .test('fileFormat', 'unsupported file format', value => value && ['application/pdf', 'application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type)), 
        coverLetter: Yup.mixed()
        .test('fileSize', 'File is too large', value => {
          return !value || value.size <= 5000000; // Return true if no file or size is within limit
        })
        .test('fileFormat', 'Unsupported file format', (value) => {
          return !value || ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type); 
      }),  })
    const handleSubmit = (values) => {
        
        // Handle form submission logic here (like uploading the documents)
        setProgress(2)
        // if(uploadedDoc.includes(values))
        const { resume, coverLetter } = values
        setUploadedDoc((prev) =>( {...prev, resume }))
        setUploadedDoc((prev) =>( {...prev, coverLetter }))
      }
    
      const handleFileChange = (doc, field, setFieldValue) => {
        setFieldValue(field, doc)
        if (field === 'resume') setResume(doc)
          else if (field === 'coverLetter') setCoverLetter(doc)
        
    }

  return (
    <div className='successWrapper'>
    <Formik
      initialValues={initialValues}
      validationSchema={jobSchema}
      onSubmit={handleSubmit}
    >
          
         {({ setFieldValue,}  ) => (
            <div >
                 <Form>
                  <div className="">
                      <button type="button" onClick={() => {setProgress((progress) => progress-1)}} className="applyLink backTextBtn "> <img src={ArrowBack} alt="back"  /> Back</button>
                      <h2 className='employerQuest'>Upload your documents </h2>
                   </div>
                 
                    <div className="formControl border ">
                        <h3>Resume</h3>
                        <JobDocs  
                            doc={resume} 
                            setDoc={(doc) => handleFileChange(doc, 'resume', setFieldValue)}  
                        />
                        <div>
                          <ErrorMessage name='resume' component={'div'} className='error'/>
                          {(resume )  && <p className='smallTxt'>{resume.name}</p>}
                        </div>
                    </div>
                    <div className="formControl border">
                        <h3>Cover letter <span className="smallTxt">(optional)</span></h3>
                        <JobDocs  
                            doc={coverLetter} 
                            setDoc={(doc) => handleFileChange(doc,'coverLetter', setFieldValue)} />
                          <div>
                            { 
                              <ErrorMessage name='coverLetter' component={'div'} className='error'/>
                            }
                          {(coverLetter )  && <p className='smallTxt'>{coverLetter.name}</p>}
                        </div>
                    </div>
                   
                   <div className="btncont">
                    <button type="submit" className="applyLink   jobApplicationBtn">continue</button>  
                   
                    </div>
                </Form>
            </div>
               )}
    </Formik>
    </div>
  )
}

DocUpload.propTypes = {
    setProgress: PropTypes.func.isRequired,
    uploadedDoc: PropTypes.object,
    setUploadedDoc: PropTypes.func.isRequired,
  }

export default DocUpload