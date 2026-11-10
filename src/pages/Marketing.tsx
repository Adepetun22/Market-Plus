import { useRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import {
  ChevronRightIcon,
  ClockIcon,
  EyeIcon,
  MegaphoneIcon,
  MinusIcon,
  PlusIcon,
  TagIcon,
  TrendingUpIcon,
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

type MetricCard = {
  title: string;
  value: string;
  detail: string;
  trend?: string;
  trendTone?: 'positive' | 'neutral';
  icon: IconComponent;
  accent: string;
  softAccent: string;
};

type CampaignRow = {
  id: string;
  name: string;
  type: string;
  reach: string;
  conversion: string;
  status: 'Active';
};

const metricCards: MetricCard[] = [
  {
    title: 'Total Reach',
    value: '1.2M',
    detail: 'vs last month',
    trend: '12%',
    trendTone: 'positive',
    icon: EyeIcon,
    accent: 'var(--color-primary-500)',
    softAccent: '#E8F0FF',
  },
  {
    title: 'Avg. Conversion',
    value: '4.8%',
    detail: 'vs last month',
    trend: '0.5%',
    trendTone: 'positive',
    icon: TrendingUpIcon,
    accent: 'var(--color-primary-500)',
    softAccent: '#E8F0FF',
  },
  {
    title: 'Active Campaigns',
    value: '3',
    detail: 'No change',
    trendTone: 'neutral',
    icon: MegaphoneIcon,
    accent: 'var(--color-primary-500)',
    softAccent: '#E8F0FF',
  },
];

const activeCampaigns: CampaignRow[] = [
  {
    id: 'summer-sale',
    name: 'Summer Sale Blowout',
    type: 'Email',
    reach: '450k',
    conversion: '5.2%',
    status: 'Active',
  },
  {
    id: 'new-arrivals',
    name: 'New Arrivals Retargeting',
    type: 'Social Ads',
    reach: '120k',
    conversion: '3.8%',
    status: 'Active',
  },
];

function Marketing() {
  const iconRefs = useRef<Array<AnimateIconHandle | null>>([]);

  const animateIcon = (index: number, active: boolean) => {
    const icon = iconRefs.current[index];
    if (!icon) return;
    if (active) {
      icon.startAnimation();
      return;
    }
    icon.stopAnimation();
  };

  return (
    <>
      <section className="page-header">
        <div>
          <h1>Marketing</h1>
          <p>Manage your campaigns and promotions.</p>
        </div>
        <div className="toolbar">
          <button
            className="text-button"
            type="button"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}
            onMouseEnter={() => animateIcon(0, true)}
            onMouseLeave={() => animateIcon(0, false)}
            onFocus={() => animateIcon(0, true)}
            onBlur={() => animateIcon(0, false)}
          >
            <TagIcon
              ref={(node) => {
                iconRefs.current[0] = node;
              }}
              size={16}
              isAnimated
            />
            <span>Manage Discounts</span>
          </button>
          <button
            className="primary-button"
            type="button"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            onMouseEnter={() => animateIcon(1, true)}
            onMouseLeave={() => animateIcon(1, false)}
            onFocus={() => animateIcon(1, true)}
            onBlur={() => animateIcon(1, false)}
          >
            <PlusIcon
              ref={(node) => {
                iconRefs.current[1] = node;
              }}
              size={16}
              isAnimated
            />
            <span>Create Campaign</span>
          </button>
        </div>
      </section>

      <section className="stat-grid" aria-label="Marketing metrics">
        {metricCards.map((card, index) => {
          const Icon = card.icon;
          const iconIndex = index + 2;

          return (
            <article
              key={card.title}
              className="metric-card"
              onMouseEnter={() => animateIcon(iconIndex, true)}
              onMouseLeave={() => animateIcon(iconIndex, false)}
              onFocus={() => animateIcon(iconIndex, true)}
              onBlur={() => animateIcon(iconIndex, false)}
              tabIndex={0}
            >
              <div className="metric-header">
                <span>{card.title}</span>
                <span
                  className="metric-icon"
                  style={{ backgroundColor: card.softAccent, color: card.accent }}
                >
                  <Icon
                    ref={(node) => {
                      iconRefs.current[iconIndex] = node;
                    }}
                    size={20}
                    isAnimated
                  />
                </span>
              </div>

              <div className="metric-value-row">
                <strong>{card.value}</strong>
              </div>

              {card.trendTone === 'positive' && card.trend ? (
                <div className="metric-trend">
                  <TrendingUpIcon size={12} isAnimated />
                  <span className="trend-positive">{card.trend}</span>
                  <span className="trend-detail">{card.detail}</span>
                </div>
              ) : (
                <div className="metric-trend plain" style={{ color: 'var(--color-neutral-700)' }}>
                  <MinusIcon size={12} isAnimated />
                  <span>{card.detail}</span>
                </div>
              )}
            </article>
          );
        })}
      </section>

      <section className="panel-card table-card" aria-label="Active campaigns">
        <div className="panel-header table-header">
          <h2>Active Campaigns</h2>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Type</th>
                <th>Reach</th>
                <th>Conversion</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activeCampaigns.map((row) => (
                <tr key={row.id}>
                  <td style={{ fontWeight: 'var(--font-weight-semibold)' }}>{row.name}</td>
                  <td className="td-muted">{row.type}</td>
                  <td className="td-price">{row.reach}</td>
                  <td className="td-price">{row.conversion}</td>
                  <td>
                    <span className="status-badge active">
                      <span
                        aria-hidden="true"
                        style={{
                          width: '0.5rem',
                          height: '0.5rem',
                          borderRadius: '999px',
                          background: 'currentColor',
                          marginRight: '0.375rem',
                          display: 'inline-block',
                        }}
                      />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel-card" aria-label="Scheduled campaigns" style={{ padding: 'var(--card-padding)' }}>
        <div className="panel-header compact" style={{ marginBottom: '1rem' }}>
          <h2>Scheduled</h2>
        </div>
        <button
          type="button"
          className="secondary-button"
          style={{
            width: '100%',
            maxWidth: '30.5rem',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '5rem',
            padding: '1rem',
            textAlign: 'left',
          }}
          onMouseEnter={() => animateIcon(5, true)}
          onMouseLeave={() => animateIcon(5, false)}
          onFocus={() => animateIcon(5, true)}
          onBlur={() => animateIcon(5, false)}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', minWidth: 0 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '3rem',
                height: '3rem',
                borderRadius: 'var(--radius-md)',
                background: '#D6E0F3',
                color: '#596373',
                flexShrink: 0,
              }}
            >
              <ClockIcon
                ref={(node) => {
                  iconRefs.current[5] = node;
                }}
                size={20}
                isAnimated
              />
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem', minWidth: 0 }}>
              <span
                style={{
                  color: 'var(--color-black)',
                  fontSize: '1.125rem',
                  lineHeight: '1.625rem',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                Fall Collection Teaser
              </span>
              <span
                style={{
                  color: 'var(--color-neutral-700)',
                  fontSize: 'var(--text-small-size)',
                  lineHeight: '1.125rem',
                  fontWeight: 'var(--font-weight-regular)',
                }}
              >
                Email • Starts Oct 1
              </span>
            </span>
          </span>
          <span style={{ color: 'var(--color-neutral-700)', display: 'inline-flex', flexShrink: 0 }}>
            <ChevronRightIcon
              ref={(node) => {
                iconRefs.current[6] = node;
              }}
              size={18}
              isAnimated
            />
          </span>
        </button>
      </section>
    </>
  );
}

export default Marketing;
