import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

interface Props {
  page: number;
  onPageUpdate: (newPage: number) => void;
}

const NavBar = ({ page, onPageUpdate }: Props) => {
  return (
    <div className="bar">
      <div className="paginator">
        <div
          className="page-button"
          onClick={() => onPageUpdate(page - 1)}
        >
          <FiArrowLeft />
        </div>
        <span className="page-label">{page}</span>
        <div
          className="page-button"
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
      `}</style>
    </div>
  );
};

export default NavBar;
