import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from "../../actions";
import '../Pagination/pagination.css'

export default function Pagination() {
    const dogs = useSelector(state => state.dogs)
    const page = useSelector(state => state.page)
    const dispatch = useDispatch()

    const totalPages = Math.ceil(dogs.length / 8)
    const arr = []

    if(totalPages > 4){
        let j = null
        const radio = 2;

        if(page - radio < 1){
            j = 1 + radio;
        } else if(page + radio > totalPages){
            j = totalPages - radio
        } else {
            j = page;
        }

        for(let i = j - radio; i <= j + radio; i++){     
            arr.push(i)
        }
    } else {
        for(let i = 1; i <= totalPages; i++){
        arr.push(i)}
    }

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(setPage(parseInt(e.target.value)))
    }

    const handleFirst = (e) => {
        dispatch(setPage(1))
    }

    const handleLast = (e) => {
        dispatch(setPage(totalPages))
    }
    
    return (
        <>
        <button className="page-btn" onClick={handleFirst}>«</button>
        {arr.map(e => 
            <button className={e === page ? 'active' : 'page-btn'} key={e} onClick={e => handleClick(e)} value={e}>{e}</button>)}
        <button className="page-btn" onClick={handleLast}>»</button>
        </>
    )
}