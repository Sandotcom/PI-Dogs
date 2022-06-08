import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {orderWeight, orderName, setPage } from "../../actions";

export default function Order({filter}){
    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [filter])

    const handleOrder = (e) => {
        e.preventDefault()
        
        if(e.target.value === 'nasc' || e.target.value === 'ndsc') {
            dispatch(orderName(e.target.value))
        } else {
            dispatch(orderWeight(e.target.value))
        }
        dispatch(setPage(0))
        dispatch(setPage(1))
    }

    return (
        <>
            <select onChange={handleOrder}>
            <option disabled selected>Order By</option>
            <optgroup label="Order By Name">
                <option value={'nasc'}>Name asc</option>
                <option value={'ndsc'}>Name dsc</option>
            </optgroup>
            <optgroup label="Order By Weight">
                <option value={'wasc'}>Weight asc</option>
                <option value={'wdsc'}>Weight dsc</option>
            </optgroup>
        </select>
        </>
    )
}