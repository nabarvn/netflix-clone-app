const Header = () => {
  return (
    <header>
      <div className='flex items-center space-x-2 md:space-x-10'>
        {/* All the stylings are done with mobile-first approach in mind */}
        <img
          src='https://rb.gy/ulxxee'
          width={100}
          height={100}
          className='cursor-pointer object-contain' //object-contain is being used to maintain the aspect ratio of the image
        />

        <ul className='hidden space-x-4 md:flex'>
          <li className='headerLink'>Home</li>
          <li className='headerLink'>TV Shows</li>
          <li className='headerLink'>Movies</li>
          <li className='headerLink'>Popular</li>
          <li className='headerLink'>My List</li>
        </ul>
      </div>

      <div></div>
    </header>
  );
};

export default Header;
