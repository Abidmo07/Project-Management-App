import { Link } from '@inertiajs/react';
import React from 'react';

export default function Pagination({ links }) {
  return (
    <div className="flex justify-center items-center gap-3 mt-4">
      {links.map((link) => (
        <Link
          href={link.url}
          key={link.label}
          className={`px-5 py-2 rounded-full text-sm font-semibold shadow 
            ${link.active ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-300 hover:text-indigo-600 hover:border-indigo-600 hover:shadow-md'} 
            ${!link.url ? 'cursor-not-allowed opacity-40' : ''}`}
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </div>
  );
}
