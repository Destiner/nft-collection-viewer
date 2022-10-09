import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

interface Props {
  page: number;
  maxPage?: number;
  onPageUpdate: (newPage: number) => void;
}

const NavBar = ({ page, maxPage, onPageUpdate }: Props) => {
  return (
    <div className="bar">
      <div className="paginator">
        <div
          data-testid="page-left"
          className={`page-button ${page === 1 ? 'disabled' : ''}`}
          onClick={() => onPageUpdate(page - 1)}
        >
          <FiArrowLeft />
        </div>
        <span
          data-testid="page-label"
          className="page-label"
        >
          {page}
        </span>
        <div
          data-testid="page-right"
          className={`page-button ${page === maxPage ? 'disabled' : ''}`}
          onClick={() => onPageUpdate(page + 1)}
        >
          <FiArrowRight />
        </div>
      </div>

      <style jsx>{`
        .bar {
          padding: 20px 32px;
        }

        .paginator {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .page-button {
          display: flex;
          opacity: 0.4;
          cursor: pointer;
        }

        .page-button:hover {
          opacity: 1;
        }

        .page-button.disabled {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default NavBar;
