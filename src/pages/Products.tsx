import { useRef, useState } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import {
  ImageIcon,
  PackageIcon,
  SlidersHorizontalIcon,
  TrendingUpIcon,
  TriangleAlertIcon,
  Trash2Icon,
  FileArchiveIcon,
  DownloadIcon,
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
    title: 'Total Products',
    value: '1,248',
    trend: '+12',
    trendPositive: true,
    detail: 'vs last month',
    accent: 'var(--color-primary-500)',
    softAccent: '#E8F0FF',
    icon: PackageIcon,
  },
  {
    title: 'Active',
    value: '1,102',
    detail: 'Live on store',
    accent: 'var(--color-success-500)',
    softAccent: '#E8F7EE',
    icon: TrendingUpIcon,
  },
  {
    title: 'Drafts',
    value: '45',
    detail: 'Pending review',
    accent: 'var(--color-neutral-700)',
    softAccent: '#EEF1F7',
    icon: SlidersHorizontalIcon,
  },
  {
    title: 'Low Stock',
    value: '86',
    trend: '',
    trendPositive: false,
    detail: 'Action required',
    accent: 'var(--color-warning-500)',
    softAccent: '#FFF3E0',
    icon: TriangleAlertIcon,
  },
  {
    title: 'Out of Stock',
    value: '15',
    detail: 'Requires restock',
    accent: 'var(--color-error-500)',
    softAccent: '#FFE8E6',
    icon: TriangleAlertIcon,
  },
];

type ProductRow = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  inventory: string;
  status: 'Active' | 'Draft' | 'Low Stock';
  image?: string;
};

const productRows: ProductRow[] = [
  {
    id: '1',
    name: 'Artisan Ceramic Mug',
    sku: 'SKU-001',
    category: 'Homeware',
    price: '$24.00',
    inventory: '142 in stock',
    status: 'Active',
    image: '/cup-image.png',
  },
  {
    id: '2',
    name: 'Hydro Flask 32oz',
    sku: 'SKU-042',
    category: 'Accessories',
    price: '$45.00',
    inventory: '8 in stock',
    status: 'Active',
    image: '/bottle-image.png',
  },
  {
    id: '3',
    name: 'Organic Cotton Tote',
    sku: 'SKU-115',
    category: 'Apparel',
    price: '$18.00',
    inventory: '0 in stock',
    status: 'Draft',
  },
  {
    id: '4',
    name: 'Leather Wallet',
    sku: 'SKU-200',
    category: 'Accessories',
    price: '$49.00',
    inventory: '5 in stock',
    status: 'Low Stock',
    image: '/cup-image.png',
  },
];

function ProductImagePlaceholder({ imageSrc }: { imageSrc?: string }) {
  return (
    <div className="product-image-placeholder">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
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
      ) : null}
      <div className="product-image-fallback" style={imageSrc ? { display: 'none' } : undefined}>
        <ImageIcon size={20} color="var(--color-neutral-400)" />
      </div>
    </div>
  );
}

function Products() {
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
      if (prev.size === productRows.length) {
        return new Set();
      }
      return new Set(productRows.map((row) => row.id));
    });
  };

  const isAllSelected = selectedIds.size === productRows.length;
  const isIndeterminate = selectedIds.size > 0 && selectedIds.size < productRows.length;

  return (
    <>
      <section className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage your catalog, inventory, and pricing.</p>
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
            <SlidersHorizontalIcon
              ref={(node) => {
                buttonIconRefs.current[0] = node;
              }}
              size={16}
              isAnimated
            />
            <span>Import/Export</span>
          </button>
          <button
            className="primary-button"
            type="button"
            onMouseEnter={() => handleButtonIconHover(1, true)}
            onMouseLeave={() => handleButtonIconHover(1, false)}
            onFocus={() => handleButtonIconHover(1, true)}
            onBlur={() => handleButtonIconHover(1, false)}
          >
            <PackageIcon
              ref={(node) => {
                buttonIconRefs.current[1] = node;
              }}
              size={16}
              isAnimated
            />
            <span>Add Product</span>
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

      <TableToolbar searchPlaceholder="Search products...">
        <button
          className="secondary-button"
          type="button"
          onMouseEnter={() => handleButtonIconHover(2, true)}
          onMouseLeave={() => handleButtonIconHover(2, false)}
          onFocus={() => handleButtonIconHover(2, true)}
          onBlur={() => handleButtonIconHover(2, false)}
        >
          <SlidersHorizontalIcon
            ref={(node) => {
              buttonIconRefs.current[2] = node;
            }}
            size={16}
            isAnimated
          />
          <span>Filter</span>
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
        ) : null}
      </TableToolbar>

      <section className="panel-card table-card">
        <div className="panel-header table-header">
          <h2>All Products</h2>
          <button type="button" className="text-button">
            Add Product
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
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Inventory</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {productRows.map((row) => (
                <tr key={row.id}>
                  <td className="td-checkbox">
                    <div
                      className={`checkbox ${selectedIds.has(row.id) ? 'is-checked' : ''}`}
                      onClick={() => toggleSelect(row.id)}
                    />
                  </td>
                  <td>
                    <div className="product-cell">
                      <div className="product-image-wrapper">
                        <ProductImagePlaceholder imageSrc={row.image} />
                      </div>
                      <span className="product-name">{row.name}</span>
                    </div>
                  </td>
                  <td className="td-muted">{row.sku}</td>
                  <td className="td-muted">{row.category}</td>
                  <td className="td-price">{row.price}</td>
                  <td>
                    <div className="inventory-cell">
                      <span className="inventory-dot" />
                      <span>{row.inventory}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${row.status.toLowerCase().replace(' ', '-')}`}>
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
        totalEntries={1248}
        onPrev={() => setCurrentPage((page) => Math.max(1, page - 1))}
        onNext={() => setCurrentPage((page) => page + 1)}
      />
    </>
  );
}

export default Products;
