import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { getDetail } from "../../actions";
import Loading from "../Loading/Loading";
import '../Detail/detail.css'

export default function Detail() {
    const { name, image, temperament, weight, height, life_span } = useSelector(state => state.dogDetail)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    let params = useParams()
    
    useEffect(() => {
        setLoading(true)
        dispatch(getDetail(params.id, setLoading))
    }, [dispatch, params.id])

    if(loading){
        return (
            <>
            <div className="navbar">
            <Link to='/home'><h1>Dogs API</h1></Link>
            <div className="navbtn">
                <Link to='/home'><button>Volver</button></Link>               
            </div>
            </div>
                <Loading />
            </>
        )
    } else {
        return (
            <>
            <div className="navbar">
            <Link to='/home'><h1>Dogs API</h1></Link>
            <div className="navbtn">
                <Link to='/home'><button>Volver</button></Link>               
            </div>
            </div>
            <div className="detail">
                <h1>{name}</h1>
                {image ? <img src={image} className='image' alt=""/> : <img src='https://www.kindpng.com/picc/m/139-1396987_clip-art-cats-and-dogs-dibujos-de-perros.png' className='image' alt=""/>} 
                <p>{temperament ? temperament.join(', ') : 'No tiene'}</p>
                <p>{weight} kg</p>
                <p>{height} cm</p>
                <p>{life_span}</p>
            </div>
            </>
        )
    }    
}