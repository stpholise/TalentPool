import Filter from "../Components/Filter"
import JobCard from "../Components/JobCard"
import Search from "../Components/Search"
import '../styling/Jobs.css'


const Jobs = () => {
  const jobs = [
    {
        title: 'Frontend Developer',
        company: 'Google',
        location: 'Lagos',
        skills: ['UI', 'UX', 'Figma', 'Sketch', 'JavaScript', 'FrontEnd'],
        experience: 2,
        age: 22
    },
    {
        title: 'Backend Developer',
        company: 'Facebook',
        location: 'Abuja',
        skills: ['Node', 'Express', 'MongoDB', 'Postgres', 'GraphQL'],
        experience: 3,
        age: 23
    },
    {
        title: 'Fullstack Developer',
        company: 'Twitter',
        location: 'Port Harcourt',
        skills: ['UI', 'UX', 'Figma', 'Sketch', 'JavaScript', 'FrontEnd', 'Node', 'Express', 'MongoDB', 'Postgres', 'GraphQL'],
        experience: 4,
        age: 24
    },
    {
        title: 'UI/UX Designer',
        company: 'Instagram',
        location: 'Enugu',
        skills: ['UI', 'UX', 'Figma', 'Sketch'],
        experience: 1,
        age: 21
    },
    {
        title: 'Data Analyst',
        company: 'Snapchat',
        location: 'Ogun',
        skills: ['Python', 'R', 'SQL', 'Tableau'],
        experience: 2,
        age: 22
    },
    {
        title: 'Product Manager',
        company: 'WhatsApp',
        location: 'Kano',
        skills: ['Product Management', 'Agile', 'Scrum'],
        experience: 3,
        age: 23
    },
  ]
  return (
    <>
      <main className='dashboard'> 
        <div className="jobs ">
            <Filter isVisible={false}/>
            <div className="cardContainer">
              <Search />
              {
                jobs.map((job, index) => (
                  <div  key={index} className="jobDetails">
                     <JobCard 
                        title={job.title} 
                        company={job.company} 
                        location={job.location}
                        skills={job.skills}
                        experience={job.experience}
                        age={job.age}
                      /> 
                    
                  </div>
                ))
              }
            </div>
        </div>
       
        </main>
    </>
  )
}

export default Jobs