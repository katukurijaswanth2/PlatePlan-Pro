import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Categories } from './components/Categories'
import { SpecificCategory } from './components/SpecificCategory'
import { SpecificItem } from './components/SpecificItem'
import { MealPlanner } from './services/MealPlanner'
import { Signup } from './utils/Signup'
import { LoginForm } from './utils/LoginForm'

function App() {
  return (
    <>

      <Routes>

        <Route path="/" element={<Categories />} />
        <Route path='/login'element= {<LoginForm />} />
        <Route path='/signUp' element={<Signup />} />
        <Route path="/categories/:name" element={<SpecificCategory />} />
        <Route path="/categories/:name/meals/:mealId" element={<SpecificItem />} />
        <Route path="/planner" element={<MealPlanner />} />
      </Routes>

    </>
  )
}

export default App