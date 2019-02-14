import React from 'react';
import BpkText from 'bpk-component-text';
import { BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import { withAlignment } from 'bpk-component-icon';
import { lineHeightBase, iconSizeSm } from 'bpk-tokens/tokens/base.es6';

const AlignedSpinner = withAlignment(
  BpkSpinner, lineHeightBase, iconSizeSm
);

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.isLoading === true ?
        <div>
          <BpkText tagName="span">
            <AlignedSpinner type={SPINNER_TYPES.primary}/>&nbsp;
            Loading flights...
          </BpkText>
        </div> : null
    );
  }
}

export default Loading;

