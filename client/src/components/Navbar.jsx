import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center mb-8 py-4">
      <NavLink to="/" className="flex items-center hover:opacity-80 transition-opacity">
        <img 
          alt="MongoDB logo" 
          className="h-10 w-auto" 
          src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"
        />
      </NavLink>

      <NavLink 
        className="inline-flex items-center justify-center px-6 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:opacity-50"
        to="/create"
      >
        Create Employee
      </NavLink>
    </nav>
  );
}