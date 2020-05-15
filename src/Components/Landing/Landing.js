import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'
import dogPainting from './dogPainting.jpg'


function Landing() {
    return (
        <>
        <section className='about'>
            <img src={dogPainting} 
            alt='dog painting' 
            className='landingImg'/>
            <p className='landingPara'>Welcome to the Petful pet shop. You may adopt 
                a pet by pressing the adopt button below.
                Petful uses a queue, so add your name to the list
                and wait for your turn to adopt a pet.</p>
            <Link to='/adopt' className='landingLink'>
                <button className='landingButton'>
                    Adopt
                </button>
            </Link>

        </section>
        </>
    )
}


export default Landing