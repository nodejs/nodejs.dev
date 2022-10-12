import React, { useRef } from 'react';
import TranslateIcon from '@mui/icons-material/Translate';
import { useAutoClosableDropdown } from '../../../hooks/useAutoClosableDropdown';
import { useLocaleAsDropdown } from '../../../hooks/useLocaleAsDropdown';
import styles from './index.module.scss';

const LanguageSelector = () => {
  const languageButtonRef = useRef<HTMLButtonElement>(null);

  const localeDropdownItems = useLocaleAsDropdown();

  const { renderDropdown, showDropdown, visible } = useAutoClosableDropdown(
    localeDropdownItems,
    languageButtonRef
  );

  return (
    <>
      <button
        type="button"
        className={styles.languageSwitch}
        ref={languageButtonRef}
        onClick={() => showDropdown(!visible)}
      >
        <span className="sr-only">Switch Language</span>
        <TranslateIcon />
      </button>
      {renderDropdown}
    </>
  );
};

export default LanguageSelector;
