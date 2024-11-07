import {Box} from '@chakra-ui/react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Create from './pages/Create'
function App() {

  return (
    <Router>
      <Navbar/>
    <Box minH={"100vh"}>
      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path = '/create' element = {<Create/>} />
      </Routes>
    </Box>
    </Router>
  )

}


export default App
