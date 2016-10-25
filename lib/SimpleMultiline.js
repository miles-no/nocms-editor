'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nocmsEvents = require('nocms-events');

var _nocmsEvents2 = _interopRequireDefault(_nocmsEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_HEIGHT = 50;
// Based on the work of http://dev.edenspiekermann.com/2016/08/26/react-textarea-auto-resize/

var SimpleMultiline = function (_React$Component) {
  _inherits(SimpleMultiline, _React$Component);

  function SimpleMultiline(props) {
    _classCallCheck(this, SimpleMultiline);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleMultiline).call(this, props));

    _this.onChange = _this.onChange.bind(_this);
    _this.state = {
      height: DEFAULT_HEIGHT
    };
    _this.setFilledTextareaHeight = _this.setFilledTextareaHeight.bind(_this);
    return _this;
  }

  _createClass(SimpleMultiline, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mounted = true;
      this.setFilledTextareaHeight();
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      _nocmsEvents2.default.trigger('nocms.value-changed', this.props.scope, event.target.value);
    }
  }, {
    key: 'setFilledTextareaHeight',
    value: function setFilledTextareaHeight() {
      if (this.mounted) {
        var element = this.ghost;

        this.setState({
          height: element.clientHeight
        });
      }
    }
  }, {
    key: 'getExpandableField',
    value: function getExpandableField() {
      var isOneLine = this.state.height <= DEFAULT_HEIGHT;
      var height = this.state.height;
      var _props = this.props;
      var center = _props.center;
      var placeholder = _props.placeholder;
      var text = _props.text;

      var centerTextInput = center ? 'nocms__text-input nocms__textarea nocms__text-input--center' : 'nocms__text-input nocms__textarea';

      return _react2.default.createElement('textarea', {
        className: centerTextInput,
        name: 'textarea',
        value: text,
        placeholder: placeholder,
        style: {
          height: height,
          resize: isOneLine ? 'none' : null
        },
        onChange: this.onChange,
        onKeyUp: this.setFilledTextareaHeight
      });
    }
  }, {
    key: 'getGhostField',
    value: function getGhostField() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          className: 'nocms__text-input nocms__textarea nocms__textarea--ghost',
          ref: function ref(c) {
            return _this2.ghost = c;
          },
          'aria-hidden': 'true'
        },
        this.props.text
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'textarea-wrapper' },
        this.getExpandableField(),
        this.getGhostField()
      );
    }
  }]);

  return SimpleMultiline;
}(_react2.default.Component);

SimpleMultiline.propTypes = {
  text: _react.PropTypes.string,
  placeholder: _react.PropTypes.string,
  scope: _react.PropTypes.string,
  center: _react.PropTypes.bool
};

SimpleMultiline.defaultProps = {
  text: '',
  placeholder: 'Add text...',
  center: false
};

exports.default = SimpleMultiline;
module.exports = exports['default'];
//# sourceMappingURL=SimpleMultiline.js.map