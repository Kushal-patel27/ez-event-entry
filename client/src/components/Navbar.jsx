// src/components/Navbar.jsx
export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold text-indigo-600">EzEventEntry</h1>
      <div className="space-x-6">
        <button className="font-medium">Explore</button>
        <button className="font-medium">Login</button>
      </div>
    </nav>
  );
}
