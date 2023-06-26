import { useRoutes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { routes } from './routes'
function App() {
  const element = useRoutes(routes);
  return (
    <div>
      <Navbar />
      {element}
    </div>
  )
}

export default App
