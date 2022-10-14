import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

const login = () => {
  const [login, setLogin] = useState(true);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
      {/* Head components are really good for SEO */}
      <Head>
        <title>Netflix</title>
        <link
          rel='icon'
          // href='https://rb.gy/ulxxee'
          href='/icon.png'
        />
      </Head>
      <Image
        src='https://rb.gy/p2hphi'
        layout='fill'
        className='-z-10 !hidden opacity-60 sm:!inline'
        objectFit='cover'
      />
      <img
        // src='https://rb.gy/ulxxee'
        src='/homeButton.png'
        alt='Home Button'
        className='absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6'
        width={100}
        height={100}
      />
      <form
        className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-4xl font-semibold'>
          {login ? "Sign In" : "Sign Up"}
        </h1>
        <div className='space-y-4'>
          <label className='inline-block w-full'>
            <input
              type='email'
              placeholder='Email'
              className={`input ${
                errors.email && "border-b-2 border-orange-500"
              }`}
              {...register("email", { required: true })} // Email must be true
            />
            {errors.email && (
              <p className='p-1 text-[13px] font-light  text-orange-500'>
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className='inline-block w-full'>
            <input
              type='password'
              placeholder='Password'
              className={`input ${
                errors.password && "border-b-2 border-orange-500"
              }`}
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className='p-1 text-[13px] font-light  text-orange-500'>
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          className='w-full rounded bg-[#e50914] py-3 font-semibold'
          onClick={() => setLogin(true)}
        >
          {login ? "Sign In" : "Sign Up"}
        </button>
        <div className='text-[gray]'>
          New to Netflix?
          <button
            type='submit'
            className='text-white hover:underline px-3'
            onClick={() => {
              setLogin(false);
            }}
          >
            Sign Up Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default login;
