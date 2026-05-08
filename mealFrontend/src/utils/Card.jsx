import { useNavigate } from "react-router-dom"
import "./Card.css"

export const Card = ({ image, name, link }) => {
    const navigate = useNavigate()

    return (
        <div className="card" onClick={() => navigate(link)}>
            <div className="card-image-wrapper">
                <img src={image} alt={name} className="card-image" />
             
            </div>
            <div className="card-body">
                <h3 className="card-name">{name}</h3>
            </div>
        </div>
    )
}