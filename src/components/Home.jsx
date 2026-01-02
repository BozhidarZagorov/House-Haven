import { Link } from "react-router";

export default function Home() {
    return (
        <div className="background-container">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="hidden sm:flex sm:justify-center mb-6">
                <div className="relative rounded-full px-3 py-1 text-sm/6 text-white ring-1 ring-white hover:ring-orange-400">
                       Check the weather forecast before your reservation.{' '}
                      <Link to="/weather" className="font-semibold text-orange-400">
                         <span aria-hidden="true" className="absolute inset-0" />
                         to weather forecast <span aria-hidden="true">&rarr;</span>
                       </Link>
                  </div>
                </div>
                <div className="text-container">
                    <h1 className="main-title">
                        GuestHouse Heaven
                    </h1>
                    <p className="main-subtitle">
                        Reel in the Adventure, Live the Moment!
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a href="/apartments" className="btn-orange">
                            Make reservation
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
