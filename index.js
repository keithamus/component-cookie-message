/* global window document */
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _economistComponentIcon = require('@economist/component-icon');

var _economistComponentIcon2 = _interopRequireDefault(_economistComponentIcon);

var CookieMessage = (function (_React$Component) {
  _inherits(CookieMessage, _React$Component);

  function CookieMessage() {
    _classCallCheck(this, CookieMessage);

    _React$Component.apply(this, arguments);
  }

  CookieMessage.prototype.componentWillMount = function componentWillMount() {
    if (typeof window === 'undefined') {
      this.setState({ isCookieMessageRequired: false });
      return false;
    }
    var cookie = this.props.reactCookieInstance;
    var isCookieMessageRequired = !cookie.load(this.props.cookieName);
    this.setState({ isCookieMessageRequired: isCookieMessageRequired });
    if (isCookieMessageRequired) {
      var isHttps = window.location.protocol === 'https:';
      var cookieOptions = {
        expires: new Date('01-01-2040'),
        secure: isHttps,
        httpOnly: false,
        path: '/'
      };
      cookie.save(this.props.cookieName, '1', cookieOptions);
    }
  };

  CookieMessage.prototype.componentDidMount = function componentDidMount() {
    if (typeof window !== 'undefined' && window.document) {
      var trusteScript = document.createElement('script');
      trusteScript.async = true;
      trusteScript.type = 'text/javascript';
      trusteScript.src = '//consent.truste.com/notice?domain=economist.com&c=teconsent-preferences&text=true';
      document.head.appendChild(trusteScript);
    }
  };

  CookieMessage.prototype.onCloseClick = function onCloseClick() {
    this.setState({ isCookieMessageRequired: false });
  };

  CookieMessage.prototype.render = function render() {
    var _this = this;

    if (!this.state.isCookieMessageRequired) {
      return false;
    }

    var policyLink = _react2['default'].createElement(
      'a',
      { href: '//www.economist.com/cookies-info',
        className: 'cookie-message--link cookie-message--link__policy'
      },
      'cookies policy'
    );
    var preferencesLink = _react2['default'].createElement(
      'span',
      { id: 'teconsent-preferences',
        className: 'cookie-message--link__preferences cookie-message--link'
      },
      _react2['default'].createElement(
        'a',
        { href: '//www.economist.com/cookies-info',
          className: 'cookie-message--link cookie-message__link--temporary-cookie-preferences'
        },
        'cookies preferences'
      )
    );
    return _react2['default'].createElement(
      'div',
      { className: 'cookie-message' },
      _react2['default'].createElement(
        'div',
        { className: 'cookie-message--message-container' },
        _react2['default'].createElement(
          'span',
          { onClick: function () {
              return _this.onCloseClick();
            },
            className: 'cookie-message--close-wrapper',
            tabIndex: 0
          },
          _react2['default'].createElement(_economistComponentIcon2['default'], { icon: 'close', className: 'cookie-message--close' })
        ),
        'By continuing to browse this site you are agreeing to our use of cookies. Review our ',
        policyLink,
        ' for details or change your ',
        preferencesLink,
        '.'
      )
    );
  };

  _createClass(CookieMessage, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        cookieName: _react2['default'].PropTypes.string,
        reactCookieInstance: _react2['default'].PropTypes.object
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        cookieName: 'ec_cookie_message_0',
        reactCookieInstance: _reactCookie2['default']
      };
    }
  }]);

  return CookieMessage;
})(_react2['default'].Component);

exports['default'] = CookieMessage;
module.exports = exports['default'];