import React from 'react';
import PropTypes from 'prop-types';
import events from 'nocms-events';

const DEFAULT_HEIGHT = 70;
const textareaClass = 'nocms__text-input nocms__textarea';
const centerClass = 'nocms__text-input--center';
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
    if (this.props.autoresize) {
      this.mounted = true;
      this.setFilledTextareaHeight();
    }
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
    const centerTextInput = center ? `${textareaClass} ${centerClass}` : textareaClass;

    return (
      <textarea
        className={centerTextInput}
        name="textarea"
        value={text}
        placeholder={placeholder}
        style={{
          height,
          resize: isOneLine ? 'none' : null,
        }}
        onChange={this.onChange}
        onKeyUp={this.setFilledTextareaHeight}
      />
    );
  }

  /* eslint no-return-assign: off */
  getGhostField() {
    return (
      <div
        className="nocms__text-input nocms__textarea nocms__textarea--ghost"
        ref={(c) => { return this.ghost = c; }}
        aria-hidden="true"
      >
        {this.props.text}
      </div>
    );
  }

  render() {
    const { center, text, placeholder, autoresize } = this.props;
    const className = center ? `${textareaClass} ${centerClass}` : textareaClass;
    return (
      <div>
        {autoresize ?
          <div className="textarea-wrapper">
            {this.getExpandableField()}
            {this.getGhostField()}
          </div>
          : <textarea
            className={className}
            value={text}
            placeholder={placeholder}
            onChange={this.onChange}
          />
        }
      </div>
    );
  }
}

SimpleMultiline.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  scope: PropTypes.string,
  center: PropTypes.bool,
  autoresize: PropTypes.bool,
};

SimpleMultiline.defaultProps = {
  text: '',
  placeholder: 'Add text...',
  center: false,
  autoresize: true,
};

export default SimpleMultiline;
