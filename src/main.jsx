import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom' 
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/index.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> 
    <PersistGate persistor={persistor}>
    <Router>
      <App />
    </Router>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
