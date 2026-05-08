import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "./SpecificItem.css"

export const SpecificItem = () => {
    const { mealId } = useParams()
    const navigate = useNavigate()
    const [meal, setMeal] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saved, setSaved] = useState(false)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const response = await axios.get(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
                )
                setMeal(response.data.meals[0])
            } catch (err) {
                console.error("Failed to fetch meal", err)
            } finally {
                setLoading(false)
            }
        }
        fetchMeal()
    }, [mealId])

 const handleAddToPlanner = async () => {
    setSaving(true)
    try {
        await axios.post("http://localhost:8080/api/meals", {
            name: meal.strMeal,
            image: meal.strMealThumb,
            youtube: meal.strYoutube
        })
        setSaved(true)
        setTimeout(() => navigate("/planner"), 1000)
    } catch (err) {
        if (err.response && err.response.status === 409) {
            alert("This meal is already in your planner!")
        } else {
            console.error("Failed to save meal", err)
        }
    } finally {
        setSaving(false)
    }
}

    if (loading) return (
        <div className="loadingScreen">
            <div className="spinner"></div>
            <p>Loading meal...</p>
        </div>
    )

    if (!meal) return <p className="errorText">Meal not found</p>

    // Extract ingredients
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]
        if (ingredient && ingredient.trim()) {
            ingredients.push({ ingredient, measure })
        }
    }

    return (
        <div className="pageWrapper">

            {/* Hero Section */}
            <div className="heroSection" style={{ backgroundImage: `url(${meal.strMealThumb})` }}>
                <div className="heroOverlay">
                    <button className="backButton" onClick={() => navigate(-1)}>
                        ← Back
                    </button>
                    <div className="heroContent">
                        <span className="mealBadge">{meal.strArea} · {meal.strCategory}</span>
                        <h1 className="mealTitle">{meal.strMeal}</h1>

                        {/* Action Buttons */}
                        <div className="actionButtons">
                            {meal.strYoutube && (
                                <a
                                    href={meal.strYoutube}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="youtubeButton"
                                >
                                    View on YouTube
                                </a>
                            )}
                            <button
                                className={`addButton ${saved ? "saved" : ""}`}
                                onClick={handleAddToPlanner}
                                disabled={saved || saving}
                            >
                                {saving ? "Saving..." : saved ? "✓ Added to Planner" : "+ Add to Meal Planner"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body Content */}
            <div className="bodyContent">

                {/* Ingredients */}
                <div className="section">
                    <h2 className="sectionTitle">Ingredients</h2>
                    <div className="ingredientsGrid">
                        {ingredients.map((item, index) => (
                            <div key={index} className="ingredientCard">
                                <img
                                    src={`https://www.themealdb.com/images/ingredients/${item.ingredient}-Small.png`}
                                    alt={item.ingredient}
                                    className="ingredientImage"
                                />
                                <p className="ingredientName">{item.ingredient}</p>
                                <p className="ingredientMeasure">{item.measure}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Instructions */}
                <div className="section">
                    <h2 className="sectionTitle">Instructions</h2>
                    <div className="instructionsBox">
                        {meal.strInstructions.split("\n").filter(line => line.trim()).map((step, index) => (
                            <p key={index} className="instructionStep">{step}</p>
                        ))}
                    </div>
                </div>

                {/* Source Link */}
                {meal.strSource && (
                    <div className="section">
                        <a href={meal.strSource} target="_blank" rel="noreferrer" className="sourceLink">
                            View Full Source Recipe
                        </a>
                    </div>
                )}

            </div>
        </div>
    )
}