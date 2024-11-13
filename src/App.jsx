import { useEffect } from 'react'
import Header from './Components/Header'
import Navigation from './Components/Navigation'
import Dashboard from './Components/Dashboard'
import Profile from './Components/Profile'
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import EmployerDashboard from './Components/EmployerDashboard'
import { useSelector, useDispatch }  from 'react-redux'
import { closeAll } from './store/AppSlice'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'



import './App.css'
import GuardRoute from './Components/GuardRoute'

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
  console.log({'loged in ':isLogedin})
  console.log({'modal open ':menuToggle})
  
//Determine the current path
   // Use useLocation to get the current path
   const location = useLocation();
   const path = location.pathname; // Get the current path

   const useScrollToTop = () => {
    const location = useLocation();
    useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(closeAll())
    }, [location]);
    };
 
   
  return (
    <>
   


      {/* Conditionally render Header and Navigation component */}
      {(path !== '/signup' && path !== '/signin')&& (
        <>
      <Header  />
      <Navigation />
      </>
       )}
      <>
      {/* SMALL SCREEN NAVIGATION */}
      
        {menuToggle && <div className="menuOverlay" onClick={() => dispatch(closeAll())}></div>}
       {(path !== '/signup' && path !== '/signin') && <Navigation /> }
      </>
     
        <Routes>
          <Route exact path='/' element={<GuardRoute element={Dashboard} auth={isLogedin} user={user} scrollToTop={useScrollToTop} />} />  
          <Route path='/profile' element={isLogedin ? <Profile user={user} scrollToTop={useScrollToTop} /> : <Navigate to='/signin' replace />} />
          <Route path='/EmployerDashboard' element={<GuardRoute element={EmployerDashboard} auth={isLogedin} user={user} scrollToTop={useScrollToTop} />} />
          <Route exact path='/signup' element={<Signup scrollToTop={useScrollToTop} />} />
          <Route exact path='/signin' element={<Signin scrollToTop={useScrollToTop} />} />
        </Routes>
     
  
      {/* <Dashboard />         */}


    </>
  )
}

export default App

