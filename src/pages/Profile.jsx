import { PropTypes } from 'prop-types'
import Skills from '../Components/Skills'
import Socials from '../Components/Social'
import Person from '../Components/Person'
import { useDropzone } from 'react-dropzone'
import { useState, useRef  } from 'react'
import Minus from '../assets/Minus.svg'
import Add from '../assets/carbon_add.svg'
import { modalIsClose } from '../store/AppSlice'
import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const Profile = ({ scrollToTop}) => {
  const location = useLocation()  
  const dispatch = useDispatch()
  const [cvFile, setCvFile ] = useState([])
  const [isCvFile, setIsCvFile ] = useState(false)
  const [isPortfolioFile, setIsPortfolioFile] = useState(false)
  const [portfolioFiles, setPortfolioFiles ] = useState([])
  const [portfolioUrl, setPortfolioUrl] = useState()
  const [cvUrl, setCvUrl] = useState()
  const isModalOpen = useSelector((state) => state.app.modalIsOpen)

  useEffect(( ) => {
      console.log('location', location)
      dispatch(modalIsClose(false))
  }, [location, dispatch])

// const skillsets = [
//     { skill: 'UI/UX Design', level: 'Expert' },
//     { skill: 'Frontend Development', level: 'Intermediate' },
//     { skill: 'Backend Development', level: 'Intermediate' },
//     { skill: 'Database Management', level: 'Expert' },
//     { skill: 'Project Management', level: 'Expert' },
//     { skill: 'UI/UX Design', level: 'Expert' },
//     { skill: 'Frontend Development', level: 'Intermediate' },
//     { skill: 'Backend Development', level: 'Intermediate' },
//     { skill: 'Database Management', level: 'Expert' },
//     { skill: 'Project Management', level: 'Expert' },
//     { skill: 'UI/UX Design', level: 'Expert' },
//     { skill: 'Frontend Development', level: 'Intermediate' },
//     { skill: 'Backend Development', level: 'Intermediate' },
//     { skill: 'Database Management', level: 'Expert' },
//     { skill: 'Project Management', level: 'Expert' },
//     { skill: 'UI/UX Design', level: 'Expert' },
//     { skill: 'Frontend Development', level: 'Intermediate' },
//     { skill: 'Backend Development', level: 'Intermediate' },
//     { skill: 'Database Management', level: 'Expert' },
//     { skill: 'Project Management', level: 'Expert' },
//     { skill: 'UI/UX Design', level: 'Expert' },
//     { skill: 'Frontend Development', level: 'Intermediate' },
//     { skill: 'Backend Development', level: 'Intermediate' },
//     { skill: 'Database Management', level: 'Expert' },
//     { skill: 'Project Management', level: 'Expert' },
//     { skill: 'UI/UX Design', level: 'Expert' },
//     { skill: 'Frontend Development', level: 'Intermediate' },
//     { skill: 'Backend Development', level: 'Intermediate' },
//     { skill: 'Database Management', level: 'Expert' },
//     { skill: 'Project Management', level: 'Expert' },
//     { skill: 'UI/UX Design', level: 'Expert' },
//     { skill: 'Frontend Development', level: 'Intermediate' },
//     { skill: 'Backend Development', level: 'Intermediate' },
//     { skill: 'Database Management', level: 'Expert' }
// ]
  
const fileInputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setIsCvFile(true)
      setCvFile(acceptedFiles)
      setCvUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  }

  const portfolioInputRef = useRef(null);

  const onDropPortfolio = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0 ) {
      setIsPortfolioFile(true)
      setPortfolioFiles(acceptedFiles)
      setPortfolioUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  }

  const resetCvFile = () => {
    setIsCvFile(false)
    setCvFile([])
    setCvUrl('')
  }

  const resetPortfolioFile = () => {
    setIsPortfolioFile(false)
    setPortfolioFiles([])
    setPortfolioUrl('')
  }


  const {  getRootProps: getCvRootProps, getInputProps: getCvInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxSize: 3145728,
    maxFiles:1,
  })

  const { getRootProps: getPortfolioRootProps, getInputProps: getPortfolioInputProps } = useDropzone({
    onDrop: onDropPortfolio,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxSize: 3145728,
    maxFiles: 1,
  });

scrollToTop()


  return (
    <section className={`marginTL profilePage ${isModalOpen ? 'modalIsOpen': ''}`} {...getCvRootProps()}>
          <Person />  
      <section className='flexColumn w80'>
        <div className="fileSection spaceBet mb1">
        <aside className="cvSec radius5px padd1 bgF lightShad w50">
          <div className="cvTop topFles spaceBet ">
            <h4>CV</h4>
            {
              isCvFile ? 
              <button className="rmvCv " onClick={resetCvFile}> <img src={Minus} alt="" /> </button>
              :
              <button className="skillModalBtn btn" 
              onClick={() => fileInputRef.current.click()}   aria-label="Upload a file" >
                <img src={Add} alt=""  />
                <input {...getCvInputProps()}  
                  ref={fileInputRef}
                  style={{ 
                   display:'none'
                    }}
                />
              </button>
            }
          </div>
          {/* <p style={{marginBottom:'0.5rem'}}>{isCvFile ? 'File uploaded' : 'No file uploaded'}</p> */}
          <div className="cvBtnContnn">
            {
              isCvFile ? 
              <a 
                href={cvUrl}
                download={cvFile[0].name} className="cvBtn radius5px blueBg" 
              >View file </a>
              :
              <p>Upload a file</p>
            }
          </div>
        </aside>
        <aside className='portfolioSec radius5px padd1 bgF lightShad w50'>
            <div className="portfolioTop topFles spaceBet" {...getPortfolioRootProps}>
              <h4>Portfolio</h4>
              {
                isPortfolioFile ?
                <button className="rmvPortfolio" onClick={resetPortfolioFile}> <img src={Minus} alt="remove portfolio" /> </button>
                :
                <button className="skillModalBtn btn"
                onClick={() => portfolioInputRef.current.click()} 
                  aria-label = 'upload Portfolio file'>
                  <img src={Add} alt='add a portfolio file' /> 
                  <input {...getPortfolioInputProps()}
                    ref={portfolioInputRef}
                    style={{ display: 'none'}}
                  />
                </button>
              }
            </div>  
            {/* <p>Portfolio</p> */}
            <div className="portfolioBtnCont ">
              {
                isPortfolioFile ? 
                <a href={portfolioUrl} 
                download={portfolioFiles[0].name} 
                className="portfolioBtn blueBg radius5px">View file</a>
                :
                <p>Upload a file</p>
              }

            
            </div>
          </aside>
        </div>
        <section className="skillsets">
          <Skills />
          <Socials  />
        </section>
      </section>
    
    
    </section>
  )
}


Profile.propTypes = {
  scrollToTop: PropTypes.func.isRequired
}


export default Profile