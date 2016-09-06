import React, { PropTypes } from 'react';
import events from 'nocms-events';

class SimpleMultiline extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    events.trigger('nocms.value-changed', this.props.scope, event.target.value);
  }

  render() {
    const {
      center,
      placeholder,
      text,
    } = this.props;
    const centerTextInput = center ? 'nocms__text-input nocms__text-input--center' : 'nocms__text-input';
    return (
      <textarea className={centerTextInput} placeholder={placeholder} type="text" value={text} onChange={this.onChange} />
    );
  }
}

SimpleMultiline.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  scope: PropTypes.string,
  center: PropTypes.bool,
};

SimpleMultiline.defaultProps = {
  text: '',
  placeholder: 'Add text...',
  center: false,
};

export default SimpleMultiline;
