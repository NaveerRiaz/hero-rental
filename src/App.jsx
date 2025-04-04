import Home from './Pages/Home'
import About from './Pages/About'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Details from './Pages/Details'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/index.html' element={<Home/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/details/:id' element={<Details />}/>

      </Routes>

    </Router>
  )
}

export default App
