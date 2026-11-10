import { useRef, useState } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import {
  DownloadIcon,
  SlidersHorizontalIcon,
  ChevronDownIcon,
  CalendarIcon,
  TruckIcon,
  ClockIcon,
  LoaderIcon,
  PackageCheckIcon,
  ShoppingBagIcon,
  XIcon,
  Trash2Icon,
  FileArchiveIcon,
} from '@animateicons/react/lucide';
import TableToolbar from '../components/TableToolbar';
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
    title: 'All Orders',
    value: '1,248',
    detail: 'Total orders',
    accent: 'var(--color-primary-500)',
    softAccent: '#E8F0FF',
    icon: ShoppingBagIcon,
  },
  {
    title: 'Pending',
    value: '42',
    detail: 'Awaiting processing',
    accent: 'var(--color-warning-500)',
    softAccent: '#FFF3E0',
    icon: ClockIcon,
  },
  {
    title: 'Processing',
    value: '86',
    detail: 'Currently processing',
    accent: 'var(--color-info-500)',
    softAccent: '#E0F2FE',
    icon: LoaderIcon,
  },
  {
    title: 'Shipped',
    value: '215',
    detail: 'In transit',
    accent: 'var(--color-primary-500)',
    softAccent: '#E8F0FF',
    icon: TruckIcon,
  },
  {
    title: 'Delivered',
    value: '890',
    detail: 'Completed orders',
    accent: 'var(--color-success-500)',
    softAccent: '#E8F7EE',
    icon: PackageCheckIcon,
  },
  {
    title: 'Cancelled',
    value: '15',
    detail: 'Removed orders',
    accent: 'var(--color-error-500)',
    softAccent: '#FFE8E6',
    icon: XIcon,
  },
];

type OrderRow = {
  id: string;
  customer: string;
  image?: string;
  date: string;
  items: number;
  amount: string;
  paymentMethod: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Pending';
};

const orderRows: OrderRow[] = [
  {
    id: '#ORD-9872',
    customer: 'Jane Doe',
    image: '/alice-image.png',
    date: 'Oct 24, 14:32',
    items: 3,
    amount: '$145.00',
    paymentMethod: 'Visa •••• 4242',
    status: 'Processing',
  },
  {
    id: '#ORD-9871',
    customer: 'Michael Smith',
    image: '/bob-image.png',
    date: 'Oct 24, 09:15',
    items: 1,
    amount: '$89.99',
    paymentMethod: 'PayPal',
    status: 'Shipped',
  },
  {
    id: '#ORD-9870',
    customer: 'Emma Larson',
    image: '/charlie.png',
    date: 'Oct 23, 16:45',
    items: 5,
    amount: '$342.50',
    paymentMethod: 'MC •••• 8812',
    status: 'Delivered',
  },
  {
    id: '#ORD-9869',
    customer: 'Robert Taylor',
    image: '/eva.png',
    date: 'Oct 23, 11:20',
    items: 2,
    amount: '$55.00',
    paymentMethod: 'Apple Pay',
    status: 'Pending',
  },
];

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

function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
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

  const handleBulkButtonHover = (index: number, active: boolean) => {
    const iconRef = buttonIconRefs.current[index];
    if (!iconRef) return;

    if (active) {
      iconRef.startAnimation();
      return;
    }

    iconRef.stopAnimation();
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      if (prev.size === orderRows.length) {
        return new Set();
      }
      return new Set(orderRows.map((row) => row.id));
    });
  };

  const isAllSelected = selectedIds.size === orderRows.length;
  const isIndeterminate = selectedIds.size > 0 && selectedIds.size < orderRows.length;

  return (
    <>
      <section className="page-header">
        <div>
          <h1>Orders</h1>
          <p>Manage and track all customer orders</p>
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
        </div>
      </section>

      <section className="products-stat-grid">
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

              <div className="metric-trend plain">
                <span>{card.detail}</span>
              </div>
            </article>
          );
        })}
      </section>

      <TableToolbar searchPlaceholder="Search Order ID, Customer...">
        <div className="select-field">
          <SlidersHorizontalIcon size={16} />
          <span>All Statuses</span>
          <ChevronDownIcon size={12} />
        </div>
        <div className="select-field">
          <CalendarIcon size={16} />
          <span>Last 30 Days</span>
          <ChevronDownIcon size={12} />
        </div>
        {selectedIds.size > 0 ? (
          <div className="bulk-actions">
            <span className="selected-info">{selectedIds.size} selected</span>
            <div className="bulk-actions-buttons">
              <button
                className="icon-button bulk-action-button"
                type="button"
                aria-label="Delete selected"
                onMouseEnter={() => handleBulkButtonHover(3, true)}
                onMouseLeave={() => handleBulkButtonHover(3, false)}
                onFocus={() => handleBulkButtonHover(3, true)}
                onBlur={() => handleBulkButtonHover(3, false)}
              >
                <Trash2Icon
                  ref={(node) => {
                    buttonIconRefs.current[3] = node;
                  }}
                  size={16}
                  isAnimated
                />
              </button>
              <button
                className="icon-button bulk-action-button"
                type="button"
                aria-label="Archive selected"
                onMouseEnter={() => handleBulkButtonHover(4, true)}
                onMouseLeave={() => handleBulkButtonHover(4, false)}
                onFocus={() => handleBulkButtonHover(4, true)}
                onBlur={() => handleBulkButtonHover(4, false)}
              >
                <FileArchiveIcon
                  ref={(node) => {
                    buttonIconRefs.current[4] = node;
                  }}
                  size={16}
                  isAnimated
                />
              </button>
              <button
                className="icon-button bulk-action-button"
                type="button"
                aria-label="Export selected"
                onMouseEnter={() => handleBulkButtonHover(5, true)}
                onMouseLeave={() => handleBulkButtonHover(5, false)}
                onFocus={() => handleBulkButtonHover(5, true)}
                onBlur={() => handleBulkButtonHover(5, false)}
              >
                <DownloadIcon
                  ref={(node) => {
                    buttonIconRefs.current[5] = node;
                  }}
                  size={16}
                  isAnimated
                />
              </button>
            </div>
          </div>
        ) : (
          <span className="selected-info">0 selected</span>
        )}
      </TableToolbar>

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
                <th className="th-checkbox">
                  <div
                    className={`checkbox ${isAllSelected ? 'is-checked' : ''} ${isIndeterminate ? 'is-indeterminate' : ''}`}
                    onClick={toggleSelectAll}
                  />
                </th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th className="text-right">Items</th>
                <th className="text-right">Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderRows.map((row) => (
                <tr key={row.id}>
                  <td className="td-checkbox">
                    <div
                      className={`checkbox ${selectedIds.has(row.id) ? 'is-checked' : ''}`}
                      onClick={() => toggleSelect(row.id)}
                    />
                  </td>
                  <td>
                    <span className="td-link">{row.id}</span>
                  </td>
                  <td>
                    <div className="customer-cell">
                      <CustomerAvatar imageSrc={row.image} name={row.customer} />
                      <span>{row.customer}</span>
                    </div>
                  </td>
                  <td className="td-muted">{row.date}</td>
                  <td className="td-muted td-text-right">{row.items}</td>
                  <td className="td-price td-text-right">{row.amount}</td>
                  <td className="td-muted">{row.paymentMethod}</td>
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
        pageSize={10}
        totalEntries={1248}
        onPrev={() => setCurrentPage((page) => Math.max(1, page - 1))}
        onNext={() => setCurrentPage((page) => page + 1)}
      />
    </>
  );
}

export default Orders;
