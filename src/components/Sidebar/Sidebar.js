import React from 'react';
import SidebarItem from './SidebarItem';

export default function Sidebar() {
  return (
    <aside
      className="z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border border-gray-200 bg-white shadow-lg sm:relative"
      aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto ">
        <ul className="space-y-2 font-medium">
          <SidebarItem text={'내 주식 현황'} onClick={() => {}} />
          <SidebarItem text={'체결 내역'} onClick={() => {}} />
        </ul>
      </div>
    </aside>
  );
}
