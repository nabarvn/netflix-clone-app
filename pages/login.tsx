import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

const login = () => {
  const [login, setLogin] = useState(true);
  const [isPageLoading, setPageLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setPageLoading(true);
    });

    router.events.on("routeChangeComplete", () => {
      setPageLoading(false);
    });

    router.events.on("routeChangeError", () => {
      setPageLoading(false);
    });
  }, [router]);

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  const refreshPage = () => {
    router.reload();
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

      <img
        src='https://rb.gy/p2hphi'
        className='absolute -z-10 !hidden opacity-60 sm:!inline'
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <button onClick={refreshPage}>
        <img
          // src='https://rb.gy/ulxxee'
          src='/homeButton.png'
          alt='Home Button'
          className='absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6'
          width={100}
          height={100}
        />
      </button>

      <form
        className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-4xl font-semibold'>
          {!isSignUp ? "Sign In" : "Sign Up"}
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
          type='submit'
          disabled={isPageLoading}
          className='w-full rounded bg-[#e50914] hover:bg-[#f6121d] disabled:hover:bg-[#e50914] py-3 font-semibold'
          onClick={() => (login ? setLogin(true) : setLogin(false))}
        >
          {!isPageLoading ? (
            !isSignUp ? (
              "Sign In"
            ) : (
              "Sign Up"
            )
          ) : (
            <Loader color='fill-gray-300' />
          )}
        </button>
        {!isSignUp ? (
          <div className='text-[gray]'>
            New to Netflix?
            <button
              type='button'
              className='text-white hover:underline px-3'
              onClick={() => {
                setIsSignUp(true);
                setLogin(false);
              }}
            >
              Sign Up Now!
            </button>
          </div>
        ) : (
          <div className='text-[gray]'>
            Already have an account?
            <button
              type='button'
              className='text-white hover:underline px-3'
              onClick={() => {
                setIsSignUp(false);
                setLogin(true);
              }}
            >
              Sign In!
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default login;
