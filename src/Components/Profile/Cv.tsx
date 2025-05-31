import { useDropzone } from 'react-dropzone'
import { useState, useRef } from 'react'
import Minus from '../../assets/Minus.svg'
import Add from '../../assets/carbon_add.svg'

const Cv = () => {
    const [ isCvFile, setIsCvFile ] = useState<boolean>(false)
    const [ cvFiles, setCvFiles ] = useState<File[]>([])
    const [ cvUrl, setCvUrl ] = useState<string>('')

    const cvInputRef = useRef<HTMLInputElement>(null);

    const onDropCv = (acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0 ) {
            setIsCvFile(true)
            setCvFiles(acceptedFiles)
            setCvUrl(URL.createObjectURL(acceptedFiles[0]))
        }
    }

    const resetCvFiles = () => {
        setIsCvFile(false)
        setCvFiles([])
        setCvUrl('')
    }

    const {  getRootProps: getCvRootProps, getInputProps: getCvInputProps } = useDropzone({
        onDrop: onDropCv,
        accept: {
          'application/pdf': ['.pdf'],
          'application/msword': ['.doc'],
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
          'text/plain': ['.txt'],
        },
        maxSize: 4145728,
        maxFiles:1,
      })
    

  return (
    <aside className="cvSec radius5px padd1 bgF lightShad w50"  {...getCvRootProps()}>
        <div className="cvTop topFles spaceBet ">
            <h4>CV</h4>
            {
              isCvFile ? 
              <button aria-label="remove cv" className="rmvCv " onClick={resetCvFiles}> <img src={Minus} alt="" /> </button>
              :
              <button aria-hidden='true' className="skillModalBtn btn" 
              onClick={() => cvInputRef.current?.click()}   aria-label="Upload a file" >
                <img src={Add} alt=""  />
                <input {...getCvInputProps()}  
                  ref={cvInputRef}
                  className="always-hidden"
                />
              </button>
            }
          </div>
          <div className="cvBtnContnn">
            {
              isCvFile ? 
              <a 
                href={cvUrl}
                download={cvFiles[0].name} className="cvBtn radius5px blueBg" 
              >View file </a>
              :
              <p>Upload a file</p>
            }
          </div>
    </aside>
  )
}

export default Cv