import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Login from './login';
import Home from './home';
import "./index.css";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loginStatus = localStorage.getItem('isLoggedIn');
        if (loginStatus == 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    return isLoggedIn ? <Home /> : <Login setIsLoggedIn={setIsLoggedIn} />;
};

render(<App />, document.getElementById('app'));