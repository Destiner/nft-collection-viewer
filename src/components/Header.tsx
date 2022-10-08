const Header = () => {
  return (
    <header>
      NFT Collection Viewer
      <style jsx>{`
        header {
          height: 48px;
          border-top: 4px solid var(--color-accent-primary);
          color: var(--color-text-primary);
          display: flex;
          align-items: center;
          padding: 0 32px;
          font-weight: 900;
          font-size: 20px;
        }
      `}</style>
    </header>
  );
};

export default Header;
