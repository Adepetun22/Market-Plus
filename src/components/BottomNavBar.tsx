import { useRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  ShoppingCartIcon,
  PackageIcon,
  ChartBarIcon,
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
  { label: 'Analytics', href: '/analytics', icon: ChartBarIcon },
];

export default function BottomNavBar() {
  const iconRefs = useRef<Array<AnimateIconHandle | null>>([]);

  const handleIconTap = (index: number) => {
    const iconRef = iconRefs.current[index];
    if (!iconRef) return;

    iconRef.startAnimation();
  };

  return (
    <nav className="bottom-nav-bar" aria-label="Mobile navigation">
      {navItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive }) => `bottom-nav-item ${isActive ? 'is-active' : ''}`}
            onMouseEnter={() => handleIconTap(index)}
            onFocus={() => handleIconTap(index)}
          >
            <span className="bottom-nav-icon">
              <Icon
                ref={(node) => {
                  iconRefs.current[index] = node;
                }}
                size={20}
                isAnimated
              />
            </span>
            <span className="bottom-nav-label">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
