'use client';
import { useState } from 'react';
import { FiSearch } from "react-icons/fi";

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
  }

  return (
    <div className="w-full flex flex-col  p-6">
      <form className='flex w-full justify-end'
      onSubmit={handleSearch}>
        <input className="border-none w-full p-2 focus:bg-[#C4C4C4]/30 focus:outline-none rounded-tr-xl rounded-tl-xl rounded-bl-xl"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder=""
        />
        <button className='bg-none p-2 self-end absolute right-[25px] mb-[3px]' type="submit">
            <FiSearch className='text-white border-none text-lg' />
        </button>
      </form>

    {results && (
    <ul>
    {/* brug spread-operator til at samle resultaterne fra flere arrays og putte i et array */}
    {[...(results.activities || []), ...(results.users || [])].map((item) => (
      <li key={item.id}>
        {/* Vis navn og evt. type */}
        {item.name || item.username}
        <span className="ml-2 text-xs text-gray-500">
          {item.name ? "(Aktivitet)" : "(Bruger)"}
        </span>
      </li>
    ))}
    </ul>
    )}

    </div>
  );
}