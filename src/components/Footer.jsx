import { Link } from "react-router";

export default function Footer(){
    return (
        <footer className="bg-[#0D1117] text-gray-400 py-6 mt-auto">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                <p className="text-sm">&copy; {new Date().getFullYear()} GuestHouse Heaven. All rights reserved.</p>
                <ul className="flex space-x-6 mt-4 md:mt-0">
                    <li><Link to="/privacyPolicy" className="btn-orange">Privacy Policy</Link></li>
                    <li><Link to="/termsOfService" className="btn-orange">Terms of Service</Link></li>
                    <li><Link to="/contacts" className="btn-orange">Contacts</Link></li>
                </ul>
            </div>
        </footer>
    )
}