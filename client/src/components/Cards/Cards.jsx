import React from "react";
import { useSelector } from 'react-redux'
import Card from "./Card/Card";

export default function Cards() {
    const dogs = useSelector(state => state.dogs)
    const page = useSelector(state => state.page)
    
    if(dogs.message){        
        return (
            <>
                <h1>{dogs.message}</h1>
            </>
        )
    } else {
        const paginatedInfo = dogs.slice((page - 1) * 8, (page) * 8)
        return (
            <>
                <div className="grid">
                    {paginatedInfo?.map(e => 
                        <div key={e.id}>
                            <Card id={e.id} name={e.name} image={e.image} temperament={e.temperament} weight={e.weight} />
                        </div>
                    )}
                </div>
            </>
        )
    }
}