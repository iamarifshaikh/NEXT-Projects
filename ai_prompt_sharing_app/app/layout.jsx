import "@styles/globals.css";
import Navbar from '@components/Navbar';
import Provider from '@components/Provider';

export const metadata = {
    title: "Promptify",
    description:"Discover & Share AI Prompts."
}

const layout = ({ children }) => {
    return (
        <html lang='en'>
            <head>
                <link rel="icon" type="image/x-icon" href='/assets/images/logo.svg'/>
            </head>
            <body>
                <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>
                <main className='app'>
                    <Navbar/>
                    {children}
                    </main>
                    </Provider>
            </body>
        </html>
    )
}

export default layout;