import React, { PropTypes } from 'react';
import events from 'nocms-events';

const DEFAULT_HEIGHT = 50;
// Based on the work of http://dev.edenspiekermann.com/2016/08/26/react-textarea-auto-resize/
class SimpleMultiline extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      height: DEFAULT_HEIGHT,
    };
    this.setFilledTextareaHeight = this.setFilledTextareaHeight.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.setFilledTextareaHeight();
  }

  onChange(event) {
    events.trigger('nocms.value-changed', this.props.scope, event.target.value);
  }

  setFilledTextareaHeight() {
    if (this.mounted) {
      const element = this.ghost;

      this.setState({
        height: element.clientHeight,
      });
    }
  }

  getExpandableField() {
    const isOneLine = this.state.height <= DEFAULT_HEIGHT;
    const { height } = this.state;
    const { center, placeholder, text } = this.props;
    const centerTextInput = center ? 'nocms__text-input nocms__textarea nocms__text-input--center' : 'nocms__text-input nocms__textarea';

    return (
      <textarea
        className={centerTextInput}
        name="textarea"
        value={text}
        placeholder={placeholder}
        style={{
          height,
          resize: isOneLine ? 'none' : null
        }}
        onChange={this.onChange}
        onKeyUp={this.setFilledTextareaHeight}
      />
    );
  }

  getGhostField() {
    return (
      <div
        className="nocms__text-input nocms__textarea nocms__textarea--ghost"
        ref={(c) => this.ghost = c}
        aria-hidden="true"
      >
        {this.props.text}
      </div>
    );
  }

  render() {
    return (
      <div className="textarea-wrapper">
        {this.getExpandableField()}
        {this.getGhostField()}
      </div>
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
