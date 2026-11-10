import { useRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  EllipsisIcon,
  PackageIcon,
  ReceiptIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  TriangleAlertIcon,
  UsersIcon,
} from '@animateicons/react/lucide';

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
  trend: string;
  trendPositive: boolean;
  detail: string;
  accent: string;
  softAccent: string;
  icon: IconComponent;
};

type OrderRow = {
  id: string;
  customer: string;
  image?: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Shipped';
};

const salesData = [
  { month: 'Jan', sales: 620 },
  { month: 'Feb', sales: 710 },
  { month: 'Mar', sales: 680 },
  { month: 'Apr', sales: 820 },
  { month: 'May', sales: 760 },
  { month: 'Jun', sales: 940 },
  { month: 'Jul', sales: 980 },
  { month: 'Aug', sales: 870 },
  { month: 'Sep', sales: 1010 },
  { month: 'Oct', sales: 1080 },
  { month: 'Nov', sales: 1160 },
  { month: 'Dec', sales: 1210 },
];

const statCards: StatCard[] = [
  {
    title: 'Total Sales',
    value: '$4.85M',
    trend: '+18.5%',
    trendPositive: true,
    detail: 'vs last month',
    accent: 'var(--color-primary-500)',
    softAccent: '#E8F0FF',
    icon: ReceiptIcon,
  },
  {
    title: 'Orders',
    value: '1,240',
    trend: '+12%',
    trendPositive: true,
    detail: 'vs last month',
    accent: 'var(--color-primary-500)',
    softAccent: '#E8F0FF',
    icon: ShoppingCartIcon,
  },
  {
    title: 'Customers',
    value: '850',
    trend: '+5%',
    trendPositive: true,
    detail: 'vs last month',
    accent: 'var(--color-primary-500)',
    softAccent: '#E8F0FF',
    icon: UsersIcon,
  },
  {
    title: 'Total Products',
    value: '42',
    trend: '',
    trendPositive: true,
    detail: 'Active in catalog',
    accent: 'var(--color-neutral-700)',
    softAccent: '#EEF1F7',
    icon: PackageIcon,
  },
  {
    title: 'Pending Orders',
    value: '15',
    trend: '',
    trendPositive: false,
    detail: 'Requires fulfillment',
    accent: 'var(--color-error-500)',
    softAccent: '#FFE8E6',
    icon: TriangleAlertIcon,
  },
  {
    title: 'Low Stock',
    value: '4',
    trend: '',
    trendPositive: false,
    detail: 'Items below threshold',
    accent: 'var(--color-warning-500)',
    softAccent: '#FFF3E0',
    icon: TriangleAlertIcon,
  },
];

const categoryData = [
  { label: 'Electronics', value: 45, color: 'var(--color-primary-500)' },
  { label: 'Clothing', value: 30, color: 'var(--color-info-500)' },
  { label: 'Accessories', value: 25, color: 'var(--color-neutral-700)' },
];

const orderRows: OrderRow[] = [
  { id: '#1024', customer: 'Maya Chen', image: '/alice-image.png', date: 'May 12, 2026', amount: '$340.00', status: 'Paid' },
  { id: '#1025', customer: 'Noah Patel', image: '/bob-image.png', date: 'May 12, 2026', amount: '$245.00', status: 'Pending' },
  { id: '#1026', customer: 'Olivia Smith', image: '/charlie.png', date: 'May 11, 2026', amount: '$412.00', status: 'Shipped' },
  { id: '#1027', customer: 'Ethan Brown', image: '/eva.png', date: 'May 11, 2026', amount: '$180.00', status: 'Paid' },
  { id: '#1028', customer: 'Sophia Davis', date: 'May 10, 2026', amount: '$670.00', status: 'Pending' },
];

const salesTabs = ['7D', '30D', '3M', '12M'];

function CustomerAvatar({ imageSrc, name }: { imageSrc?: string; name: string }) {
  return (
    <div className="avatar">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          className="avatar-image"
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
      <span className="avatar-fallback" style={imageSrc ? { display: 'none' } : undefined}>
        {name.charAt(0)}
      </span>
    </div>
  );
}

function MarketPlus() {
  const metricIconRefs = useRef<Array<AnimateIconHandle | null>>([]);

  const handleMetricIconHover = (index: number, active: boolean) => {
    const iconRef = metricIconRefs.current[index];
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
          <h1>Dashboard Overview</h1>
          <p>Here&apos;s what&apos;s happening with your store today</p>
        </div>

        <div className="toolbar">
          <button className="date-badge" type="button">
            <CalendarDaysIcon size={16} />
            <span>Last 7 Days</span>
            <ChevronDownIcon size={12} />
          </button>
          <button className="primary-button" type="button">
            Generate Report
          </button>
        </div>
      </section>

      <section className="stat-grid">
        {statCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="metric-card"
              onMouseEnter={() => handleMetricIconHover(index, true)}
              onMouseLeave={() => handleMetricIconHover(index, false)}
              onFocus={() => handleMetricIconHover(index, true)}
              onBlur={() => handleMetricIconHover(index, false)}
            >
              <div className="metric-header">
                <span>{card.title}</span>
                <span className="metric-icon" style={{ backgroundColor: card.softAccent, color: card.accent }}>
                  <Icon
                    ref={(node) => {
                      metricIconRefs.current[index] = node;
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
                  <TrendingUpIcon size={12} />
                  <span className="trend-positive">{card.trend}</span>
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

      <section className="insights-grid">
        <article className="panel-card sales-panel">
          <div className="panel-header">
            <h2>Sales Performance</h2>
            <div className="segmented-control" aria-label="Date range toggles">
              {salesTabs.map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  className={index === 0 ? 'is-selected' : ''}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="chart-placeholder" aria-label="Sales chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 14, right: 10, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary-500)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-primary-500)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(15, 23, 42, 0.08)" vertical={false} strokeDasharray="4 4" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: 'var(--color-neutral-700)' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: 'var(--color-neutral-700)' }}
                />
                <Tooltip
                  cursor={{ stroke: 'rgba(53, 104, 255, 0.3)', strokeWidth: 1 }}
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    background: '#fff',
                    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--color-primary-500)"
                  strokeWidth={3}
                  fill="url(#salesFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="panel-card category-panel">
          <div className="panel-header compact">
            <h2>Sales by Category</h2>
            <button type="button" className="menu-button" aria-label="More actions">
              <EllipsisIcon size={16} />
            </button>
          </div>

          <div className="donut-wrap">
            <div
              className="donut-chart"
              aria-label="Sales by category chart"
              style={{
                background: `conic-gradient(
                  var(--color-primary-500) 0 45%,
                  var(--color-info-500) 45% 75%,
                  var(--color-neutral-700) 75% 100%
                )`,
              }}
            >
              <div className="donut-center">
                <strong>1.2k</strong>
                <span>Total Items</span>
              </div>
            </div>
          </div>

          <ul className="legend-list">
            {categoryData.map((item) => (
              <li key={item.label}>
                <div className="legend-label">
                  <span className="legend-dot" style={{ backgroundColor: item.color }} />
                  <span>{item.label}</span>
                </div>
                <strong>{item.value}%</strong>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="panel-card table-card">
        <div className="panel-header table-header">
          <h2>Recent Orders</h2>
          <button type="button" className="text-button">
            View All
          </button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>
                    <div className="customer-cell">
                      <CustomerAvatar imageSrc={row.image} name={row.customer} />
                      <span>{row.customer}</span>
                    </div>
                  </td>
                  <td>{row.date}</td>
                  <td>{row.amount}</td>
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
      </>
    );
  }

  export default MarketPlus;
