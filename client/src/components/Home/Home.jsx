import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cards from "../Cards/Cards";
import { getDogs, getTemperaments } from "../../actions";
import Pagination from "../Pagination/Pagination";
import Filters from "../Filters/Filters";
import Search from "../Search/Search";


export default function Home() {
    const dispatch = useDispatch()    

    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperaments())
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