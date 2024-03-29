import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import BasicMenu from "./BasicMenu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.screenY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className='flex items-center space-x-2 md:space-x-10'>
        {/* All the stylings are done with mobile-first approach in mind */}
        <img
          // src='https://rb.gy/ulxxee'
          src='/homeButton.png'
          alt='Home Button'
          width={100}
          height={100}
          className='cursor-pointer object-contain' //object-contain is being used to maintain the aspect ratio of the image
        />

        <BasicMenu />

        <ul className='hidden space-x-4 md:flex'>
          <li className='headerLink'>Home</li>
          <li className='headerLink'>TV Shows</li>
          <li className='headerLink'>Movies</li>
          <li className='headerLink'>Popular</li>
          <li className='headerLink'>My List</li>
        </ul>
      </div>

      <div className='flex items-center space-x-4 text-sm font-light'>
        <SearchIcon className='hidden h-6 w-6 sm:inline' />
        <p className='hidden cursor-default lg:inline'>Kids</p>
        <BellIcon className='h-6 w-6 sm:inline' />
        <Link href='/account'>
          <img
            // src='https://rb.gy/g1pwyx'
            src='/avatar.png'
            alt='Avatar'
            className='cursor-pointer rounded'
            width={40}
            height={40}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
