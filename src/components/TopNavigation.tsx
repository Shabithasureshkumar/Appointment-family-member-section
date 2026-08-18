import { useEffect, useRef, useState } from 'react';
import { Bell, Calendar, Menu, Search, Settings, X } from 'lucide-react';
import { cn } from '../lib/cn';
import { CURRENT_USER } from '../data/currentUser';
import { NAV_TABS } from '../data/navigation';
import type { NavItem, NavTab } from '../types';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';

const MOBILE_NAV_ID = 'mobile-navigation';
const UNAVAILABLE_HINT = 'This screen is not available yet';
const ICON_BUTTON_SIZE = 'w-11 h-11 md:w-[51.5px] md:h-[51.5px]';

export interface TopNavigationProps {
  activeTab: NavItem;
  onTabChange: (tab: NavItem) => void;
}

/**
 * Fully controlled navigation.
 *
 * Tabs whose screen does not exist are marked `aria-disabled` and ignore
 * activation. They stay focusable on purpose, so a keyboard user can discover
 * them and be told they are unavailable rather than finding them skipped.
 */
export function TopNavigation({ activeTab, onTabChange }: TopNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Dismiss the drawer on Escape or on a pointer press outside it.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (drawerRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      setIsMobileMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMobileMenuOpen]);

  const handleSelectTab = (tab: NavTab) => {
    if (!tab.available) return;
    onTabChange(tab.id);
  };

  return (
    /*
      Full-viewport-width header, deliberately NOT sharing the main content
      Container: the nav sits against the viewport edges while the page content
      stays centred. Padding reaches the 40px design value at xl; lg holds at
      32px because between 1024px and 1279px the tab row plus the icon cluster
      need those extra 16px to avoid overflowing.
    */
    <header className="relative flex w-full items-center justify-between gap-4 px-4 pt-6 sm:px-6 lg:px-8 xl:px-10">
      {/* Left: Navigation Bar Container */}
      <div className="hidden items-center rounded-full border border-brand/25 bg-white px-3 py-2 shadow-xs lg:flex">
        <nav aria-label="Primary">
          <ul className="flex items-center space-x-1 xl:space-x-2">
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <Button
                    variant="plain"
                    onClick={() => handleSelectTab(tab)}
                    aria-disabled={!tab.available}
                    aria-current={isActive ? 'page' : undefined}
                    title={tab.available ? undefined : UNAVAILABLE_HINT}
                    className={cn(
                      'rounded-full font-manrope',
                      // Padding tightens between 1024px and 1280px so the tab row
                      // plus the icon cluster fit the header without overflowing;
                      // the approved spacing is restored from xl upwards.
                      isActive
                        ? 'flex items-center gap-2.5 bg-gradient-to-r from-brand to-brand-deep px-4 py-2.5 text-[14.8px] font-bold text-white shadow-sm hover:opacity-95 xl:px-5'
                        : 'px-3 py-2 text-[14.8px] font-extrabold text-black xl:px-4',
                      tab.available
                        ? !isActive && 'hover:text-brand'
                        : 'cursor-not-allowed opacity-40',
                    )}
                  >
                    {isActive ? (
                      <Calendar className="h-4 w-4 stroke-[2.5] text-white" aria-hidden="true" />
                    ) : null}
                    <span>{tab.label}</span>
                    {tab.available ? null : <span className="sr-only"> (unavailable)</span>}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center lg:hidden">
        <Button
          ref={toggleRef}
          variant="icon"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls={MOBILE_NAV_ID}
          className="rounded-full border border-brand/25 bg-white p-2.5 text-gray-700 hover:bg-gray-50"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </Button>
      </div>

      {/* Right Side: Quick Action Icons & Doctor Profile */}
      <div className="flex items-center gap-3 md:gap-5">
        <Button
          variant="icon"
          aria-label="Search"
          className={cn(ICON_BUTTON_SIZE, 'bg-chip/60 text-gray-700 hover:bg-chip')}
        >
          <Search className="h-5 w-5 stroke-[2.2] md:h-[21px] md:w-[21px]" aria-hidden="true" />
        </Button>

        <Button
          variant="icon"
          aria-label="Settings"
          className={cn(
            ICON_BUTTON_SIZE,
            'border border-gray-100 bg-white text-gray-600 shadow-2xs hover:bg-gray-50',
          )}
        >
          <Settings className="h-5 w-5 stroke-[2] md:h-[21px] md:w-[21px]" aria-hidden="true" />
        </Button>

        <Button
          variant="icon"
          aria-label="Notifications"
          className={cn(
            ICON_BUTTON_SIZE,
            'border border-gray-100 bg-white text-gray-600 shadow-2xs hover:bg-gray-50',
          )}
        >
          <Bell className="h-5 w-5 stroke-[2] md:h-[21px] md:w-[21px]" aria-hidden="true" />
        </Button>

        {/* Doctor Profile Avatar & Name */}
        <div className="flex items-center gap-2.5 pl-1 md:pl-2">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-400/20 shadow-2xs md:h-[41.4px] md:w-[41.4px]">
            <Avatar
              src={CURRENT_USER.avatarUrl}
              name={CURRENT_USER.name}
              size={48}
              loading="eager"
              decorative
            />
          </div>
          <div className="hidden flex-col text-left sm:flex">
            <span className="font-manrope text-[12px] leading-tight font-semibold text-nav-ink">
              {CURRENT_USER.name}
            </span>
            <span className="mt-0.5 font-manrope text-[10.4px] leading-tight font-semibold text-nav-ink/50">
              {CURRENT_USER.role}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        id={MOBILE_NAV_ID}
        ref={drawerRef}
        hidden={!isMobileMenuOpen}
        className="absolute top-20 right-4 left-4 z-50 rounded-2xl border border-brand/20 bg-white p-4 shadow-xl lg:hidden"
      >
        <nav aria-label="Primary (mobile)">
          <ul className="flex flex-col space-y-2">
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <Button
                    variant="plain"
                    onClick={() => {
                      if (!tab.available) return;
                      handleSelectTab(tab);
                      setIsMobileMenuOpen(false);
                      toggleRef.current?.focus();
                    }}
                    aria-disabled={!tab.available}
                    aria-current={isActive ? 'page' : undefined}
                    title={tab.available ? undefined : UNAVAILABLE_HINT}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-manrope font-bold',
                      isActive
                        ? 'bg-gradient-to-r from-brand to-brand-deep text-white'
                        : 'text-gray-800',
                      tab.available
                        ? !isActive && 'hover:bg-purple-50'
                        : 'cursor-not-allowed opacity-40',
                    )}
                  >
                    {isActive ? (
                      <Calendar className="h-5 w-5 text-white" aria-hidden="true" />
                    ) : null}
                    <span>{tab.label}</span>
                    {tab.available ? null : <span className="sr-only"> (unavailable)</span>}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
