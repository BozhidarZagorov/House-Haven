import {useRef,useState,useEffect} from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "/public/config/firebaseinit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '/public/ctx/FirebaseAuth'

export default function Login (){
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth(); //! auth ctx
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated || user) {
      navigate("/");
      // return alert('You are already logged in.');
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", email);
      navigate("/"); // Redirect to Home
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

    return (
      <>
        <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="GuestHouse"
              src="https://res.cloudinary.com/dbleq6bwe/image/upload/v1767396248/prhouse_iqxjut.png"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Log in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          {error && <p className="text-red-500 text-sm">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    ref={emailRef}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6 opacity-80"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    ref={passwordRef}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6 opacity-80"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center btn-orange"
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
                {loading ? 
                        <span className="flex justify-center mt-5">
                            <svg className="spinner"></svg>
                        </span> 
                    : null }
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?{' '}
              <Link to="/register" className="font-semibold text-orange-600 hover:text-orange-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  