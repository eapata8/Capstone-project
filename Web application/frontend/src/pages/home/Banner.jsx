import React from 'react'
import { Link } from 'react-router-dom';
import bannerImg from "../../assets/header2.png"

const Banner = () => {
  return (
    <div className='section__container header__container'>
        <div className='header__content z-30'>
            <h4 className='uppercase'>Welcome to ChaseCart – Your Intelligent Shopping Assistant</h4>
            <h1>Chase Cart</h1>
            <p>
            Discover a smarter, faster way to shop. ChaseCart is here to guide you effortlessly to everything you need. 
            Say goodbye to the hassle and hello to convenience. 
            Experience innovation at your fingertips with a seamless shopping journey designed just for you.
            </p>
            <button className='btn'><Link to="/shop">EXPLORE NOW</Link></button>
        </div>
        <div className='header__image'>
            <img src={bannerImg} alt=''>
            </img>
        </div>
    </div>
  )
}

export default Banner