import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { Card } from "../utils/Card"
import "./SpecificCategory.css"

export const SpecificCategory = () => {
    const { name } = useParams()
    const navigate = useNavigate()

    const [category, setCategory] = useState(null)
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
            .then((response) => {
                const found = response.data.categories.find(
                    (cat) => cat.strCategory === name
                )
                setCategory(found)
            })
            .catch(() => setError("Failed to fetch category"))
    }, [name])

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
            .then((response) => setMeals(response.data.meals || []))
            .catch(() => setError("Failed to fetch meals"))
            .finally(() => setLoading(false))
    }, [name])

    if (loading) return <p className="loading">Loading...</p>
    if (error) return <p className="error">{error}</p>

    return (
        <div className="specificContainer">

            <button className="backButton" onClick={() => navigate(-1)}>
                ← Back
            </button>

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

            <h2 className="mealsHeading">Meals in {name}</h2>

            <div className="parent-grid">
                <div className="grid">
                    {meals.map((meal) => (
                        <Card
                            key={meal.idMeal}
                            image={meal.strMealThumb}
                            name={meal.strMeal?.slice(0,5)+"..."}
                            link={`/categories/${name}/meals/${meal.idMeal}`}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}