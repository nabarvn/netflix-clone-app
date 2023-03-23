import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { Movie } from "../typings";

interface Props {
  movie: Movie | DocumentData;

  // When using Firebase
  // movie: Movie | DocumentData;
}

const Thumbnail = ({ movie }: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
      className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className='rounded-sm object-cover md:rounded'
        layout='fill'
      />
      <div
        onClick={() => {
          setCurrentMovie(movie);
          setShowModal(true);
        }}
        className='flex absolute w-full h-full lg:opacity-0 lg:hover:opacity-100 transition duration-300 p-5'
      >
        <span className='text-base lg:text-xl font-semibold text-[#e5e5e5] self-end'>
          {movie?.title || movie?.name || movie?.original_name}
        </span>
      </div>
    </div>
  );
};

export default Thumbnail;
