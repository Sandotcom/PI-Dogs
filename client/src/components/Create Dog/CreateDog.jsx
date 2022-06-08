import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { createDog, getTemperaments } from '../../actions';

export function validate(input){
    let error = {}

    if(!input.name){
        error.name = 'Name is required'
    } else if(!/^\w\D{3,35}$/.test(input.name)){
        if(/^\d\w*$/.test(input.name)) {
        error.name = 'Name cannot include numbers'
        } else if(/^\w{0,3}$/.test(input.name)){
            error.name = 'Name must be greater than 3 characters'
        } else if(/^\w{36,}$/.test(input.name)){
            error.name = 'Name is too long'
        } else {
            error.name = 'Name must be between 3 and 35 characters and cannot include numbers'
        }
    }

    if(!input.minHeight || !input.maxHeight){
        error.height = 'Height is required'
    } else if(!/^\d{0,2}$/.test(input.minHeight) || !/^\d{0,2}$/.test(input.maxHeight) ){
        error.height = 'Height cannot be greater than 2 characters'
    } else if(input.minHeight <= '0' || input.maxHeight <= '0') {
        error.height = 'Height cannot be 0'
    } else if(input.minHeight > input.maxHeight){
        error.height = 'Minimum has to be smaller than maximum'
    }

    if(!input.minWeight || !input.maxWeight){
        error.weight = 'Weight is required'
    } else if(!/^\d{0,3}$/.test(input.minWeight) || !/^\d{0,3}$/.test(input.minWeight) ){
        error.weight = 'Weight cannot be greater than 3 characters'
    } else if(input.minWeight <= '0' || input.maxWeight <= '0') {
        error.weight = 'Weight cannot be 0'
    } else if(input.minWeight > input.maxWeight){
        error.weight = 'Minimum has to be smaller than maximum'
    } else if(input.minWeight >= 150 || input.maxWeight > 150) {
        error.weight = 'Please, enter a valid weight'
    }

    if(!/^\d{0,2}$/.test(input.life_span)){
        error.life_span = 'Life span cannot be greater than 2 characters'
    }

    if(input.temperament.length === 0){
        error.temperament = 'Please, select at least one temperament'
    }

    return error
}

export default function CreateDog() {
    const [input, setInput] = useState({ name: '', minHeight: '', maxHeight: '', minWeight: '', maxWeight: '', life_span: '', temperament: [] })
    const [error, setError] = useState({})

    const temperament = useSelector(state => state.temperament)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(temperament.length === 0){
            dispatch(getTemperaments())
        }
    }, [dispatch])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleError = (e) => {
        let objError = validate({...input, [e.target.name]: e.target.value});
        setError(objError)
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }

    const handleDelete = (e) => {
        setInput({
            ...input,
            temperament: input.temperament.filter(t => t !== e)
        })
    }

    const handleClick = (e) => {
        let objError = validate(input);
        setError(objError)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(Object.keys(error).length === 0){
            dispatch(createDog(input))
            alert('Created!')
            setInput({ name: '', minHeight: '', maxHeight: '', minWeight: '', maxWeight: '', life_span: '', temperament: [] })
            navigate('/home')
        } else{
            alert('Please, check the errors')
        }        
    }

    return (
        <>
        <Link to='/home'><button>Volver</button></Link>

        <form onSubmit={handleSubmit}>
            <div>
                <label>Name: </label>
                <input type='text' name='name' value={input.name} onChange={handleChange} onBlur={handleError}/>
                {error.name && (<p>{error.name}</p>)}
            </div>
            <div>
                <label>Height (cm): </label>
                <input placeholder='Min' type='text' name='minHeight' value={input.minHeight} onChange={handleChange} onBlur={handleError}/>
                <input placeholder='Max' type='text' name='maxHeight' value={input.maxHeight} onChange={handleChange} onBlur={handleError}/>
                {error.height && (<p>{error.height}</p>)}
            </div>
            <div>
                <label>Weight (kg): </label>
                <input placeholder='Min' type='text' name='minWeight' value={input.minWeight} onChange={handleChange} onBlur={handleError}/>
                <input placeholder='Max' type='text' name='maxWeight' value={input.maxWeight} onChange={handleChange} onBlur={handleError}/>
                {error.weight && (<p>{error.weight}</p>)}
            </div>         
            <div>
                <label>Life Span: </label>
                <input type='text' name='life_span' value={input.life_span} onChange={handleChange} onBlur={handleError}/>
                {error.life_span && (<p>{error.life_span}</p>)}
            </div>
            <div>
                <label>Temperaments: </label>
                <select onChange={handleSelect} onBlur={handleError}>
                    {temperament.map(e => (
                        <option key={e.id} value={e.name}>{e.name}</option>
                    ))}
                </select>
                {error.temperament && (<p>{error.temperament}</p>)}
            </div>
            <button type='submit' onClick={handleClick}>Crear</button>
        </form>

        {input.temperament.map(e => (
            <div>
                <p>{e}</p>
                <button onClick={() => handleDelete(e)}>x</button>
            </div>
        ))}
        </>
    )
}