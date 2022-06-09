import React from "react";
import { Link } from "react-router-dom";
import '../Landing/landing.css'

export default function Landing () {

    return (
        
            <div className="landing">
                <h2>Welcome to the Dogs API</h2>
                <Link to='/home'><button>Home</button></Link>
            </div>
        
    )
};