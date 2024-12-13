import { useDropzone }  from 'react-dropzone'
import { useState, useRef } from 'react'
import Minus from '../../assets/Minus.svg'
import Add from '../../assets/carbon_add.svg'
import { PropTypes } from 'prop-types'

const JobDocs = ({ setDoc, doc }) => {
    const [ isDocum, setIsDocum ] = useState(false)
    const [ docum, setDocum ] = useState(doc)
    const documInputRef = useRef(null)

    const onDropDocum = (acceptedFiles) =>{
        if( acceptedFiles && acceptedFiles.length > 0 ) {
            const file = acceptedFiles[0]
            setIsDocum(true)
            setDocum(file)
            setDoc(file) 
            // console.log('File selected:', file)
        }
    }
    
   
    const removeDocum =() => {
        setIsDocum(false)
        setDocum(null) 
        setDoc(null)
    }

    const { getInputProps: getDocumInputProps, getRootProps: getDocumRootProps,   } = useDropzone({
        onDrop: onDropDocum,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'text/plain': ['.txt'],
        },
        // maxSize:4145728,
        maxFiles:1,
    })

  return (
    <div className="dropZoneWrap  ">
    <div className={'redus5px'} {...getDocumRootProps()}>
   
        {
            isDocum  && docum ?(
            <button type='button' onClick={removeDocum}  className='fillWidth'  >
                <img src={Minus} alt="" /> 
            </button>)
            :(
            <button
                type='button' 
                onClick={() => (documInputRef.current.click())}
                aria-label='updoading a document' 
            >
                <img src={Add} alt="add icon" />
                <input 
                    {...getDocumInputProps()} 
                    ref={documInputRef}
                    style={{
                        display:'none'
                    }}
            />
         
            </button>)
        } 

                     
    </div>

    </div>
  )
}
JobDocs.propTypes ={
    doc: PropTypes.object,
    setDoc: PropTypes.func.isRequired,
}

export default JobDocs