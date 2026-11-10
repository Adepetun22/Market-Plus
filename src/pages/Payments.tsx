import { useRef, useState } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import {
  DownloadIcon,
  WalletIcon,
  CreditCardIcon,
  ClockIcon,
  RefreshCwIcon,
  FilterIcon,
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
    title: 'Total Revenue',
    value: '$124,500.00',
    trend: '+12.5%',
    trendPositive: true,
    detail: 'vs last month',
    accent: 'var(--color-primary-500)',
    softAccent: '#E8F0FF',
    icon: WalletIcon,
  },
  {
    title: 'Available Balance',
    value: '$45,230.50',
    detail: 'Ready to withdraw',
    accent: 'var(--color-success-500)',
    softAccent: '#E8F7EE',
    icon: CreditCardIcon,
  },
  {
    title: 'Pending',
    value: '$8,400.00',
    detail: 'Clearing in 2-3 days',
    accent: 'var(--color-warning-500)',
    softAccent: '#FFF3E0',
    icon: ClockIcon,
  },
  {
    title: 'Refunded',
    value: '$1,250.00',
    trend: '+2.1%',
    trendPositive: false,
    detail: 'vs last month',
    accent: 'var(--color-error-500)',
    softAccent: '#FFE8E6',
    icon: RefreshCwIcon,
  },
];

type PaymentRow = {
  id: string;
  date: string;
  time: string;
  customer: string;
  order: string;
  paymentMethod: string;
  amount: string;
  status: 'Succeeded' | 'Pending' | 'Failed' | 'Refunded';
};

const paymentRows: PaymentRow[] = [
  {
    id: '#TXN-98231',
    date: 'Oct 24, 2023',
    time: '14:30',
    customer: 'Sarah Jenkins',
    order: 'ORD-5542',
    paymentMethod: '•••• 4242',
    amount: '$1,250.00',
    status: 'Succeeded',
  },
  {
    id: '#TXN-98230',
    date: 'Oct 24, 2023',
    time: '11:15',
    customer: 'Michael Chang',
    order: 'ORD-5541',
    paymentMethod: 'Bank Transfer',
    amount: '$450.50',
    status: 'Pending',
  },
  {
    id: '#TXN-98229',
    date: 'Oct 23, 2023',
    time: '16:45',
    customer: 'Emma Watson',
    order: 'ORD-5540',
    paymentMethod: '•••• 1234',
    amount: '$85.00',
    status: 'Succeeded',
  },
  {
    id: '#TXN-98228',
    date: 'Oct 23, 2023',
    time: '09:20',
    customer: 'David Miller',
    order: 'ORD-5539',
    paymentMethod: '•••• 5555',
    amount: '-$120.00',
    status: 'Refunded',
  },
  {
    id: '#TXN-98227',
    date: 'Oct 22, 2023',
    time: '18:05',
    customer: 'Tech Solutions Inc.',
    order: 'ORD-5538',
    paymentMethod: 'Wire Transfer',
    amount: '$3,400.00',
    status: 'Failed',
  },
];

function PaymentMethodIcon({ method }: { method: string }) {
  const isCard = method.includes('••••') || method === 'Credit Card';
  return (
    <div className="payment-method">
      {isCard ? (
        <CreditCardIcon size={16} />
      ) : (
        <WalletIcon size={16} />
      )}
      <span>{method}</span>
    </div>
  );
}

function Payments() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardIconRefs = useRef<Array<AnimateIconHandle | null>>([]);
  const buttonIconRefs = useRef<Array<AnimateIconHandle | null>>([]);

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

  return (
    <>
      <section className="page-header">
        <div>
          <h1>Payments</h1>
          <p>Manage your transactions and payouts.</p>
        </div>
        <div className="toolbar">
          <button
            className="secondary-button"
            type="button"
            onMouseEnter={() => handleButtonIconHover(0, true)}
            onMouseLeave={() => handleButtonIconHover(0, false)}
            onFocus={() => handleButtonIconHover(0, true)}
            onBlur={() => handleButtonIconHover(0, false)}
          >
            <DownloadIcon
              ref={(node) => {
                buttonIconRefs.current[0] = node;
              }}
              size={16}
              isAnimated
            />
            <span>Export</span>
          </button>
          <button
            className="primary-button"
            type="button"
            onMouseEnter={() => handleButtonIconHover(1, true)}
            onMouseLeave={() => handleButtonIconHover(1, false)}
            onFocus={() => handleButtonIconHover(1, true)}
            onBlur={() => handleButtonIconHover(1, false)}
          >
            <WalletIcon
              ref={(node) => {
                buttonIconRefs.current[1] = node;
              }}
              size={16}
              isAnimated
            />
            <span>Withdraw</span>
          </button>
        </div>
      </section>

      <section className="payments-stat-grid">
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

      <section className="panel-card table-card">
        <div className="panel-header table-header">
          <h2>Recent Transactions</h2>
          <button
            className="secondary-button"
            type="button"
            onMouseEnter={() => handleButtonIconHover(2, true)}
            onMouseLeave={() => handleButtonIconHover(2, false)}
            onFocus={() => handleButtonIconHover(2, true)}
            onBlur={() => handleButtonIconHover(2, false)}
          >
            <FilterIcon
              ref={(node) => {
                buttonIconRefs.current[2] = node;
              }}
              size={16}
              isAnimated
            />
            <span>Filter</span>
          </button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Order</th>
                <th>Payment Method</th>
                <th className="text-right">Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentRows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <span className="td-link">{row.id}</span>
                  </td>
                  <td className="td-muted">
                    <div className="date-cell">
                      <span>{row.date}</span>
                      <span className="time-muted">{row.time}</span>
                    </div>
                  </td>
                  <td className="td-muted">{row.customer}</td>
                  <td>
                    <span className="td-link">{row.order}</span>
                  </td>
                  <td>
                    <PaymentMethodIcon method={row.paymentMethod} />
                  </td>
                  <td className={`td-price td-text-right ${row.status === 'Refunded' ? 'amount-refunded' : ''}`}>
                    {row.amount}
                  </td>
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
        pageSize={5}
        totalEntries={124}
        onPrev={() => setCurrentPage((page) => Math.max(1, page - 1))}
        onNext={() => setCurrentPage((page) => page + 1)}
      />
    </>
  );
}

export default Payments;
