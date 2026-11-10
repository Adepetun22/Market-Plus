import { useRef, useState } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import {
  ArrowRightIcon,
  BellIcon,
  CloudIcon,
  CreditCardIcon,
  ImageIcon,
  LockIcon,
  LogOutIcon,
  MailIcon,
  MegaphoneIcon,
  PhoneIcon,
  PlugIcon,
  RefreshCwIcon,
  ReceiptIcon,
  SaveIcon,
  Trash2Icon,
  UserPlusIcon,
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

type SettingsTab =
  | 'general'
  | 'account'
  | 'notifications'
  | 'security'
  | 'appearance'
  | 'integrations'
  | 'billing'
  | 'danger-zone';

const tabs: { id: SettingsTab; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'account', label: 'Account' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'security', label: 'Security' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'billing', label: 'Billing' },
  { id: 'danger-zone', label: 'Danger Zone' },
];

function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [storeName, setStoreName] = useState('Market Plus Official');
  const [storeEmail, setStoreEmail] = useState('admin@marketplus.shop');
  const [timezone, setTimezone] = useState('UTC');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [currency, setCurrency] = useState('USD');
  const [fullName, setFullName] = useState('Alex Rivera');
  const [username, setUsername] = useState('alex.rivera');
  const [email, setEmail] = useState('alex@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [theme, setTheme] = useState('light');
  const [accentColor, setAccentColor] = useState('#2563EB');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [stripeConnected] = useState(false);
  const [plan, setPlan] = useState('Professional');
  const [nextInvoice] = useState('Dec 1, 2026');
  const [amountDue] = useState('$49.00');
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

  const renderAnimatedIcon = (Icon: IconComponent, index: number, size = 16) => (
    <Icon
      ref={(node) => {
        iconRefs.current[index] = node;
      }}
      size={size}
      isAnimated
    />
  );

  const timezoneOptions = ['UTC', 'US/Eastern', 'US/Pacific', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];
  const dateFormatOptions = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'];
  const currencyOptions = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'];
  const frequencyOptions = ['hourly', 'daily', 'weekly', 'monthly'];
  const planOptions = ['Starter', 'Professional', 'Business', 'Enterprise'];

  return (
    <>
      <section className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your account, store preferences, and billing.</p>
        </div>
        <div className="toolbar">
          <button className="primary-button" type="button">
            <span>Save All Changes</span>
            {renderAnimatedIcon(RefreshCwIcon, 0, 16)}
          </button>
        </div>
      </section>

      <section
        aria-label="Settings"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 280px) minmax(0, 1fr)',
          gap: '1.5rem',
          alignItems: 'start',
        }}
      >
        <nav aria-label="Settings tabs" className="panel-card" style={{ padding: '0.75rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    minHeight: '2.25rem',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: `2px solid ${isActive ? 'var(--color-primary-600)' : 'transparent'}`,
                    borderTop: '1px solid transparent',
                    borderRight: '1px solid transparent',
                    borderBottom: '1px solid transparent',
                    background: isActive ? '#F0F3FF' : 'transparent',
                    color: isActive ? 'var(--color-primary-600)' : 'var(--color-neutral-700)',
                    fontSize: 'var(--text-body-medium-size)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: 0 }}>
          {activeTab === 'general' && (
            <div className="panel-card table-card" aria-label="General settings">
              <div className="panel-header table-header" style={{ alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ marginBottom: '0.25rem' }}>General</h2>
                  <p style={{ margin: 0, color: 'var(--color-neutral-700)', fontSize: 'var(--text-body-medium-size)' }}>
                    Store-level preferences and defaults.
                  </p>
                </div>
              </div>

              <div style={{ padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                      Store Name
                    </span>
                    <input
                      type="text"
                      value={storeName}
                      onChange={(event) => setStoreName(event.target.value)}
                      style={{
                        minHeight: '2.5rem',
                        padding: '0.625rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-neutral-300)',
                        background: 'var(--surface-bg)',
                        color: 'var(--color-black)',
                        fontSize: 'var(--text-body-medium-size)',
                      }}
                    />
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                      Store Email
                    </span>
                    <input
                      type="email"
                      value={storeEmail}
                      onChange={(event) => setStoreEmail(event.target.value)}
                      style={{
                        minHeight: '2.5rem',
                        padding: '0.625rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-neutral-300)',
                        background: 'var(--surface-bg)',
                        color: 'var(--color-black)',
                        fontSize: 'var(--text-body-medium-size)',
                      }}
                    />
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                      Timezone
                    </span>
                    <select
                      value={timezone}
                      onChange={(event) => setTimezone(event.target.value)}
                      style={{
                        minHeight: '2.5rem',
                        padding: '0.625rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-neutral-300)',
                        background: 'var(--surface-bg)',
                        color: 'var(--color-black)',
                        fontSize: 'var(--text-body-medium-size)',
                        cursor: 'pointer',
                      }}
                    >
                      {timezoneOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                      Date Format
                    </span>
                    <select
                      value={dateFormat}
                      onChange={(event) => setDateFormat(event.target.value)}
                      style={{
                        minHeight: '2.5rem',
                        padding: '0.625rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-neutral-300)',
                        background: 'var(--surface-bg)',
                        color: 'var(--color-black)',
                        fontSize: 'var(--text-body-medium-size)',
                        cursor: 'pointer',
                      }}
                    >
                      {dateFormatOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                      Currency
                    </span>
                    <select
                      value={currency}
                      onChange={(event) => setCurrency(event.target.value)}
                      style={{
                        minHeight: '2.5rem',
                        padding: '0.625rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-neutral-300)',
                        background: 'var(--surface-bg)',
                        color: 'var(--color-black)',
                        fontSize: 'var(--text-body-medium-size)',
                        cursor: 'pointer',
                      }}
                    >
                      {currencyOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    className="secondary-button"
                    type="button"
                    onMouseEnter={() => animateIcon(1, true)}
                    onMouseLeave={() => animateIcon(1, false)}
                    onFocus={() => animateIcon(1, true)}
                    onBlur={() => animateIcon(1, false)}
                  >
                    {renderAnimatedIcon(SaveIcon, 1)}
                    <span>Reset to Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="panel-card table-card" aria-label="Account settings">
              <div className="panel-header table-header" style={{ alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ marginBottom: '0.25rem' }}>Account</h2>
                  <p style={{ margin: 0, color: 'var(--color-neutral-700)', fontSize: 'var(--text-body-medium-size)' }}>
                    Personal profile information for your account.
                  </p>
                </div>
              </div>

              <div style={{ padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                      Full Name
                    </span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      style={{
                        minHeight: '2.5rem',
                        padding: '0.625rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-neutral-300)',
                        background: 'var(--surface-bg)',
                        color: 'var(--color-black)',
                        fontSize: 'var(--text-body-medium-size)',
                      }}
                    />
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                      Username
                    </span>
                    <input
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      style={{
                        minHeight: '2.5rem',
                        padding: '0.625rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-neutral-300)',
                        background: 'var(--surface-bg)',
                        color: 'var(--color-black)',
                        fontSize: 'var(--text-body-medium-size)',
                      }}
                    />
                  </label>
                </div>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                    Email Address
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    style={{
                      width: '100%',
                      minHeight: '2.5rem',
                      padding: '0.625rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-neutral-300)',
                      background: 'var(--surface-bg)',
                      color: 'var(--color-black)',
                      fontSize: 'var(--text-body-medium-size)',
                    }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                    Phone Number
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    style={{
                      width: '100%',
                      minHeight: '2.5rem',
                      padding: '0.625rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-neutral-300)',
                      background: 'var(--surface-bg)',
                      color: 'var(--color-black)',
                      fontSize: 'var(--text-body-medium-size)',
                    }}
                  />
                </label>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    className="secondary-button"
                    type="button"
                    onMouseEnter={() => animateIcon(2, true)}
                    onMouseLeave={() => animateIcon(2, false)}
                    onFocus={() => animateIcon(2, true)}
                    onBlur={() => animateIcon(2, false)}
                  >
                    {renderAnimatedIcon(UserPlusIcon, 2)}
                    <span>Verify Email</span>
                  </button>
                  <button
                    className="secondary-button"
                    type="button"
                    onMouseEnter={() => animateIcon(3, true)}
                    onMouseLeave={() => animateIcon(3, false)}
                    onFocus={() => animateIcon(3, true)}
                    onBlur={() => animateIcon(3, false)}
                  >
                    {renderAnimatedIcon(MailIcon, 3)}
                    <span>Resend Verification</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="panel-card table-card" aria-label="Notification settings">
              <div className="panel-header table-header" style={{ alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ marginBottom: '0.25rem' }}>Notifications</h2>
                  <p style={{ margin: 0, color: 'var(--color-neutral-700)', fontSize: 'var(--text-body-medium-size)' }}>
                    Choose how you receive alerts and updates.
                  </p>
                </div>
              </div>

              <div style={{ padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  {
                    label: 'Email Notifications',
                    description: 'Receive order and marketing updates by email.',
                    checked: emailNotifications,
                    onChange: () => setEmailNotifications(!emailNotifications),
                    icon: MailIcon,
                    index: 4,
                  },
                  {
                    label: 'Push Notifications',
                    description: 'Get real-time alerts on your devices.',
                    checked: pushNotifications,
                    onChange: () => setPushNotifications(!pushNotifications),
                    icon: BellIcon,
                    index: 5,
                  },
                  {
                    label: 'SMS Notifications',
                    description: 'Critical alerts sent to your phone.',
                    checked: smsNotifications,
                    onChange: () => setSmsNotifications(!smsNotifications),
                    icon: PhoneIcon,
                    index: 6,
                  },
                  {
                    label: 'Marketing Emails',
                    description: 'Promotional offers and product announcements.',
                    checked: marketingEmails,
                    onChange: () => setMarketingEmails(!marketingEmails),
                    icon: MegaphoneIcon,
                    index: 7,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <label
                      key={item.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        padding: '0.875rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-neutral-200)',
                        background: 'var(--surface-bg)',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={() => animateIcon(item.index, true)}
                      onMouseLeave={() => animateIcon(item.index, false)}
                      onFocus={() => animateIcon(item.index, true)}
                      onBlur={() => animateIcon(item.index, false)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span
                          style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-neutral-200)',
                            background: '#E7EEFE',
                            color: 'var(--color-neutral-700)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {renderAnimatedIcon(Icon, item.index)}
                        </span>
                        <div>
                          <span
                            style={{
                              color: 'var(--color-black)',
                              fontSize: 'var(--text-body-medium-size)',
                              fontWeight: 'var(--font-weight-medium)',
                              display: 'block',
                            }}
                          >
                            {item.label}
                          </span>
                          <span
                            style={{
                              color: 'var(--color-neutral-700)',
                              fontSize: 'var(--text-small-size)',
                              display: 'block',
                            }}
                          >
                            {item.description}
                          </span>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={item.onChange}
                        style={{
                          width: '1rem',
                          height: '1rem',
                          accentColor: 'var(--color-primary-500)',
                          cursor: 'pointer',
                        }}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="panel-card table-card" aria-label="Security settings">
              <div className="panel-header table-header" style={{ alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ marginBottom: '0.25rem' }}>Security</h2>
                  <p style={{ margin: 0, color: 'var(--color-neutral-700)', fontSize: 'var(--text-body-medium-size)' }}>
                    Protect your account with a strong password and two-factor authentication.
                  </p>
                </div>
              </div>

              <div style={{ padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-neutral-200)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-neutral-200)',
                        background: '#E7EEFE',
                        color: 'var(--color-neutral-700)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {renderAnimatedIcon(LockIcon, 8)}
                    </span>
                    <div>
                      <span
                        style={{
                          color: 'var(--color-black)',
                          fontSize: 'var(--text-body-medium-size)',
                          fontWeight: 'var(--font-weight-medium)',
                          display: 'block',
                        }}
                      >
                        Two-Factor Authentication
                      </span>
                      <span
                        style={{
                          color: 'var(--color-neutral-700)',
                          fontSize: 'var(--text-small-size)',
                          display: 'block',
                        }}
                      >
                        Add a second layer of protection to your account.
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    style={{
                      width: '1rem',
                      height: '1rem',
                      accentColor: 'var(--color-primary-500)',
                      cursor: 'pointer',
                    }}
                  />
                </div>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                    Current Password
                  </span>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    style={{
                      width: '100%',
                      minHeight: '2.5rem',
                      padding: '0.625rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-neutral-300)',
                      background: 'var(--surface-bg)',
                      color: 'var(--color-black)',
                      fontSize: 'var(--text-body-medium-size)',
                    }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                    New Password
                  </span>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    style={{
                      width: '100%',
                      minHeight: '2.5rem',
                      padding: '0.625rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-neutral-300)',
                      background: 'var(--surface-bg)',
                      color: 'var(--color-black)',
                      fontSize: 'var(--text-body-medium-size)',
                    }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                    Confirm New Password
                  </span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    style={{
                      width: '100%',
                      minHeight: '2.5rem',
                      padding: '0.625rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-neutral-300)',
                      background: 'var(--surface-bg)',
                      color: 'var(--color-black)',
                      fontSize: 'var(--text-body-medium-size)',
                    }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                    Session Timeout
                  </span>
                  <span style={{ color: 'var(--color-neutral-700)', fontSize: 'var(--text-small-size)' }}>
                    Automatically sign out after inactivity.
                  </span>
                  <select
                    value={sessionTimeout}
                    onChange={(event) => setSessionTimeout(event.target.value)}
                    style={{
                      width: '10rem',
                      minHeight: '2.5rem',
                      padding: '0.625rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-neutral-300)',
                      background: 'var(--surface-bg)',
                      color: 'var(--color-black)',
                      fontSize: 'var(--text-body-medium-size)',
                      cursor: 'pointer',
                      marginTop: '0.5rem',
                    }}
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="480">8 hours</option>
                  </select>
                </label>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    className="secondary-button"
                    type="button"
                    onMouseEnter={() => animateIcon(19, true)}
                    onMouseLeave={() => animateIcon(19, false)}
                    onFocus={() => animateIcon(19, true)}
                    onBlur={() => animateIcon(19, false)}
                  >
                    {renderAnimatedIcon(LockIcon, 19)}
                    <span>Change Password</span>
                  </button>
                  <button
                    className="secondary-button"
                    type="button"
                    onMouseEnter={() => animateIcon(10, true)}
                    onMouseLeave={() => animateIcon(10, false)}
                    onFocus={() => animateIcon(10, true)}
                    onBlur={() => animateIcon(10, false)}
                  >
                    {renderAnimatedIcon(LogOutIcon, 10)}
                    <span>Sign Out Everywhere</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="panel-card table-card" aria-label="Appearance settings">
              <div className="panel-header table-header" style={{ alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ marginBottom: '0.25rem' }}>Appearance</h2>
                  <p style={{ margin: 0, color: 'var(--color-neutral-700)', fontSize: 'var(--text-body-medium-size)' }}>
                    Customize the look and feel of your dashboard.
                  </p>
                </div>
              </div>

              <div style={{ padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                      Theme
                    </span>
                    <span style={{ color: 'var(--color-neutral-700)', fontSize: 'var(--text-small-size)' }}>
                      Light or dark interface.
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginTop: '0.5rem',
                        border: '1px solid var(--color-neutral-300)',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--surface-bg)',
                        padding: '0.25rem',
                      }}
                    >
                      {['light', 'dark'].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setTheme(value)}
                          style={{
                            flex: 1,
                            minHeight: '2.5rem',
                            border: 0,
                            borderRadius: 'var(--radius-sm)',
                            background: theme === value ? 'var(--color-primary-600)' : 'transparent',
                            color: theme === value ? '#ffffff' : 'var(--color-neutral-700)',
                            fontSize: 'var(--text-body-medium-size)',
                            fontWeight: 'var(--font-weight-medium)',
                            cursor: 'pointer',
                          }}
                        >
                          {value.charAt(0).toUpperCase() + value.slice(1)}
                        </button>
                      ))}
                    </div>
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                      Accent Color
                    </span>
                    <span style={{ color: 'var(--color-neutral-700)', fontSize: 'var(--text-small-size)' }}>
                      Used for buttons, links, and key UI elements.
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(event) => setAccentColor(event.target.value.toUpperCase())}
                        aria-label="Accent color picker"
                        style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          padding: 0,
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-neutral-200)',
                          background: accentColor,
                          cursor: 'pointer',
                        }}
                      />
                      <input
                        type="text"
                        value={accentColor}
                        onChange={(event) => setAccentColor(event.target.value)}
                        style={{
                          width: '8rem',
                          minHeight: '2.5rem',
                          padding: '0.625rem 0.75rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-neutral-300)',
                          background: 'var(--surface-bg)',
                          color: 'var(--color-black)',
                          fontSize: 'var(--text-body-medium-size)',
                          textTransform: 'uppercase',
                        }}
                      />
                    </div>
                  </label>
                </div>

                <div style={{ borderTop: '1px solid var(--color-neutral-200)' }} />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={sidebarCollapsed}
                      onChange={() => setSidebarCollapsed(!sidebarCollapsed)}
                      style={{
                        width: '1rem',
                        height: '1rem',
                        accentColor: 'var(--color-primary-500)',
                        cursor: 'pointer',
                      }}
                    />
                    <div>
                      <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                        Collapse Sidebar
                      </span>
                      <span style={{ color: 'var(--color-neutral-700)', fontSize: 'var(--text-small-size)', display: 'block' }}>
                        Hide sidebar labels on desktop.
                      </span>
                    </div>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={compactMode}
                      onChange={() => setCompactMode(!compactMode)}
                      style={{
                        width: '1rem',
                        height: '1rem',
                        accentColor: 'var(--color-primary-500)',
                        cursor: 'pointer',
                      }}
                    />
                    <div>
                      <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                        Compact Mode
                      </span>
                      <span style={{ color: 'var(--color-neutral-700)', fontSize: 'var(--text-small-size)', display: 'block' }}>
                        Reduce spacing throughout the dashboard.
                      </span>
                    </div>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    className="secondary-button"
                    type="button"
                    onMouseEnter={() => animateIcon(11, true)}
                    onMouseLeave={() => animateIcon(11, false)}
                    onFocus={() => animateIcon(11, true)}
                    onBlur={() => animateIcon(11, false)}
                  >
                    {renderAnimatedIcon(ImageIcon, 11)}
                    <span>Preview Theme</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="panel-card table-card" aria-label="Integrations settings">
              <div className="panel-header table-header" style={{ alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ marginBottom: '0.25rem' }}>Integrations</h2>
                  <p style={{ margin: 0, color: 'var(--color-neutral-700)', fontSize: 'var(--text-body-medium-size)' }}>
                    Connect external services to your store.
                  </p>
                </div>
              </div>

              <div style={{ padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-200)', background: 'var(--surface-bg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-neutral-200)',
                        background: '#E7EEFE',
                        color: 'var(--color-neutral-700)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {renderAnimatedIcon(CreditCardIcon, 12)}
                    </span>
                    <div>
                      <span
                        style={{
                          color: 'var(--color-black)',
                          fontSize: 'var(--text-body-medium-size)',
                          fontWeight: 'var(--font-weight-medium)',
                          display: 'block',
                        }}
                      >
                        Stripe Payments
                      </span>
                      <span
                        style={{
                          color: stripeConnected ? 'var(--color-success-500)' : 'var(--color-neutral-700)',
                          fontSize: 'var(--text-small-size)',
                          display: 'block',
                        }}
                      >
                        {stripeConnected ? 'Connected' : 'Not connected'}
                      </span>
                    </div>
                  </div>
                  <button
                    className={stripeConnected ? 'secondary-button' : 'primary-button'}
                    type="button"
                    onMouseEnter={() => animateIcon(13, true)}
                    onMouseLeave={() => animateIcon(13, false)}
                    onFocus={() => animateIcon(13, true)}
                    onBlur={() => animateIcon(13, false)}
                  >
                    {stripeConnected ? (
                      <>
                        {renderAnimatedIcon(ArrowRightIcon, 20)}
                        <span>Manage</span>
                      </>
                    ) : (
                      <>
                        {renderAnimatedIcon(PlugIcon, 13)}
                        <span>Connect</span>
                      </>
                    )}
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-200)', background: 'var(--surface-bg)', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-neutral-200)',
                        background: '#E7EEFE',
                        color: 'var(--color-neutral-700)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {renderAnimatedIcon(CloudIcon, 14)}
                    </span>
                    <div>
                      <span
                        style={{
                          color: 'var(--color-black)',
                          fontSize: 'var(--text-body-medium-size)',
                          fontWeight: 'var(--font-weight-medium)',
                          display: 'block',
                        }}
                      >
                        Auto Backups
                      </span>
                      <span style={{ color: 'var(--color-neutral-700)', fontSize: 'var(--text-small-size)', display: 'block' }}>
                        Daily backups of your store data.
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoBackup}
                    onChange={() => setAutoBackup(!autoBackup)}
                    style={{
                      width: '1rem',
                      height: '1rem',
                      accentColor: 'var(--color-primary-500)',
                      cursor: 'pointer',
                    }}
                  />
                </div>

                {autoBackup && (
                  <div style={{ marginLeft: '3.75rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                        Backup Frequency
                      </span>
                      <select
                        value={backupFrequency}
                        onChange={(event) => setBackupFrequency(event.target.value)}
                        style={{
                          width: '12rem',
                          minHeight: '2.5rem',
                          padding: '0.625rem 0.75rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-neutral-300)',
                          background: 'var(--surface-bg)',
                          color: 'var(--color-black)',
                          fontSize: 'var(--text-body-medium-size)',
                          cursor: 'pointer',
                        }}
                      >
                        {frequencyOptions.map((option) => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="panel-card table-card" aria-label="Billing settings">
              <div className="panel-header table-header" style={{ alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ marginBottom: '0.25rem' }}>Billing</h2>
                  <p style={{ margin: 0, color: 'var(--color-neutral-700)', fontSize: 'var(--text-body-medium-size)' }}>
                    Manage your subscription and payment method.
                  </p>
                </div>
              </div>

              <div style={{ padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem' }}>
                  <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-200)', background: 'var(--surface-bg)' }}>
                    <span style={{ color: 'var(--color-neutral-700)', fontSize: 'var(--text-small-size)', fontWeight: 'var(--font-weight-medium)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Plan
                    </span>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-h1-size)', fontWeight: 'var(--font-weight-bold)', marginTop: '0.25rem', display: 'block' }}>
                      {plan}
                    </span>
                  </div>

                  <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-200)', background: 'var(--surface-bg)' }}>
                    <span style={{ color: 'var(--color-neutral-700)', fontSize: 'var(--text-small-size)', fontWeight: 'var(--font-weight-medium)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Next Invoice
                    </span>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', marginTop: '0.25rem', display: 'block' }}>
                      {nextInvoice}
                    </span>
                  </div>

                  <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-200)', background: 'var(--surface-bg)' }}>
                    <span style={{ color: 'var(--color-neutral-700)', fontSize: 'var(--text-small-size)', fontWeight: 'var(--font-weight-medium)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Amount Due
                    </span>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-semibold)', marginTop: '0.25rem', display: 'block' }}>
                      {amountDue}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                      Plan
                    </span>
                    <select
                      value={plan}
                      onChange={(event) => setPlan(event.target.value)}
                      style={{
                        width: '100%',
                        minHeight: '2.5rem',
                        padding: '0.625rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-neutral-300)',
                        background: 'var(--surface-bg)',
                        color: 'var(--color-black)',
                        fontSize: 'var(--text-body-medium-size)',
                        cursor: 'pointer',
                      }}
                    >
                      {planOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    className="secondary-button"
                    type="button"
                    onMouseEnter={() => animateIcon(15, true)}
                    onMouseLeave={() => animateIcon(15, false)}
                    onFocus={() => animateIcon(15, true)}
                    onBlur={() => animateIcon(15, false)}
                  >
                    {renderAnimatedIcon(CreditCardIcon, 15)}
                    <span>Update Payment Method</span>
                  </button>
                  <button
                    className="secondary-button"
                    type="button"
                    onMouseEnter={() => animateIcon(16, true)}
                    onMouseLeave={() => animateIcon(16, false)}
                    onFocus={() => animateIcon(16, true)}
                    onBlur={() => animateIcon(16, false)}
                  >
                    {renderAnimatedIcon(ReceiptIcon, 16)}
                    <span>View Invoices</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'danger-zone' && (
            <div className="panel-card table-card" aria-label="Danger zone settings">
              <div className="panel-header table-header" style={{ alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ marginBottom: '0.25rem' }}>Danger Zone</h2>
                  <p style={{ margin: 0, color: 'var(--color-neutral-700)', fontSize: 'var(--text-body-medium-size)' }}>
                    Permanent actions. These cannot be undone.
                  </p>
                </div>
              </div>

              <div style={{ padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-200)', background: '#FDF2F2' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-error-500)',
                        background: '#FDF2F2',
                        color: 'var(--color-error-500)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {renderAnimatedIcon(Trash2Icon, 17)}
                    </span>
                    <div>
                      <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)', display: 'block' }}>
                        Delete Account
                      </span>
                      <span style={{ color: 'var(--color-error-500)', fontSize: 'var(--text-small-size)', display: 'block' }}>
                        Permanently delete your account and all store data.
                      </span>
                    </div>
                  </div>
                  <button
                    className="secondary-button"
                    type="button"
                    style={{
                      border: '1px solid var(--color-error-500)',
                      color: 'var(--color-error-500)',
                      marginTop: '1rem',
                    }}
                    onMouseEnter={() => animateIcon(18, true)}
                    onMouseLeave={() => animateIcon(18, false)}
                    onFocus={() => animateIcon(18, true)}
                    onBlur={() => animateIcon(18, false)}
                  >
                    {renderAnimatedIcon(Trash2Icon, 18)}
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Settings;
