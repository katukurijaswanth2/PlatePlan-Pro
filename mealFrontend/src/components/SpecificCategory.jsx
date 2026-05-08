import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import "./SpecificCategory.css"

export const SpecificCategory = () => {
    const { name } = useParams()
    const { state } = useLocation()
    const navigate = useNavigate()
    const category = state?.category

    const [meals, setMeals] = useState([])
    const [mealsLoading, setMealsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
                )
                setMeals(response.data.meals || [])
            } catch (err) {
                setError("Failed to fetch meals")
            } finally {
                setMealsLoading(false)
            }
        }
        fetchMeals()
    }, [name])

    return (
        <div className="specificContainer">

            {/* Back Button */}
            <button className="backButton" onClick={() => navigate(-1)}>
                ← Back
            </button>

            {/* Category Detail */}
            {category && (
                <div className="categoryDetail">
                    <img
                        src={category.strCategoryThumb}
                        alt={category.strCategory}
                        className="categoryImage"
                    />
                    <div className="categoryInfo">
                        <h1 className="categoryTitle">{category.strCategory}</h1>
                        <p className="categoryDescription">{category.strCategoryDescription}</p>
                    </div>
                </div>
            )}

            {/* Meals Section */}
            <h2 className="mealsHeading">Meals in {name}</h2>

            {mealsLoading ? (
                <p className="loading">Loading meals...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <div className="mealsGrid">
                    {meals.map((meal) => (
                        <div key={meal.idMeal} className="mealCard">
                            <img
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                className="mealImage"
                            />
                            <p className="mealName">{meal.strMeal}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}