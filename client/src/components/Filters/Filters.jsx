import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderTemp, setPage, getDogs, createdInDB, orderWeight, orderName } from "../../actions";

export default function Filters() {
    const dispatch = useDispatch()
    const temperament = useSelector(state => state.temperament)
    const [order, setOrder] = useState('nasc')

    const getAll = (e) => {
        e.preventDefault();
        dispatch(getDogs())
        dispatch(setPage(1))
    }

    const handleOrder = (e) => {
        e.preventDefault()
        setOrder(e.target.value)
        
        if(e.target.value === 'nasc' || e.target.value === 'ndsc') {
            dispatch(orderName(e.target.value))
        } else {
            dispatch(orderWeight(e.target.value))
        }
        dispatch(setPage(0))
        dispatch(setPage(1))
    }

    const handleTemperament = (e) => {
        e.preventDefault()
        dispatch(orderTemp(e.target.value))
        setOrder('nasc')
        dispatch(setPage(1))
    }

    const handleCreated = (e) => {
        e.preventDefault();
        dispatch(createdInDB(e.target.value))
        dispatch(setPage(1))
    }

    return (
        <>
        <button onClick={getAll}>Recargar</button>

        <select value={order} onChange={handleOrder}>           
            <option value='nasc'>Name asc</option>
            <option value='ndsc'>Name dsc</option>            
            <option value='wasc'>Weight asc</option>
            <option value='wdsc'>Weight dsc</option>            
        </select>

        <select onChange={handleTemperament}>
            <option value='All'>All</option>
            {temperament.map(e =>( 
                <option key={e.id} value={e.name}>{e.name}</option>
            ))}
        </select>

        <select onChange={handleCreated}>
            <option value='true'>Created in DB</option>
            <option value='false'>No creado</option>
        </select>
        </>
    )
}