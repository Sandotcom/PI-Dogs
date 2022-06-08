import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import { getDogs, getTemperaments } from "../../actions";
import Pagination from "../Pagination/Pagination";
import Filters from "../Filters/Filters";
import Search from "../Search/Search";


export default function Home() {
    const dispatch = useDispatch()
    const dogs = useSelector(state => state.dogs)
    const temperament = useSelector(state => state.temperament)  

    useEffect(() => {
        if(dogs.length === 0){
            dispatch(getDogs())
        }
        if(temperament.length === 0){
            dispatch(getTemperaments())
        }
    })

    return (
        <>
            <h1>Dogs</h1>
            <Search />
            <Filters />
            <Cards />
            <Pagination />
        </>
    )
}