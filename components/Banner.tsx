import Image from "next/image";
import { useEffect, useState } from "react";
import { baseURL } from "../constants/movie";
import { Movie } from "../typings";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-5'>
      <div className='absolute top-0 left-0 -z-10 h-[95vh] w-screen'>
        <Image
          src={`${baseURL}${movie?.backdrop_path || movie?.poster_path}`}
          layout='fill'
          objectFit='cover'
        />
      </div>

      <h1 className='text-2xl font-bold md:text-4xl lg:text-5xl pr-5'>
        {movie?.title || movie?.name || movie?.original_name}
      </h1>

      <p className='max-w-xs text-xs text-shadow-md md:max-w-3xl md:text-xl lg:max-w-5xl pr-5'>
        {movie?.overview}
      </p>

      <div className='flex space-x-3'>
        <button
          className='bannerButton bg-white text-black'
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          <FaPlay className='h-3 w-3 text-black xl:h-4 xl:w-4' />
          <span className='self-center'>Play</span>
        </button>
        <button
          className='bannerButton bg-[gray]/70'
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          <span className='self-center'>More Info</span>
          <InformationCircleIcon className='h-5 w-5 xl:h-6 xl:w-6' />
        </button>
      </div>
    </div>
  );
};

export default Banner;
