import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Categories } from './components/Categories'
import { SpecificCategory } from './components/SpecificCategory'
import { SpecificItem } from './components/SpecificItem'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/categories/:name" element={<SpecificCategory />} />
        <Route path="/categories/:name/meals/:mealId" element={<SpecificItem />} />
      </Routes>
    </>
  )
}

export default App