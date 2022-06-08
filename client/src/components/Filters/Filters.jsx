import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderTemp, setPage, getDogs, createdInDB } from "../../actions";
import Order from "./Order";

export default function Filters() {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState('All')
    const temperament = useSelector(state => state.temperament)

    const getAll = (e) => {
        e.preventDefault();
        dispatch(getDogs())
        dispatch(setPage(1))
    }

    const handleTemperament = (e) => {
        e.preventDefault()
        setFilter(e.target.value)
        dispatch(orderTemp(e.target.value))
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

        <Order filter={filter}/>

        <select onChange={handleTemperament}>
            <option value={'All'}>All</option>
            {temperament.map(e =>( 
                <option key={e.id} value={e.name}>{e.name}</option>
            ))}
        </select>

        <select onChange={handleCreated}>
            <option value={'true'}>Created in DB</option>
            <option value={'false'}>No creado</option>
        </select>
        </>
    )
}