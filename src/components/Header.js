import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='flex justify-center items-center h-16 border-b border-gray-100 relative z-2'>
    <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
            <img src="https://rickandmortyapi.com/api/character/avatar/19.jpeg" alt="Rick and Morty" className="h-10 w-10 rounded-full" />
        </div>
        <nav>
            <ul className="flex space-x-4">
                <li>
                    <Link to="https://rickandmortyapi.com/documentation" className="hover:text-[#FF9900] font-semibold">Docs</Link>
                </li>
                <li>
                    <Link to="https://rickandmortyapi.com/about" className="hover:text-[#FF9900] font-semibold">About</Link>
                </li>
                <li>
  <Link to="/support" className="hover:text-[white] hover:bg-[#FF9900] uppercase m-0 rounded-xl px-3 py-2 font-semibold border-2 border-orange-500 xs:bg-orange-500 text-gray-600">
    <span className="hidden md:inline">Support Us</span>
    <span className="md:hidden text-white" role="img" >❤️</span>
  </Link>
</li>

            </ul>
        </nav>

    </div>
</header>
  )
}

export default Header