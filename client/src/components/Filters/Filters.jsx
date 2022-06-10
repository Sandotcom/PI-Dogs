import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderTemp, setPage, getDogs, createdInDB, orderWeight, orderName, setOrder, setFilter } from "../../actions";
import '../Filters/filters.css'

export default function Filters() {
    const dispatch = useDispatch()
    const temperament = useSelector(state => state.temperament)
    const order = useSelector(state => state.order)
    const filter = useSelector(state => state.filter)

    const handleOrder = (e) => {
        e.preventDefault()
        dispatch(setOrder(e.target.value))
        
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
        dispatch(setFilter(e.target.value))
        dispatch(orderTemp(e.target.value))
        dispatch(setOrder('nasc'))
        dispatch(setPage(1))
    }

    const handleCreated = (e) => {
        e.preventDefault();
        if(e.target.value === 'All'){
            dispatch(getDogs())
        }
        dispatch(createdInDB(e.target.value))
        dispatch(setPage(1))
        dispatch(setOrder('nasc'))
        dispatch(setFilter('All'))
    }

    return (        
        <div className="filters">
            <select value={order} onChange={handleOrder}>           
                <option value='nasc'>Name asc</option>
                <option value='ndsc'>Name dsc</option>            
                <option value='wasc'>Weight asc</option>
                <option value='wdsc'>Weight dsc</option>            
            </select>

            <select value={filter} onChange={handleTemperament}>
                <option value='All'>All</option>
                {temperament.map(e =>( 
                    <option key={e.id} value={e.name}>{e.name}</option>
                ))}
            </select>

            <select onChange={handleCreated}>
                <option value='All'>All</option>
                <option value='true'>From DB</option>
                <option value='false'>From API</option>
            </select>
        </div>
        
    )
}