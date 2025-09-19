export default function NavBar() {
    return <div className="navbar bg-blue-500 shadow-sm">
        <div className="flex-1">
            <a href="/" className="btn btn-ghost text-xl text-white">Job Tracker</a>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            <li><a className="text-white">Sign up</a></li>
            <li><a className="text-white">Login</a></li>
            </ul>
        </div>
    </div>
}