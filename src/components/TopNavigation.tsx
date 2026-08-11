import React, { useState } from 'react';
import { Calendar, Search, Settings, Bell, Menu, X } from 'lucide-react';
import type { NavItem } from '../types';

interface TopNavigationProps {
  activeTab?: NavItem;
  onTabChange?: (tab: NavItem) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab = 'Appointment',
  onTabChange,
}) => {
  const [currentTab, setCurrentTab] = useState<NavItem>(activeTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    'Dashboard',
    'Appointment',
    'Patient',
    'Reports',
    'Chats',
    'Billing',
  ];

  const handleSelectTab = (tab: NavItem) => {
    setCurrentTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <header className="w-full max-w-[1385px] mx-auto pt-6 px-4 md:px-8 flex items-center justify-between gap-4">
      {/* Left: Navigation Bar Container */}
      <div className="hidden lg:flex items-center bg-white border border-[#6B38D4]/25 rounded-full px-3 py-2 shadow-xs transition-all duration-300">
        <nav className="flex items-center space-x-1 xl:space-x-2">
          {navItems.map((item) => {
            const isActive = currentTab === item;
            if (isActive) {
              return (
                <button
                  key={item}
                  onClick={() => handleSelectTab(item)}
                  className="flex items-center gap-2.5 bg-gradient-to-r from-[#6B38D4] to-[#5C24FF] text-white px-5 py-2.5 rounded-full font-manrope font-bold text-[14.8px] shadow-sm transition-all duration-200 hover:opacity-95 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-white stroke-[2.5]" />
                  <span>{item}</span>
                </button>
              );
            }

            return (
              <button
                key={item}
                onClick={() => handleSelectTab(item)}
                className="px-4 py-2 text-[#000000] font-manrope font-extrabold text-[14.8px] hover:text-[#6B38D4] transition-colors cursor-pointer rounded-full"
              >
                {item}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex lg:hidden items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2.5 rounded-full bg-white border border-[#6B38D4]/25 text-gray-700 hover:bg-gray-50 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Right Side: Quick Action Icons & Doctor Profile */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Search Circular Button */}
        <button
          className="w-11 h-11 md:w-[51.5px] md:h-[51.5px] rounded-full bg-[#DDE2E8]/60 hover:bg-[#DDE2E8] flex items-center justify-center text-gray-700 transition-all cursor-pointer"
          aria-label="Search"
        >
          <Search className="w-5 h-5 md:w-[21px] md:h-[21px] stroke-[2.2]" />
        </button>

        {/* Settings Icon Button */}
        <button
          className="w-11 h-11 md:w-[51.5px] md:h-[51.5px] rounded-full bg-white hover:bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 shadow-2xs transition-all cursor-pointer"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 md:w-[21px] md:h-[21px] stroke-[2]" />
        </button>

        {/* Notification Bell Button */}
        <button
          className="w-11 h-11 md:w-[51.5px] md:h-[51.5px] rounded-full bg-white hover:bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 shadow-2xs transition-all cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 md:w-[21px] md:h-[21px] stroke-[2]" />
        </button>

        {/* Doctor Profile Avatar & Name */}
        <div className="flex items-center gap-2.5 pl-1 md:pl-2">
          <img
            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80"
            alt="David Brock - General Physician"
            className="w-10 h-10 md:w-[41.4px] md:h-[41.4px] rounded-full object-cover border border-gray-400/20 shadow-2xs"
          />
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-manrope font-semibold text-[12px] text-[#232C2B] leading-tight">
              David Brock
            </span>
            <span className="font-manrope font-semibold text-[10.4px] text-[#232C2B]/50 leading-tight mt-0.5">
              General Physician
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white border border-[#6B38D4]/20 rounded-2xl p-4 shadow-xl z-50 lg:hidden flex flex-col space-y-2">
          {navItems.map((item) => {
            const isActive = currentTab === item;
            return (
              <button
                key={item}
                onClick={() => {
                  handleSelectTab(item);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-manrope font-bold text-left transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6B38D4] to-[#5C24FF] text-white'
                    : 'text-gray-800 hover:bg-purple-50'
                }`}
              >
                {isActive && <Calendar className="w-5 h-5 text-white" />}
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
