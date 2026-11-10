import { useRef, useState } from 'react';
import type { ForwardRefExoticComponent, RefAttributes, RefObject } from 'react';
import { motion } from 'motion/react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BadgeDollarSignIcon,
  ChartSplineIcon,
  EllipsisIcon,
  ImageIcon,
  ReceiptIcon,
  ShoppingCartIcon,
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

const RANGE_OPTIONS = ['7D', '30D', '3M', '12M'] as const;

type RangeKey = (typeof RANGE_OPTIONS)[number];

type Point = {
  label: string;
  value: number;
};

type Metrics = {
  revenue: { value: string; trend: number };
  orders: { value: string; trend: number };
  averageOrderValue: { value: string; trend: number };
  conversionRate: { value: string; trend: number };
};

type RangeSeries = {
  revenue: Point[];
  orders: Point[];
  metrics: Metrics;
};

const rangeSeries: Record<RangeKey, RangeSeries> = {
  '7D': {
    revenue: [
      { label: 'Mon', value: 4200 },
      { label: 'Tue', value: 5100 },
      { label: 'Wed', value: 4800 },
      { label: 'Thu', value: 6300 },
      { label: 'Fri', value: 7200 },
      { label: 'Sat', value: 8900 },
      { label: 'Sun', value: 8100 },
    ],
    orders: [
      { label: 'Mon', value: 62 },
      { label: 'Tue', value: 74 },
      { label: 'Wed', value: 69 },
      { label: 'Thu', value: 88 },
      { label: 'Fri', value: 101 },
      { label: 'Sat', value: 124 },
      { label: 'Sun', value: 113 },
    ],
    metrics: {
      revenue: { value: '$44,600.00', trend: 8.4 },
      orders: { value: '631', trend: 5.9 },
      averageOrderValue: { value: '$70.68', trend: 2.4 },
      conversionRate: { value: '2.86%', trend: 0.2 },
    },
  },
  '30D': {
    revenue: [
      { label: '1st', value: 9899 },
      { label: '5th', value: 15673 },
      { label: '10th', value: 12374 },
      { label: '15th', value: 20623 },
      { label: '20th', value: 18148 },
      { label: '25th', value: 24748 },
      { label: '30th', value: 23098 },
    ],
    orders: [
      { label: 'Mon', value: 140 },
      { label: 'Tue', value: 175 },
      { label: 'Wed', value: 163 },
      { label: 'Thu', value: 210 },
      { label: 'Fri', value: 257 },
      { label: 'Sat', value: 292 },
      { label: 'Sun', value: 245 },
    ],
    metrics: {
      revenue: { value: '$124,563.00', trend: 12.5 },
      orders: { value: '1,482', trend: 8.2 },
      averageOrderValue: { value: '$84.05', trend: -2.1 },
      conversionRate: { value: '3.24%', trend: 0.4 },
    },
  },
  '3M': {
    revenue: [
      { label: 'W1', value: 24800 },
      { label: 'W2', value: 27400 },
      { label: 'W3', value: 26100 },
      { label: 'W4', value: 29800 },
      { label: 'W5', value: 28700 },
      { label: 'W6', value: 31500 },
      { label: 'W7', value: 30300 },
      { label: 'W8', value: 32900 },
      { label: 'W9', value: 34100 },
      { label: 'W10', value: 35600 },
      { label: 'W11', value: 34500 },
      { label: 'W12', value: 33195 },
    ],
    orders: [
      { label: 'Mon', value: 415 },
      { label: 'Tue', value: 519 },
      { label: 'Wed', value: 483 },
      { label: 'Thu', value: 623 },
      { label: 'Fri', value: 762 },
      { label: 'Sat', value: 866 },
      { label: 'Sun', value: 727 },
    ],
    metrics: {
      revenue: { value: '$368,895.00', trend: 9.8 },
      orders: { value: '4,395', trend: 6.1 },
      averageOrderValue: { value: '$83.94', trend: 3.4 },
      conversionRate: { value: '3.46%', trend: 0.3 },
    },
  },
  '12M': {
    revenue: [
      { label: 'Jan', value: 96000 },
      { label: 'Feb', value: 104000 },
      { label: 'Mar', value: 112000 },
      { label: 'Apr', value: 108000 },
      { label: 'May', value: 121000 },
      { label: 'Jun', value: 118000 },
      { label: 'Jul', value: 132000 },
      { label: 'Aug', value: 126000 },
      { label: 'Sep', value: 138000 },
      { label: 'Oct', value: 142000 },
      { label: 'Nov', value: 143957 },
      { label: 'Dec', value: 142000 },
    ],
    orders: [
      { label: 'Mon', value: 1697 },
      { label: 'Tue', value: 2121 },
      { label: 'Wed', value: 1975 },
      { label: 'Thu', value: 2545 },
      { label: 'Fri', value: 3115 },
      { label: 'Sat', value: 3539 },
      { label: 'Sun', value: 2968 },
    ],
    metrics: {
      revenue: { value: '$1,482,957.00', trend: 15.2 },
      orders: { value: '17,960', trend: 11.3 },
      averageOrderValue: { value: '$82.57', trend: 3.4 },
      conversionRate: { value: '3.61%', trend: 0.6 },
    },
  },
};

type MetricKey = keyof Metrics;

const metricCards: Array<{
  key: MetricKey;
  title: string;
  accent: string;
  softAccent: string;
  icon: IconComponent;
}> = [
  {
    key: 'revenue',
    title: 'Total Revenue',
    accent: '#004AC6',
    softAccent: '#E7EEFE',
    icon: BadgeDollarSignIcon,
  },
  {
    key: 'orders',
    title: 'Total Orders',
    accent: '#0284C7',
    softAccent: '#E0F2FE',
    icon: ShoppingCartIcon,
  },
  {
    key: 'averageOrderValue',
    title: 'Average Order Value',
    accent: '#D97706',
    softAccent: '#FFF3E0',
    icon: ReceiptIcon,
  },
  {
    key: 'conversionRate',
    title: 'Conversion Rate',
    accent: '#943700',
    softAccent: '#FCEEE4',
    icon: ChartSplineIcon,
  },
];

const categoryData = [
  { name: 'Electronics', value: 60, color: '#004AC6' },
  { name: 'Apparel', value: 28, color: '#0284C7' },
  { name: 'Home', value: 12, color: '#943700' },
];

type TopProduct = {
  name: string;
  image?: string;
  sales: number;
  revenue: string;
};

const topProducts: TopProduct[] = [
  {
    name: 'Pro Noise Cancelling Headphones',
    image: '/headset0.png',
    sales: 342,
    revenue: '$102,599',
  },
  {
    name: 'Mechanical Keyboard v2',
    image: '/keyboard0.png',
    sales: 215,
    revenue: '$32,250',
  },
  {
    name: 'Ergo Wireless Mouse',
    image: '/mouse0.png',
    sales: 189,
    revenue: '$16,821',
  },
  { name: 'USB-C Hub Multiport', sales: 156, revenue: '$9,358' },
];

const tooltipStyle = {
  borderRadius: '12px',
  border: '1px solid rgba(148, 163, 184, 0.3)',
  background: '#fff',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
  fontSize: '0.75rem',
};

const axisTick = { fontSize: 11, fill: 'var(--color-neutral-700)' };

const riseAndFall = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

function staggerContainer(staggerChildren: number, delayChildren: number) {
  return {
    hidden: {},
    show: { transition: { staggerChildren, delayChildren } },
  };
}

function formatCurrency(value: number) {
  return `$${value.toLocaleString('en-US')}`;
}

function ProductThumb({ product }: { product: TopProduct }) {
  if (!product.image) {
    return (
      <span className="analytics-product-thumb" aria-hidden="true">
        <ImageIcon size={18} isAnimated />
      </span>
    );
  }

  return (
    <span className="analytics-product-thumb">
      <img
        className="product-image"
        src={product.image}
        alt=""
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </span>
  );
}

function Analytics() {
  const [range, setRange] = useState<RangeKey>('30D');
  const metricIconRefs = useRef<Array<AnimateIconHandle | null>>([]);
  const panelIconRefs = useRef<Array<AnimateIconHandle | null>>([]);

  const { revenue, orders, metrics } = rangeSeries[range];

  const handleIconHover = (
    refs: RefObject<Array<AnimateIconHandle | null>>,
    index: number,
    active: boolean,
  ) => {
    const iconRef = refs.current[index];
    if (!iconRef) return;

    if (active) {
      iconRef.startAnimation();
      return;
    }

    iconRef.stopAnimation();
  };

  return (
    <>
      <motion.section
        className="page-header"
        variants={riseAndFall}
        initial="hidden"
        animate="show"
      >
        <div>
          <h1>Analytics</h1>
          <p>Revenue, order and product performance across your store</p>
        </div>

        <div className="toolbar">
          <div className="segmented-control analytics-range" role="group" aria-label="Analytics date range">
            {RANGE_OPTIONS.map((option) => {
              const isActive = option === range;

              return (
                <button
                  key={option}
                  type="button"
                  className={isActive ? 'is-selected' : ''}
                  aria-pressed={isActive}
                  onClick={() => setRange(option)}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="analytics-range-pill"
                      className="analytics-range-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  ) : null}
                  <span className="analytics-range-label">{option}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="analytics-stat-grid"
        variants={staggerContainer(0.06, 0.08)}
        initial="hidden"
        animate="show"
      >
        {metricCards.map((card, index) => {
          const Icon = card.icon;
          const metric = metrics[card.key];
          const isPositive = metric.trend >= 0;
          const TrendIcon = isPositive ? ArrowUpIcon : ArrowDownIcon;

          return (
            <motion.article
              key={card.key}
              className="metric-card"
              variants={riseAndFall}
              onMouseEnter={() => handleIconHover(metricIconRefs, index, true)}
              onMouseLeave={() => handleIconHover(metricIconRefs, index, false)}
              onFocus={() => handleIconHover(metricIconRefs, index, true)}
              onBlur={() => handleIconHover(metricIconRefs, index, false)}
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
                <strong>{metric.value}</strong>
              </div>

              <div className={`metric-trend${isPositive ? '' : ' is-negative'}`}>
                <TrendIcon size={12} />
                <span className={isPositive ? 'trend-positive' : 'trend-negative'}>
                  {isPositive ? '+' : ''}
                  {metric.trend}% vs last month
                </span>
              </div>
            </motion.article>
          );
        })}
      </motion.section>

      <motion.section
        className="analytics-charts-grid"
        variants={staggerContainer(0.08, 0.16)}
        initial="hidden"
        animate="show"
      >
        <motion.article className="panel-card analytics-panel" variants={riseAndFall}>
          <div
            className="panel-header"
            onMouseEnter={() => handleIconHover(panelIconRefs, 0, true)}
            onMouseLeave={() => handleIconHover(panelIconRefs, 0, false)}
          >
            <h2>Revenue Over Time</h2>
            <button
              type="button"
              className="menu-button"
              aria-label="Revenue chart options"
              onFocus={() => handleIconHover(panelIconRefs, 0, true)}
              onBlur={() => handleIconHover(panelIconRefs, 0, false)}
            >
              <EllipsisIcon
                ref={(node) => {
                  panelIconRefs.current[0] = node;
                }}
                size={16}
                isAnimated
              />
            </button>
          </div>

          <div className="analytics-chart" aria-label="Revenue over time chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue} margin={{ top: 14, right: 10, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="analyticsRevenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary-500)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-primary-500)" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(15, 23, 42, 0.08)" vertical={false} strokeDasharray="4 4" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisTick} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={axisTick}
                  width={62}
                  tickFormatter={(value: number) => formatCurrency(value)}
                />
                <Tooltip
                  cursor={{ stroke: 'rgba(53, 104, 255, 0.3)', strokeWidth: 1 }}
                  contentStyle={tooltipStyle}
                  formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-primary-500)"
                  strokeWidth={3}
                  fill="url(#analyticsRevenueFill)"
                  animationDuration={900}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.article>

        <motion.article className="panel-card analytics-panel" variants={riseAndFall}>
          <div
            className="panel-header"
            onMouseEnter={() => handleIconHover(panelIconRefs, 1, true)}
            onMouseLeave={() => handleIconHover(panelIconRefs, 1, false)}
          >
            <h2>Sales by Category</h2>
            <button
              type="button"
              className="menu-button"
              aria-label="Category chart options"
              onFocus={() => handleIconHover(panelIconRefs, 1, true)}
              onBlur={() => handleIconHover(panelIconRefs, 1, false)}
            >
              <EllipsisIcon
                ref={(node) => {
                  panelIconRefs.current[1] = node;
                }}
                size={16}
                isAnimated
              />
            </button>
          </div>

          <div className="analytics-chart analytics-chart-donut" aria-label="Sales by category chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="58%"
                  outerRadius="82%"
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                  animationDuration={900}
                  stroke="none"
                >
                  {categoryData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ul className="analytics-legend">
            {categoryData.map((entry) => (
              <li key={entry.name} className="analytics-legend-item">
                <span className="analytics-legend-dot" style={{ backgroundColor: entry.color }} />
                {entry.name}
              </li>
            ))}
          </ul>
        </motion.article>
      </motion.section>

      <motion.section
        className="analytics-lower-grid"
        variants={staggerContainer(0.08, 0.24)}
        initial="hidden"
        animate="show"
      >
        <motion.article className="panel-card analytics-panel" variants={riseAndFall}>
          <div
            className="panel-header"
            onMouseEnter={() => handleIconHover(panelIconRefs, 2, true)}
            onMouseLeave={() => handleIconHover(panelIconRefs, 2, false)}
          >
            <h2>Orders by Day</h2>
            <button
              type="button"
              className="menu-button"
              aria-label="Orders chart options"
              onFocus={() => handleIconHover(panelIconRefs, 2, true)}
              onBlur={() => handleIconHover(panelIconRefs, 2, false)}
            >
              <EllipsisIcon
                ref={(node) => {
                  panelIconRefs.current[2] = node;
                }}
                size={16}
                isAnimated
              />
            </button>
          </div>

          <div className="analytics-chart analytics-chart-bars" aria-label="Orders by day chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orders} margin={{ top: 14, right: 10, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="rgba(15, 23, 42, 0.08)" vertical={false} strokeDasharray="4 4" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisTick} />
                <YAxis tickLine={false} axisLine={false} tick={axisTick} />
                <Tooltip
                  cursor={{ fill: 'rgba(37, 99, 235, 0.06)' }}
                  contentStyle={tooltipStyle}
                  formatter={(value) => [Number(value).toLocaleString('en-US'), 'Orders']}
                />
                <Bar
                  dataKey="value"
                  fill="var(--color-primary-100)"
                  stroke="var(--color-primary-500)"
                  strokeWidth={1.5}
                  radius={[6, 6, 0, 0]}
                  animationDuration={900}
                  maxBarSize={44}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.article>

        <motion.article className="panel-card analytics-products" variants={riseAndFall}>
          <div
            className="panel-header"
            onMouseEnter={() => handleIconHover(panelIconRefs, 3, true)}
            onMouseLeave={() => handleIconHover(panelIconRefs, 3, false)}
          >
            <h2>Top Products</h2>
            <button type="button" className="text-button">
              View All
            </button>
          </div>

          <div className="table-wrapper">
            <table className="analytics-products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Sales</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product) => (
                  <tr key={product.name}>
                    <td>
                      <div className="analytics-product-cell">
                        <ProductThumb product={product} />
                        <span className="analytics-product-name">{product.name}</span>
                      </div>
                    </td>
                    <td className="td-muted">{product.sales.toLocaleString('en-US')}</td>
                    <td className="analytics-product-revenue">{product.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.article>
      </motion.section>
    </>
  );
}

export default Analytics;
