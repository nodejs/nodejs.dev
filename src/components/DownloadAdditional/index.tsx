import React, { useState, FC } from 'react';
import DownloadToggle from '../DownloadToggle';
import { ReleaseData } from '../../hooks/useReleaseHistory';
import './DownloadAdditional.scss';

const CLASS_NAME = 'download-additional';

type Item = {
  name: string;
  link?: string;
  link32?: string;
  link64?: string;
};

const getDownloadableItemsList = (fileName: string): Item[] => {
  const versionPrefix = `latest-${fileName.split('.')[0]}.x`;
  return [
    {
      name: 'Windows Installer (.msi)',
      link32: `https://nodejs.org/dist/${versionPrefix}/node-${fileName}-x86.msi`,
      link64: `https://nodejs.org/dist/${versionPrefix}/node-${fileName}-x64.msi`,
    },
    {
      name: 'Windows Binary (.zip)',
      link32: `https://nodejs.org/dist/${versionPrefix}/node-${fileName}-win-x86.zip`,
      link64: `https://nodejs.org/dist/${versionPrefix}/node-${fileName}-win-x64.zip`,
    },
    {
      name: 'macOS Installer (.pkg)',
      link: `https://nodejs.org/dist/${versionPrefix}/node-${fileName}.pkg`,
    },
  ];
};

interface DownloadAdditionalProps {
  line?: ReleaseData;
  selectedTypeRelease: string;
  handleTypeReleaseToggle: (selected: React.SetStateAction<string>) => void;
}

interface DownloadableItemProps {
  item: Item;
  isExapanded: boolean;
  setExapandedItem: (itemName: string) => void;
}

interface DownloadButtonProps {
  className: string;
  link: string;
  label: string;
}

const DownloadButton: FC<DownloadButtonProps> = ({
  className,
  link,
  label,
}: DownloadButtonProps) => (
  <a className={className} href={link}>
    <i className="material-icons">get_app</i>
    {label}
  </a>
);

const DownloadableItem: FC<DownloadableItemProps> = ({
  item,
  isExapanded,
  setExapandedItem,
}: DownloadableItemProps) => {
  const onClick = (): void =>
    isExapanded ? setExapandedItem('') : setExapandedItem(item.name);
  const classes = `${CLASS_NAME}__item`.concat(
    isExapanded ? ` ${CLASS_NAME}__item__expanded` : ''
  );
  return (
    <div
      role="button"
      tabIndex={0}
      className={classes}
      onKeyUp={onClick}
      onClick={onClick}
    >
      <div className={`${CLASS_NAME}__item__header`}>
        <div className={`${CLASS_NAME}__item__header__arrow`}>
          {isExapanded ? (
            <div className={`${CLASS_NAME}__item__header__arrow__down`} />
          ) : (
            <div className={`${CLASS_NAME}__item__header__arrow__right`} />
          )}
        </div>
        {item.name}
      </div>

      {isExapanded && (
        <div className={`${CLASS_NAME}__item__body`}>
          {item.link && (
            <DownloadButton
              className={`${CLASS_NAME}__item__body__link`}
              link={item.link}
              label="download"
            />
          )}
          {item.link32 && (
            <DownloadButton
              className={`${CLASS_NAME}__item__body__link`}
              link={item.link32}
              label="32-bit"
            />
          )}
          {item.link64 && (
            <DownloadButton
              className={`${CLASS_NAME}__item__body__link`}
              link={item.link64}
              label="64-bit"
            />
          )}
        </div>
      )}
    </div>
  );
};

const DownloadAdditional: FC<DownloadAdditionalProps> = ({
  line,
  selectedTypeRelease,
  handleTypeReleaseToggle,
}: DownloadAdditionalProps): JSX.Element => {
  const [expandedItem, setExapandedItem] = useState('');
  return (
    <div className={CLASS_NAME}>
      <div className={`${CLASS_NAME}__header`}>
        <h3 className={`${CLASS_NAME}__title`}>Additional Downloads</h3>
        <DownloadToggle
          selected={selectedTypeRelease}
          handleClick={handleTypeReleaseToggle}
          showDescription={false}
        />
      </div>
      <div className={`${CLASS_NAME}__body`}>
        {line &&
          getDownloadableItemsList(line?.version).map(item => (
            <DownloadableItem
              key={item.name}
              item={item}
              isExapanded={expandedItem === item.name}
              setExapandedItem={setExapandedItem}
            />
          ))}
      </div>
    </div>
  );
};

export default DownloadAdditional;
