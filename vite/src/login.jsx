import { useState } from 'preact/hooks';
import bgImage from "./assets/login-bg.jpg";

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            console.log(response);

            if (response.ok) {
                localStorage.setItem('isLoggedIn', 'true');
                setIsLoggedIn(true);
                window.location.href = '/home';
            } else {
                setShowError(true);
                setTimeout(() => setShowError(false), 3000);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        }
    };
    return (
        <div class="min-h-screen w-full bg-gray-100 flex items-center justify-center bg-cover bg-center background-login"
            style={`background-image: url(${bgImage});`}>
            <div class="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 class="text-2xl font-bold mb-6 text-center text-orange-600">SAS Bank Login</h1>
                <form onSubmit={handleSubmit}>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Username
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            // css selector: #username
                            id="username"
                            type="text"
                            value={username}
                            onInput={e => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            // css selector: #password
                            id="password"
                            type="password"
                            value={password}
                            onInput={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        // css selector: login-btn
                        id="login-btn"
                        type="submit"
                    >
                        Sign In
                    </button>
                </form>

                {showError && (
                    <div class="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span class="block sm:inline">Invalid username or password. Please try again.</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;