import { useRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ChartBarIcon,
  LayoutDashboardIcon,
  MegaphoneIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingCartIcon,
  StoreIcon,
  UsersIcon,
  WalletIcon,
} from '@animateicons/react/lucide';
import { BoxesIcon } from './BoxesIcon';

type AnimateIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

type IconComponent = ForwardRefExoticComponent<{
  size?: number;
  duration?: number;
  isAnimated?: boolean;
  color?: string;
} & RefAttributes<AnimateIconHandle>>;

type NavItem = {
  label: string;
  href: string;
  icon: IconComponent;
};

const navItems: NavItem[] = [
  { label: 'Overview', href: '/', icon: LayoutDashboardIcon },
  { label: 'Orders', href: '/orders', icon: ShoppingCartIcon },
  { label: 'Products', href: '/products', icon: PackageIcon },
  { label: 'Inventory', href: '/inventory', icon: BoxesIcon },
  { label: 'Customers', href: '/customers', icon: UsersIcon },
  { label: 'Payments', href: '/payments', icon: WalletIcon },
  { label: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { label: 'Marketing', href: '/marketing', icon: MegaphoneIcon },
  { label: 'Store', href: '/store', icon: StoreIcon },
  { label: 'Settings', href: '/settings', icon: SettingsIcon },
];

export default function LeftPanel({ className }: { className?: string }) {
  const iconRefs = useRef<Array<AnimateIconHandle | null>>([]);

  const handleIconHover = (index: number, active: boolean) => {
    const iconRef = iconRefs.current[index];
    if (!iconRef) return;

    if (active) {
      iconRef.startAnimation();
      return;
    }

    iconRef.stopAnimation();
  };

  return (
    <aside className={`overview-sidebar ${className ?? ''}`}>
      <div className="brand-block">
        <div className="brand-mark">M</div>
        <div className="brand-copy">
          <div className="brand-name">Market Plus</div>
          <div className="brand-subtitle">Admin Dashboard</div>
        </div>
      </div>

      <nav className="side-nav" aria-label="Sidebar navigation">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}
              onMouseEnter={() => handleIconHover(index, true)}
              onMouseLeave={() => handleIconHover(index, false)}
              onFocus={() => handleIconHover(index, true)}
              onBlur={() => handleIconHover(index, false)}
            >
              <span className="nav-icon">
                <Icon
                  ref={(node) => {
                    iconRefs.current[index] = node;
                  }}
                  size={18}
                  isAnimated
                />
              </span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
