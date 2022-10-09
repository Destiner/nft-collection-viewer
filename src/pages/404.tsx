import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="page">
      <h1>404</h1>
      <Link href={{ pathname: '/' }}>
        <button>Home page</button>
      </Link>

      <style jsx>{`
        .page {
          min-height: 600px;
          display: flex;
          gap: 16px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        h1 {
          margin: 0;
          font-weight: 700;
          font-size: 144px;
        }

        button {
          cursor: pointer;
          background: var(--color-accent-primary);
          color: var(--color-background-primary);
          border: none;
          font-size: 12px;
          padding: 8px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default Custom404;
