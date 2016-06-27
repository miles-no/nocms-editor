import React from 'react';
import events from 'nocms-events';

class Simple extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    events.trigger('nocms.value-changed', this.props.scope, event.target.value);
  }
  render() {
    const {
      placeholder,
      text,
      type,
    } = this.props;
    return <input placeholder={placeholder} value={text} onChange={this.onChange} />;
  }
}

Simple.propTypes = {
  text: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  scope: React.PropTypes.string,
};

Simple.defaultProps = {
  text: '',
  placeholder: 'Add text...',
};

export default Simple;
