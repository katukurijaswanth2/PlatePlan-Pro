import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Categories.css"

export const Categories = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
                setCategories(response.data.categories)
            } catch (err) {
                setError("Failed to fetch categories")
            } finally {
                setLoading(false)
            }
        }
        fetchCategories()
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="grid">
            {categories.map((category) => (
                <div key={category.idCategory} className="card">
                    <img
                        src={category.strCategoryThumb}
                        alt={category.strCategory}
                        className="image"
                    />
                    <h3
                        className="name"
                       onClick={() => navigate(`/categories/${category.strCategory}`)}
                    >
                        {category.strCategory}
                    </h3>
                </div>
            ))}
        </div>
    )
}