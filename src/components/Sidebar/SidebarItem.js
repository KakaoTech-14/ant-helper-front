import React from 'react';

export default function SidebarItem({ text, onClick }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
        <span className="flex-1 ms-3 whitespace-nowrap">{text}</span>
      </button>
    </li>
  );
}
