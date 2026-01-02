import { Link } from "react-router";

export default function NotFound() {
    return (
        <>
            <main className="back404-container">
                <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
                    <p className="inline-block bg-orange-600 text-white px-2 py-1 rounded">404</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-lg font-medium text-pretty text-black-500 sm:text-xl/8">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/"
                            className="btn-orange"
                        >
                            Go back home
                        </Link>
                        <p className="text-lg font-medium text-pretty text-black-500 sm:text-xl/8">or</p>
                        <Link 
                            to="/contacts" 
                            className="btn-orange"
                        >
                            Contact support
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}
