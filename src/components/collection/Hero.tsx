import { Etherscan, Gem, OpenSea } from '@/components/Logo';
import { getAddress, getDescription, getTitle } from '@/utils/collections';

type Platform = 'opensea' | 'gem' | 'etherscan';

interface NavIconProps {
  platform: Platform;
  id: string;
}

const NavIcon = ({ platform, id }: NavIconProps) => {
  const address = getAddress(id);
  const urlMap: Record<Platform, string> = {
    opensea: `https://opensea.io/collection/${id}`,
    gem: `https://www.gem.xyz/collection/${id}`,
    etherscan: `https://etherscan.io/address/${address}`,
  };
  return (
    <a
      href={urlMap[platform]}
      target="_blank"
      rel="noreferrer"
    >
      <div className="wrapper">
        <div className="icon">
          {platform === 'etherscan' && <Etherscan />}
          {platform === 'gem' && <Gem />}
          {platform === 'opensea' && <OpenSea />}
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-text-secondary);
          opacity: 0.4;
          border-radius: 50%;
          transition: all 0.25s ease-in;
        }

        .wrapper:hover {
          background: var(--color-accent-tertiary);
          opacity: 1;
        }

        .icon {
          display: flex;
          color: var(--color-background-primary);
        }
      `}</style>
    </a>
  );
};

interface Props {
  id: string;
}

const Hero = ({ id }: Props) => {
  const title = getTitle(id);
  const description = getDescription(id);

  return (
    <div className="hero">
      <img src={`/assets/collection/${id}.png`} />
      <div className="metadata">
        <div className="metadata-base">
          <div className="title">{title}</div>
          <div className="description">{description}</div>
        </div>
        <div className="metadata-links">
          <NavIcon
            platform="etherscan"
            id={id}
          />
          <NavIcon
            platform="opensea"
            id={id}
          />
          <NavIcon
            platform="gem"
            id={id}
          />
        </div>
      </div>

      <style jsx>{`
        .hero {
          display: flex;
          gap: 64px;
          padding: 24px 32px;
          background: var(--color-background-secondary);
        }

        img {
          height: 255px;
        }

        .metadata {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .metadata-base {
          display: flex;
          gap: 16px;
          flex-direction: column;
        }

        .title {
          font-weight: 700;
          font-size: 32px;
        }

        .description {
          font-weight: 400;
          font-size: 16px;
        }

        .metadata-links {
          display: flex;
          gap: 16px;
        }
      `}</style>
    </div>
  );
};

export default Hero;
