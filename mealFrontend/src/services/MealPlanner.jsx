import { useEffect, useState } from "react"
import axios from "axios"
import "./MealPlanner.css"

export const MealPlanner = () => {
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)

   useEffect(() => {
    const fetchMeals = async () => {

        try {

            const userId = localStorage.getItem("userId");

            const response = await axios.get(
                `http://localhost:8080/api/meals?userId=${userId}`
            );

            setMeals(response.data);

        } catch (err) {
            console.error("Failed to fetch meals", err);
        } finally {
            setLoading(false);
        }
    };

    fetchMeals();
}, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/meals/${id}`)
            setMeals(meals.filter(meal => meal.id !== id))
        } catch (err) {
            console.error("Failed to delete meal", err)
        }
    }

    if (loading) return <p className="loading-text">Loading...</p>

    if (meals.length === 0) {
        return <p className="empty-text">No meals saved yet.</p>
    }

    return (
        <div className="planner-wrapper">
            <h1>My Meal Planner {meals.length} items</h1>

            <div className="meals-list">
                {meals.map(meal => (
                    <div key={meal.id} className="meal-card">
                        <img src={meal.image} alt={meal.name} />

                        <div className="meal-info">
                            <span className="meal-badge">Saved Recipe</span>

                            <h3>{meal.name}</h3>

                            <div className="meal-actions">
                                {meal.youtube && (
                                    <a
                                        href={meal.youtube}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="watch-button"
                                    >
                                        ▶ Watch on YouTube
                                    </a>
                                )}

                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(meal.id)}
                                >
                                    🗑 Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}