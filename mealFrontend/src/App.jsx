
import './App.css'
import { Routes,Route } from 'react-router-dom'
import { Categories } from './components/Categories'
import { SpecificCategory } from './components/SpecificCategory'
function App() {
  
  return (
   <>
   <Routes>
      <Route path="/" element={<Categories />} />
      <Route path="/category/:name" element={<SpecificCategory />} />
    </Routes>
  </>
  )
}

export default App
