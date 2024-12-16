 import SavedJobNav from '../Components/Job/SavedJobNav'
 import { useState, useEffect } from 'react'
 import JobCard from '../Components/Job/JobCard'
//  import Jobs from '../Components/data/jobs.js'

const SavedJobs = () => {
    const [jobs, setJobs] = useState([])
    const [option, setOption ] = useState('saved')
  
    const savedJobs = 
    [ 
        {
            "category": {
              "__CLASS__": "Adzuna::API::Response::Category",
              "tag": "engineering-jobs",
              "label": "Engineering Jobs"
            },
            "contract_time": "part_time",
            "company": {
              "display_name": "Stealth Mode",
              "__CLASS__": "Adzuna::API::Response::Company"
            },
            "contract_type": "permanent",
            "__CLASS__": "Adzuna::API::Response::Job",
            "title": "CoFounder UI/UX Unicorn startup in digital identity",
            "created": "2024-07-25T22:27:47Z",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4795571883?utm_medium=api&utm_source=22886062",
            "id": "4795571883",
            "location": {
              "display_name": "Surrey, South East England",
              "area": ["UK", "South East England", "Surrey"],
              "__CLASS__": "Adzuna::API::Response::Location"
            },
            "longitude": -0.4677,
            "salary_min": 38613.88,
            "salary_max": 38613.88, 
            "latitude": 51.253928, 
            "description": "Position: UI/UX Designer Location: Codie.ai , London Salary: No-paid internship for the first 6 months Codie.ai is seeking a talented and creative UI/UX Designer to join our dynamic team. As a UI/UX Designer, you will be responsible for creating visually appealing and user-friendly interfaces for our digital products. You will work closely with our development team to ensure that our products are not only aesthetically pleasing but also intuitive and easy to use. Key Responsibilities: - Design...",
            "salary_is_predicted": "1"
          },
          {
            "title": "UI/UX designer",
            "__CLASS__": "Adzuna::API::Response::Job",
            "contract_type": "contract",
            "company": {
              "__CLASS__": "Adzuna::API::Response::Company",
              "display_name": "INNOVATIFY LTD"
            },
            "created": "2024-07-25T22:27:47Z",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4795571883?utm_medium=api&utm_source=22886062",
            "id": "4795571883",
            "location": {
              "display_name": "London, UK",
              "area": ["UK", "London"],
              "__CLASS__": "Adzuna::API::Response::Location"
            },
            "longitude": -0.4677,
            "salary_min": 30000,
            "salary_max": 30000,
            "contract_time": "part_time",
            "latitude": 51.253928,
            "category": {
              "__CLASS__": "Adzuna::API::Response::Category",
              "tag": "creative-design-jobs",
              "label": "Creative & Design Jobs"
            },
            "description": "Codie.ai is looking for a talented UI/UX designer for creating visually appealing digital interfaces.",
            "salary_is_predicted": "0"
          },
          {
            "title": "UI/UX Designer",
            "__CLASS__": "Adzuna::API::Response::Job",
            "salary_min": 40000,
            "salary_max": 40000,
            "company": {
              "display_name": "In Technology Group Limited",
              "__CLASS__": "Adzuna::API::Response::Company"
            },
            "created": "2024-11-06T13:57:17Z",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4928312275?utm_medium=api&utm_source=22886062",
            "latitude": 55.028274,
            "category": {
              "label": "IT Jobs",
              "tag": "it-jobs",
              "__CLASS__": "Adzuna::API::Response::Category"
            },
            "description": "Exciting Opportunity: UI/UX Designer at a Leading Company in Newcastle Work Style: Hybrid with flexible arrangements Salary: Up to £42,000 DOE. Are you a creative and user-focused UI/UX Designer with a passion for crafting seamless digital experiences? This is your opportunity to join a forward-thinking company!",
            "id": "4928312275",
            "longitude": -1.746207,
            "salary_is_predicted": "0",
            "location": {
              "__CLASS__": "Adzuna::API::Response::Location",
              "area": ["UK", "North East England", "Tyne & Wear", "Newcastle Upon Tyne"],
              "display_name": "Newcastle Upon Tyne, Tyne & Wear"
            }
          },
          {
            "title": "UI/UX Designer",
            "__CLASS__": "Adzuna::API::Response::Job",
            "salary_min": 50000,
            "salary_max": 50000,
            "company": {
              "display_name": "In Technology Group Limited"
            },
            "created": "2024-11-06T03:33:10Z",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4927892891?utm_medium=api&utm_source=22886062",
            "salary_is_predicted": "0",
            "description": "Exciting Opportunity: UI/UX Designer at a Leading Company in Edinburgh Work Style: Hybrid with flexible arrangements Salary: Up to £50,000 DOE. Join a dynamic team of innovators in a company that values creativity and design.",
            "id": "4927892891",
            "location": {
              "display_name": "Edinburgh, Scotland",
              "area": ["UK", "Scotland", "Edinburgh"],
              "__CLASS__": "Adzuna::API::Response::Location"
            }
          },
          {
            "title": "Senior UI/UX Designer",
            "company": {
              "display_name": "ADLIB"
            },
            "contract_type": "contract",
            "description": "Senior UI/UX Designer Up to £550 p/day – ‘Outside IR35’. 3 Months Initial – Remote. Extensive SaaS experience and expertise in Figma required for this role. The project involves a global SaaS replatform for a specialist hardware/software company.",
            "category": {
              "tag": "it-jobs",
              "label": "IT Jobs"
            },
            "salary_max": 132000,
            "salary_min": 120000,
            "location": {
              "area": ["UK", "Eastern England", "Cambridgeshire", "Cambridge"],
              "display_name": "Cambridge, Cambridgeshire"
            },
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4947288862?utm_medium=api&utm_source=22886062",
            "id": "4947288862"
          },
          {
            "title": "Senior UI/UX Designer",
            "company": {
              "display_name": "ADLIB Recruitment"
            },
            "contract_type": "contract",
            "salary_min": 130000,
            "salary_max": 143000,
            "description": "Senior UI/UX Designer Up to £550 p/day Outside IR35. 3 Months Initial Remote. Extensive SaaS experience and Figma expertise required for a global SaaS replatform project.",
            "category": {
              "tag": "it-jobs",
              "label": "IT Jobs"
            },
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4947620854?utm_medium=api&utm_source=22886062",
            "id": "4947620854"
          },
          {
            "title": "UI/UX Designer",
            "salary_min": 43554.42,
            "salary_max": 43554.42,
            "company": {
            "display_name": "Estrid"
            },
            "location": {
            "display_name": "London, UK",
            "area": ["UK", "London"]
            },
            "contract_time": "full_time",
            "description": "UI/UX Designer for Estrid, an award-winning vegan razor and body care brand.",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4889218111?utm_medium=api&utm_source=22886062",
            "id": "4889218111"
        },
        {
            "title": "UI/UX Designer",
            "salary_min": 44509.54,
            "salary_max": 44509.54,
            "company": {
            "display_name": "Konrad"
            },
            "location": {
            "display_name": "London, UK",
            "area": ["UK", "London"]
            },
            "contract_time": "full_time",
            "description": "Experience Designer (UI/UX) for a next-gen digital consultancy.",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4921320672?utm_medium=api&utm_source=22886062",
            "id": "4921320672"
        },
        {
            "title": "UI/UX Lead",
            "salary_min": 46491.98,
            "salary_max": 46491.98,
            "company": {
            "display_name": "In Technology Group Limited"
            },
            "location": {
            "display_name": "Leeds, West Yorkshire",
            "area": ["UK", "Yorkshire And The Humber", "West Yorkshire", "Leeds"]
            },
            "contract_time": "full_time",
            "description": "UI/UX Lead to join a leading broadcasting company, overseeing a team of UX Designers.",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4939940167?utm_medium=api&utm_source=22886062",
            "id": "4939940167"
        },
        {
            "title": "Senior UI/UX Designer",
            "salary_min": 44224.61,
            "salary_max": 44224.61,
            "company": {
            "display_name": "HelloKindred"
            },
            "location": {
            "display_name": "London, UK",
            "area": ["UK", "London"]
            },
            "contract_time": "full_time",
            "description": "Senior UI/UX Designer for a global financial markets data provider, hybrid work model.",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4949040660?utm_medium=api&utm_source=22886062",
            "id": "4949040660"
        },
        {
            "title": "Senior UI/UX Designer",
            "salary_min": 45000,
            "salary_max": 45000,
            "company": {
            "display_name": "In Technology Group Limited"
            },
            "location": {
            "display_name": "Liverpool, Merseyside",
            "area": ["UK", "North West England", "Merseyside", "Liverpool"]
            },
            "contract_time": "full_time",
            "description": "Senior UI/UX Designer, onsite with flexible arrangements, up to £45,000.",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4937092721?utm_medium=api&utm_source=22886062",
            "id": "4937092721"
        },
        {
            "title": "Senior UI/UX Designer",
            "salary_min": 45000,
            "salary_max": 45000,
            "company": {
            "display_name": "In Technology Group Limited"
            },
            "location": {
            "display_name": "Manchester, Greater Manchester",
            "area": ["UK", "North West England", "Greater Manchester", "Manchester"]
            },
            "contract_time": "full_time",
            "description": "Senior UI/UX Designer, onsite with flexible arrangements, up to £45,000.",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4937093665?utm_medium=api&utm_source=22886062",
            "id": "4937093665"
        },
        {
            "title": "Senior UI/UX Designer",
            "salary_min": 40000,
            "salary_max": 40000,
            "company": {
            "display_name": "In Technology Group Limited"
            },
            "location": {
            "display_name": "Chester, Cheshire",
            "area": ["UK", "North West England", "Cheshire", "Chester"]
            },
            "contract_time": "hybrid",
            "description": "Senior UI/UX Designer, hybrid work model, up to £42,000.",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4937093671?utm_medium=api&utm_source=22886062",
            "id": "4937093671"
        },
        {
            "title": "UI/UX Designer",
            "salary_min": 45654.52,
            "salary_max": 45654.52,
            "company": {
            "display_name": "Photon Group"
            },
            "location": {
            "display_name": "UK",
            "area": ["UK"]
            },
            "contract_time": "full_time",
            "description": "UI/UX Designer for Photon Group, designing intuitive user interfaces and experiences.",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4956896821?utm_medium=api&utm_source=22886062",
            "id": "4956896821"
        },
    ]
    const appliedJobs = [
        
    {
        "title": "UI/UX Designer",
        "salary_min": 55000,
        "salary_max": 55000,
        "company": {
          "display_name": "In Technology Group Limited"
        },
        "contract_type": "permanent",
        "description": "Seeking Senior UI/UX Designer with experience in designing dynamic digital experiences. Hybrid role based in Leeds, with a salary up to £55,000 DOE.",
        "category": {
          "label": "IT Jobs",
          "tag": "it-jobs"
        },
        "location": {
          "display_name": "Leeds, West Yorkshire",
          "area": ["UK", "Yorkshire And The Humber", "West Yorkshire", "Leeds"]
        },
        "redirect_url": "https://www.adzuna.co.uk/jobs/details/4932034265?utm_medium=api&utm_source=22886062",
        "id": "4932034265"
      },
      {
        "salary_min": 39150.54,
        "salary_max": 39150.54,
        "title": "UI/UX designer",
        "company": {
          "__CLASS__": "Adzuna::API::Response::Company"
        },
        "redirect_url": "https://www.adzuna.co.uk/jobs/details/4913677053?utm_medium=api&utm_source=22886062",
        "id": "4913677053",
        "description": "Looking for an experienced UI/UX designer to turn wireframes into clean, professional designs. Tools: Figma or Sketch (your choice)."
      } ,
      {
          "title": "UI/UX Designer",
          "salary_min": 41582.6,
          "salary_max": 41582.6,
          "company": {
          "display_name": "Payments Card Solution Group t/a B4B Payments"
          },
          "location": {
          "display_name": "Clapham Junction, South West London",
          "area": ["UK", "London", "South West London", "Clapham Junction"]
          },
          "contract_type": "permanent",
          "contract_time": "full_time",
          "description": "UI/UX Designer for fintech, payments. Hybrid (3 days in office). Reports to Chief Product Officer.",
          "redirect_url": "https://www.adzuna.co.uk/jobs/details/4968212641?utm_medium=api&utm_source=22886062",
          "id": "4968212641"
      },
    ]
    const jobsInProgress = [
        {
            "title": "UI/UX Designer",
            "salary_min": 43554.42,
            "salary_max": 43554.42,
            "company": {
            "display_name": "Estrid"
            },
            "location": {
            "display_name": "London, UK",
            "area": ["UK", "London"]
            },
            "contract_time": "full_time",
            "description": "UI/UX Designer for Estrid, an award-winning vegan razor and body care brand.",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4889218111?utm_medium=api&utm_source=22886062",
            "id": "4889218111"
        },
        {
            "title": "UI/UX Designer",
            "salary_min": 44509.54,
            "salary_max": 44509.54,
            "company": {
            "display_name": "Konrad"
            },
            "location": {
            "display_name": "London, UK",
            "area": ["UK", "London"]
            },
            "contract_time": "full_time",
            "description": "Experience Designer (UI/UX) for a next-gen digital consultancy.",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4921320672?utm_medium=api&utm_source=22886062",
            "id": "4921320672"
        },
        {
            "title": "UI/UX Lead",
            "salary_min": 46491.98,
            "salary_max": 46491.98,
            "company": {
            "display_name": "In Technology Group Limited"
            },
            "location": {
            "display_name": "Leeds, West Yorkshire",
            "area": ["UK", "Yorkshire And The Humber", "West Yorkshire", "Leeds"]
            },
            "contract_time": "full_time",
            "description": "UI/UX Lead to join a leading broadcasting company, overseeing a team of UX Designers.",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4939940167?utm_medium=api&utm_source=22886062",
            "id": "4939940167"
        },
        {
            "title": "Senior UI/UX Designer",
            "salary_min": 44224.61,
            "salary_max": 44224.61,
            "company": {
            "display_name": "HelloKindred"
            },
            "location": {
            "display_name": "London, UK",
            "area": ["UK", "London"]
            },
            "contract_time": "full_time",
            "description": "Senior UI/UX Designer for a global financial markets data provider, hybrid work model.",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4949040660?utm_medium=api&utm_source=22886062",
            "id": "4949040660"
        },
        {
            "title": "Senior UI/UX Designer",
            "salary_min": 45000,
            "salary_max": 45000,
            "company": {
            "display_name": "In Technology Group Limited"
            },
            "location": {
            "display_name": "Liverpool, Merseyside",
            "area": ["UK", "North West England", "Merseyside", "Liverpool"]
            },
            "contract_time": "full_time",
            "description": "Senior UI/UX Designer, onsite with flexible arrangements, up to £45,000.",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4937092721?utm_medium=api&utm_source=22886062",
            "id": "4937092721"
        },
        {
            "title": "Senior UI/UX Designer",
            "salary_min": 45000,
            "salary_max": 45000,
            "company": {
            "display_name": "In Technology Group Limited"
            },
            "location": {
            "display_name": "Manchester, Greater Manchester",
            "area": ["UK", "North West England", "Greater Manchester", "Manchester"]
            },
            "contract_time": "full_time",
            "description": "Senior UI/UX Designer, onsite with flexible arrangements, up to £45,000.",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4937093665?utm_medium=api&utm_source=22886062",
            "id": "4937093665"
        },
        {
            "title": "Senior UI/UX Designer",
            "salary_min": 40000,
            "salary_max": 40000,
            "company": {
            "display_name": "In Technology Group Limited"
            },
            "location": {
            "display_name": "Chester, Cheshire",
            "area": ["UK", "North West England", "Cheshire", "Chester"]
            },
            "contract_time": "hybrid",
            "description": "Senior UI/UX Designer, hybrid work model, up to £42,000.",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4937093671?utm_medium=api&utm_source=22886062",
            "id": "4937093671"
        },
        {
            "title": "UI/UX Designer",
            "salary_min": 45654.52,
            "salary_max": 45654.52,
            "company": {
            "display_name": "Photon Group"
            },
            "location": {
            "display_name": "UK",
            "area": ["UK"]
            },
            "contract_time": "full_time",
            "description": "UI/UX Designer for Photon Group, designing intuitive user interfaces and experiences.",
            "redirect_url": "https://www.adzuna.co.uk/jobs/details/4956896821?utm_medium=api&utm_source=22886062",
            "id": "4956896821"
        },
    ]
    const archivedJobs = [  
    {
        "title": "Senior UI/UX Developer",
        "salary_min": 56251.91,
        "salary_max": 56251.91,
        "company": {
        "display_name": "Vanguard"
        },
        "location": {
        "display_name": "London, UK",
        "area": ["UK", "London"]
        },
        "contract_type": "permanent",
        "description": "Senior UI/UX Developer for Vanguard, focused on digital solutions.",
        "redirect_url": "https://www.adzuna.co.uk/jobs/details/4965511288?utm_medium=api&utm_source=22886062",
        "id": "4965511288"
    }
    ]
    useEffect(() =>{
        setJobs(savedJobs)
        switch(option) {
            case 'saved':
                setJobs(savedJobs)
                break;
            case 'applied':
                setJobs(appliedJobs)
                break;
            case 'in_progress':
                setJobs(jobsInProgress)
                break;    
            case 'archived':
                setJobs(archivedJobs)
                break;
            default  :
                setJobs(savedJobs)
                break;
        }

    }, [option])
 
 
 
    
  return (
    <div className="fullSize">
        <SavedJobNav
            setOption ={setOption}
        />

        {   
                jobs.map((job, index) =>{ 
               
                 return (
                  <div  key={index} className="jobDetails">
                     <JobCard 
                        job={job}
                      /> 
                    
                  </div>
                )})
              }


    </div>
  )
}

export default SavedJobs
