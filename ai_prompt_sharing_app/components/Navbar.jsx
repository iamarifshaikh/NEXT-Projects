"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect,useState } from 'react';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDown, setToggleDown] = useState(false);


  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }
    setUpProviders();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image
          src="/assets/images/logo.svg"
          alt='Promptify Logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptify</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ?
          (<div className='flex gap-3 md:gap-5'>
            <Link href="/create" className='black_btn'>Create</Link>
            <button type='button' onClick={signOut} className='outline_btn'>Log Out</button>
            <Link href="/profile">
              <Image
                className='rounded-full'
                width={35}
                height={35}
                src={session?.user.image}
                alt='Profile Image'
              />
            </Link>
          </div>) :
          (<>
            {providers && Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'>
                Sign In
              </button>
            ))}
          </>
          )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDown((prev) => !prev)}
            />
            {toggleDown && (
              <div className='dropdown'>
                <Link
                  href="/profile"
                  className='dropdown_link'
                  onClick={() => setToggleDown(false)}
                >
                  Profile
                </Link>
                
                <Link
                  href="/create"
                  className='dropdown_link'
                  onClick={() => setToggleDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
              >Sign In
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
  )
};

export default Navbar;