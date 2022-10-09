import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <Link href={{ pathname: '/' }}>
        <span className="brand">NFT Collection Viewer</span>
      </Link>
      <style jsx>{`
        header {
          height: 48px;
          border-top: 4px solid var(--color-accent-primary);
          display: flex;
          align-items: center;
          padding: 0 16px;
          font-weight: 900;
          font-size: 20px;
        }

        @media (min-width: 768px) {
          header {
            padding: 0 32px;
          }
        }

        .brand {
          color: var(--color-text-primary);
          cursor: pointer;
        }
      `}</style>
    </header>
  );
};

export default Header;
