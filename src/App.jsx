import { useState } from 'react'
import Header from './Components/Header'
import Navigation from './Components/Navigation'
import Dashboard from './Components/Dashboard'
import Profile from './Components/Profile'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'


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
  


  return (
    <>
    <Router>
      <Header  state={menuToggle} setState={setMenuToggle}
        />
      <Navigation />
      <>
      {/* SMALL SCREEN NAVIGATION */}
      
        {menuToggle && <div className="menuOverlay" onClick={() => {setMenuToggle(false)}}></div>}
        <Navigation  state={menuToggle}/>
      </>
     
        <Routes>
          <Route exact path='/' element={<Dashboard  user={user}/>} />  
          <Route exact path='/profile' element={<Profile user={user} />} />
        </Routes>
     </Router>
    
      {/* <Dashboard />         */}


    </>
  )
}

export default App

