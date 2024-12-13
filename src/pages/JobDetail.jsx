
import { useEffect, useState } from 'react'
import LinkExternal from '../assets/link-external.svg'
import Marker from '../assets/marker.svg'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, }  from 'react-redux'
 
import { Link } from 'react-router-dom';



const JobDetail = () => {

  
  const job = useSelector((state) => state.jobSlice.job)

 
  const handleTimeDifference = (created) => {
    const today = new Date() ;
    const createdAt = new Date(created) 
    const timeDifference = today.getTime() - createdAt.getTime()
    const daysDifference = Math.floor(timeDifference/(1000 * 60 * 60 * 24))
    return daysDifference
  }


  const [ targetJob, setTargetJob ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState('')
  
  useEffect(() => {
    if(!job) {
      setErrorMessage('No job found')
    }
    setTargetJob(job)
  }, [job])




  useEffect(() => {
    if(errorMessage) { 
      toast.error(errorMessage, { 
       autoClose: 3000,
       hideProgressBar: true,
       closeOnClick: true,
       draggable: true,
       position: "top-center",
       onClick: () => {
         toast.dismiss()
       }
     })
    
   }
  }, [errorMessage,targetJob])

  const { 
    created, 
    location, 
    description, 
    redirect_url,
    title,
    category,
    company, 
    contract_type ,
    salary_min,
    salary_max,
  } = targetJob || {}

   
 
  return (
    <>
      
      <main className='dashboard'> 
     
      {
        !targetJob && <p className='error'>{errorMessage}</p>
      }
             <ToastContainer />

      {
        targetJob &&
        <div className="jobDetail">
            <section className="jobDetailTop bbottom">
               <h2> {title}</h2>
              <div className="topFlex">
                
                  <div className="companyCont">
                       <h4 className='companyName '> { company.display_name}
                        </h4>
                       <h5> { location.area[location.area.length - 1]} </h5>
                  </div>
                  <div className='applyBtns' >
                    <Link to={'/jobForm'}   className='applyLink applyHere'>
                       <button>Apply Now</button>
                    </Link> 
                    <a href={redirect_url} target='_blank' className="applyLink blueBg">
                       <button>Apply</button>
                       <img src={LinkExternal} alt="" style={{width:'12px'}} />
                    </a> 
                  </div> 
                  <div className="locationCont companyCont">
                      <h3>Location</h3>
                      <h5> <img src={Marker} alt=""  style={{width:'15px'}} /> { location.display_name} </h5>
                  </div>
                </div>
                <div className="location">
              
              </div>
            </section>

            <section className='jobDetailDescription bbottom'>
              <h3> Job Description</h3>
              <p>{ description}</p>
            </section> 

            <section className="jobDetailfooter bbottom">
              <h5 className="category"> Category: {category?.label} </h5>
               
            
              {
                (salary_min && salary_max)  &&
                <h5 className="category"> pay: £{salary_min} - £{salary_max} </h5>
              }
              {
                contract_type &&
                <h5 className="category"> Job Type: {contract_type} </h5>
              }
              <h5> posted  {handleTimeDifference(created)}  days ago</h5>
            </section>
        </div>}
      </main>
    
    </>
  )
}

export default JobDetail