import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import routesList from './routes/routesList'
import Modal from 'react-modal'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    Modal.setAppElement('#root')
  }, [])
  return <Router>{routesList}</Router>
}

export default App
