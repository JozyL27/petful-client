import React from 'react'
import { Link } from 'react-router-dom'


function Landing() {
    return (
        <>
        <section className='about'>
            <p>Adopt a pet!</p>
            
            <Link to='/adopt'>
                <button>
                    Adopt!
                </button>
            </Link>

        </section>
        </>
    )
}


export default Landing