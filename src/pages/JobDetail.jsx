// import {  useParams } from 'react-router-dom'
// import useFetchJobs  from '../hooks/useFetchJobs'
import { useEffect, useState } from 'react'
// import Spinner from '../Components/Spinner'
import LinkExternal from '../assets/link-external.svg'
// import DarkLinkExternal from '../assets/link-external-dark.svg'
import Marker from '../assets/marker.svg'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, }  from 'react-redux'
 



const JobDetail = () => {

  
  const job = useSelector((state) => state.jobs.job)

  // console.log('job', job)

 
  const handleTimeDifference = (created) => {
    const today = new Date() ;
    const createdAt = new Date(created) 
    const timeDifference = today.getTime() - createdAt.getTime()
    const daysDifference = Math.floor(timeDifference/(1000 * 60 * 60 * 24))
    return daysDifference
  }

  // const { id } = useParams()

  const [ targetJob, setTargetJob ] = useState(null)
  // const [ isLoading, setIsLoading ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState('')
  
  useEffect(() => {
    if(!job) {
      setErrorMessage('No job found')
    }
    setTargetJob(job)
  }, [job])
  // useEffect(() => {
  //   const fetchJob = async () => {
  //     setIsLoading(true)
  //       try{
  //           const settings = {
  //             method: 'GET',
  //             headers:{
  //               Accept: 'application/json',
  //             }
  //           };
  //           const response  = await fetch(
  //             // `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=e4846793&app_key=91ff38f7efc0d6632363058526423e91&results_per_page=150&content-type=application/json`,
  //             `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=22886062&app_key=eed206437ecfaae0d5146924f8038553&results_per_page=150&content-type=application/json`,
  //             settings
  //           )
  //           if(!response.ok) {
  //               setErrorMessage('An error occurred while fetching the job')
  //               toast.error('An error occurred while fetching the job')
  //           }
  //           const data = await response.json();
  //           const job =  data.results.find((job) => job.id === id) || null
  //           console.log('job found', job )
  //           if(job) {
  //             setTargetJob(job)
              
  //           }
  //           else {
  //             setErrorMessage('No job found')
  //             console.log('response', response)
  //           }
  //       }
  //       catch(error) {
  //           setErrorMessage('An error occurred while fetching the job')
  //           console.log('error', error)
  //       }finally{
  //           setIsLoading(false)
  //           toast.dismiss()
  //       }
  //   }
  //   if(id) { 
  //     fetchJob()
  //   }
  // }
  // , [id])

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
  //   else if(targetJob) {
  //   toast.success('Job fetched successfully', { 
  //     autoClose: 2000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     draggable: true,
  //     position: "top-center",
  //     onClick: () => {
  //       toast.dismiss()
  //     }
  //   })
    
  // }
  }, [errorMessage,targetJob])

  const { 
    created, 
    location, 
    description, 
    redirect_url,
    title,
    category,
    company, 
    // salary_is_predicted, 
    contract_type ,
    salary_min,
    salary_max,
    // full_time,

  } = targetJob || {}

  // console.log('full time',full_time)
 
  return (
    <>
      
      <main className='dashboard'> 
      {/* {
       isLoading && <Spinner />
      } */}
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
                         {/* <img src={DarkLinkExternal} alt=""  style={{width:'12px'}}/> */}
                        </h4>
                       <h5> { location.area[location.area.length - 1]} </h5>
                  </div>
                  <div  >
                    <a href={redirect_url} target='_blank' className="applyLink">
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
               
              {/* {
                salary_is_predicted > 0 &&
                <h5 className="category"> Salary: {salary_is_predicted} </h5>
              }   */}
              {
                (salary_min && salary_max)  &&
                <h5 className="category"> pay: £{salary_min} - £{salary_max} </h5>
              }
              {
                contract_type &&
                <h5 className="category"> Job Type: {contract_type} </h5>
              }
                {/* {
                contract_type &&
                <h5 className="category"> Job Type: {contract_type} </h5>
              } */}
              <h5> posted  {handleTimeDifference(created)}  days ago</h5>
            </section>
        </div>}
      </main>
    
    </>
  )
}

export default JobDetail