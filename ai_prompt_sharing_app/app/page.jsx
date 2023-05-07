import Feed from '@components/Feed';
import React from 'react'

const Home = () => {
    return (
        <section className='w-full flex-center flex-col'>
            <h1 className='head_text text-center'>Discover & Share
                <br className='max-md:hidden' />
                <span className='orange_gradient'>AI-Powered Prompts</span>
            </h1>
            <p className='desc text-center'>
                Connect with a community of visionary thinkers and unlock the full potential of AI with Promptify, that merges AI with artistic expression.                 
            </p>
            <Feed/>
        </section>
    );
};

export default Home;