import { Link } from "react-router";

export default function Home() {
    return (
        <div className="background-container">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-container">
                    <h1 className="main-title">
                        GuestHouse Heaven
                    </h1>
                    <p className="main-subtitle">
                        Reel in the Adventure, Live the Moment!
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to="/apartments" className="btn-orange">
                            Make reservation
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
