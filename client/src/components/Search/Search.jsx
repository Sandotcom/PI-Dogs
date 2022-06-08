import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { getName, setPage } from "../../actions";

export default function Search() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getName(name))
        dispatch(setPage(1))
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="Search" onChange={handleChange}/>
                <button type="submit">Buscar</button>
            </form>
        </>
    )
}