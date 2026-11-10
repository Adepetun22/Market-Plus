import { useRef, useState } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import {
  UserPlusIcon,
  UsersIcon,
  UserCheckIcon,
  StarIcon,
  SearchIcon,
  ChevronDownIcon,
  SlidersHorizontalIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from '@animateicons/react/lucide';
import Pagination from '../components/Pagination';

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

type StatCard = {
  title: string;
  value: string;
  trend?: string;
  trendPositive?: boolean;
  detail: string;
  accent: string;
  softAccent: string;
  icon: IconComponent;
};

const statCards: StatCard[] = [
  {
    title: 'Total Customers',
    value: '12,450',
    trend: '+12%',
    trendPositive: true,
    detail: 'vs last month',
    accent: 'var(--color-primary-500)',
    softAccent: '#E8F0FF',
    icon: UsersIcon,
  },
  {
    title: 'New Customers',
    value: '842',
    trend: '+5%',
    trendPositive: true,
    detail: 'vs last month',
    accent: 'var(--color-success-500)',
    softAccent: '#E8F7EE',
    icon: UserPlusIcon,
  },
  {
    title: 'Returning Customers',
    value: '68%',
    trend: '-2%',
    trendPositive: false,
    detail: 'vs last month',
    accent: 'var(--color-error-500)',
    softAccent: '#FFE8E6',
    icon: UserCheckIcon,
  },
  {
    title: 'VIP Customers',
    value: '1,204',
    trend: '+18%',
    trendPositive: true,
    detail: 'vs last month',
    accent: 'var(--color-primary-500)',
    softAccent: '#E8F0FF',
    icon: StarIcon,
  },
];

type CustomerRow = {
  id: string;
  name: string;
  customerId: string;
  email: string;
  orders: number;
  totalSpent: string;
  averageOrder: string;
  status: 'VIP' | 'Standard' | 'New';
  image?: string;
};

const customerRows: CustomerRow[] = [
  {
    id: '1',
    name: 'Eleanor Pena',
    customerId: '#CUS-8294',
    email: 'eleanor.pena@example.com',
    orders: 42,
    totalSpent: '$12,450.00',
    averageOrder: '$296.42',
    status: 'VIP',
    image: '/lady-office.png',
  },
  {
    id: '2',
    name: 'Ralph Edwards',
    customerId: '#CUS-7102',
    email: 'ralph.edwards@example.com',
    orders: 8,
    totalSpent: '$3,120.50',
    averageOrder: '$208.03',
    status: 'Standard',
    image: '/male-office.png',
  },
  {
    id: '3',
    name: 'Courtney Henry',
    customerId: '#CUS-9931',
    email: 'courtney.h@example.com',
    orders: 1,
    totalSpent: '$85.00',
    averageOrder: '$85.00',
    status: 'New',
    image: '/elderly-woman.png',
  },
  {
    id: '4',
    name: 'Cameron Williamson',
    customerId: '#CUS-4428',
    email: 'cameron.w@example.com',
    orders: 8,
    totalSpent: '$1,450.75',
    averageOrder: '$181.34',
    status: 'Standard',
    image: '/big-bro.png',
  },
];

function CustomerAvatar({ imageSrc, name }: { imageSrc?: string; name: string }) {
  return (
    <div className="customer-avatar">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          className="customer-avatar-image"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement | null;
            if (fallback) {
              fallback.style.display = 'inline-flex';
            }
          }}
        />
      ) : null}
      <span className="customer-avatar-fallback" style={imageSrc ? { display: 'none' } : undefined}>
        {name.charAt(0)}
      </span>
    </div>
  );
}

function Customers() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardIconRefs = useRef<Array<AnimateIconHandle | null>>([]);
  const buttonIconRefs = useRef<Array<AnimateIconHandle | null>>([]);
  const selectIconRefs = useRef<Array<AnimateIconHandle | null>>([]);

  const handleCardIconHover = (index: number, active: boolean) => {
    const iconRef = cardIconRefs.current[index];
    if (!iconRef) return;

    if (active) {
      iconRef.startAnimation();
      return;
    }

    iconRef.stopAnimation();
  };

  const handleButtonIconHover = (index: number, active: boolean) => {
    const iconRef = buttonIconRefs.current[index];
    if (!iconRef) return;

    if (active) {
      iconRef.startAnimation();
      return;
    }

    iconRef.stopAnimation();
  };

  const handleSelectIconHover = (index: number, active: boolean) => {
    const iconRef = selectIconRefs.current[index];
    if (!iconRef) return;

    if (active) {
      iconRef.startAnimation();
      return;
    }

    iconRef.stopAnimation();
  };

  return (
    <>
      <section className="page-header">
        <div>
          <h1>Customers</h1>
          <p>Manage your customer relationships and view performance.</p>
        </div>
        <div className="toolbar">
          <button
            className="primary-button"
            type="button"
            onMouseEnter={() => handleButtonIconHover(0, true)}
            onMouseLeave={() => handleButtonIconHover(0, false)}
            onFocus={() => handleButtonIconHover(0, true)}
            onBlur={() => handleButtonIconHover(0, false)}
          >
            <UserPlusIcon
              ref={(node) => {
                buttonIconRefs.current[0] = node;
              }}
              size={16}
              isAnimated
            />
            <span>Add customer</span>
          </button>
        </div>
      </section>

      <section className="customers-stat-grid">
        {statCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="metric-card"
              onMouseEnter={() => handleCardIconHover(index, true)}
              onMouseLeave={() => handleCardIconHover(index, false)}
              onFocus={() => handleCardIconHover(index, true)}
              onBlur={() => handleCardIconHover(index, false)}
            >
              <div className="metric-header">
                <span>{card.title}</span>
                <span className="metric-icon" style={{ backgroundColor: card.softAccent, color: card.accent }}>
                  <Icon
                    ref={(node) => {
                      cardIconRefs.current[index] = node;
                    }}
                    size={20}
                    isAnimated
                  />
                </span>
              </div>

              <div className="metric-value-row">
                <strong>{card.value}</strong>
              </div>

              {card.trend ? (
                <div className="metric-trend">
                  {card.trendPositive ? (
                    <TrendingUpIcon size={12} />
                  ) : (
                    <TrendingDownIcon size={12} />
                  )}
                  <span className={card.trendPositive ? 'trend-positive' : 'trend-negative'}>{card.trend}</span>
                  <span className="trend-detail">{card.detail}</span>
                </div>
              ) : (
                <div className="metric-trend plain">
                  <span>{card.detail}</span>
                </div>
              )}
            </article>
          );
        })}
      </section>

      <section className="table-toolbar">
        <div className="search-field" role="search">
          <SearchIcon size={18} />
          <input placeholder="Search customers..." type="text" />
        </div>

        <div className="table-actions">
          <div
            className="select-field"
            onMouseEnter={() => handleSelectIconHover(0, true)}
            onMouseLeave={() => handleSelectIconHover(0, false)}
            onFocus={() => handleSelectIconHover(0, true)}
            onBlur={() => handleSelectIconHover(0, false)}
          >
            <span>Customer Type</span>
            <ChevronDownIcon
              ref={(node) => {
                selectIconRefs.current[0] = node;
              }}
              size={16}
              isAnimated
            />
          </div>
          <div
            className="select-field"
            onMouseEnter={() => handleSelectIconHover(1, true)}
            onMouseLeave={() => handleSelectIconHover(1, false)}
            onFocus={() => handleSelectIconHover(1, true)}
            onBlur={() => handleSelectIconHover(1, false)}
          >
            <span>Location</span>
            <ChevronDownIcon
              ref={(node) => {
                selectIconRefs.current[1] = node;
              }}
              size={16}
              isAnimated
            />
          </div>
          <button
            className="secondary-button"
            type="button"
            onMouseEnter={() => handleButtonIconHover(1, true)}
            onMouseLeave={() => handleButtonIconHover(1, false)}
            onFocus={() => handleButtonIconHover(1, true)}
            onBlur={() => handleButtonIconHover(1, false)}
          >
            <SlidersHorizontalIcon
              ref={(node) => {
                buttonIconRefs.current[1] = node;
              }}
              size={16}
              isAnimated
            />
            <span>More Filters</span>
          </button>
        </div>
      </section>

      <section className="panel-card table-card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Orders</th>
                <th className="text-right">Total Spent</th>
                <th className="text-right">Average Order</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {customerRows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="customer-cell">
                      <CustomerAvatar imageSrc={row.image} name={row.name} />
                      <div className="customer-details">
                        <span className="customer-name">{row.name}</span>
                        <span className="customer-id">ID: {row.customerId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="td-muted">{row.email}</td>
                  <td className="td-muted td-text-right">{row.orders}</td>
                  <td className="td-price td-text-right">{row.totalSpent}</td>
                  <td className="td-price td-text-right">{row.averageOrder}</td>
                  <td>
                    <span className={`status-badge ${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Pagination
        currentPage={currentPage}
        pageSize={4}
        totalEntries={12450}
        onPrev={() => setCurrentPage((page) => Math.max(1, page - 1))}
        onNext={() => setCurrentPage((page) => page + 1)}
      />
    </>
  );
}

export default Customers;
