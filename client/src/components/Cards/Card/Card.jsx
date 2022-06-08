import React from "react";
import { Link } from "react-router-dom";
import '../Card/card.css'

export default function Card({ id, name, image, temperament, weight}) {

    return (
        <>
            <div className='card'>
                <Link to={`/detail/${id}`}>
                <h2>{name}</h2>
                {image ? (<img src={image} className='image' alt=""/>) : (<img src='https://www.kindpng.com/picc/m/139-1396987_clip-art-cats-and-dogs-dibujos-de-perros.png' className='image' alt=""/>)}                
                <p>{temperament.join(', ')}</p>
                <p>{weight.join(' - ')} kg</p>
                </Link>
            </div>
        </>
    )
}