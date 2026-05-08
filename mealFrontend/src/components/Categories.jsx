import { useEffect, useState } from "react"
import axios from "axios"
import { Card } from "../utils/Card"
import "./Categories.css"

export const Categories = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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
        <div className="parent-grid">
        <div className="grid">
            {categories.map((category) => (
                <Card
                    key={category.idCategory}
                    image={category.strCategoryThumb}
                    name={category.strCategory}
                    link={`/categories/${category.strCategory}`}
                    description={category.strCategoryDescription?.slice(0, 30) + "..."}
                  
                />
            ))}
        </div>
        </div>
    )
}