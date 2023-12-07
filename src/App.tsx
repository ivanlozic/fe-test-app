import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import routesList from './routes/routesList'

function App() {
  return <Router>{routesList}</Router>
}

export default App
