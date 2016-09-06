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

var SimpleMultiline = function (_React$Component) {
  _inherits(SimpleMultiline, _React$Component);

  function SimpleMultiline(props) {
    _classCallCheck(this, SimpleMultiline);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleMultiline).call(this, props));

    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(SimpleMultiline, [{
    key: 'onChange',
    value: function onChange(event) {
      _nocmsEvents2.default.trigger('nocms.value-changed', this.props.scope, event.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var center = _props.center;
      var placeholder = _props.placeholder;
      var text = _props.text;

      var centerTextInput = center ? 'nocms__text-input nocms__text-input--center' : 'nocms__text-input';
      return _react2.default.createElement('textarea', { className: centerTextInput, placeholder: placeholder, type: 'text', value: text, onChange: this.onChange });
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