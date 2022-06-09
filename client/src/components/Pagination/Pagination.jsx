import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from "../../actions";
import '../Pagination/pagination.css'

export default function Pagination() {
    const dogs = useSelector(state => state.dogs)
    const dispatch = useDispatch()

    const totalPages = Math.ceil(dogs.length / 8)
    const arr = []

    for(let i = 1; i <= totalPages; i++){
        arr.push(i)
    }

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(setPage(e.target.value))
    }

    return (
        <>
        {arr.map(e => 
            <button className="button-28" key={e} onClick={e => handleClick(e)} value={e}>{e}</button>)}
        </>
    )
}