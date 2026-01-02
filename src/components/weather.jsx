import { Link, Outlet } from 'react-router'

export default function Weather() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-20"
        style={{
          background: `linear-gradient(135deg,rgb(120, 158, 233) 25%,rgb(209, 121, 26) 75%)`,
        }}>
            <div className="lg:flex lg:gap-x-12">
                <Link
                    to='/weather'
                    className="btn-orange mb-4"
                >
                    Current weather
                </Link>
                <Link
                    to='/weather/next15days'
                    className="btn-orange mb-4"
                >
                    Next 15 days
                </Link>
            </div>

            <Outlet />
        </div>
    )
}