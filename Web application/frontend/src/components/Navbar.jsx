import React from 'react';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  return (
    <header className='fixed-nav-bar w-nav'> 
      <nav className='max-w-screen-2xl mx-auto px-4 flex justify-between items-center'>
        <ul className='nav__links'>
          <li className='link'><Link to="/">Home</Link></li> 
          <li className='link'><Link to="/">Shop</Link></li> 
          <li className='link'><Link to="/">Pages</Link></li> 
          <li className='link'><Link to="/">Contact</Link></li> 
        </ul>

        {/*Logo*/}
        <div className='nav__logo'>
            <Link to="/">Chase cart <span>.</span></Link>
        </div>

        {/*Nav icons*/}
        <div className='nav__icons relative'>
            {/*research bar icon*/}
           <span>
                <Link to="/search">
                    <i className="ri-search-line"></i>
                </Link>
            </span> 
            {/*shopping cart bar icon*/}
            <span>
                <button className='hover:text-primary'>
                    <i className="ri-shopping-cart-2-line"></i>
                    <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>
                    0
                    </sup>
                </button>
            </span> 

            <span>
                    <Link to="login">
                        <i class="ri-user-line"></i>
                    </Link>
            </span>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;
