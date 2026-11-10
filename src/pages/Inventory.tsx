import { useRef, useState } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import {
  PlusIcon,
  FilterIcon,
  DownloadIcon,
  BoxIcon,
  PackageCheckIcon,
  TriangleAlertIcon,
  XIcon,
  TrendingUpIcon,
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

type InventoryRow = {
  id: string;
  name: string;
  variant: string;
  sku: string;
  available: number;
  reserved: number;
  total: number;
  threshold: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
  image: string;
};

const statCards: StatCard[] = [
  {
    title: 'Total Items',
    value: '12,450',
    trend: '+2.4%',
    trendPositive: true,
    detail: 'vs last month',
    accent: 'var(--color-primary-500)',
    softAccent: '#E8F0FF',
    icon: BoxIcon,
  },
  {
    title: 'In Stock',
    value: '11,200',
    trend: '+5.1%',
    trendPositive: true,
    detail: 'vs last month',
    accent: 'var(--color-success-500)',
    softAccent: '#E8F7EE',
    icon: PackageCheckIcon,
  },
  {
    title: 'Low Stock',
    value: '845',
    detail: '12 items needing attention',
    accent: 'var(--color-warning-500)',
    softAccent: '#FFF3E0',
    icon: TriangleAlertIcon,
  },
  {
    title: 'Out of Stock',
    value: '405',
    trend: '-8.2%',
    trendPositive: true,
    detail: 'vs last month',
    accent: 'var(--color-error-500)',
    softAccent: '#FFE8E6',
    icon: XIcon,
  },
];

const inventoryRows: InventoryRow[] = [
  {
    id: '1',
    name: 'Artisan Ceramic Mug',
    variant: 'Matte Black',
    sku: 'MUG-BLK-01',
    available: 450,
    reserved: 24,
    total: 474,
    threshold: 100,
    status: 'In Stock',
    lastUpdated: 'Today, 09:41 AM',
    image: '/artisan-iamge.png',
  },
  {
    id: '2',
    name: 'Minimalist Leather Wallet',
    variant: 'Tan Brown',
    sku: 'WAL-TAN-02',
    available: 12,
    reserved: 5,
    total: 17,
    threshold: 50,
    status: 'Low Stock',
    lastUpdated: 'Yesterday, 14:22 PM',
    image: '/Minimal.png',
  },
  {
    id: '3',
    name: 'Mechanical Keyboard TKL',
    variant: 'Arctic White, Linear Switches',
    sku: 'KB-TKL-W-L',
    available: 0,
    reserved: 8,
    total: 8,
    threshold: 20,
    status: 'Out of Stock',
    lastUpdated: 'Oct 24, 2023',
    image: '/mechanical.png',
  },
  {
    id: '4',
    name: 'ANC Wireless Headphones',
    variant: 'Slate Gray',
    sku: 'HP-ANC-GRY',
    available: 1240,
    reserved: 112,
    total: 1352,
    threshold: 150,
    status: 'In Stock',
    lastUpdated: 'Oct 22, 2023',
    image: '/ANC-image.png',
  },
];

function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="product-image-wrapper">
      <img
        src={src}
        alt={alt}
        className="product-image"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement | null;
          if (fallback) {
            fallback.style.display = 'inline-flex';
          }
        }}
      />
      <div className="product-image-fallback" style={{ display: 'none' }}>
        <span className="avatar-fallback">{alt.charAt(0)}</span>
      </div>
    </div>
  );
}

function Inventory() {
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
      if (prev.size === inventoryRows.length) {
        return new Set();
      }
      return new Set(inventoryRows.map((row) => row.id));
    });
  };

  const isAllSelected = selectedIds.size === inventoryRows.length;
  const isIndeterminate = selectedIds.size > 0 && selectedIds.size < inventoryRows.length;

  return (
    <>
      <section className="page-header">
        <div>
          <h1>Inventory</h1>
          <p>Manage stock levels, tracking, and warehouse operations.</p>
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
            <PlusIcon
              ref={(node) => {
                buttonIconRefs.current[0] = node;
              }}
              size={16}
              isAnimated
            />
            <span>Adjust stock</span>
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

      <TableToolbar searchPlaceholder="Search SKU or product...">
        <button
          className="secondary-button"
          type="button"
          onMouseEnter={() => handleButtonIconHover(1, true)}
          onMouseLeave={() => handleButtonIconHover(1, false)}
          onFocus={() => handleButtonIconHover(1, true)}
          onBlur={() => handleButtonIconHover(1, false)}
        >
          <FilterIcon
            ref={(node) => {
              buttonIconRefs.current[1] = node;
            }}
            size={16}
            isAnimated
          />
          <span>Filter</span>
        </button>
        <button
          className="secondary-button"
          type="button"
          onMouseEnter={() => handleButtonIconHover(2, true)}
          onMouseLeave={() => handleButtonIconHover(2, false)}
          onFocus={() => handleButtonIconHover(2, true)}
          onBlur={() => handleButtonIconHover(2, false)}
        >
          <DownloadIcon
            ref={(node) => {
              buttonIconRefs.current[2] = node;
            }}
            size={16}
            isAnimated
          />
          <span>Export</span>
        </button>
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
                <XIcon
                  ref={(node) => {
                    buttonIconRefs.current[3] = node;
                  }}
                  size={16}
                  isAnimated
                />
              </button>
            </div>
          </div>
        ) : null}
      </TableToolbar>

      <section className="panel-card table-card">
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
                <th>Product</th>
                <th>SKU</th>
                <th className="text-right">Available</th>
                <th className="text-right">Reserved</th>
                <th className="text-right">Total</th>
                <th className="text-right">Threshold</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {inventoryRows.map((row) => (
                <tr key={row.id}>
                  <td className="td-checkbox">
                    <div
                      className={`checkbox ${selectedIds.has(row.id) ? 'is-checked' : ''}`}
                      onClick={() => toggleSelect(row.id)}
                    />
                  </td>
                  <td>
                    <div className="product-cell">
                      <ProductImage src={row.image} alt={row.name} />
                      <div className="product-details">
                        <span className="product-name">{row.name}</span>
                        <span className="product-variant">{row.variant}</span>
                      </div>
                    </div>
                  </td>
                  <td className="td-muted td-text-right">{row.sku}</td>
                  <td className="td-muted td-text-right">{row.available}</td>
                  <td className="td-muted td-text-right">{row.reserved}</td>
                  <td className="td-price td-text-right">{row.total}</td>
                  <td className="td-muted td-text-right">{row.threshold}</td>
                  <td>
                    <span className={`status-badge ${row.status.toLowerCase().replace(' ', '-')}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="td-muted">{row.lastUpdated}</td>
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

export default Inventory;
