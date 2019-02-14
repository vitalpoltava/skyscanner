import React from 'react';
import BpkSmallMenuIcon from 'bpk-component-icon/sm/menu';
import { withAlignment } from 'bpk-component-icon';
import { lineHeightBase, iconSizeSm } from 'bpk-tokens/tokens/base.es6';

const AlignedMenuIcon = withAlignment(
  BpkSmallMenuIcon, lineHeightBase, iconSizeSm
);

import logo from './logo.svg';
import STYLES from './Header.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const Header = () => (
  <header className={c('Header')}>
    <a href="/">
      <span className={c('Header__hidden-text')}>Skyscanner</span>
      <img className={c('Header__logo-image')} alt="Skyscanner" src={logo} />
    </a>
    <div><AlignedMenuIcon fill="#008ca8"/></div>
  </header>
);

export default Header;
