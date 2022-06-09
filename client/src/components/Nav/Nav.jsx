import React from "react";
import Search from "../Search/Search";
import '../Nav/nav.css'
import { useDispatch } from "react-redux";
import { getDogs, setOrder, setFilter, setPage } from "../../actions";
import { Link } from "react-router-dom";

export default function Nav(){
    const dispatch = useDispatch()

    const getAll = (e) => {
        e.preventDefault();
        dispatch(getDogs())
        dispatch(setOrder('nasc'))
        dispatch(setFilter('All'))
        dispatch(setPage(1))
    }

    return (
        <div className="navbar">
            <Link to='/home'><h1>Dogs API</h1></Link>
            <Search />
            <div className="navbtn">
                <Link to='/create'><button >Create Dog</button></Link>
                <button onClick={getAll}>Refresh</button>
            </div>
        </div>
    )
}