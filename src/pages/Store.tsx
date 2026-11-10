import { useMemo, useRef, useState } from 'react';
import type { ChangeEvent, ForwardRefExoticComponent, RefAttributes } from 'react';
import {
  ExternalLinkIcon,
  FileImageIcon,
  LinkIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  Trash2Icon,
  UploadIcon,
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

type StoreTab = 'profile' | 'branding' | 'contact';

const tabs: { id: StoreTab; label: string }[] = [
  { id: 'profile', label: 'Store Profile' },
  { id: 'branding', label: 'Branding' },
  { id: 'contact', label: 'Contact Information' },
];

function Store() {
  const [activeTab, setActiveTab] = useState<StoreTab>('profile');
  const [storeName, setStoreName] = useState('Market Plus Official');
  const [storeUrl, setStoreUrl] = useState('marketplus.shop');
  const [description, setDescription] = useState(
    'Your one-stop shop for premium goods and services. We pride ourselves on quality and customer satisfaction.',
  );
  const [primaryColor, setPrimaryColor] = useState('#004AC6');
  const [supportEmail, setSupportEmail] = useState('support@marketplus.shop');
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 123-4567');
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    twitter: '',
  });
  const iconRefs = useRef<Array<AnimateIconHandle | null>>([]);

  const descriptionCount = useMemo(() => description.length, [description]);

  const animateIcon = (index: number, active: boolean) => {
    const icon = iconRefs.current[index];
    if (!icon) return;
    if (active) {
      icon.startAnimation();
      return;
    }
    icon.stopAnimation();
  };

  const handleSocialChange = (key: 'instagram' | 'twitter') => (event: ChangeEvent<HTMLInputElement>) => {
    setSocialLinks((prev) => ({ ...prev, [key]: event.target.value }));
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

  return (
    <>
      <section className="page-header">
        <div>
          <h1>Store Settings</h1>
          <p>Manage your store&apos;s public profile and branding.</p>
        </div>
        <div className="toolbar">
          <button
            className="secondary-button"
            type="button"
            onMouseEnter={() => animateIcon(0, true)}
            onMouseLeave={() => animateIcon(0, false)}
            onFocus={() => animateIcon(0, true)}
            onBlur={() => animateIcon(0, false)}
          >
            <span>View Store</span>
            {renderAnimatedIcon(ExternalLinkIcon, 0, 16)}
          </button>
        </div>
      </section>

      <section
        aria-label="Store settings"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 280px) minmax(0, 1fr)',
          gap: '1.5rem',
          alignItems: 'start',
        }}
      >
        <nav aria-label="Store settings tabs" className="panel-card" style={{ padding: '0.75rem' }}>
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
          {activeTab === 'profile' ? (
            <div className="panel-card table-card" aria-label="Store profile">
              <div className="panel-header table-header" style={{ alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ marginBottom: '0.25rem' }}>Store Profile</h2>
                  <p style={{ margin: 0, color: 'var(--color-neutral-700)', fontSize: 'var(--text-body-medium-size)' }}>
                    Basic information visible to your customers.
                  </p>
                </div>
              </div>

              <div style={{ padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      width: '6rem',
                      height: '6rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-neutral-200)',
                      background: '#E7EEFE',
                      overflow: 'hidden',
                      flexShrink: 0,
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <img
                      src="/store-logo0.png"
                      alt="Store logo"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: '1 1 18rem' }}>
                    <div style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                      Store Logo
                    </div>
                    <div style={{ color: 'var(--color-neutral-700)', fontSize: 'var(--text-small-size)' }}>
                      Recommended size: 400x400px (JPG, PNG, SVG).
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.25rem', flexWrap: 'wrap' }}>
                      <button
                        className="secondary-button"
                        type="button"
                        onMouseEnter={() => animateIcon(1, true)}
                        onMouseLeave={() => animateIcon(1, false)}
                        onFocus={() => animateIcon(1, true)}
                        onBlur={() => animateIcon(1, false)}
                      >
                        {renderAnimatedIcon(UploadIcon, 1)}
                        <span>Change</span>
                      </button>
                      <button
                        type="button"
                        style={{
                          minHeight: '2.5rem',
                          padding: '0.625rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid transparent',
                          background: 'transparent',
                          color: 'var(--color-error-500)',
                          fontSize: 'var(--text-body-medium-size)',
                          fontWeight: 'var(--font-weight-medium)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                        onMouseEnter={() => animateIcon(2, true)}
                        onMouseLeave={() => animateIcon(2, false)}
                        onFocus={() => animateIcon(2, true)}
                        onBlur={() => animateIcon(2, false)}
                      >
                        {renderAnimatedIcon(Trash2Icon, 2)}
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                      Store URL
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'stretch',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        border: '1px solid var(--color-neutral-300)',
                        background: 'var(--surface-bg)',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '0 0.75rem',
                          background: '#F9FAFB',
                          color: 'var(--color-neutral-700)',
                          fontSize: 'var(--text-body-medium-size)',
                          fontWeight: 'var(--font-weight-medium)',
                          borderRight: '1px solid var(--color-neutral-300)',
                        }}
                      >
                        https://
                      </span>
                      <input
                        type="text"
                        value={storeUrl}
                        onChange={(event) => setStoreUrl(event.target.value)}
                        style={{
                          flex: 1,
                          minWidth: 0,
                          minHeight: '2.5rem',
                          padding: '0.625rem 0.75rem',
                          border: 0,
                          background: 'transparent',
                          color: 'var(--color-black)',
                          fontSize: 'var(--text-body-medium-size)',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                      Description
                    </span>
                    <textarea
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      rows={4}
                      maxLength={500}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-neutral-300)',
                        background: 'var(--surface-bg)',
                        color: 'var(--color-black)',
                        fontSize: 'var(--text-body-medium-size)',
                        lineHeight: '1.25rem',
                        resize: 'vertical',
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', color: 'var(--color-neutral-700)', fontSize: 'var(--text-small-size)' }}>
                      {descriptionCount}/500 characters
                    </div>
                  </label>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === 'branding' ? (
            <div className="panel-card table-card" aria-label="Branding">
              <div className="panel-header table-header" style={{ alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ marginBottom: '0.25rem' }}>Branding</h2>
                  <p style={{ margin: 0, color: 'var(--color-neutral-700)', fontSize: 'var(--text-body-medium-size)' }}>
                    Customize the look and feel of your storefront.
                  </p>
                </div>
              </div>
              <div style={{ padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                    Primary Color
                  </span>
                  <span style={{ color: 'var(--color-neutral-700)', fontSize: 'var(--text-small-size)' }}>
                    Used for buttons, links, and key UI elements.
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '0.75rem', flexWrap: 'wrap' }}>
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(event) => setPrimaryColor(event.target.value.toUpperCase())}
                      aria-label="Primary color picker"
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        padding: 0,
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-neutral-200)',
                        background: primaryColor,
                        cursor: 'pointer',
                      }}
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(event) => setPrimaryColor(event.target.value)}
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
                </div>

                <div style={{ borderTop: '1px solid var(--color-neutral-200)' }} />

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-neutral-200)',
                      background: '#E7EEFE',
                      color: 'var(--color-neutral-700)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                    onMouseEnter={() => animateIcon(3, true)}
                    onMouseLeave={() => animateIcon(3, false)}
                    onFocus={() => animateIcon(3, true)}
                    onBlur={() => animateIcon(3, false)}
                    tabIndex={0}
                  >
                    {renderAnimatedIcon(FileImageIcon, 3, 20)}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: '1 1 16rem' }}>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                      Favicon
                    </span>
                    <span style={{ color: 'var(--color-neutral-700)', fontSize: 'var(--text-small-size)' }}>
                      16x16px or 32x32px .ico or .png file.
                    </span>
                    <div style={{ paddingTop: '0.25rem' }}>
                      <button
                        className="secondary-button"
                        type="button"
                        onMouseEnter={() => animateIcon(4, true)}
                        onMouseLeave={() => animateIcon(4, false)}
                        onFocus={() => animateIcon(4, true)}
                        onBlur={() => animateIcon(4, false)}
                      >
                        {renderAnimatedIcon(UploadIcon, 4)}
                        <span>Upload Favicon</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === 'contact' ? (
            <div className="panel-card table-card" aria-label="Contact information">
              <div className="panel-header table-header" style={{ alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ marginBottom: '0.25rem' }}>Contact Information</h2>
                  <p style={{ margin: 0, color: 'var(--color-neutral-700)', fontSize: 'var(--text-body-medium-size)' }}>
                    How customers can reach your support team.
                  </p>
                </div>
              </div>
              <div style={{ padding: 'var(--card-padding)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                      Support Email
                    </span>
                    <span style={{ position: 'relative', display: 'block' }}>
                      <span
                        style={{
                          position: 'absolute',
                          left: '0.75rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--color-neutral-700)',
                          display: 'inline-flex',
                        }}
                      >
                        {renderAnimatedIcon(MailIcon, 5)}
                      </span>
                      <input
                        type="email"
                        value={supportEmail}
                        onChange={(event) => setSupportEmail(event.target.value)}
                        style={{
                          width: '100%',
                          minHeight: '2.5rem',
                          padding: '0.625rem 0.75rem 0.625rem 2.5rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-neutral-300)',
                          background: 'var(--surface-bg)',
                          color: 'var(--color-black)',
                          fontSize: 'var(--text-body-medium-size)',
                        }}
                      />
                    </span>
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                      Phone Number
                    </span>
                    <span style={{ position: 'relative', display: 'block' }}>
                      <span
                        style={{
                          position: 'absolute',
                          left: '0.75rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--color-neutral-700)',
                          display: 'inline-flex',
                        }}
                      >
                        {renderAnimatedIcon(PhoneIcon, 6)}
                      </span>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        style={{
                          width: '100%',
                          minHeight: '2.5rem',
                          padding: '0.625rem 0.75rem 0.625rem 2.5rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-neutral-300)',
                          background: 'var(--surface-bg)',
                          color: 'var(--color-black)',
                          fontSize: 'var(--text-body-medium-size)',
                        }}
                      />
                    </span>
                  </label>
                </div>

                <div style={{ paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--color-black)', fontSize: 'var(--text-body-medium-size)', fontWeight: 'var(--font-weight-medium)' }}>
                    Social Links
                  </span>
                  {([
                    { key: 'instagram' as const, placeholder: 'Instagram URL', iconIndex: 7 },
                    { key: 'twitter' as const, placeholder: 'Twitter URL', iconIndex: 8 },
                  ]).map((item) => (
                    <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                        {renderAnimatedIcon(LinkIcon, item.iconIndex)}
                      </span>
                      <input
                        type="url"
                        placeholder={item.placeholder}
                        value={socialLinks[item.key]}
                        onChange={handleSocialChange(item.key)}
                        style={{
                          flex: 1,
                          minWidth: 0,
                          minHeight: '2.5rem',
                          padding: '0.625rem 0.75rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-neutral-300)',
                          background: 'var(--surface-bg)',
                          color: 'var(--color-black)',
                          fontSize: 'var(--text-body-medium-size)',
                        }}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-button"
                    style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', paddingTop: '0.25rem' }}
                    onMouseEnter={() => animateIcon(9, true)}
                    onMouseLeave={() => animateIcon(9, false)}
                    onFocus={() => animateIcon(9, true)}
                    onBlur={() => animateIcon(9, false)}
                  >
                    {renderAnimatedIcon(PlusIcon, 9)}
                    <span>Add another link</span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '1rem',
              borderTop: '1px solid var(--color-neutral-200)',
              paddingTop: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <button className="secondary-button" type="button">
              Discard Changes
            </button>
            <button className="primary-button" type="button">
              Save Changes
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Store;
