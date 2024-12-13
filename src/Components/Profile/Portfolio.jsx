import { useDropzone } from 'react-dropzone'
import { useState, useRef  } from 'react'
import Minus from '../../assets/Minus.svg'
import Add from '../../assets/carbon_add.svg'




const Portfolio = () => {
    const [isPortfolioFile, setIsPortfolioFile] = useState(false)
    const [portfolioFiles, setPortfolioFiles ] = useState([])
    const [portfolioUrl, setPortfolioUrl] = useState()

    
    const portfolioInputRef = useRef(null);

    const onDropPortfolio = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0 ) {
        setIsPortfolioFile(true)
        setPortfolioFiles(acceptedFiles)
        setPortfolioUrl(URL.createObjectURL(acceptedFiles[0]));
        }
    }

    const resetPortfolioFile = () => {
        setIsPortfolioFile(false)
        setPortfolioFiles([])
        setPortfolioUrl('')
      }
    
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

  return (
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

  )
}

export default Portfolio