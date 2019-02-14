import React from 'react';
import STYLES from './TableHeader.scss';
import BpkSmallPriceAlertIcon from 'bpk-component-icon/sm/price-alerts';
import BpkText from 'bpk-component-text';
import { withAlignment } from 'bpk-component-icon';
import { lineHeightBase, iconSizeSm } from 'bpk-tokens/tokens/base.es6';

const AlignedAlertIcon = withAlignment(
  BpkSmallPriceAlertIcon, lineHeightBase, iconSizeSm
);

const c = className => STYLES[className] || 'UNKNOWN';

const TableHeader = () => {
  return <div className={c('TableHeader__body')}>
    <span className={c('TableHeader__body-first-el')}>Filter</span>
    <span>Sort</span>
    <div className={c('TableHeader__body-last-el')}>
      <BpkText tagName="span">
        <AlignedAlertIcon fill="#008ca8"/>
        Price alerts
      </BpkText>
    </div>
  </div>
};

export default TableHeader;

