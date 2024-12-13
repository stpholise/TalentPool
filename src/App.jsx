import './App.css'
import { useEffect } from 'react'
// import global comoponents 
import Header from './Components/Header'
import Navigation from './Components/Navigation'
import GuardRoute from './Components/GuardRoute'
// import each page component 
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import JobSearch from './pages/JobSearch'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
// import EmployerDashboard from './pages/EmployerDashboard'
import JobDetail from './pages/JobDetail'
import JobApplication from './pages/JobApplication'
// import slices from my resux store 
import { closeAll } from './store/AppSlice'
import { modalIsClose } from './store/AppSlice'
// import packages, react-router-dom for route management and redux for global state management
import { useSelector, useDispatch }  from 'react-redux'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'

 
function App() {

 const isModalOpen = useSelector((state) => state.app.isModalOpen)
 { isModalOpen ? document.body.classList.add('modalIsOpen') : document.body.classList.remove('modalIsOpen');}
 const isLogedin = useSelector((state) => state.app.isLogedin)
 const dispatch = useDispatch()


  
  const user = {
    name: 'Genesis Anosike',
    occupation: 'UI/UX Designer',
    email: 'anosikegenesis@gmail.com',
    phone: '0801 - 234 - 5678',
    location: 'Lagos, Nigeria',
    twitter: '@Anosike_UI',
    dribble: 'https://dribbble.com',
    behance: 'https://www.behance.net'
  }

  const menuToggle  = useSelector((state) => state.app.genMenu)
    //Determine the current path, Use useLocation to get the current path
   const location = useLocation();
   const path = location.pathname; // Get the current path

  
   
    useEffect(() => {
      const scrollToTop = () => {
    window.scrollTo({ top: 0 });
    dispatch(modalIsClose(false)) 
    dispatch(closeAll())}
    scrollToTop()
    }, [path, dispatch]);
   
   
   
  return (
    <>
   


      {/* Conditionally render Header and Navigation component */}
      {(path !== '/signup' && path !== '/signin'  )&& (
        <>
        <Header  />
        <Navigation />
      </>
       )}
      <>
      {/* SMALL SCREEN NAVIGATION */}
        {menuToggle && 
          <div className="menuOverlay" onClick={() => dispatch(closeAll())}></div>}
       {(path !== '/signup' && path !== '/signin') && <Navigation /> }
      
      </>
     
        <Routes>
          <Route exact path='/' element={<GuardRoute element={Dashboard} auth={isLogedin} user={user} 
          />} />  
          <Route exact path='/jobsearch' element={<GuardRoute element={JobSearch} auth={isLogedin} user={user} 
          />} />          
          <Route path='/profile' element={isLogedin ? <Profile user={user}
           /> : <Navigate to='/signin' replace />} />
          {/* <Route path='/EmployerDashboard' element={<GuardRoute element={EmployerDashboard} auth={isLogedin} user={user}  />} /> */}
           <Route path='/jobsearch/:id' element={<GuardRoute element={JobDetail} auth={isLogedin} user={user} 
          />} />
           <Route path='/jobForm' element={<GuardRoute element={JobApplication} auth={isLogedin} user={user} 
          />} />
          <Route exact path='/signup' element={<Signup 
          />} />
          <Route exact path='/signin' element={<Signin 
          />} />
          
        </Routes>
     
  


    </>
  )
}

export default App

