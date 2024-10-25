import { useState, useEffect } from 'react'
import Header from './Components/Header'
import Navigation from './Components/Navigation'
import Dashboard from './Components/Dashboard'
import Profile from './Components/Profile'
import Signup from './Components/Signup'
import Signin from './Components/Signin'

import { Route, Routes, useLocation} from 'react-router-dom'



import './App.css'

function App() {
 

  
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

  const [menuToggle, setMenuToggle] = useState(false)
  
//Determine the current path
   // Use useLocation to get the current path
   const location = useLocation();
   const path = location.pathname; // Get the current path

   const useScrollToTop = () => {
    const location = useLocation();
    useEffect(() => {
    window.scrollTo({ top: 0 });
    }, [location]);
    };
 
  return (
    <>
    
      {/* Conditionally render Header and Navigation component */}
      {(path !== '/signup' )|| ( path !== 'signin') && (
        <>
      <Header  state={menuToggle} setState={setMenuToggle} />
      <Navigation />
      </>
       )}
      <>
      {/* SMALL SCREEN NAVIGATION */}
      
        {menuToggle && <div className="menuOverlay" onClick={() => {setMenuToggle(false)}}></div>}
       {(path !== '/signup' )|| ( path !== 'signin') && <Navigation  state={menuToggle}/> }
      </>
     
        <Routes>
          <Route exact path='/' element={<Dashboard  user={user} scrollToTop={useScrollToTop} />} />  
          <Route exact path='/profile' element={<Profile user={user} scrollToTop={useScrollToTop}  />} />
          <Route exact path='/signup' element={<Signup scrollToTop={useScrollToTop} />} />
          <Route exact path='/signin' element={<Signin scrollToTop={useScrollToTop} />} />
        </Routes>
     
    
      {/* <Dashboard />         */}


    </>
  )
}

export default App

