import { SearchIcon } from '@animateicons/react/lucide';

type TableToolbarProps = {
  searchPlaceholder: string;
  children?: React.ReactNode;
};

function TableToolbar({ searchPlaceholder, children }: TableToolbarProps) {
  return (
    <section className="table-toolbar">
      <div className="search-field" role="search">
        <SearchIcon size={18} />
        <input placeholder={searchPlaceholder} type="text" />
      </div>

      <div className="table-actions">
        {children}
      </div>
    </section>
  );
}

export default TableToolbar;
