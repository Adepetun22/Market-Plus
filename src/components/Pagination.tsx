type PaginationProps = {
  currentPage: number;
  pageSize: number;
  totalEntries: number;
  onPrev: () => void;
  onNext: () => void;
};

function Pagination({ currentPage, pageSize, totalEntries, onPrev, onNext }: PaginationProps) {
  const start = totalEntries === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalEntries);
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = end >= totalEntries;

  return (
    <div className="pagination-bar">
      <span className="pagination-info">
        Showing {start} to {end} of {totalEntries.toLocaleString()} entries
      </span>
      <div className="pagination-actions">
        <button className="pagination-button" type="button" disabled={isPrevDisabled} onClick={onPrev}>
          Prev
        </button>
        <button className="pagination-button" type="button" disabled={isNextDisabled} onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
