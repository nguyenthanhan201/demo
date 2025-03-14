import {
  _getProvider as e,
  _registerComponent as t,
  registerVersion as n,
  getApp as i,
  SDK_VERSION as r
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
const s = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + '+/=';
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + '-_.';
    },
    HAS_NATIVE_SUPPORT: 'function' == typeof atob,
    encodeByteArray(e, t) {
      if (!Array.isArray(e)) throw Error('encodeByteArray takes an array as a parameter');
      this.init_();
      const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        i = [];
      for (let t = 0; t < e.length; t += 3) {
        const r = e[t],
          s = t + 1 < e.length,
          o = s ? e[t + 1] : 0,
          a = t + 2 < e.length,
          c = a ? e[t + 2] : 0,
          u = r >> 2,
          d = ((3 & r) << 4) | (o >> 4);
        let l = ((15 & o) << 2) | (c >> 6),
          h = 63 & c;
        a || ((h = 64), s || (l = 64)), i.push(n[u], n[d], n[l], n[h]);
      }
      return i.join('');
    },
    encodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? btoa(e)
        : this.encodeByteArray(
            (function (e) {
              const t = [];
              let n = 0;
              for (let i = 0; i < e.length; i++) {
                let r = e.charCodeAt(i);
                r < 128
                  ? (t[n++] = r)
                  : r < 2048
                  ? ((t[n++] = (r >> 6) | 192), (t[n++] = (63 & r) | 128))
                  : 55296 == (64512 & r) &&
                    i + 1 < e.length &&
                    56320 == (64512 & e.charCodeAt(i + 1))
                  ? ((r = 65536 + ((1023 & r) << 10) + (1023 & e.charCodeAt(++i))),
                    (t[n++] = (r >> 18) | 240),
                    (t[n++] = ((r >> 12) & 63) | 128),
                    (t[n++] = ((r >> 6) & 63) | 128),
                    (t[n++] = (63 & r) | 128))
                  : ((t[n++] = (r >> 12) | 224),
                    (t[n++] = ((r >> 6) & 63) | 128),
                    (t[n++] = (63 & r) | 128));
              }
              return t;
            })(e),
            t
          );
    },
    decodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? atob(e)
        : (function (e) {
            const t = [];
            let n = 0,
              i = 0;
            for (; n < e.length; ) {
              const r = e[n++];
              if (r < 128) t[i++] = String.fromCharCode(r);
              else if (r > 191 && r < 224) {
                const s = e[n++];
                t[i++] = String.fromCharCode(((31 & r) << 6) | (63 & s));
              } else if (r > 239 && r < 365) {
                const s =
                  (((7 & r) << 18) | ((63 & e[n++]) << 12) | ((63 & e[n++]) << 6) | (63 & e[n++])) -
                  65536;
                (t[i++] = String.fromCharCode(55296 + (s >> 10))),
                  (t[i++] = String.fromCharCode(56320 + (1023 & s)));
              } else {
                const s = e[n++],
                  o = e[n++];
                t[i++] = String.fromCharCode(((15 & r) << 12) | ((63 & s) << 6) | (63 & o));
              }
            }
            return t.join('');
          })(this.decodeStringToByteArray(e, t));
    },
    decodeStringToByteArray(e, t) {
      this.init_();
      const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        i = [];
      for (let t = 0; t < e.length; ) {
        const r = n[e.charAt(t++)],
          s = t < e.length ? n[e.charAt(t)] : 0;
        ++t;
        const o = t < e.length ? n[e.charAt(t)] : 64;
        ++t;
        const a = t < e.length ? n[e.charAt(t)] : 64;
        if ((++t, null == r || null == s || null == o || null == a)) throw Error();
        const c = (r << 2) | (s >> 4);
        if ((i.push(c), 64 !== o)) {
          const e = ((s << 4) & 240) | (o >> 2);
          if ((i.push(e), 64 !== a)) {
            const e = ((o << 6) & 192) | a;
            i.push(e);
          }
        }
      }
      return i;
    },
    init_() {
      if (!this.byteToCharMap_) {
        (this.byteToCharMap_ = {}),
          (this.charToByteMap_ = {}),
          (this.byteToCharMapWebSafe_ = {}),
          (this.charToByteMapWebSafe_ = {});
        for (let e = 0; e < this.ENCODED_VALS.length; e++)
          (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
            (this.charToByteMap_[this.byteToCharMap_[e]] = e),
            (this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e)),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
            e >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e));
      }
    }
  },
  o = function (e) {
    try {
      return s.decodeString(e, !0);
    } catch (e) {
      console.error('base64Decode failed: ', e);
    }
    return null;
  };
function a() {
  return 'undefined' != typeof navigator && 'string' == typeof navigator.userAgent
    ? navigator.userAgent
    : '';
}
const c = () =>
    (function () {
      if ('undefined' != typeof self) return self;
      if ('undefined' != typeof window) return window;
      if ('undefined' != typeof global) return global;
      throw new Error('Unable to locate global object.');
    })().__FIREBASE_DEFAULTS__,
  u = () => {
    try {
      return (
        c() ||
        (() => {
          if ('undefined' == typeof process || void 0 === process.env) return;
          const e = process.env.__FIREBASE_DEFAULTS__;
          return e ? JSON.parse(e) : void 0;
        })() ||
        (() => {
          if ('undefined' == typeof document) return;
          let e;
          try {
            e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
          } catch (e) {
            return;
          }
          const t = e && o(e[1]);
          return t && JSON.parse(t);
        })()
      );
    } catch (e) {
      return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
    }
  },
  d = (e) => {
    var t;
    return null === (t = u()) || void 0 === t ? void 0 : t[`_${e}`];
  };
class l extends Error {
  constructor(e, t, n) {
    super(t),
      (this.code = e),
      (this.customData = n),
      (this.name = 'FirebaseError'),
      Object.setPrototypeOf(this, l.prototype),
      Error.captureStackTrace && Error.captureStackTrace(this, h.prototype.create);
  }
}
class h {
  constructor(e, t, n) {
    (this.service = e), (this.serviceName = t), (this.errors = n);
  }
  create(e, ...t) {
    const n = t[0] || {},
      i = `${this.service}/${e}`,
      r = this.errors[e],
      s = r
        ? (function (e, t) {
            return e.replace(p, (e, n) => {
              const i = t[n];
              return null != i ? String(i) : `<${n}?>`;
            });
          })(r, n)
        : 'Error',
      o = `${this.serviceName}: ${s} (${i}).`;
    return new l(i, o, n);
  }
}
const p = /\{\$([^}]+)}/g;
function f(e, t) {
  if (e === t) return !0;
  const n = Object.keys(e),
    i = Object.keys(t);
  for (const r of n) {
    if (!i.includes(r)) return !1;
    const n = e[r],
      s = t[r];
    if (m(n) && m(s)) {
      if (!f(n, s)) return !1;
    } else if (n !== s) return !1;
  }
  for (const e of i) if (!n.includes(e)) return !1;
  return !0;
}
function m(e) {
  return null !== e && 'object' == typeof e;
}
function g(e) {
  const t = [];
  for (const [n, i] of Object.entries(e))
    Array.isArray(i)
      ? i.forEach((e) => {
          t.push(encodeURIComponent(n) + '=' + encodeURIComponent(e));
        })
      : t.push(encodeURIComponent(n) + '=' + encodeURIComponent(i));
  return t.length ? '&' + t.join('&') : '';
}
function v(e) {
  const t = {};
  return (
    e
      .replace(/^\?/, '')
      .split('&')
      .forEach((e) => {
        if (e) {
          const [n, i] = e.split('=');
          t[decodeURIComponent(n)] = decodeURIComponent(i);
        }
      }),
    t
  );
}
function _(e) {
  const t = e.indexOf('?');
  if (!t) return '';
  const n = e.indexOf('#', t);
  return e.substring(t, n > 0 ? n : void 0);
}
class I {
  constructor(e, t) {
    (this.observers = []),
      (this.unsubscribes = []),
      (this.observerCount = 0),
      (this.task = Promise.resolve()),
      (this.finalized = !1),
      (this.onNoObservers = t),
      this.task
        .then(() => {
          e(this);
        })
        .catch((e) => {
          this.error(e);
        });
  }
  next(e) {
    this.forEachObserver((t) => {
      t.next(e);
    });
  }
  error(e) {
    this.forEachObserver((t) => {
      t.error(e);
    }),
      this.close(e);
  }
  complete() {
    this.forEachObserver((e) => {
      e.complete();
    }),
      this.close();
  }
  subscribe(e, t, n) {
    let i;
    if (void 0 === e && void 0 === t && void 0 === n) throw new Error('Missing Observer.');
    (i = (function (e, t) {
      if ('object' != typeof e || null === e) return !1;
      for (const n of t) if (n in e && 'function' == typeof e[n]) return !0;
      return !1;
    })(e, ['next', 'error', 'complete'])
      ? e
      : { next: e, error: t, complete: n }),
      void 0 === i.next && (i.next = y),
      void 0 === i.error && (i.error = y),
      void 0 === i.complete && (i.complete = y);
    const r = this.unsubscribeOne.bind(this, this.observers.length);
    return (
      this.finalized &&
        this.task.then(() => {
          try {
            this.finalError ? i.error(this.finalError) : i.complete();
          } catch (e) {}
        }),
      this.observers.push(i),
      r
    );
  }
  unsubscribeOne(e) {
    void 0 !== this.observers &&
      void 0 !== this.observers[e] &&
      (delete this.observers[e],
      (this.observerCount -= 1),
      0 === this.observerCount && void 0 !== this.onNoObservers && this.onNoObservers(this));
  }
  forEachObserver(e) {
    if (!this.finalized) for (let t = 0; t < this.observers.length; t++) this.sendOne(t, e);
  }
  sendOne(e, t) {
    this.task.then(() => {
      if (void 0 !== this.observers && void 0 !== this.observers[e])
        try {
          t(this.observers[e]);
        } catch (e) {
          'undefined' != typeof console && console.error && console.error(e);
        }
    });
  }
  close(e) {
    this.finalized ||
      ((this.finalized = !0),
      void 0 !== e && (this.finalError = e),
      this.task.then(() => {
        (this.observers = void 0), (this.onNoObservers = void 0);
      }));
  }
}
function y() {}
function T(e) {
  return e && e._delegate ? e._delegate : e;
}
var w;
!(function (e) {
  (e[(e.DEBUG = 0)] = 'DEBUG'),
    (e[(e.VERBOSE = 1)] = 'VERBOSE'),
    (e[(e.INFO = 2)] = 'INFO'),
    (e[(e.WARN = 3)] = 'WARN'),
    (e[(e.ERROR = 4)] = 'ERROR'),
    (e[(e.SILENT = 5)] = 'SILENT');
})(w || (w = {}));
const E = {
    debug: w.DEBUG,
    verbose: w.VERBOSE,
    info: w.INFO,
    warn: w.WARN,
    error: w.ERROR,
    silent: w.SILENT
  },
  k = w.INFO,
  b = {
    [w.DEBUG]: 'log',
    [w.VERBOSE]: 'log',
    [w.INFO]: 'info',
    [w.WARN]: 'warn',
    [w.ERROR]: 'error'
  },
  A = (e, t, ...n) => {
    if (t < e.logLevel) return;
    const i = new Date().toISOString(),
      r = b[t];
    if (!r) throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
    console[r](`[${i}]  ${e.name}:`, ...n);
  };
function S(e, t) {
  var n = {};
  for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (n[i] = e[i]);
  if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
    var r = 0;
    for (i = Object.getOwnPropertySymbols(e); r < i.length; r++)
      t.indexOf(i[r]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, i[r]) &&
        (n[i[r]] = e[i[r]]);
  }
  return n;
}
class R {
  constructor(e, t, n) {
    (this.name = e),
      (this.instanceFactory = t),
      (this.type = n),
      (this.multipleInstances = !1),
      (this.serviceProps = {}),
      (this.instantiationMode = 'LAZY'),
      (this.onInstanceCreated = null);
  }
  setInstantiationMode(e) {
    return (this.instantiationMode = e), this;
  }
  setMultipleInstances(e) {
    return (this.multipleInstances = e), this;
  }
  setServiceProps(e) {
    return (this.serviceProps = e), this;
  }
  setInstanceCreatedCallback(e) {
    return (this.onInstanceCreated = e), this;
  }
}
const N = { PHONE: 'phone' },
  O = {
    FACEBOOK: 'facebook.com',
    GITHUB: 'github.com',
    GOOGLE: 'google.com',
    PASSWORD: 'password',
    PHONE: 'phone',
    TWITTER: 'twitter.com'
  },
  C = {
    EMAIL_LINK: 'emailLink',
    EMAIL_PASSWORD: 'password',
    FACEBOOK: 'facebook.com',
    GITHUB: 'github.com',
    GOOGLE: 'google.com',
    PHONE: 'phone',
    TWITTER: 'twitter.com'
  },
  P = { LINK: 'link', REAUTHENTICATE: 'reauthenticate', SIGN_IN: 'signIn' },
  D = {
    EMAIL_SIGNIN: 'EMAIL_SIGNIN',
    PASSWORD_RESET: 'PASSWORD_RESET',
    RECOVER_EMAIL: 'RECOVER_EMAIL',
    REVERT_SECOND_FACTOR_ADDITION: 'REVERT_SECOND_FACTOR_ADDITION',
    VERIFY_AND_CHANGE_EMAIL: 'VERIFY_AND_CHANGE_EMAIL',
    VERIFY_EMAIL: 'VERIFY_EMAIL'
  };
function L() {
  return {
    'dependent-sdk-initialized-before-auth':
      'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.'
  };
}
const M = function () {
    return {
      'admin-restricted-operation': 'This operation is restricted to administrators only.',
      'argument-error': '',
      'app-not-authorized':
        "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
      'app-not-installed':
        'The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.',
      'captcha-check-failed':
        'The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.',
      'code-expired':
        'The SMS code has expired. Please re-send the verification code to try again.',
      'cordova-not-ready': 'Cordova framework is not ready.',
      'cors-unsupported': 'This browser is not supported.',
      'credential-already-in-use':
        'This credential is already associated with a different user account.',
      'custom-token-mismatch': 'The custom token corresponds to a different audience.',
      'requires-recent-login':
        'This operation is sensitive and requires recent authentication. Log in again before retrying this request.',
      'dependent-sdk-initialized-before-auth':
        'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.',
      'dynamic-link-not-activated':
        'Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.',
      'email-change-needs-verification': 'Multi-factor users must always have a verified email.',
      'email-already-in-use': 'The email address is already in use by another account.',
      'emulator-config-failed':
        'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',
      'expired-action-code': 'The action code has expired.',
      'cancelled-popup-request':
        'This operation has been cancelled due to another conflicting popup being opened.',
      'internal-error': 'An internal AuthError has occurred.',
      'invalid-app-credential':
        'The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.',
      'invalid-app-id': 'The mobile app identifier is not registed for the current project.',
      'invalid-user-token':
        "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
      'invalid-auth-event': 'An internal AuthError has occurred.',
      'invalid-verification-code':
        'The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.',
      'invalid-continue-uri': 'The continue URL provided in the request is invalid.',
      'invalid-cordova-configuration':
        'The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.',
      'invalid-custom-token':
        'The custom token format is incorrect. Please check the documentation.',
      'invalid-dynamic-link-domain':
        'The provided dynamic link domain is not configured or authorized for the current project.',
      'invalid-email': 'The email address is badly formatted.',
      'invalid-emulator-scheme':
        'Emulator URL must start with a valid scheme (http:// or https://).',
      'invalid-api-key': 'Your API key is invalid, please check you have copied it correctly.',
      'invalid-cert-hash': 'The SHA-1 certificate hash provided is invalid.',
      'invalid-credential': 'The supplied auth credential is malformed or has expired.',
      'invalid-message-payload':
        'The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.',
      'invalid-multi-factor-session':
        'The request does not contain a valid proof of first factor successful sign-in.',
      'invalid-oauth-provider':
        'EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.',
      'invalid-oauth-client-id':
        'The OAuth client ID provided is either invalid or does not match the specified API key.',
      'unauthorized-domain':
        'This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.',
      'invalid-action-code':
        'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.',
      'wrong-password': 'The password is invalid or the user does not have a password.',
      'invalid-persistence-type':
        'The specified persistence type is invalid. It can only be local, session or none.',
      'invalid-phone-number':
        'The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].',
      'invalid-provider-id': 'The specified provider ID is invalid.',
      'invalid-recipient-email':
        'The email corresponding to this action failed to send as the provided recipient email address is invalid.',
      'invalid-sender':
        'The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.',
      'invalid-verification-id':
        'The verification ID used to create the phone auth credential is invalid.',
      'invalid-tenant-id': "The Auth instance's tenant ID is invalid.",
      'login-blocked': 'Login blocked by user-provided method: {$originalMessage}',
      'missing-android-pkg-name':
        'An Android Package Name must be provided if the Android App is required to be installed.',
      'auth-domain-config-required':
        'Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.',
      'missing-app-credential':
        'The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.',
      'missing-verification-code':
        'The phone auth credential was created with an empty SMS verification code.',
      'missing-continue-uri': 'A continue URL must be provided in the request.',
      'missing-iframe-start': 'An internal AuthError has occurred.',
      'missing-ios-bundle-id': 'An iOS Bundle ID must be provided if an App Store ID is provided.',
      'missing-or-invalid-nonce':
        'The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.',
      'missing-multi-factor-info': 'No second factor identifier is provided.',
      'missing-multi-factor-session':
        'The request is missing proof of first factor successful sign-in.',
      'missing-phone-number':
        'To send verification codes, provide a phone number for the recipient.',
      'missing-verification-id':
        'The phone auth credential was created with an empty verification ID.',
      'app-deleted': 'This instance of FirebaseApp has been deleted.',
      'multi-factor-info-not-found':
        'The user does not have a second factor matching the identifier provided.',
      'multi-factor-auth-required':
        'Proof of ownership of a second factor is required to complete sign-in.',
      'account-exists-with-different-credential':
        'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.',
      'network-request-failed':
        'A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.',
      'no-auth-event': 'An internal AuthError has occurred.',
      'no-such-provider': 'User was not linked to an account with the given provider.',
      'null-user':
        'A null user object was provided as the argument for an operation which requires a non-null user object.',
      'operation-not-allowed':
        'The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.',
      'operation-not-supported-in-this-environment':
        'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
      'popup-blocked':
        'Unable to establish a connection with the popup. It may have been blocked by the browser.',
      'popup-closed-by-user':
        'The popup has been closed by the user before finalizing the operation.',
      'provider-already-linked': 'User can only be linked to one identity for the given provider.',
      'quota-exceeded': "The project's quota for this operation has been exceeded.",
      'redirect-cancelled-by-user':
        'The redirect operation has been cancelled by the user before finalizing.',
      'redirect-operation-pending': 'A redirect sign-in operation is already pending.',
      'rejected-credential': 'The request contains malformed or mismatching credentials.',
      'second-factor-already-in-use': 'The second factor is already enrolled on this account.',
      'maximum-second-factor-count-exceeded':
        'The maximum allowed number of second factors on a user has been exceeded.',
      'tenant-id-mismatch': "The provided tenant ID does not match the Auth instance's tenant ID",
      timeout: 'The operation has timed out.',
      'user-token-expired':
        "The user's credential is no longer valid. The user must sign in again.",
      'too-many-requests':
        'We have blocked all requests from this device due to unusual activity. Try again later.',
      'unauthorized-continue-uri':
        'The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.',
      'unsupported-first-factor':
        'Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.',
      'unsupported-persistence-type':
        'The current environment does not support the specified persistence type.',
      'unsupported-tenant-operation': 'This operation is not supported in a multi-tenant context.',
      'unverified-email': 'The operation requires a verified email.',
      'user-cancelled': 'The user did not grant your application the permissions it requested.',
      'user-not-found':
        'There is no user record corresponding to this identifier. The user may have been deleted.',
      'user-disabled': 'The user account has been disabled by an administrator.',
      'user-mismatch':
        'The supplied credentials do not correspond to the previously signed in user.',
      'user-signed-out': '',
      'weak-password': 'The password must be 6 characters long or more.',
      'web-storage-unsupported':
        'This browser is not supported or 3rd party cookies and data may be disabled.',
      'already-initialized':
        'initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.'
    };
  },
  U = L,
  F = new h('auth', 'Firebase', {
    'dependent-sdk-initialized-before-auth':
      'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.'
  }),
  V = {
    ADMIN_ONLY_OPERATION: 'auth/admin-restricted-operation',
    ARGUMENT_ERROR: 'auth/argument-error',
    APP_NOT_AUTHORIZED: 'auth/app-not-authorized',
    APP_NOT_INSTALLED: 'auth/app-not-installed',
    CAPTCHA_CHECK_FAILED: 'auth/captcha-check-failed',
    CODE_EXPIRED: 'auth/code-expired',
    CORDOVA_NOT_READY: 'auth/cordova-not-ready',
    CORS_UNSUPPORTED: 'auth/cors-unsupported',
    CREDENTIAL_ALREADY_IN_USE: 'auth/credential-already-in-use',
    CREDENTIAL_MISMATCH: 'auth/custom-token-mismatch',
    CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'auth/requires-recent-login',
    DEPENDENT_SDK_INIT_BEFORE_AUTH: 'auth/dependent-sdk-initialized-before-auth',
    DYNAMIC_LINK_NOT_ACTIVATED: 'auth/dynamic-link-not-activated',
    EMAIL_CHANGE_NEEDS_VERIFICATION: 'auth/email-change-needs-verification',
    EMAIL_EXISTS: 'auth/email-already-in-use',
    EMULATOR_CONFIG_FAILED: 'auth/emulator-config-failed',
    EXPIRED_OOB_CODE: 'auth/expired-action-code',
    EXPIRED_POPUP_REQUEST: 'auth/cancelled-popup-request',
    INTERNAL_ERROR: 'auth/internal-error',
    INVALID_API_KEY: 'auth/invalid-api-key',
    INVALID_APP_CREDENTIAL: 'auth/invalid-app-credential',
    INVALID_APP_ID: 'auth/invalid-app-id',
    INVALID_AUTH: 'auth/invalid-user-token',
    INVALID_AUTH_EVENT: 'auth/invalid-auth-event',
    INVALID_CERT_HASH: 'auth/invalid-cert-hash',
    INVALID_CODE: 'auth/invalid-verification-code',
    INVALID_CONTINUE_URI: 'auth/invalid-continue-uri',
    INVALID_CORDOVA_CONFIGURATION: 'auth/invalid-cordova-configuration',
    INVALID_CUSTOM_TOKEN: 'auth/invalid-custom-token',
    INVALID_DYNAMIC_LINK_DOMAIN: 'auth/invalid-dynamic-link-domain',
    INVALID_EMAIL: 'auth/invalid-email',
    INVALID_EMULATOR_SCHEME: 'auth/invalid-emulator-scheme',
    INVALID_IDP_RESPONSE: 'auth/invalid-credential',
    INVALID_MESSAGE_PAYLOAD: 'auth/invalid-message-payload',
    INVALID_MFA_SESSION: 'auth/invalid-multi-factor-session',
    INVALID_OAUTH_CLIENT_ID: 'auth/invalid-oauth-client-id',
    INVALID_OAUTH_PROVIDER: 'auth/invalid-oauth-provider',
    INVALID_OOB_CODE: 'auth/invalid-action-code',
    INVALID_ORIGIN: 'auth/unauthorized-domain',
    INVALID_PASSWORD: 'auth/wrong-password',
    INVALID_PERSISTENCE: 'auth/invalid-persistence-type',
    INVALID_PHONE_NUMBER: 'auth/invalid-phone-number',
    INVALID_PROVIDER_ID: 'auth/invalid-provider-id',
    INVALID_RECIPIENT_EMAIL: 'auth/invalid-recipient-email',
    INVALID_SENDER: 'auth/invalid-sender',
    INVALID_SESSION_INFO: 'auth/invalid-verification-id',
    INVALID_TENANT_ID: 'auth/invalid-tenant-id',
    MFA_INFO_NOT_FOUND: 'auth/multi-factor-info-not-found',
    MFA_REQUIRED: 'auth/multi-factor-auth-required',
    MISSING_ANDROID_PACKAGE_NAME: 'auth/missing-android-pkg-name',
    MISSING_APP_CREDENTIAL: 'auth/missing-app-credential',
    MISSING_AUTH_DOMAIN: 'auth/auth-domain-config-required',
    MISSING_CODE: 'auth/missing-verification-code',
    MISSING_CONTINUE_URI: 'auth/missing-continue-uri',
    MISSING_IFRAME_START: 'auth/missing-iframe-start',
    MISSING_IOS_BUNDLE_ID: 'auth/missing-ios-bundle-id',
    MISSING_OR_INVALID_NONCE: 'auth/missing-or-invalid-nonce',
    MISSING_MFA_INFO: 'auth/missing-multi-factor-info',
    MISSING_MFA_SESSION: 'auth/missing-multi-factor-session',
    MISSING_PHONE_NUMBER: 'auth/missing-phone-number',
    MISSING_SESSION_INFO: 'auth/missing-verification-id',
    MODULE_DESTROYED: 'auth/app-deleted',
    NEED_CONFIRMATION: 'auth/account-exists-with-different-credential',
    NETWORK_REQUEST_FAILED: 'auth/network-request-failed',
    NULL_USER: 'auth/null-user',
    NO_AUTH_EVENT: 'auth/no-auth-event',
    NO_SUCH_PROVIDER: 'auth/no-such-provider',
    OPERATION_NOT_ALLOWED: 'auth/operation-not-allowed',
    OPERATION_NOT_SUPPORTED: 'auth/operation-not-supported-in-this-environment',
    POPUP_BLOCKED: 'auth/popup-blocked',
    POPUP_CLOSED_BY_USER: 'auth/popup-closed-by-user',
    PROVIDER_ALREADY_LINKED: 'auth/provider-already-linked',
    QUOTA_EXCEEDED: 'auth/quota-exceeded',
    REDIRECT_CANCELLED_BY_USER: 'auth/redirect-cancelled-by-user',
    REDIRECT_OPERATION_PENDING: 'auth/redirect-operation-pending',
    REJECTED_CREDENTIAL: 'auth/rejected-credential',
    SECOND_FACTOR_ALREADY_ENROLLED: 'auth/second-factor-already-in-use',
    SECOND_FACTOR_LIMIT_EXCEEDED: 'auth/maximum-second-factor-count-exceeded',
    TENANT_ID_MISMATCH: 'auth/tenant-id-mismatch',
    TIMEOUT: 'auth/timeout',
    TOKEN_EXPIRED: 'auth/user-token-expired',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'auth/too-many-requests',
    UNAUTHORIZED_DOMAIN: 'auth/unauthorized-continue-uri',
    UNSUPPORTED_FIRST_FACTOR: 'auth/unsupported-first-factor',
    UNSUPPORTED_PERSISTENCE: 'auth/unsupported-persistence-type',
    UNSUPPORTED_TENANT_OPERATION: 'auth/unsupported-tenant-operation',
    UNVERIFIED_EMAIL: 'auth/unverified-email',
    USER_CANCELLED: 'auth/user-cancelled',
    USER_DELETED: 'auth/user-not-found',
    USER_DISABLED: 'auth/user-disabled',
    USER_MISMATCH: 'auth/user-mismatch',
    USER_SIGNED_OUT: 'auth/user-signed-out',
    WEAK_PASSWORD: 'auth/weak-password',
    WEB_STORAGE_UNSUPPORTED: 'auth/web-storage-unsupported',
    ALREADY_INITIALIZED: 'auth/already-initialized'
  },
  x = new (class {
    constructor(e) {
      (this.name = e), (this._logLevel = k), (this._logHandler = A), (this._userLogHandler = null);
    }
    get logLevel() {
      return this._logLevel;
    }
    set logLevel(e) {
      if (!(e in w)) throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
      this._logLevel = e;
    }
    setLogLevel(e) {
      this._logLevel = 'string' == typeof e ? E[e] : e;
    }
    get logHandler() {
      return this._logHandler;
    }
    set logHandler(e) {
      if ('function' != typeof e)
        throw new TypeError('Value assigned to `logHandler` must be a function');
      this._logHandler = e;
    }
    get userLogHandler() {
      return this._userLogHandler;
    }
    set userLogHandler(e) {
      this._userLogHandler = e;
    }
    debug(...e) {
      this._userLogHandler && this._userLogHandler(this, w.DEBUG, ...e),
        this._logHandler(this, w.DEBUG, ...e);
    }
    log(...e) {
      this._userLogHandler && this._userLogHandler(this, w.VERBOSE, ...e),
        this._logHandler(this, w.VERBOSE, ...e);
    }
    info(...e) {
      this._userLogHandler && this._userLogHandler(this, w.INFO, ...e),
        this._logHandler(this, w.INFO, ...e);
    }
    warn(...e) {
      this._userLogHandler && this._userLogHandler(this, w.WARN, ...e),
        this._logHandler(this, w.WARN, ...e);
    }
    error(...e) {
      this._userLogHandler && this._userLogHandler(this, w.ERROR, ...e),
        this._logHandler(this, w.ERROR, ...e);
    }
  })('@firebase/auth');
function H(e, ...t) {
  x.logLevel <= w.ERROR && x.error(`Auth (${r}): ${e}`, ...t);
}
function j(e, ...t) {
  throw G(e, ...t);
}
function q(e, ...t) {
  return G(e, ...t);
}
function W(e, t, n) {
  const i = Object.assign(Object.assign({}, U()), { [t]: n });
  return new h('auth', 'Firebase', i).create(t, { appName: e.name });
}
function z(e, t, n) {
  if (!(t instanceof n))
    throw (
      (n.name !== t.constructor.name && j(e, 'argument-error'),
      W(
        e,
        'argument-error',
        `Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`
      ))
    );
}
function G(e, ...t) {
  if ('string' != typeof e) {
    const n = t[0],
      i = [...t.slice(1)];
    return i[0] && (i[0].appName = e.name), e._errorFactory.create(n, ...i);
  }
  return F.create(e, ...t);
}
function B(e, t, ...n) {
  if (!e) throw G(t, ...n);
}
function K(e) {
  const t = 'INTERNAL ASSERTION FAILED: ' + e;
  throw (H(t), new Error(t));
}
function $(e, t) {
  e || K(t);
}
const J = new Map();
function Y(e) {
  $(e instanceof Function, 'Expected a class definition');
  let t = J.get(e);
  return t
    ? ($(t instanceof e, 'Instance stored in cache mismatched with class'), t)
    : ((t = new e()), J.set(e, t), t);
}
function X(t, n) {
  const i = e(t, 'auth');
  if (i.isInitialized()) {
    const e = i.getImmediate();
    if (f(i.getOptions(), null != n ? n : {})) return e;
    j(e, 'already-initialized');
  }
  return i.initialize({ options: n });
}
function Q() {
  var e;
  return (
    ('undefined' != typeof self &&
      (null === (e = self.location) || void 0 === e ? void 0 : e.href)) ||
    ''
  );
}
function Z() {
  return 'http:' === ee() || 'https:' === ee();
}
function ee() {
  var e;
  return (
    ('undefined' != typeof self &&
      (null === (e = self.location) || void 0 === e ? void 0 : e.protocol)) ||
    null
  );
}
function te() {
  return (
    !(
      'undefined' != typeof navigator &&
      navigator &&
      'onLine' in navigator &&
      'boolean' == typeof navigator.onLine &&
      (Z() ||
        (function () {
          const e =
            'object' == typeof chrome
              ? chrome.runtime
              : 'object' == typeof browser
              ? browser.runtime
              : void 0;
          return 'object' == typeof e && void 0 !== e.id;
        })() ||
        'connection' in navigator)
    ) || navigator.onLine
  );
}
class ne {
  constructor(e, t) {
    (this.shortDelay = e),
      (this.longDelay = t),
      $(t > e, 'Short delay should be less than long delay!'),
      (this.isMobile =
        ('undefined' != typeof window &&
          !!(window.cordova || window.phonegap || window.PhoneGap) &&
          /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(a())) ||
        ('object' == typeof navigator && 'ReactNative' === navigator.product));
  }
  get() {
    return te()
      ? this.isMobile
        ? this.longDelay
        : this.shortDelay
      : Math.min(5e3, this.shortDelay);
  }
}
function ie(e, t) {
  $(e.emulator, 'Emulator should always be set here');
  const { url: n } = e.emulator;
  return t ? `${n}${t.startsWith('/') ? t.slice(1) : t}` : n;
}
class re {
  static initialize(e, t, n) {
    (this.fetchImpl = e), t && (this.headersImpl = t), n && (this.responseImpl = n);
  }
  static fetch() {
    return this.fetchImpl
      ? this.fetchImpl
      : 'undefined' != typeof self && 'fetch' in self
      ? self.fetch
      : void K(
          'Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
        );
  }
  static headers() {
    return this.headersImpl
      ? this.headersImpl
      : 'undefined' != typeof self && 'Headers' in self
      ? self.Headers
      : void K(
          'Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
        );
  }
  static response() {
    return this.responseImpl
      ? this.responseImpl
      : 'undefined' != typeof self && 'Response' in self
      ? self.Response
      : void K(
          'Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
        );
  }
}
const se = {
    CREDENTIAL_MISMATCH: 'custom-token-mismatch',
    MISSING_CUSTOM_TOKEN: 'internal-error',
    INVALID_IDENTIFIER: 'invalid-email',
    MISSING_CONTINUE_URI: 'internal-error',
    INVALID_PASSWORD: 'wrong-password',
    MISSING_PASSWORD: 'internal-error',
    EMAIL_EXISTS: 'email-already-in-use',
    PASSWORD_LOGIN_DISABLED: 'operation-not-allowed',
    INVALID_IDP_RESPONSE: 'invalid-credential',
    INVALID_PENDING_TOKEN: 'invalid-credential',
    FEDERATED_USER_ID_ALREADY_LINKED: 'credential-already-in-use',
    MISSING_REQ_TYPE: 'internal-error',
    EMAIL_NOT_FOUND: 'user-not-found',
    RESET_PASSWORD_EXCEED_LIMIT: 'too-many-requests',
    EXPIRED_OOB_CODE: 'expired-action-code',
    INVALID_OOB_CODE: 'invalid-action-code',
    MISSING_OOB_CODE: 'internal-error',
    CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'requires-recent-login',
    INVALID_ID_TOKEN: 'invalid-user-token',
    TOKEN_EXPIRED: 'user-token-expired',
    USER_NOT_FOUND: 'user-token-expired',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'too-many-requests',
    INVALID_CODE: 'invalid-verification-code',
    INVALID_SESSION_INFO: 'invalid-verification-id',
    INVALID_TEMPORARY_PROOF: 'invalid-credential',
    MISSING_SESSION_INFO: 'missing-verification-id',
    SESSION_EXPIRED: 'code-expired',
    MISSING_ANDROID_PACKAGE_NAME: 'missing-android-pkg-name',
    UNAUTHORIZED_DOMAIN: 'unauthorized-continue-uri',
    INVALID_OAUTH_CLIENT_ID: 'invalid-oauth-client-id',
    ADMIN_ONLY_OPERATION: 'admin-restricted-operation',
    INVALID_MFA_PENDING_CREDENTIAL: 'invalid-multi-factor-session',
    MFA_ENROLLMENT_NOT_FOUND: 'multi-factor-info-not-found',
    MISSING_MFA_ENROLLMENT_ID: 'missing-multi-factor-info',
    MISSING_MFA_PENDING_CREDENTIAL: 'missing-multi-factor-session',
    SECOND_FACTOR_EXISTS: 'second-factor-already-in-use',
    SECOND_FACTOR_LIMIT_EXCEEDED: 'maximum-second-factor-count-exceeded',
    BLOCKING_FUNCTION_ERROR_RESPONSE: 'internal-error'
  },
  oe = new ne(3e4, 6e4);
function ae(e, t) {
  return e.tenantId && !t.tenantId
    ? Object.assign(Object.assign({}, t), { tenantId: e.tenantId })
    : t;
}
async function ce(e, t, n, i, r = {}) {
  return ue(e, r, async () => {
    let r = {},
      s = {};
    i && ('GET' === t ? (s = i) : (r = { body: JSON.stringify(i) }));
    const o = g(Object.assign({ key: e.config.apiKey }, s)).slice(1),
      a = await e._getAdditionalHeaders();
    return (
      (a['Content-Type'] = 'application/json'),
      e.languageCode && (a['X-Firebase-Locale'] = e.languageCode),
      re.fetch()(
        le(e, e.config.apiHost, n, o),
        Object.assign({ method: t, headers: a, referrerPolicy: 'no-referrer' }, r)
      )
    );
  });
}
async function ue(e, t, n) {
  e._canInitEmulator = !1;
  const i = Object.assign(Object.assign({}, se), t);
  try {
    const t = new he(e),
      r = await Promise.race([n(), t.promise]);
    t.clearNetworkTimeout();
    const s = await r.json();
    if ('needConfirmation' in s) throw pe(e, 'account-exists-with-different-credential', s);
    if (r.ok && !('errorMessage' in s)) return s;
    {
      const t = r.ok ? s.errorMessage : s.error.message,
        [n, o] = t.split(' : ');
      if ('FEDERATED_USER_ID_ALREADY_LINKED' === n) throw pe(e, 'credential-already-in-use', s);
      if ('EMAIL_EXISTS' === n) throw pe(e, 'email-already-in-use', s);
      if ('USER_DISABLED' === n) throw pe(e, 'user-disabled', s);
      const a = i[n] || n.toLowerCase().replace(/[_\s]+/g, '-');
      if (o) throw W(e, a, o);
      j(e, a);
    }
  } catch (t) {
    if (t instanceof l) throw t;
    j(e, 'network-request-failed');
  }
}
async function de(e, t, n, i, r = {}) {
  const s = await ce(e, t, n, i, r);
  return (
    'mfaPendingCredential' in s && j(e, 'multi-factor-auth-required', { _serverResponse: s }), s
  );
}
function le(e, t, n, i) {
  const r = `${t}${n}?${i}`;
  return e.config.emulator ? ie(e.config, r) : `${e.config.apiScheme}://${r}`;
}
class he {
  constructor(e) {
    (this.auth = e),
      (this.timer = null),
      (this.promise = new Promise((e, t) => {
        this.timer = setTimeout(() => t(q(this.auth, 'network-request-failed')), oe.get());
      }));
  }
  clearNetworkTimeout() {
    clearTimeout(this.timer);
  }
}
function pe(e, t, n) {
  const i = { appName: e.name };
  n.email && (i.email = n.email), n.phoneNumber && (i.phoneNumber = n.phoneNumber);
  const r = q(e, t, i);
  return (r.customData._tokenResponse = n), r;
}
function fe(e) {
  if (e)
    try {
      const t = new Date(Number(e));
      if (!isNaN(t.getTime())) return t.toUTCString();
    } catch (e) {}
}
function me(e, t = !1) {
  return T(e).getIdToken(t);
}
async function ge(e, t = !1) {
  const n = T(e),
    i = await n.getIdToken(t),
    r = _e(i);
  B(r && r.exp && r.auth_time && r.iat, n.auth, 'internal-error');
  const s = 'object' == typeof r.firebase ? r.firebase : void 0,
    o = null == s ? void 0 : s.sign_in_provider;
  return {
    claims: r,
    token: i,
    authTime: fe(ve(r.auth_time)),
    issuedAtTime: fe(ve(r.iat)),
    expirationTime: fe(ve(r.exp)),
    signInProvider: o || null,
    signInSecondFactor: (null == s ? void 0 : s.sign_in_second_factor) || null
  };
}
function ve(e) {
  return 1e3 * Number(e);
}
function _e(e) {
  const [t, n, i] = e.split('.');
  if (void 0 === t || void 0 === n || void 0 === i)
    return H('JWT malformed, contained fewer than 3 sections'), null;
  try {
    const e = o(n);
    return e ? JSON.parse(e) : (H('Failed to decode base64 JWT payload'), null);
  } catch (e) {
    return H('Caught error parsing JWT payload as JSON', null == e ? void 0 : e.toString()), null;
  }
}
async function Ie(e, t, n = !1) {
  if (n) return t;
  try {
    return await t;
  } catch (t) {
    throw (
      (t instanceof l &&
        (function ({ code: e }) {
          return 'auth/user-disabled' === e || 'auth/user-token-expired' === e;
        })(t) &&
        e.auth.currentUser === e &&
        (await e.auth.signOut()),
      t)
    );
  }
}
class ye {
  constructor(e) {
    (this.user = e), (this.isRunning = !1), (this.timerId = null), (this.errorBackoff = 3e4);
  }
  _start() {
    this.isRunning || ((this.isRunning = !0), this.schedule());
  }
  _stop() {
    this.isRunning && ((this.isRunning = !1), null !== this.timerId && clearTimeout(this.timerId));
  }
  getInterval(e) {
    var t;
    if (e) {
      const e = this.errorBackoff;
      return (this.errorBackoff = Math.min(2 * this.errorBackoff, 96e4)), e;
    }
    {
      this.errorBackoff = 3e4;
      const e =
        (null !== (t = this.user.stsTokenManager.expirationTime) && void 0 !== t ? t : 0) -
        Date.now() -
        3e5;
      return Math.max(0, e);
    }
  }
  schedule(e = !1) {
    if (!this.isRunning) return;
    const t = this.getInterval(e);
    this.timerId = setTimeout(async () => {
      await this.iteration();
    }, t);
  }
  async iteration() {
    try {
      await this.user.getIdToken(!0);
    } catch (e) {
      return void (
        'auth/network-request-failed' === (null == e ? void 0 : e.code) && this.schedule(!0)
      );
    }
    this.schedule();
  }
}
class Te {
  constructor(e, t) {
    (this.createdAt = e), (this.lastLoginAt = t), this._initializeTime();
  }
  _initializeTime() {
    (this.lastSignInTime = fe(this.lastLoginAt)), (this.creationTime = fe(this.createdAt));
  }
  _copy(e) {
    (this.createdAt = e.createdAt), (this.lastLoginAt = e.lastLoginAt), this._initializeTime();
  }
  toJSON() {
    return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt };
  }
}
async function we(e) {
  var t;
  const n = e.auth,
    i = await e.getIdToken(),
    r = await Ie(
      e,
      (async function (e, t) {
        return ce(e, 'POST', '/v1/accounts:lookup', t);
      })(n, { idToken: i })
    );
  B(null == r ? void 0 : r.users.length, n, 'internal-error');
  const s = r.users[0];
  e._notifyReloadListener(s);
  const o = (null === (t = s.providerUserInfo) || void 0 === t ? void 0 : t.length)
    ? s.providerUserInfo.map((e) => {
        var { providerId: t } = e,
          n = S(e, ['providerId']);
        return {
          providerId: t,
          uid: n.rawId || '',
          displayName: n.displayName || null,
          email: n.email || null,
          phoneNumber: n.phoneNumber || null,
          photoURL: n.photoUrl || null
        };
      })
    : [];
  const a =
    ((c = e.providerData),
    (u = o),
    [...c.filter((e) => !u.some((t) => t.providerId === e.providerId)), ...u]);
  var c, u;
  const d = e.isAnonymous,
    l = !((e.email && s.passwordHash) || (null == a ? void 0 : a.length)),
    h = !!d && l,
    p = {
      uid: s.localId,
      displayName: s.displayName || null,
      photoURL: s.photoUrl || null,
      email: s.email || null,
      emailVerified: s.emailVerified || !1,
      phoneNumber: s.phoneNumber || null,
      tenantId: s.tenantId || null,
      providerData: a,
      metadata: new Te(s.createdAt, s.lastLoginAt),
      isAnonymous: h
    };
  Object.assign(e, p);
}
async function Ee(e) {
  const t = T(e);
  await we(t), await t.auth._persistUserIfCurrent(t), t.auth._notifyListenersIfCurrent(t);
}
class ke {
  constructor() {
    (this.refreshToken = null), (this.accessToken = null), (this.expirationTime = null);
  }
  get isExpired() {
    return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
  }
  updateFromServerResponse(e) {
    B(e.idToken, 'internal-error'),
      B(void 0 !== e.idToken, 'internal-error'),
      B(void 0 !== e.refreshToken, 'internal-error');
    const t =
      'expiresIn' in e && void 0 !== e.expiresIn
        ? Number(e.expiresIn)
        : (function (e) {
            const t = _e(e);
            return (
              B(t, 'internal-error'),
              B(void 0 !== t.exp, 'internal-error'),
              B(void 0 !== t.iat, 'internal-error'),
              Number(t.exp) - Number(t.iat)
            );
          })(e.idToken);
    this.updateTokensAndExpiration(e.idToken, e.refreshToken, t);
  }
  async getToken(e, t = !1) {
    return (
      B(!this.accessToken || this.refreshToken, e, 'user-token-expired'),
      t || !this.accessToken || this.isExpired
        ? this.refreshToken
          ? (await this.refresh(e, this.refreshToken), this.accessToken)
          : null
        : this.accessToken
    );
  }
  clearRefreshToken() {
    this.refreshToken = null;
  }
  async refresh(e, t) {
    const {
      accessToken: n,
      refreshToken: i,
      expiresIn: r
    } = await (async function (e, t) {
      const n = await ue(e, {}, async () => {
        const n = g({ grant_type: 'refresh_token', refresh_token: t }).slice(1),
          { tokenApiHost: i, apiKey: r } = e.config,
          s = le(e, i, '/v1/token', `key=${r}`),
          o = await e._getAdditionalHeaders();
        return (
          (o['Content-Type'] = 'application/x-www-form-urlencoded'),
          re.fetch()(s, { method: 'POST', headers: o, body: n })
        );
      });
      return {
        accessToken: n.access_token,
        expiresIn: n.expires_in,
        refreshToken: n.refresh_token
      };
    })(e, t);
    this.updateTokensAndExpiration(n, i, Number(r));
  }
  updateTokensAndExpiration(e, t, n) {
    (this.refreshToken = t || null),
      (this.accessToken = e || null),
      (this.expirationTime = Date.now() + 1e3 * n);
  }
  static fromJSON(e, t) {
    const { refreshToken: n, accessToken: i, expirationTime: r } = t,
      s = new ke();
    return (
      n && (B('string' == typeof n, 'internal-error', { appName: e }), (s.refreshToken = n)),
      i && (B('string' == typeof i, 'internal-error', { appName: e }), (s.accessToken = i)),
      r && (B('number' == typeof r, 'internal-error', { appName: e }), (s.expirationTime = r)),
      s
    );
  }
  toJSON() {
    return {
      refreshToken: this.refreshToken,
      accessToken: this.accessToken,
      expirationTime: this.expirationTime
    };
  }
  _assign(e) {
    (this.accessToken = e.accessToken),
      (this.refreshToken = e.refreshToken),
      (this.expirationTime = e.expirationTime);
  }
  _clone() {
    return Object.assign(new ke(), this.toJSON());
  }
  _performRefresh() {
    return K('not implemented');
  }
}
function be(e, t) {
  B('string' == typeof e || void 0 === e, 'internal-error', { appName: t });
}
class Ae {
  constructor(e) {
    var { uid: t, auth: n, stsTokenManager: i } = e,
      r = S(e, ['uid', 'auth', 'stsTokenManager']);
    (this.providerId = 'firebase'),
      (this.proactiveRefresh = new ye(this)),
      (this.reloadUserInfo = null),
      (this.reloadListener = null),
      (this.uid = t),
      (this.auth = n),
      (this.stsTokenManager = i),
      (this.accessToken = i.accessToken),
      (this.displayName = r.displayName || null),
      (this.email = r.email || null),
      (this.emailVerified = r.emailVerified || !1),
      (this.phoneNumber = r.phoneNumber || null),
      (this.photoURL = r.photoURL || null),
      (this.isAnonymous = r.isAnonymous || !1),
      (this.tenantId = r.tenantId || null),
      (this.providerData = r.providerData ? [...r.providerData] : []),
      (this.metadata = new Te(r.createdAt || void 0, r.lastLoginAt || void 0));
  }
  async getIdToken(e) {
    const t = await Ie(this, this.stsTokenManager.getToken(this.auth, e));
    return (
      B(t, this.auth, 'internal-error'),
      this.accessToken !== t &&
        ((this.accessToken = t),
        await this.auth._persistUserIfCurrent(this),
        this.auth._notifyListenersIfCurrent(this)),
      t
    );
  }
  getIdTokenResult(e) {
    return ge(this, e);
  }
  reload() {
    return Ee(this);
  }
  _assign(e) {
    this !== e &&
      (B(this.uid === e.uid, this.auth, 'internal-error'),
      (this.displayName = e.displayName),
      (this.photoURL = e.photoURL),
      (this.email = e.email),
      (this.emailVerified = e.emailVerified),
      (this.phoneNumber = e.phoneNumber),
      (this.isAnonymous = e.isAnonymous),
      (this.tenantId = e.tenantId),
      (this.providerData = e.providerData.map((e) => Object.assign({}, e))),
      this.metadata._copy(e.metadata),
      this.stsTokenManager._assign(e.stsTokenManager));
  }
  _clone(e) {
    return new Ae(
      Object.assign(Object.assign({}, this), {
        auth: e,
        stsTokenManager: this.stsTokenManager._clone()
      })
    );
  }
  _onReload(e) {
    B(!this.reloadListener, this.auth, 'internal-error'),
      (this.reloadListener = e),
      this.reloadUserInfo &&
        (this._notifyReloadListener(this.reloadUserInfo), (this.reloadUserInfo = null));
  }
  _notifyReloadListener(e) {
    this.reloadListener ? this.reloadListener(e) : (this.reloadUserInfo = e);
  }
  _startProactiveRefresh() {
    this.proactiveRefresh._start();
  }
  _stopProactiveRefresh() {
    this.proactiveRefresh._stop();
  }
  async _updateTokensIfNecessary(e, t = !1) {
    let n = !1;
    e.idToken &&
      e.idToken !== this.stsTokenManager.accessToken &&
      (this.stsTokenManager.updateFromServerResponse(e), (n = !0)),
      t && (await we(this)),
      await this.auth._persistUserIfCurrent(this),
      n && this.auth._notifyListenersIfCurrent(this);
  }
  async delete() {
    const e = await this.getIdToken();
    return (
      await Ie(
        this,
        (async function (e, t) {
          return ce(e, 'POST', '/v1/accounts:delete', t);
        })(this.auth, { idToken: e })
      ),
      this.stsTokenManager.clearRefreshToken(),
      this.auth.signOut()
    );
  }
  toJSON() {
    return Object.assign(
      Object.assign(
        {
          uid: this.uid,
          email: this.email || void 0,
          emailVerified: this.emailVerified,
          displayName: this.displayName || void 0,
          isAnonymous: this.isAnonymous,
          photoURL: this.photoURL || void 0,
          phoneNumber: this.phoneNumber || void 0,
          tenantId: this.tenantId || void 0,
          providerData: this.providerData.map((e) => Object.assign({}, e)),
          stsTokenManager: this.stsTokenManager.toJSON(),
          _redirectEventId: this._redirectEventId
        },
        this.metadata.toJSON()
      ),
      { apiKey: this.auth.config.apiKey, appName: this.auth.name }
    );
  }
  get refreshToken() {
    return this.stsTokenManager.refreshToken || '';
  }
  static _fromJSON(e, t) {
    var n, i, r, s, o, a, c, u;
    const d = null !== (n = t.displayName) && void 0 !== n ? n : void 0,
      l = null !== (i = t.email) && void 0 !== i ? i : void 0,
      h = null !== (r = t.phoneNumber) && void 0 !== r ? r : void 0,
      p = null !== (s = t.photoURL) && void 0 !== s ? s : void 0,
      f = null !== (o = t.tenantId) && void 0 !== o ? o : void 0,
      m = null !== (a = t._redirectEventId) && void 0 !== a ? a : void 0,
      g = null !== (c = t.createdAt) && void 0 !== c ? c : void 0,
      v = null !== (u = t.lastLoginAt) && void 0 !== u ? u : void 0,
      { uid: _, emailVerified: I, isAnonymous: y, providerData: T, stsTokenManager: w } = t;
    B(_ && w, e, 'internal-error');
    const E = ke.fromJSON(this.name, w);
    B('string' == typeof _, e, 'internal-error'),
      be(d, e.name),
      be(l, e.name),
      B('boolean' == typeof I, e, 'internal-error'),
      B('boolean' == typeof y, e, 'internal-error'),
      be(h, e.name),
      be(p, e.name),
      be(f, e.name),
      be(m, e.name),
      be(g, e.name),
      be(v, e.name);
    const k = new Ae({
      uid: _,
      auth: e,
      email: l,
      emailVerified: I,
      displayName: d,
      isAnonymous: y,
      photoURL: p,
      phoneNumber: h,
      tenantId: f,
      stsTokenManager: E,
      createdAt: g,
      lastLoginAt: v
    });
    return (
      T && Array.isArray(T) && (k.providerData = T.map((e) => Object.assign({}, e))),
      m && (k._redirectEventId = m),
      k
    );
  }
  static async _fromIdTokenResponse(e, t, n = !1) {
    const i = new ke();
    i.updateFromServerResponse(t);
    const r = new Ae({ uid: t.localId, auth: e, stsTokenManager: i, isAnonymous: n });
    return await we(r), r;
  }
}
class Se {
  constructor() {
    (this.type = 'NONE'), (this.storage = {});
  }
  async _isAvailable() {
    return !0;
  }
  async _set(e, t) {
    this.storage[e] = t;
  }
  async _get(e) {
    const t = this.storage[e];
    return void 0 === t ? null : t;
  }
  async _remove(e) {
    delete this.storage[e];
  }
  _addListener(e, t) {}
  _removeListener(e, t) {}
}
Se.type = 'NONE';
const Re = Se;
function Ne(e, t, n) {
  return `firebase:${e}:${t}:${n}`;
}
class Oe {
  constructor(e, t, n) {
    (this.persistence = e), (this.auth = t), (this.userKey = n);
    const { config: i, name: r } = this.auth;
    (this.fullUserKey = Ne(this.userKey, i.apiKey, r)),
      (this.fullPersistenceKey = Ne('persistence', i.apiKey, r)),
      (this.boundEventHandler = t._onStorageEvent.bind(t)),
      this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
  }
  setCurrentUser(e) {
    return this.persistence._set(this.fullUserKey, e.toJSON());
  }
  async getCurrentUser() {
    const e = await this.persistence._get(this.fullUserKey);
    return e ? Ae._fromJSON(this.auth, e) : null;
  }
  removeCurrentUser() {
    return this.persistence._remove(this.fullUserKey);
  }
  savePersistenceForRedirect() {
    return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
  }
  async setPersistence(e) {
    if (this.persistence === e) return;
    const t = await this.getCurrentUser();
    return (
      await this.removeCurrentUser(), (this.persistence = e), t ? this.setCurrentUser(t) : void 0
    );
  }
  delete() {
    this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
  }
  static async create(e, t, n = 'authUser') {
    if (!t.length) return new Oe(Y(Re), e, n);
    const i = (
      await Promise.all(
        t.map(async (e) => {
          if (await e._isAvailable()) return e;
        })
      )
    ).filter((e) => e);
    let r = i[0] || Y(Re);
    const s = Ne(n, e.config.apiKey, e.name);
    let o = null;
    for (const n of t)
      try {
        const t = await n._get(s);
        if (t) {
          const i = Ae._fromJSON(e, t);
          n !== r && (o = i), (r = n);
          break;
        }
      } catch (e) {}
    const a = i.filter((e) => e._shouldAllowMigration);
    return r._shouldAllowMigration && a.length
      ? ((r = a[0]),
        o && (await r._set(s, o.toJSON())),
        await Promise.all(
          t.map(async (e) => {
            if (e !== r)
              try {
                await e._remove(s);
              } catch (e) {}
          })
        ),
        new Oe(r, e, n))
      : new Oe(r, e, n);
  }
}
function Ce(e) {
  const t = e.toLowerCase();
  if (t.includes('opera/') || t.includes('opr/') || t.includes('opios/')) return 'Opera';
  if (Me(t)) return 'IEMobile';
  if (t.includes('msie') || t.includes('trident/')) return 'IE';
  if (t.includes('edge/')) return 'Edge';
  if (Pe(t)) return 'Firefox';
  if (t.includes('silk/')) return 'Silk';
  if (Fe(t)) return 'Blackberry';
  if (Ve(t)) return 'Webos';
  if (De(t)) return 'Safari';
  if ((t.includes('chrome/') || Le(t)) && !t.includes('edge/')) return 'Chrome';
  if (Ue(t)) return 'Android';
  {
    const t = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
      n = e.match(t);
    if (2 === (null == n ? void 0 : n.length)) return n[1];
  }
  return 'Other';
}
function Pe(e = a()) {
  return /firefox\//i.test(e);
}
function De(e = a()) {
  const t = e.toLowerCase();
  return (
    t.includes('safari/') &&
    !t.includes('chrome/') &&
    !t.includes('crios/') &&
    !t.includes('android')
  );
}
function Le(e = a()) {
  return /crios\//i.test(e);
}
function Me(e = a()) {
  return /iemobile/i.test(e);
}
function Ue(e = a()) {
  return /android/i.test(e);
}
function Fe(e = a()) {
  return /blackberry/i.test(e);
}
function Ve(e = a()) {
  return /webos/i.test(e);
}
function xe(e = a()) {
  return /iphone|ipad|ipod/i.test(e) || (/macintosh/i.test(e) && /mobile/i.test(e));
}
function He() {
  return (
    (function () {
      const e = a();
      return e.indexOf('MSIE ') >= 0 || e.indexOf('Trident/') >= 0;
    })() && 10 === document.documentMode
  );
}
function je(e = a()) {
  return xe(e) || Ue(e) || Ve(e) || Fe(e) || /windows phone/i.test(e) || Me(e);
}
function qe(e, t = []) {
  let n;
  switch (e) {
    case 'Browser':
      n = Ce(a());
      break;
    case 'Worker':
      n = `${Ce(a())}-${e}`;
      break;
    default:
      n = e;
  }
  const i = t.length ? t.join(',') : 'FirebaseCore-web';
  return `${n}/JsCore/${r}/${i}`;
}
class We {
  constructor(e) {
    (this.auth = e), (this.queue = []);
  }
  pushCallback(e, t) {
    const n = (t) =>
      new Promise((n, i) => {
        try {
          n(e(t));
        } catch (e) {
          i(e);
        }
      });
    (n.onAbort = t), this.queue.push(n);
    const i = this.queue.length - 1;
    return () => {
      this.queue[i] = () => Promise.resolve();
    };
  }
  async runMiddleware(e) {
    if (this.auth.currentUser === e) return;
    const t = [];
    try {
      for (const n of this.queue) await n(e), n.onAbort && t.push(n.onAbort);
    } catch (e) {
      t.reverse();
      for (const e of t)
        try {
          e();
        } catch (e) {}
      throw this.auth._errorFactory.create('login-blocked', {
        originalMessage: null == e ? void 0 : e.message
      });
    }
  }
}
class ze {
  constructor(e, t, n) {
    (this.app = e),
      (this.heartbeatServiceProvider = t),
      (this.config = n),
      (this.currentUser = null),
      (this.emulatorConfig = null),
      (this.operations = Promise.resolve()),
      (this.authStateSubscription = new Be(this)),
      (this.idTokenSubscription = new Be(this)),
      (this.beforeStateQueue = new We(this)),
      (this.redirectUser = null),
      (this.isProactiveRefreshEnabled = !1),
      (this._canInitEmulator = !0),
      (this._isInitialized = !1),
      (this._deleted = !1),
      (this._initializationPromise = null),
      (this._popupRedirectResolver = null),
      (this._errorFactory = F),
      (this.lastNotifiedUid = void 0),
      (this.languageCode = null),
      (this.tenantId = null),
      (this.settings = { appVerificationDisabledForTesting: !1 }),
      (this.frameworks = []),
      (this.name = e.name),
      (this.clientVersion = n.sdkClientVersion);
  }
  _initializeWithPersistence(e, t) {
    return (
      t && (this._popupRedirectResolver = Y(t)),
      (this._initializationPromise = this.queue(async () => {
        var n, i;
        if (
          !this._deleted &&
          ((this.persistenceManager = await Oe.create(this, e)), !this._deleted)
        ) {
          if (
            null === (n = this._popupRedirectResolver) || void 0 === n
              ? void 0
              : n._shouldInitProactively
          )
            try {
              await this._popupRedirectResolver._initialize(this);
            } catch (e) {}
          await this.initializeCurrentUser(t),
            (this.lastNotifiedUid =
              (null === (i = this.currentUser) || void 0 === i ? void 0 : i.uid) || null),
            this._deleted || (this._isInitialized = !0);
        }
      })),
      this._initializationPromise
    );
  }
  async _onStorageEvent() {
    if (this._deleted) return;
    const e = await this.assertedPersistence.getCurrentUser();
    return this.currentUser || e
      ? this.currentUser && e && this.currentUser.uid === e.uid
        ? (this._currentUser._assign(e), void (await this.currentUser.getIdToken()))
        : void (await this._updateCurrentUser(e, !0))
      : void 0;
  }
  async initializeCurrentUser(e) {
    var t;
    const n = await this.assertedPersistence.getCurrentUser();
    let i = n,
      r = !1;
    if (e && this.config.authDomain) {
      await this.getOrInitRedirectPersistenceManager();
      const n = null === (t = this.redirectUser) || void 0 === t ? void 0 : t._redirectEventId,
        s = null == i ? void 0 : i._redirectEventId,
        o = await this.tryRedirectSignIn(e);
      (n && n !== s) || !(null == o ? void 0 : o.user) || ((i = o.user), (r = !0));
    }
    if (!i) return this.directlySetCurrentUser(null);
    if (!i._redirectEventId) {
      if (r)
        try {
          await this.beforeStateQueue.runMiddleware(i);
        } catch (e) {
          (i = n),
            this._popupRedirectResolver._overrideRedirectResult(this, () => Promise.reject(e));
        }
      return i ? this.reloadAndSetCurrentUserOrClear(i) : this.directlySetCurrentUser(null);
    }
    return (
      B(this._popupRedirectResolver, this, 'argument-error'),
      await this.getOrInitRedirectPersistenceManager(),
      this.redirectUser && this.redirectUser._redirectEventId === i._redirectEventId
        ? this.directlySetCurrentUser(i)
        : this.reloadAndSetCurrentUserOrClear(i)
    );
  }
  async tryRedirectSignIn(e) {
    let t = null;
    try {
      t = await this._popupRedirectResolver._completeRedirectFn(this, e, !0);
    } catch (e) {
      await this._setRedirectUser(null);
    }
    return t;
  }
  async reloadAndSetCurrentUserOrClear(e) {
    try {
      await we(e);
    } catch (e) {
      if ('auth/network-request-failed' !== (null == e ? void 0 : e.code))
        return this.directlySetCurrentUser(null);
    }
    return this.directlySetCurrentUser(e);
  }
  useDeviceLanguage() {
    this.languageCode = (function () {
      if ('undefined' == typeof navigator) return null;
      const e = navigator;
      return (e.languages && e.languages[0]) || e.language || null;
    })();
  }
  async _delete() {
    this._deleted = !0;
  }
  async updateCurrentUser(e) {
    const t = e ? T(e) : null;
    return (
      t && B(t.auth.config.apiKey === this.config.apiKey, this, 'invalid-user-token'),
      this._updateCurrentUser(t && t._clone(this))
    );
  }
  async _updateCurrentUser(e, t = !1) {
    if (!this._deleted)
      return (
        e && B(this.tenantId === e.tenantId, this, 'tenant-id-mismatch'),
        t || (await this.beforeStateQueue.runMiddleware(e)),
        this.queue(async () => {
          await this.directlySetCurrentUser(e), this.notifyAuthListeners();
        })
      );
  }
  async signOut() {
    return (
      await this.beforeStateQueue.runMiddleware(null),
      (this.redirectPersistenceManager || this._popupRedirectResolver) &&
        (await this._setRedirectUser(null)),
      this._updateCurrentUser(null, !0)
    );
  }
  setPersistence(e) {
    return this.queue(async () => {
      await this.assertedPersistence.setPersistence(Y(e));
    });
  }
  _getPersistence() {
    return this.assertedPersistence.persistence.type;
  }
  _updateErrorMap(e) {
    this._errorFactory = new h('auth', 'Firebase', e());
  }
  onAuthStateChanged(e, t, n) {
    return this.registerStateListener(this.authStateSubscription, e, t, n);
  }
  beforeAuthStateChanged(e, t) {
    return this.beforeStateQueue.pushCallback(e, t);
  }
  onIdTokenChanged(e, t, n) {
    return this.registerStateListener(this.idTokenSubscription, e, t, n);
  }
  toJSON() {
    var e;
    return {
      apiKey: this.config.apiKey,
      authDomain: this.config.authDomain,
      appName: this.name,
      currentUser: null === (e = this._currentUser) || void 0 === e ? void 0 : e.toJSON()
    };
  }
  async _setRedirectUser(e, t) {
    const n = await this.getOrInitRedirectPersistenceManager(t);
    return null === e ? n.removeCurrentUser() : n.setCurrentUser(e);
  }
  async getOrInitRedirectPersistenceManager(e) {
    if (!this.redirectPersistenceManager) {
      const t = (e && Y(e)) || this._popupRedirectResolver;
      B(t, this, 'argument-error'),
        (this.redirectPersistenceManager = await Oe.create(
          this,
          [Y(t._redirectPersistence)],
          'redirectUser'
        )),
        (this.redirectUser = await this.redirectPersistenceManager.getCurrentUser());
    }
    return this.redirectPersistenceManager;
  }
  async _redirectUserForId(e) {
    var t, n;
    return (
      this._isInitialized && (await this.queue(async () => {})),
      (null === (t = this._currentUser) || void 0 === t ? void 0 : t._redirectEventId) === e
        ? this._currentUser
        : (null === (n = this.redirectUser) || void 0 === n ? void 0 : n._redirectEventId) === e
        ? this.redirectUser
        : null
    );
  }
  async _persistUserIfCurrent(e) {
    if (e === this.currentUser) return this.queue(async () => this.directlySetCurrentUser(e));
  }
  _notifyListenersIfCurrent(e) {
    e === this.currentUser && this.notifyAuthListeners();
  }
  _key() {
    return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
  }
  _startProactiveRefresh() {
    (this.isProactiveRefreshEnabled = !0),
      this.currentUser && this._currentUser._startProactiveRefresh();
  }
  _stopProactiveRefresh() {
    (this.isProactiveRefreshEnabled = !1),
      this.currentUser && this._currentUser._stopProactiveRefresh();
  }
  get _currentUser() {
    return this.currentUser;
  }
  notifyAuthListeners() {
    var e, t;
    if (!this._isInitialized) return;
    this.idTokenSubscription.next(this.currentUser);
    const n =
      null !== (t = null === (e = this.currentUser) || void 0 === e ? void 0 : e.uid) &&
      void 0 !== t
        ? t
        : null;
    this.lastNotifiedUid !== n &&
      ((this.lastNotifiedUid = n), this.authStateSubscription.next(this.currentUser));
  }
  registerStateListener(e, t, n, i) {
    if (this._deleted) return () => {};
    const r = 'function' == typeof t ? t : t.next.bind(t),
      s = this._isInitialized ? Promise.resolve() : this._initializationPromise;
    return (
      B(s, this, 'internal-error'),
      s.then(() => r(this.currentUser)),
      'function' == typeof t ? e.addObserver(t, n, i) : e.addObserver(t)
    );
  }
  async directlySetCurrentUser(e) {
    this.currentUser && this.currentUser !== e && this._currentUser._stopProactiveRefresh(),
      e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(),
      (this.currentUser = e),
      e
        ? await this.assertedPersistence.setCurrentUser(e)
        : await this.assertedPersistence.removeCurrentUser();
  }
  queue(e) {
    return (this.operations = this.operations.then(e, e)), this.operations;
  }
  get assertedPersistence() {
    return B(this.persistenceManager, this, 'internal-error'), this.persistenceManager;
  }
  _logFramework(e) {
    e &&
      !this.frameworks.includes(e) &&
      (this.frameworks.push(e),
      this.frameworks.sort(),
      (this.clientVersion = qe(this.config.clientPlatform, this._getFrameworks())));
  }
  _getFrameworks() {
    return this.frameworks;
  }
  async _getAdditionalHeaders() {
    var e;
    const t = { 'X-Client-Version': this.clientVersion };
    this.app.options.appId && (t['X-Firebase-gmpid'] = this.app.options.appId);
    const n = await (null === (e = this.heartbeatServiceProvider.getImmediate({ optional: !0 })) ||
    void 0 === e
      ? void 0
      : e.getHeartbeatsHeader());
    return n && (t['X-Firebase-Client'] = n), t;
  }
}
function Ge(e) {
  return T(e);
}
class Be {
  constructor(e) {
    (this.auth = e),
      (this.observer = null),
      (this.addObserver = (function (e, t) {
        const n = new I(e, t);
        return n.subscribe.bind(n);
      })((e) => (this.observer = e)));
  }
  get next() {
    return B(this.observer, this.auth, 'internal-error'), this.observer.next.bind(this.observer);
  }
}
function Ke(e, t, n) {
  const i = Ge(e);
  B(i._canInitEmulator, i, 'emulator-config-failed'),
    B(/^https?:\/\//.test(t), i, 'invalid-emulator-scheme');
  const r = !!(null == n ? void 0 : n.disableWarnings),
    s = $e(t),
    { host: o, port: a } = (function (e) {
      const t = $e(e),
        n = /(\/\/)?([^?#/]+)/.exec(e.substr(t.length));
      if (!n) return { host: '', port: null };
      const i = n[2].split('@').pop() || '',
        r = /^(\[[^\]]+\])(:|$)/.exec(i);
      if (r) {
        const e = r[1];
        return { host: e, port: Je(i.substr(e.length + 1)) };
      }
      {
        const [e, t] = i.split(':');
        return { host: e, port: Je(t) };
      }
    })(t),
    c = null === a ? '' : `:${a}`;
  (i.config.emulator = { url: `${s}//${o}${c}/` }),
    (i.settings.appVerificationDisabledForTesting = !0),
    (i.emulatorConfig = Object.freeze({
      host: o,
      port: a,
      protocol: s.replace(':', ''),
      options: Object.freeze({ disableWarnings: r })
    })),
    r ||
      (function () {
        function e() {
          const e = document.createElement('p'),
            t = e.style;
          (e.innerText = 'Running in emulator mode. Do not use with production credentials.'),
            (t.position = 'fixed'),
            (t.width = '100%'),
            (t.backgroundColor = '#ffffff'),
            (t.border = '.1em solid #000000'),
            (t.color = '#b50000'),
            (t.bottom = '0px'),
            (t.left = '0px'),
            (t.margin = '0px'),
            (t.zIndex = '10000'),
            (t.textAlign = 'center'),
            e.classList.add('firebase-emulator-warning'),
            document.body.appendChild(e);
        }
        'undefined' != typeof console &&
          'function' == typeof console.info &&
          console.info(
            'WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.'
          );
        'undefined' != typeof window &&
          'undefined' != typeof document &&
          ('loading' === document.readyState
            ? window.addEventListener('DOMContentLoaded', e)
            : e());
      })();
}
function $e(e) {
  const t = e.indexOf(':');
  return t < 0 ? '' : e.substr(0, t + 1);
}
function Je(e) {
  if (!e) return null;
  const t = Number(e);
  return isNaN(t) ? null : t;
}
class Ye {
  constructor(e, t) {
    (this.providerId = e), (this.signInMethod = t);
  }
  toJSON() {
    return K('not implemented');
  }
  _getIdTokenResponse(e) {
    return K('not implemented');
  }
  _linkToIdToken(e, t) {
    return K('not implemented');
  }
  _getReauthenticationResolver(e) {
    return K('not implemented');
  }
}
async function Xe(e, t) {
  return ce(e, 'POST', '/v1/accounts:resetPassword', ae(e, t));
}
async function Qe(e, t) {
  return ce(e, 'POST', '/v1/accounts:update', t);
}
async function Ze(e, t) {
  return ce(e, 'POST', '/v1/accounts:sendOobCode', ae(e, t));
}
class et extends Ye {
  constructor(e, t, n, i = null) {
    super('password', n), (this._email = e), (this._password = t), (this._tenantId = i);
  }
  static _fromEmailAndPassword(e, t) {
    return new et(e, t, 'password');
  }
  static _fromEmailAndCode(e, t, n = null) {
    return new et(e, t, 'emailLink', n);
  }
  toJSON() {
    return {
      email: this._email,
      password: this._password,
      signInMethod: this.signInMethod,
      tenantId: this._tenantId
    };
  }
  static fromJSON(e) {
    const t = 'string' == typeof e ? JSON.parse(e) : e;
    if ((null == t ? void 0 : t.email) && (null == t ? void 0 : t.password)) {
      if ('password' === t.signInMethod) return this._fromEmailAndPassword(t.email, t.password);
      if ('emailLink' === t.signInMethod)
        return this._fromEmailAndCode(t.email, t.password, t.tenantId);
    }
    return null;
  }
  async _getIdTokenResponse(e) {
    switch (this.signInMethod) {
      case 'password':
        return (async function (e, t) {
          return de(e, 'POST', '/v1/accounts:signInWithPassword', ae(e, t));
        })(e, { returnSecureToken: !0, email: this._email, password: this._password });
      case 'emailLink':
        return (async function (e, t) {
          return de(e, 'POST', '/v1/accounts:signInWithEmailLink', ae(e, t));
        })(e, { email: this._email, oobCode: this._password });
      default:
        j(e, 'internal-error');
    }
  }
  async _linkToIdToken(e, t) {
    switch (this.signInMethod) {
      case 'password':
        return Qe(e, {
          idToken: t,
          returnSecureToken: !0,
          email: this._email,
          password: this._password
        });
      case 'emailLink':
        return (async function (e, t) {
          return de(e, 'POST', '/v1/accounts:signInWithEmailLink', ae(e, t));
        })(e, { idToken: t, email: this._email, oobCode: this._password });
      default:
        j(e, 'internal-error');
    }
  }
  _getReauthenticationResolver(e) {
    return this._getIdTokenResponse(e);
  }
}
async function tt(e, t) {
  return de(e, 'POST', '/v1/accounts:signInWithIdp', ae(e, t));
}
class nt extends Ye {
  constructor() {
    super(...arguments), (this.pendingToken = null);
  }
  static _fromParams(e) {
    const t = new nt(e.providerId, e.signInMethod);
    return (
      e.idToken || e.accessToken
        ? (e.idToken && (t.idToken = e.idToken),
          e.accessToken && (t.accessToken = e.accessToken),
          e.nonce && !e.pendingToken && (t.nonce = e.nonce),
          e.pendingToken && (t.pendingToken = e.pendingToken))
        : e.oauthToken && e.oauthTokenSecret
        ? ((t.accessToken = e.oauthToken), (t.secret = e.oauthTokenSecret))
        : j('argument-error'),
      t
    );
  }
  toJSON() {
    return {
      idToken: this.idToken,
      accessToken: this.accessToken,
      secret: this.secret,
      nonce: this.nonce,
      pendingToken: this.pendingToken,
      providerId: this.providerId,
      signInMethod: this.signInMethod
    };
  }
  static fromJSON(e) {
    const t = 'string' == typeof e ? JSON.parse(e) : e,
      { providerId: n, signInMethod: i } = t,
      r = S(t, ['providerId', 'signInMethod']);
    if (!n || !i) return null;
    const s = new nt(n, i);
    return (
      (s.idToken = r.idToken || void 0),
      (s.accessToken = r.accessToken || void 0),
      (s.secret = r.secret),
      (s.nonce = r.nonce),
      (s.pendingToken = r.pendingToken || null),
      s
    );
  }
  _getIdTokenResponse(e) {
    return tt(e, this.buildRequest());
  }
  _linkToIdToken(e, t) {
    const n = this.buildRequest();
    return (n.idToken = t), tt(e, n);
  }
  _getReauthenticationResolver(e) {
    const t = this.buildRequest();
    return (t.autoCreate = !1), tt(e, t);
  }
  buildRequest() {
    const e = { requestUri: 'http://localhost', returnSecureToken: !0 };
    if (this.pendingToken) e.pendingToken = this.pendingToken;
    else {
      const t = {};
      this.idToken && (t.id_token = this.idToken),
        this.accessToken && (t.access_token = this.accessToken),
        this.secret && (t.oauth_token_secret = this.secret),
        (t.providerId = this.providerId),
        this.nonce && !this.pendingToken && (t.nonce = this.nonce),
        (e.postBody = g(t));
    }
    return e;
  }
}
const it = { USER_NOT_FOUND: 'user-not-found' };
class rt extends Ye {
  constructor(e) {
    super('phone', 'phone'), (this.params = e);
  }
  static _fromVerification(e, t) {
    return new rt({ verificationId: e, verificationCode: t });
  }
  static _fromTokenResponse(e, t) {
    return new rt({ phoneNumber: e, temporaryProof: t });
  }
  _getIdTokenResponse(e) {
    return (async function (e, t) {
      return de(e, 'POST', '/v1/accounts:signInWithPhoneNumber', ae(e, t));
    })(e, this._makeVerificationRequest());
  }
  _linkToIdToken(e, t) {
    return (async function (e, t) {
      const n = await de(e, 'POST', '/v1/accounts:signInWithPhoneNumber', ae(e, t));
      if (n.temporaryProof) throw pe(e, 'account-exists-with-different-credential', n);
      return n;
    })(e, Object.assign({ idToken: t }, this._makeVerificationRequest()));
  }
  _getReauthenticationResolver(e) {
    return (async function (e, t) {
      return de(
        e,
        'POST',
        '/v1/accounts:signInWithPhoneNumber',
        ae(e, Object.assign(Object.assign({}, t), { operation: 'REAUTH' })),
        it
      );
    })(e, this._makeVerificationRequest());
  }
  _makeVerificationRequest() {
    const {
      temporaryProof: e,
      phoneNumber: t,
      verificationId: n,
      verificationCode: i
    } = this.params;
    return e && t ? { temporaryProof: e, phoneNumber: t } : { sessionInfo: n, code: i };
  }
  toJSON() {
    const e = { providerId: this.providerId };
    return (
      this.params.phoneNumber && (e.phoneNumber = this.params.phoneNumber),
      this.params.temporaryProof && (e.temporaryProof = this.params.temporaryProof),
      this.params.verificationCode && (e.verificationCode = this.params.verificationCode),
      this.params.verificationId && (e.verificationId = this.params.verificationId),
      e
    );
  }
  static fromJSON(e) {
    'string' == typeof e && (e = JSON.parse(e));
    const { verificationId: t, verificationCode: n, phoneNumber: i, temporaryProof: r } = e;
    return n || t || i || r
      ? new rt({ verificationId: t, verificationCode: n, phoneNumber: i, temporaryProof: r })
      : null;
  }
}
class st {
  constructor(e) {
    var t, n, i, r, s, o;
    const a = v(_(e)),
      c = null !== (t = a.apiKey) && void 0 !== t ? t : null,
      u = null !== (n = a.oobCode) && void 0 !== n ? n : null,
      d = (function (e) {
        switch (e) {
          case 'recoverEmail':
            return 'RECOVER_EMAIL';
          case 'resetPassword':
            return 'PASSWORD_RESET';
          case 'signIn':
            return 'EMAIL_SIGNIN';
          case 'verifyEmail':
            return 'VERIFY_EMAIL';
          case 'verifyAndChangeEmail':
            return 'VERIFY_AND_CHANGE_EMAIL';
          case 'revertSecondFactorAddition':
            return 'REVERT_SECOND_FACTOR_ADDITION';
          default:
            return null;
        }
      })(null !== (i = a.mode) && void 0 !== i ? i : null);
    B(c && u && d, 'argument-error'),
      (this.apiKey = c),
      (this.operation = d),
      (this.code = u),
      (this.continueUrl = null !== (r = a.continueUrl) && void 0 !== r ? r : null),
      (this.languageCode = null !== (s = a.languageCode) && void 0 !== s ? s : null),
      (this.tenantId = null !== (o = a.tenantId) && void 0 !== o ? o : null);
  }
  static parseLink(e) {
    const t = (function (e) {
      const t = v(_(e)).link,
        n = t ? v(_(t)).deep_link_id : null,
        i = v(_(e)).deep_link_id;
      return (i ? v(_(i)).link : null) || i || n || t || e;
    })(e);
    try {
      return new st(t);
    } catch (e) {
      return null;
    }
  }
}
function ot(e) {
  return st.parseLink(e);
}
class at {
  constructor() {
    this.providerId = at.PROVIDER_ID;
  }
  static credential(e, t) {
    return et._fromEmailAndPassword(e, t);
  }
  static credentialWithLink(e, t) {
    const n = st.parseLink(t);
    return B(n, 'argument-error'), et._fromEmailAndCode(e, n.code, n.tenantId);
  }
}
(at.PROVIDER_ID = 'password'),
  (at.EMAIL_PASSWORD_SIGN_IN_METHOD = 'password'),
  (at.EMAIL_LINK_SIGN_IN_METHOD = 'emailLink');
class ct {
  constructor(e) {
    (this.providerId = e), (this.defaultLanguageCode = null), (this.customParameters = {});
  }
  setDefaultLanguage(e) {
    this.defaultLanguageCode = e;
  }
  setCustomParameters(e) {
    return (this.customParameters = e), this;
  }
  getCustomParameters() {
    return this.customParameters;
  }
}
class ut extends ct {
  constructor() {
    super(...arguments), (this.scopes = []);
  }
  addScope(e) {
    return this.scopes.includes(e) || this.scopes.push(e), this;
  }
  getScopes() {
    return [...this.scopes];
  }
}
class dt extends ut {
  static credentialFromJSON(e) {
    const t = 'string' == typeof e ? JSON.parse(e) : e;
    return B('providerId' in t && 'signInMethod' in t, 'argument-error'), nt._fromParams(t);
  }
  credential(e) {
    return this._credential(Object.assign(Object.assign({}, e), { nonce: e.rawNonce }));
  }
  _credential(e) {
    return (
      B(e.idToken || e.accessToken, 'argument-error'),
      nt._fromParams(
        Object.assign(Object.assign({}, e), {
          providerId: this.providerId,
          signInMethod: this.providerId
        })
      )
    );
  }
  static credentialFromResult(e) {
    return dt.oauthCredentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return dt.oauthCredentialFromTaggedObject(e.customData || {});
  }
  static oauthCredentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e) return null;
    const {
      oauthIdToken: t,
      oauthAccessToken: n,
      oauthTokenSecret: i,
      pendingToken: r,
      nonce: s,
      providerId: o
    } = e;
    if (!(n || i || t || r)) return null;
    if (!o) return null;
    try {
      return new dt(o)._credential({ idToken: t, accessToken: n, nonce: s, pendingToken: r });
    } catch (e) {
      return null;
    }
  }
}
class lt extends ut {
  constructor() {
    super('facebook.com');
  }
  static credential(e) {
    return nt._fromParams({
      providerId: lt.PROVIDER_ID,
      signInMethod: lt.FACEBOOK_SIGN_IN_METHOD,
      accessToken: e
    });
  }
  static credentialFromResult(e) {
    return lt.credentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return lt.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e || !('oauthAccessToken' in e)) return null;
    if (!e.oauthAccessToken) return null;
    try {
      return lt.credential(e.oauthAccessToken);
    } catch (e) {
      return null;
    }
  }
}
(lt.FACEBOOK_SIGN_IN_METHOD = 'facebook.com'), (lt.PROVIDER_ID = 'facebook.com');
class ht extends ut {
  constructor() {
    super('google.com'), this.addScope('profile');
  }
  static credential(e, t) {
    return nt._fromParams({
      providerId: ht.PROVIDER_ID,
      signInMethod: ht.GOOGLE_SIGN_IN_METHOD,
      idToken: e,
      accessToken: t
    });
  }
  static credentialFromResult(e) {
    return ht.credentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return ht.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e) return null;
    const { oauthIdToken: t, oauthAccessToken: n } = e;
    if (!t && !n) return null;
    try {
      return ht.credential(t, n);
    } catch (e) {
      return null;
    }
  }
}
(ht.GOOGLE_SIGN_IN_METHOD = 'google.com'), (ht.PROVIDER_ID = 'google.com');
class pt extends ut {
  constructor() {
    super('github.com');
  }
  static credential(e) {
    return nt._fromParams({
      providerId: pt.PROVIDER_ID,
      signInMethod: pt.GITHUB_SIGN_IN_METHOD,
      accessToken: e
    });
  }
  static credentialFromResult(e) {
    return pt.credentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return pt.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e || !('oauthAccessToken' in e)) return null;
    if (!e.oauthAccessToken) return null;
    try {
      return pt.credential(e.oauthAccessToken);
    } catch (e) {
      return null;
    }
  }
}
(pt.GITHUB_SIGN_IN_METHOD = 'github.com'), (pt.PROVIDER_ID = 'github.com');
class ft extends Ye {
  constructor(e, t) {
    super(e, e), (this.pendingToken = t);
  }
  _getIdTokenResponse(e) {
    return tt(e, this.buildRequest());
  }
  _linkToIdToken(e, t) {
    const n = this.buildRequest();
    return (n.idToken = t), tt(e, n);
  }
  _getReauthenticationResolver(e) {
    const t = this.buildRequest();
    return (t.autoCreate = !1), tt(e, t);
  }
  toJSON() {
    return {
      signInMethod: this.signInMethod,
      providerId: this.providerId,
      pendingToken: this.pendingToken
    };
  }
  static fromJSON(e) {
    const t = 'string' == typeof e ? JSON.parse(e) : e,
      { providerId: n, signInMethod: i, pendingToken: r } = t;
    return n && i && r && n === i ? new ft(n, r) : null;
  }
  static _create(e, t) {
    return new ft(e, t);
  }
  buildRequest() {
    return {
      requestUri: 'http://localhost',
      returnSecureToken: !0,
      pendingToken: this.pendingToken
    };
  }
}
class mt extends ct {
  constructor(e) {
    B(e.startsWith('saml.'), 'argument-error'), super(e);
  }
  static credentialFromResult(e) {
    return mt.samlCredentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return mt.samlCredentialFromTaggedObject(e.customData || {});
  }
  static credentialFromJSON(e) {
    const t = ft.fromJSON(e);
    return B(t, 'argument-error'), t;
  }
  static samlCredentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e) return null;
    const { pendingToken: t, providerId: n } = e;
    if (!t || !n) return null;
    try {
      return ft._create(n, t);
    } catch (e) {
      return null;
    }
  }
}
class gt extends ut {
  constructor() {
    super('twitter.com');
  }
  static credential(e, t) {
    return nt._fromParams({
      providerId: gt.PROVIDER_ID,
      signInMethod: gt.TWITTER_SIGN_IN_METHOD,
      oauthToken: e,
      oauthTokenSecret: t
    });
  }
  static credentialFromResult(e) {
    return gt.credentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return gt.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e) return null;
    const { oauthAccessToken: t, oauthTokenSecret: n } = e;
    if (!t || !n) return null;
    try {
      return gt.credential(t, n);
    } catch (e) {
      return null;
    }
  }
}
async function vt(e, t) {
  return de(e, 'POST', '/v1/accounts:signUp', ae(e, t));
}
(gt.TWITTER_SIGN_IN_METHOD = 'twitter.com'), (gt.PROVIDER_ID = 'twitter.com');
class _t {
  constructor(e) {
    (this.user = e.user),
      (this.providerId = e.providerId),
      (this._tokenResponse = e._tokenResponse),
      (this.operationType = e.operationType);
  }
  static async _fromIdTokenResponse(e, t, n, i = !1) {
    const r = await Ae._fromIdTokenResponse(e, n, i),
      s = It(n);
    return new _t({ user: r, providerId: s, _tokenResponse: n, operationType: t });
  }
  static async _forOperation(e, t, n) {
    await e._updateTokensIfNecessary(n, !0);
    const i = It(n);
    return new _t({ user: e, providerId: i, _tokenResponse: n, operationType: t });
  }
}
function It(e) {
  return e.providerId ? e.providerId : 'phoneNumber' in e ? 'phone' : null;
}
async function yt(e) {
  var t;
  const n = Ge(e);
  if (
    (await n._initializationPromise,
    null === (t = n.currentUser) || void 0 === t ? void 0 : t.isAnonymous)
  )
    return new _t({ user: n.currentUser, providerId: null, operationType: 'signIn' });
  const i = await vt(n, { returnSecureToken: !0 }),
    r = await _t._fromIdTokenResponse(n, 'signIn', i, !0);
  return await n._updateCurrentUser(r.user), r;
}
class Tt extends l {
  constructor(e, t, n, i) {
    var r;
    super(t.code, t.message),
      (this.operationType = n),
      (this.user = i),
      Object.setPrototypeOf(this, Tt.prototype),
      (this.customData = {
        appName: e.name,
        tenantId: null !== (r = e.tenantId) && void 0 !== r ? r : void 0,
        _serverResponse: t.customData._serverResponse,
        operationType: n
      });
  }
  static _fromErrorAndOperation(e, t, n, i) {
    return new Tt(e, t, n, i);
  }
}
function wt(e, t, n, i) {
  return (
    'reauthenticate' === t ? n._getReauthenticationResolver(e) : n._getIdTokenResponse(e)
  ).catch((n) => {
    if ('auth/multi-factor-auth-required' === n.code) throw Tt._fromErrorAndOperation(e, n, t, i);
    throw n;
  });
}
function Et(e) {
  return new Set(e.map(({ providerId: e }) => e).filter((e) => !!e));
}
async function kt(e, t) {
  const n = T(e);
  await At(!0, n, t);
  const { providerUserInfo: i } = await (async function (e, t) {
      return ce(e, 'POST', '/v1/accounts:update', t);
    })(n.auth, { idToken: await n.getIdToken(), deleteProvider: [t] }),
    r = Et(i || []);
  return (
    (n.providerData = n.providerData.filter((e) => r.has(e.providerId))),
    r.has('phone') || (n.phoneNumber = null),
    await n.auth._persistUserIfCurrent(n),
    n
  );
}
async function bt(e, t, n = !1) {
  const i = await Ie(e, t._linkToIdToken(e.auth, await e.getIdToken()), n);
  return _t._forOperation(e, 'link', i);
}
async function At(e, t, n) {
  await we(t);
  const i = !1 === e ? 'provider-already-linked' : 'no-such-provider';
  B(Et(t.providerData).has(n) === e, t.auth, i);
}
async function St(e, t, n = !1) {
  const { auth: i } = e,
    r = 'reauthenticate';
  try {
    const s = await Ie(e, wt(i, r, t, e), n);
    B(s.idToken, i, 'internal-error');
    const o = _e(s.idToken);
    B(o, i, 'internal-error');
    const { sub: a } = o;
    return B(e.uid === a, i, 'user-mismatch'), _t._forOperation(e, r, s);
  } catch (e) {
    throw ('auth/user-not-found' === (null == e ? void 0 : e.code) && j(i, 'user-mismatch'), e);
  }
}
async function Rt(e, t, n = !1) {
  const i = 'signIn',
    r = await wt(e, i, t),
    s = await _t._fromIdTokenResponse(e, i, r);
  return n || (await e._updateCurrentUser(s.user)), s;
}
async function Nt(e, t) {
  return Rt(Ge(e), t);
}
async function Ot(e, t) {
  const n = T(e);
  return await At(!1, n, t.providerId), bt(n, t);
}
async function Ct(e, t) {
  return St(T(e), t);
}
async function Pt(e, t) {
  const n = Ge(e),
    i = await (async function (e, t) {
      return de(e, 'POST', '/v1/accounts:signInWithCustomToken', ae(e, t));
    })(n, { token: t, returnSecureToken: !0 }),
    r = await _t._fromIdTokenResponse(n, 'signIn', i);
  return await n._updateCurrentUser(r.user), r;
}
class Dt {
  constructor(e, t) {
    (this.factorId = e),
      (this.uid = t.mfaEnrollmentId),
      (this.enrollmentTime = new Date(t.enrolledAt).toUTCString()),
      (this.displayName = t.displayName);
  }
  static _fromServerResponse(e, t) {
    return 'phoneInfo' in t ? Lt._fromServerResponse(e, t) : j(e, 'internal-error');
  }
}
class Lt extends Dt {
  constructor(e) {
    super('phone', e), (this.phoneNumber = e.phoneInfo);
  }
  static _fromServerResponse(e, t) {
    return new Lt(t);
  }
}
function Mt(e, t, n) {
  var i;
  B((null === (i = n.url) || void 0 === i ? void 0 : i.length) > 0, e, 'invalid-continue-uri'),
    B(
      void 0 === n.dynamicLinkDomain || n.dynamicLinkDomain.length > 0,
      e,
      'invalid-dynamic-link-domain'
    ),
    (t.continueUrl = n.url),
    (t.dynamicLinkDomain = n.dynamicLinkDomain),
    (t.canHandleCodeInApp = n.handleCodeInApp),
    n.iOS &&
      (B(n.iOS.bundleId.length > 0, e, 'missing-ios-bundle-id'), (t.iOSBundleId = n.iOS.bundleId)),
    n.android &&
      (B(n.android.packageName.length > 0, e, 'missing-android-pkg-name'),
      (t.androidInstallApp = n.android.installApp),
      (t.androidMinimumVersionCode = n.android.minimumVersion),
      (t.androidPackageName = n.android.packageName));
}
async function Ut(e, t, n) {
  const i = T(e),
    r = { requestType: 'PASSWORD_RESET', email: t };
  n && Mt(i, r, n),
    await (async function (e, t) {
      return Ze(e, t);
    })(i, r);
}
async function Ft(e, t, n) {
  await Xe(T(e), { oobCode: t, newPassword: n });
}
async function Vt(e, t) {
  await (async function (e, t) {
    return ce(e, 'POST', '/v1/accounts:update', ae(e, t));
  })(T(e), { oobCode: t });
}
async function xt(e, t) {
  const n = T(e),
    i = await Xe(n, { oobCode: t }),
    r = i.requestType;
  switch ((B(r, n, 'internal-error'), r)) {
    case 'EMAIL_SIGNIN':
      break;
    case 'VERIFY_AND_CHANGE_EMAIL':
      B(i.newEmail, n, 'internal-error');
      break;
    case 'REVERT_SECOND_FACTOR_ADDITION':
      B(i.mfaInfo, n, 'internal-error');
    default:
      B(i.email, n, 'internal-error');
  }
  let s = null;
  return (
    i.mfaInfo && (s = Dt._fromServerResponse(Ge(n), i.mfaInfo)),
    {
      data: {
        email: ('VERIFY_AND_CHANGE_EMAIL' === i.requestType ? i.newEmail : i.email) || null,
        previousEmail: ('VERIFY_AND_CHANGE_EMAIL' === i.requestType ? i.email : i.newEmail) || null,
        multiFactorInfo: s
      },
      operation: r
    }
  );
}
async function Ht(e, t) {
  const { data: n } = await xt(T(e), t);
  return n.email;
}
async function jt(e, t, n) {
  const i = Ge(e),
    r = await vt(i, { returnSecureToken: !0, email: t, password: n }),
    s = await _t._fromIdTokenResponse(i, 'signIn', r);
  return await i._updateCurrentUser(s.user), s;
}
function qt(e, t, n) {
  return Nt(T(e), at.credential(t, n));
}
async function Wt(e, t, n) {
  const i = T(e),
    r = { requestType: 'EMAIL_SIGNIN', email: t };
  B(n.handleCodeInApp, i, 'argument-error'),
    n && Mt(i, r, n),
    await (async function (e, t) {
      return Ze(e, t);
    })(i, r);
}
function zt(e, t) {
  const n = st.parseLink(t);
  return 'EMAIL_SIGNIN' === (null == n ? void 0 : n.operation);
}
async function Gt(e, t, n) {
  const i = T(e),
    r = at.credentialWithLink(t, n || Q());
  return B(r._tenantId === (i.tenantId || null), i, 'tenant-id-mismatch'), Nt(i, r);
}
async function Bt(e, t) {
  const n = { identifier: t, continueUri: Z() ? Q() : 'http://localhost' },
    { signinMethods: i } = await (async function (e, t) {
      return ce(e, 'POST', '/v1/accounts:createAuthUri', ae(e, t));
    })(T(e), n);
  return i || [];
}
async function Kt(e, t) {
  const n = T(e),
    i = { requestType: 'VERIFY_EMAIL', idToken: await e.getIdToken() };
  t && Mt(n.auth, i, t);
  const { email: r } = await (async function (e, t) {
    return Ze(e, t);
  })(n.auth, i);
  r !== e.email && (await e.reload());
}
async function $t(e, t, n) {
  const i = T(e),
    r = { requestType: 'VERIFY_AND_CHANGE_EMAIL', idToken: await e.getIdToken(), newEmail: t };
  n && Mt(i.auth, r, n);
  const { email: s } = await (async function (e, t) {
    return Ze(e, t);
  })(i.auth, r);
  s !== e.email && (await e.reload());
}
async function Jt(e, { displayName: t, photoURL: n }) {
  if (void 0 === t && void 0 === n) return;
  const i = T(e),
    r = { idToken: await i.getIdToken(), displayName: t, photoUrl: n, returnSecureToken: !0 },
    s = await Ie(
      i,
      (async function (e, t) {
        return ce(e, 'POST', '/v1/accounts:update', t);
      })(i.auth, r)
    );
  (i.displayName = s.displayName || null), (i.photoURL = s.photoUrl || null);
  const o = i.providerData.find(({ providerId: e }) => 'password' === e);
  o && ((o.displayName = i.displayName), (o.photoURL = i.photoURL)),
    await i._updateTokensIfNecessary(s);
}
function Yt(e, t) {
  return Qt(T(e), t, null);
}
function Xt(e, t) {
  return Qt(T(e), null, t);
}
async function Qt(e, t, n) {
  const { auth: i } = e,
    r = { idToken: await e.getIdToken(), returnSecureToken: !0 };
  t && (r.email = t), n && (r.password = n);
  const s = await Ie(e, Qe(i, r));
  await e._updateTokensIfNecessary(s, !0);
}
class Zt {
  constructor(e, t, n = {}) {
    (this.isNewUser = e), (this.providerId = t), (this.profile = n);
  }
}
class en extends Zt {
  constructor(e, t, n, i) {
    super(e, t, n), (this.username = i);
  }
}
class tn extends Zt {
  constructor(e, t) {
    super(e, 'facebook.com', t);
  }
}
class nn extends en {
  constructor(e, t) {
    super(
      e,
      'github.com',
      t,
      'string' == typeof (null == t ? void 0 : t.login) ? (null == t ? void 0 : t.login) : null
    );
  }
}
class rn extends Zt {
  constructor(e, t) {
    super(e, 'google.com', t);
  }
}
class sn extends en {
  constructor(e, t, n) {
    super(e, 'twitter.com', t, n);
  }
}
function on(e) {
  const { user: t, _tokenResponse: n } = e;
  return t.isAnonymous && !n
    ? { providerId: null, isNewUser: !1, profile: null }
    : (function (e) {
        var t, n;
        if (!e) return null;
        const { providerId: i } = e,
          r = e.rawUserInfo ? JSON.parse(e.rawUserInfo) : {},
          s = e.isNewUser || 'identitytoolkit#SignupNewUserResponse' === e.kind;
        if (!i && (null == e ? void 0 : e.idToken)) {
          const i =
            null === (n = null === (t = _e(e.idToken)) || void 0 === t ? void 0 : t.firebase) ||
            void 0 === n
              ? void 0
              : n.sign_in_provider;
          if (i) return new Zt(s, 'anonymous' !== i && 'custom' !== i ? i : null);
        }
        if (!i) return null;
        switch (i) {
          case 'facebook.com':
            return new tn(s, r);
          case 'github.com':
            return new nn(s, r);
          case 'google.com':
            return new rn(s, r);
          case 'twitter.com':
            return new sn(s, r, e.screenName || null);
          case 'custom':
          case 'anonymous':
            return new Zt(s, null);
          default:
            return new Zt(s, i, r);
        }
      })(n);
}
function an(e, t) {
  return T(e).setPersistence(t);
}
function cn(e, t, n, i) {
  return T(e).onIdTokenChanged(t, n, i);
}
function un(e, t, n) {
  return T(e).beforeAuthStateChanged(t, n);
}
function dn(e, t, n, i) {
  return T(e).onAuthStateChanged(t, n, i);
}
function ln(e) {
  T(e).useDeviceLanguage();
}
function hn(e, t) {
  return T(e).updateCurrentUser(t);
}
function pn(e) {
  return T(e).signOut();
}
async function fn(e) {
  return T(e).delete();
}
class mn {
  constructor(e, t, n) {
    (this.type = e), (this.credential = t), (this.auth = n);
  }
  static _fromIdtoken(e, t) {
    return new mn('enroll', e, t);
  }
  static _fromMfaPendingCredential(e) {
    return new mn('signin', e);
  }
  toJSON() {
    return {
      multiFactorSession: {
        ['enroll' === this.type ? 'idToken' : 'pendingCredential']: this.credential
      }
    };
  }
  static fromJSON(e) {
    var t, n;
    if (null == e ? void 0 : e.multiFactorSession) {
      if (null === (t = e.multiFactorSession) || void 0 === t ? void 0 : t.pendingCredential)
        return mn._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);
      if (null === (n = e.multiFactorSession) || void 0 === n ? void 0 : n.idToken)
        return mn._fromIdtoken(e.multiFactorSession.idToken);
    }
    return null;
  }
}
class gn {
  constructor(e, t, n) {
    (this.session = e), (this.hints = t), (this.signInResolver = n);
  }
  static _fromError(e, t) {
    const n = Ge(e),
      i = t.customData._serverResponse,
      r = (i.mfaInfo || []).map((e) => Dt._fromServerResponse(n, e));
    B(i.mfaPendingCredential, n, 'internal-error');
    const s = mn._fromMfaPendingCredential(i.mfaPendingCredential);
    return new gn(s, r, async (e) => {
      const r = await e._process(n, s);
      delete i.mfaInfo, delete i.mfaPendingCredential;
      const o = Object.assign(Object.assign({}, i), {
        idToken: r.idToken,
        refreshToken: r.refreshToken
      });
      switch (t.operationType) {
        case 'signIn':
          const e = await _t._fromIdTokenResponse(n, t.operationType, o);
          return await n._updateCurrentUser(e.user), e;
        case 'reauthenticate':
          return B(t.user, n, 'internal-error'), _t._forOperation(t.user, t.operationType, o);
        default:
          j(n, 'internal-error');
      }
    });
  }
  async resolveSignIn(e) {
    const t = e;
    return this.signInResolver(t);
  }
}
function vn(e, t) {
  var n;
  const i = T(e),
    r = t;
  return (
    B(t.customData.operationType, i, 'argument-error'),
    B(
      null === (n = r.customData._serverResponse) || void 0 === n ? void 0 : n.mfaPendingCredential,
      i,
      'argument-error'
    ),
    gn._fromError(i, r)
  );
}
class _n {
  constructor(e) {
    (this.user = e),
      (this.enrolledFactors = []),
      e._onReload((t) => {
        t.mfaInfo &&
          (this.enrolledFactors = t.mfaInfo.map((t) => Dt._fromServerResponse(e.auth, t)));
      });
  }
  static _fromUser(e) {
    return new _n(e);
  }
  async getSession() {
    return mn._fromIdtoken(await this.user.getIdToken(), this.user.auth);
  }
  async enroll(e, t) {
    const n = e,
      i = await this.getSession(),
      r = await Ie(this.user, n._process(this.user.auth, i, t));
    return await this.user._updateTokensIfNecessary(r), this.user.reload();
  }
  async unenroll(e) {
    const t = 'string' == typeof e ? e : e.uid,
      n = await this.user.getIdToken(),
      i = await Ie(
        this.user,
        ((r = this.user.auth),
        (s = { idToken: n, mfaEnrollmentId: t }),
        ce(r, 'POST', '/v2/accounts/mfaEnrollment:withdraw', ae(r, s)))
      );
    var r, s;
    (this.enrolledFactors = this.enrolledFactors.filter(({ uid: e }) => e !== t)),
      await this.user._updateTokensIfNecessary(i);
    try {
      await this.user.reload();
    } catch (e) {
      if ('auth/user-token-expired' !== (null == e ? void 0 : e.code)) throw e;
    }
  }
}
const In = new WeakMap();
function yn(e) {
  const t = T(e);
  return In.has(t) || In.set(t, _n._fromUser(t)), In.get(t);
}
class Tn {
  constructor(e, t) {
    (this.storageRetriever = e), (this.type = t);
  }
  _isAvailable() {
    try {
      return this.storage
        ? (this.storage.setItem('__sak', '1'),
          this.storage.removeItem('__sak'),
          Promise.resolve(!0))
        : Promise.resolve(!1);
    } catch (e) {
      return Promise.resolve(!1);
    }
  }
  _set(e, t) {
    return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve();
  }
  _get(e) {
    const t = this.storage.getItem(e);
    return Promise.resolve(t ? JSON.parse(t) : null);
  }
  _remove(e) {
    return this.storage.removeItem(e), Promise.resolve();
  }
  get storage() {
    return this.storageRetriever();
  }
}
class wn extends Tn {
  constructor() {
    super(() => window.localStorage, 'LOCAL'),
      (this.boundEventHandler = (e, t) => this.onStorageEvent(e, t)),
      (this.listeners = {}),
      (this.localCache = {}),
      (this.pollTimer = null),
      (this.safariLocalStorageNotSynced =
        (function () {
          const e = a();
          return De(e) || xe(e);
        })() &&
        (function () {
          try {
            return !(!window || window === window.top);
          } catch (e) {
            return !1;
          }
        })()),
      (this.fallbackToPolling = je()),
      (this._shouldAllowMigration = !0);
  }
  forAllChangedKeys(e) {
    for (const t of Object.keys(this.listeners)) {
      const n = this.storage.getItem(t),
        i = this.localCache[t];
      n !== i && e(t, i, n);
    }
  }
  onStorageEvent(e, t = !1) {
    if (!e.key)
      return void this.forAllChangedKeys((e, t, n) => {
        this.notifyListeners(e, n);
      });
    const n = e.key;
    if ((t ? this.detachListener() : this.stopPolling(), this.safariLocalStorageNotSynced)) {
      const i = this.storage.getItem(n);
      if (e.newValue !== i)
        null !== e.newValue ? this.storage.setItem(n, e.newValue) : this.storage.removeItem(n);
      else if (this.localCache[n] === e.newValue && !t) return;
    }
    const i = () => {
        const e = this.storage.getItem(n);
        (t || this.localCache[n] !== e) && this.notifyListeners(n, e);
      },
      r = this.storage.getItem(n);
    He() && r !== e.newValue && e.newValue !== e.oldValue ? setTimeout(i, 10) : i();
  }
  notifyListeners(e, t) {
    this.localCache[e] = t;
    const n = this.listeners[e];
    if (n) for (const e of Array.from(n)) e(t ? JSON.parse(t) : t);
  }
  startPolling() {
    this.stopPolling(),
      (this.pollTimer = setInterval(() => {
        this.forAllChangedKeys((e, t, n) => {
          this.onStorageEvent(
            new StorageEvent('storage', { key: e, oldValue: t, newValue: n }),
            !0
          );
        });
      }, 1e3));
  }
  stopPolling() {
    this.pollTimer && (clearInterval(this.pollTimer), (this.pollTimer = null));
  }
  attachListener() {
    window.addEventListener('storage', this.boundEventHandler);
  }
  detachListener() {
    window.removeEventListener('storage', this.boundEventHandler);
  }
  _addListener(e, t) {
    0 === Object.keys(this.listeners).length &&
      (this.fallbackToPolling ? this.startPolling() : this.attachListener()),
      this.listeners[e] ||
        ((this.listeners[e] = new Set()), (this.localCache[e] = this.storage.getItem(e))),
      this.listeners[e].add(t);
  }
  _removeListener(e, t) {
    this.listeners[e] &&
      (this.listeners[e].delete(t), 0 === this.listeners[e].size && delete this.listeners[e]),
      0 === Object.keys(this.listeners).length && (this.detachListener(), this.stopPolling());
  }
  async _set(e, t) {
    await super._set(e, t), (this.localCache[e] = JSON.stringify(t));
  }
  async _get(e) {
    const t = await super._get(e);
    return (this.localCache[e] = JSON.stringify(t)), t;
  }
  async _remove(e) {
    await super._remove(e), delete this.localCache[e];
  }
}
wn.type = 'LOCAL';
const En = wn;
class kn extends Tn {
  constructor() {
    super(() => window.sessionStorage, 'SESSION');
  }
  _addListener(e, t) {}
  _removeListener(e, t) {}
}
kn.type = 'SESSION';
const bn = kn;
class An {
  constructor(e) {
    (this.eventTarget = e),
      (this.handlersMap = {}),
      (this.boundEventHandler = this.handleEvent.bind(this));
  }
  static _getInstance(e) {
    const t = this.receivers.find((t) => t.isListeningto(e));
    if (t) return t;
    const n = new An(e);
    return this.receivers.push(n), n;
  }
  isListeningto(e) {
    return this.eventTarget === e;
  }
  async handleEvent(e) {
    const t = e,
      { eventId: n, eventType: i, data: r } = t.data,
      s = this.handlersMap[i];
    if (!(null == s ? void 0 : s.size)) return;
    t.ports[0].postMessage({ status: 'ack', eventId: n, eventType: i });
    const o = Array.from(s).map(async (e) => e(t.origin, r)),
      a = await (function (e) {
        return Promise.all(
          e.map(async (e) => {
            try {
              return { fulfilled: !0, value: await e };
            } catch (e) {
              return { fulfilled: !1, reason: e };
            }
          })
        );
      })(o);
    t.ports[0].postMessage({ status: 'done', eventId: n, eventType: i, response: a });
  }
  _subscribe(e, t) {
    0 === Object.keys(this.handlersMap).length &&
      this.eventTarget.addEventListener('message', this.boundEventHandler),
      this.handlersMap[e] || (this.handlersMap[e] = new Set()),
      this.handlersMap[e].add(t);
  }
  _unsubscribe(e, t) {
    this.handlersMap[e] && t && this.handlersMap[e].delete(t),
      (t && 0 !== this.handlersMap[e].size) || delete this.handlersMap[e],
      0 === Object.keys(this.handlersMap).length &&
        this.eventTarget.removeEventListener('message', this.boundEventHandler);
  }
}
function Sn(e = '', t = 10) {
  let n = '';
  for (let e = 0; e < t; e++) n += Math.floor(10 * Math.random());
  return e + n;
}
An.receivers = [];
class Rn {
  constructor(e) {
    (this.target = e), (this.handlers = new Set());
  }
  removeMessageHandler(e) {
    e.messageChannel &&
      (e.messageChannel.port1.removeEventListener('message', e.onMessage),
      e.messageChannel.port1.close()),
      this.handlers.delete(e);
  }
  async _send(e, t, n = 50) {
    const i = 'undefined' != typeof MessageChannel ? new MessageChannel() : null;
    if (!i) throw new Error('connection_unavailable');
    let r, s;
    return new Promise((o, a) => {
      const c = Sn('', 20);
      i.port1.start();
      const u = setTimeout(() => {
        a(new Error('unsupported_event'));
      }, n);
      (s = {
        messageChannel: i,
        onMessage(e) {
          const t = e;
          if (t.data.eventId === c)
            switch (t.data.status) {
              case 'ack':
                clearTimeout(u),
                  (r = setTimeout(() => {
                    a(new Error('timeout'));
                  }, 3e3));
                break;
              case 'done':
                clearTimeout(r), o(t.data.response);
                break;
              default:
                clearTimeout(u), clearTimeout(r), a(new Error('invalid_response'));
            }
        }
      }),
        this.handlers.add(s),
        i.port1.addEventListener('message', s.onMessage),
        this.target.postMessage({ eventType: e, eventId: c, data: t }, [i.port2]);
    }).finally(() => {
      s && this.removeMessageHandler(s);
    });
  }
}
function Nn() {
  return window;
}
function On() {
  return void 0 !== Nn().WorkerGlobalScope && 'function' == typeof Nn().importScripts;
}
const Cn = 'firebaseLocalStorageDb';
class Pn {
  constructor(e) {
    this.request = e;
  }
  toPromise() {
    return new Promise((e, t) => {
      this.request.addEventListener('success', () => {
        e(this.request.result);
      }),
        this.request.addEventListener('error', () => {
          t(this.request.error);
        });
    });
  }
}
function Dn(e, t) {
  return e
    .transaction(['firebaseLocalStorage'], t ? 'readwrite' : 'readonly')
    .objectStore('firebaseLocalStorage');
}
function Ln() {
  const e = indexedDB.open(Cn, 1);
  return new Promise((t, n) => {
    e.addEventListener('error', () => {
      n(e.error);
    }),
      e.addEventListener('upgradeneeded', () => {
        const t = e.result;
        try {
          t.createObjectStore('firebaseLocalStorage', { keyPath: 'fbase_key' });
        } catch (e) {
          n(e);
        }
      }),
      e.addEventListener('success', async () => {
        const n = e.result;
        n.objectStoreNames.contains('firebaseLocalStorage')
          ? t(n)
          : (n.close(),
            await (function () {
              const e = indexedDB.deleteDatabase(Cn);
              return new Pn(e).toPromise();
            })(),
            t(await Ln()));
      });
  });
}
async function Mn(e, t, n) {
  const i = Dn(e, !0).put({ fbase_key: t, value: n });
  return new Pn(i).toPromise();
}
function Un(e, t) {
  const n = Dn(e, !0).delete(t);
  return new Pn(n).toPromise();
}
class Fn {
  constructor() {
    (this.type = 'LOCAL'),
      (this._shouldAllowMigration = !0),
      (this.listeners = {}),
      (this.localCache = {}),
      (this.pollTimer = null),
      (this.pendingWrites = 0),
      (this.receiver = null),
      (this.sender = null),
      (this.serviceWorkerReceiverAvailable = !1),
      (this.activeServiceWorker = null),
      (this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(
        () => {},
        () => {}
      ));
  }
  async _openDb() {
    return this.db || (this.db = await Ln()), this.db;
  }
  async _withRetries(e) {
    let t = 0;
    for (;;)
      try {
        const t = await this._openDb();
        return await e(t);
      } catch (e) {
        if (t++ > 3) throw e;
        this.db && (this.db.close(), (this.db = void 0));
      }
  }
  async initializeServiceWorkerMessaging() {
    return On() ? this.initializeReceiver() : this.initializeSender();
  }
  async initializeReceiver() {
    (this.receiver = An._getInstance(On() ? self : null)),
      this.receiver._subscribe('keyChanged', async (e, t) => ({
        keyProcessed: (await this._poll()).includes(t.key)
      })),
      this.receiver._subscribe('ping', async (e, t) => ['keyChanged']);
  }
  async initializeSender() {
    var e, t;
    if (
      ((this.activeServiceWorker = await (async function () {
        if (!(null === navigator || void 0 === navigator ? void 0 : navigator.serviceWorker))
          return null;
        try {
          return (await navigator.serviceWorker.ready).active;
        } catch (e) {
          return null;
        }
      })()),
      !this.activeServiceWorker)
    )
      return;
    this.sender = new Rn(this.activeServiceWorker);
    const n = await this.sender._send('ping', {}, 800);
    n &&
      (null === (e = n[0]) || void 0 === e ? void 0 : e.fulfilled) &&
      (null === (t = n[0]) || void 0 === t ? void 0 : t.value.includes('keyChanged')) &&
      (this.serviceWorkerReceiverAvailable = !0);
  }
  async notifyServiceWorker(e) {
    var t;
    if (
      this.sender &&
      this.activeServiceWorker &&
      ((null ===
        (t = null === navigator || void 0 === navigator ? void 0 : navigator.serviceWorker) ||
      void 0 === t
        ? void 0
        : t.controller) || null) === this.activeServiceWorker
    )
      try {
        await this.sender._send(
          'keyChanged',
          { key: e },
          this.serviceWorkerReceiverAvailable ? 800 : 50
        );
      } catch (t) {}
  }
  async _isAvailable() {
    try {
      if (!indexedDB) return !1;
      const e = await Ln();
      return await Mn(e, '__sak', '1'), await Un(e, '__sak'), !0;
    } catch (e) {}
    return !1;
  }
  async _withPendingWrite(e) {
    this.pendingWrites++;
    try {
      await e();
    } finally {
      this.pendingWrites--;
    }
  }
  async _set(e, t) {
    return this._withPendingWrite(
      async () => (
        await this._withRetries((n) => Mn(n, e, t)),
        (this.localCache[e] = t),
        this.notifyServiceWorker(e)
      )
    );
  }
  async _get(e) {
    const t = await this._withRetries((t) =>
      (async function (e, t) {
        const n = Dn(e, !1).get(t),
          i = await new Pn(n).toPromise();
        return void 0 === i ? null : i.value;
      })(t, e)
    );
    return (this.localCache[e] = t), t;
  }
  async _remove(e) {
    return this._withPendingWrite(
      async () => (
        await this._withRetries((t) => Un(t, e)),
        delete this.localCache[e],
        this.notifyServiceWorker(e)
      )
    );
  }
  async _poll() {
    const e = await this._withRetries((e) => {
      const t = Dn(e, !1).getAll();
      return new Pn(t).toPromise();
    });
    if (!e) return [];
    if (0 !== this.pendingWrites) return [];
    const t = [],
      n = new Set();
    for (const { fbase_key: i, value: r } of e)
      n.add(i),
        JSON.stringify(this.localCache[i]) !== JSON.stringify(r) &&
          (this.notifyListeners(i, r), t.push(i));
    for (const e of Object.keys(this.localCache))
      this.localCache[e] && !n.has(e) && (this.notifyListeners(e, null), t.push(e));
    return t;
  }
  notifyListeners(e, t) {
    this.localCache[e] = t;
    const n = this.listeners[e];
    if (n) for (const e of Array.from(n)) e(t);
  }
  startPolling() {
    this.stopPolling(), (this.pollTimer = setInterval(async () => this._poll(), 800));
  }
  stopPolling() {
    this.pollTimer && (clearInterval(this.pollTimer), (this.pollTimer = null));
  }
  _addListener(e, t) {
    0 === Object.keys(this.listeners).length && this.startPolling(),
      this.listeners[e] || ((this.listeners[e] = new Set()), this._get(e)),
      this.listeners[e].add(t);
  }
  _removeListener(e, t) {
    this.listeners[e] &&
      (this.listeners[e].delete(t), 0 === this.listeners[e].size && delete this.listeners[e]),
      0 === Object.keys(this.listeners).length && this.stopPolling();
  }
}
Fn.type = 'LOCAL';
const Vn = Fn;
function xn(e) {
  return new Promise((t, n) => {
    const i = document.createElement('script');
    var r, s;
    i.setAttribute('src', e),
      (i.onload = t),
      (i.onerror = (e) => {
        const t = q('internal-error');
        (t.customData = e), n(t);
      }),
      (i.type = 'text/javascript'),
      (i.charset = 'UTF-8'),
      (null !==
        (s =
          null === (r = document.getElementsByTagName('head')) || void 0 === r ? void 0 : r[0]) &&
      void 0 !== s
        ? s
        : document
      ).appendChild(i);
  });
}
function Hn(e) {
  return `__${e}${Math.floor(1e6 * Math.random())}`;
}
class jn {
  constructor(e) {
    (this.auth = e), (this.counter = 1e12), (this._widgets = new Map());
  }
  render(e, t) {
    const n = this.counter;
    return this._widgets.set(n, new qn(e, this.auth.name, t || {})), this.counter++, n;
  }
  reset(e) {
    var t;
    const n = e || 1e12;
    null === (t = this._widgets.get(n)) || void 0 === t || t.delete(), this._widgets.delete(n);
  }
  getResponse(e) {
    var t;
    const n = e || 1e12;
    return (null === (t = this._widgets.get(n)) || void 0 === t ? void 0 : t.getResponse()) || '';
  }
  async execute(e) {
    var t;
    const n = e || 1e12;
    return null === (t = this._widgets.get(n)) || void 0 === t || t.execute(), '';
  }
}
class qn {
  constructor(e, t, n) {
    (this.params = n),
      (this.timerId = null),
      (this.deleted = !1),
      (this.responseToken = null),
      (this.clickHandler = () => {
        this.execute();
      });
    const i = 'string' == typeof e ? document.getElementById(e) : e;
    B(i, 'argument-error', { appName: t }),
      (this.container = i),
      (this.isVisible = 'invisible' !== this.params.size),
      this.isVisible ? this.execute() : this.container.addEventListener('click', this.clickHandler);
  }
  getResponse() {
    return this.checkIfDeleted(), this.responseToken;
  }
  delete() {
    this.checkIfDeleted(),
      (this.deleted = !0),
      this.timerId && (clearTimeout(this.timerId), (this.timerId = null)),
      this.container.removeEventListener('click', this.clickHandler);
  }
  execute() {
    this.checkIfDeleted(),
      this.timerId ||
        (this.timerId = window.setTimeout(() => {
          this.responseToken = (function (e) {
            const t = [],
              n = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for (let i = 0; i < e; i++) t.push(n.charAt(Math.floor(Math.random() * n.length)));
            return t.join('');
          })(50);
          const { callback: e, 'expired-callback': t } = this.params;
          if (e)
            try {
              e(this.responseToken);
            } catch (e) {}
          this.timerId = window.setTimeout(() => {
            if (((this.timerId = null), (this.responseToken = null), t))
              try {
                t();
              } catch (e) {}
            this.isVisible && this.execute();
          }, 6e4);
        }, 500));
  }
  checkIfDeleted() {
    if (this.deleted) throw new Error('reCAPTCHA mock was already deleted!');
  }
}
const Wn = Hn('rcb'),
  zn = new ne(3e4, 6e4);
class Gn {
  constructor() {
    var e;
    (this.hostLanguage = ''),
      (this.counter = 0),
      (this.librarySeparatelyLoaded = !!(null === (e = Nn().grecaptcha) || void 0 === e
        ? void 0
        : e.render));
  }
  load(e, t = '') {
    return (
      B(
        (function (e) {
          return e.length <= 6 && /^\s*[a-zA-Z0-9\-]*\s*$/.test(e);
        })(t),
        e,
        'argument-error'
      ),
      this.shouldResolveImmediately(t)
        ? Promise.resolve(Nn().grecaptcha)
        : new Promise((n, i) => {
            const r = Nn().setTimeout(() => {
              i(q(e, 'network-request-failed'));
            }, zn.get());
            Nn()[Wn] = () => {
              Nn().clearTimeout(r), delete Nn()[Wn];
              const s = Nn().grecaptcha;
              if (!s) return void i(q(e, 'internal-error'));
              const o = s.render;
              (s.render = (e, t) => {
                const n = o(e, t);
                return this.counter++, n;
              }),
                (this.hostLanguage = t),
                n(s);
            };
            xn(
              `https://www.google.com/recaptcha/api.js??${g({
                onload: Wn,
                render: 'explicit',
                hl: t
              })}`
            ).catch(() => {
              clearTimeout(r), i(q(e, 'internal-error'));
            });
          })
    );
  }
  clearedOneInstance() {
    this.counter--;
  }
  shouldResolveImmediately(e) {
    var t;
    return (
      !!(null === (t = Nn().grecaptcha) || void 0 === t ? void 0 : t.render) &&
      (e === this.hostLanguage || this.counter > 0 || this.librarySeparatelyLoaded)
    );
  }
}
class Bn {
  async load(e) {
    return new jn(e);
  }
  clearedOneInstance() {}
}
const Kn = { theme: 'light', type: 'image' };
class $n {
  constructor(e, t = Object.assign({}, Kn), n) {
    (this.parameters = t),
      (this.type = 'recaptcha'),
      (this.destroyed = !1),
      (this.widgetId = null),
      (this.tokenChangeListeners = new Set()),
      (this.renderPromise = null),
      (this.recaptcha = null),
      (this.auth = Ge(n)),
      (this.isInvisible = 'invisible' === this.parameters.size),
      B('undefined' != typeof document, this.auth, 'operation-not-supported-in-this-environment');
    const i = 'string' == typeof e ? document.getElementById(e) : e;
    B(i, this.auth, 'argument-error'),
      (this.container = i),
      (this.parameters.callback = this.makeTokenCallback(this.parameters.callback)),
      (this._recaptchaLoader = this.auth.settings.appVerificationDisabledForTesting
        ? new Bn()
        : new Gn()),
      this.validateStartingState();
  }
  async verify() {
    this.assertNotDestroyed();
    const e = await this.render(),
      t = this.getAssertedRecaptcha(),
      n = t.getResponse(e);
    return (
      n ||
      new Promise((n) => {
        const i = (e) => {
          e && (this.tokenChangeListeners.delete(i), n(e));
        };
        this.tokenChangeListeners.add(i), this.isInvisible && t.execute(e);
      })
    );
  }
  render() {
    try {
      this.assertNotDestroyed();
    } catch (e) {
      return Promise.reject(e);
    }
    return (
      this.renderPromise ||
        (this.renderPromise = this.makeRenderPromise().catch((e) => {
          throw ((this.renderPromise = null), e);
        })),
      this.renderPromise
    );
  }
  _reset() {
    this.assertNotDestroyed(),
      null !== this.widgetId && this.getAssertedRecaptcha().reset(this.widgetId);
  }
  clear() {
    this.assertNotDestroyed(),
      (this.destroyed = !0),
      this._recaptchaLoader.clearedOneInstance(),
      this.isInvisible ||
        this.container.childNodes.forEach((e) => {
          this.container.removeChild(e);
        });
  }
  validateStartingState() {
    B(!this.parameters.sitekey, this.auth, 'argument-error'),
      B(this.isInvisible || !this.container.hasChildNodes(), this.auth, 'argument-error'),
      B('undefined' != typeof document, this.auth, 'operation-not-supported-in-this-environment');
  }
  makeTokenCallback(e) {
    return (t) => {
      if ((this.tokenChangeListeners.forEach((e) => e(t)), 'function' == typeof e)) e(t);
      else if ('string' == typeof e) {
        const n = Nn()[e];
        'function' == typeof n && n(t);
      }
    };
  }
  assertNotDestroyed() {
    B(!this.destroyed, this.auth, 'internal-error');
  }
  async makeRenderPromise() {
    if ((await this.init(), !this.widgetId)) {
      let e = this.container;
      if (!this.isInvisible) {
        const t = document.createElement('div');
        e.appendChild(t), (e = t);
      }
      this.widgetId = this.getAssertedRecaptcha().render(e, this.parameters);
    }
    return this.widgetId;
  }
  async init() {
    B(Z() && !On(), this.auth, 'internal-error'),
      await (function () {
        let e = null;
        return new Promise((t) => {
          'complete' !== document.readyState
            ? ((e = () => t()), window.addEventListener('load', e))
            : t();
        }).catch((t) => {
          throw (e && window.removeEventListener('load', e), t);
        });
      })(),
      (this.recaptcha = await this._recaptchaLoader.load(
        this.auth,
        this.auth.languageCode || void 0
      ));
    const e = await (async function (e) {
      return (await ce(e, 'GET', '/v1/recaptchaParams')).recaptchaSiteKey || '';
    })(this.auth);
    B(e, this.auth, 'internal-error'), (this.parameters.sitekey = e);
  }
  getAssertedRecaptcha() {
    return B(this.recaptcha, this.auth, 'internal-error'), this.recaptcha;
  }
}
class Jn {
  constructor(e, t) {
    (this.verificationId = e), (this.onConfirmation = t);
  }
  confirm(e) {
    const t = rt._fromVerification(this.verificationId, e);
    return this.onConfirmation(t);
  }
}
async function Yn(e, t, n) {
  const i = Ge(e),
    r = await Zn(i, t, T(n));
  return new Jn(r, (e) => Nt(i, e));
}
async function Xn(e, t, n) {
  const i = T(e);
  await At(!1, i, 'phone');
  const r = await Zn(i.auth, t, T(n));
  return new Jn(r, (e) => Ot(i, e));
}
async function Qn(e, t, n) {
  const i = T(e),
    r = await Zn(i.auth, t, T(n));
  return new Jn(r, (e) => Ct(i, e));
}
async function Zn(e, t, n) {
  var i;
  const r = await n.verify();
  try {
    let s;
    if (
      (B('string' == typeof r, e, 'argument-error'),
      B('recaptcha' === n.type, e, 'argument-error'),
      (s = 'string' == typeof t ? { phoneNumber: t } : t),
      'session' in s)
    ) {
      const t = s.session;
      if ('phoneNumber' in s) {
        B('enroll' === t.type, e, 'internal-error');
        const n = await (function (e, t) {
          return ce(e, 'POST', '/v2/accounts/mfaEnrollment:start', ae(e, t));
        })(e, {
          idToken: t.credential,
          phoneEnrollmentInfo: { phoneNumber: s.phoneNumber, recaptchaToken: r }
        });
        return n.phoneSessionInfo.sessionInfo;
      }
      {
        B('signin' === t.type, e, 'internal-error');
        const n =
          (null === (i = s.multiFactorHint) || void 0 === i ? void 0 : i.uid) || s.multiFactorUid;
        B(n, e, 'missing-multi-factor-info');
        const o = await (function (e, t) {
          return ce(e, 'POST', '/v2/accounts/mfaSignIn:start', ae(e, t));
        })(e, {
          mfaPendingCredential: t.credential,
          mfaEnrollmentId: n,
          phoneSignInInfo: { recaptchaToken: r }
        });
        return o.phoneResponseInfo.sessionInfo;
      }
    }
    {
      const { sessionInfo: t } = await (async function (e, t) {
        return ce(e, 'POST', '/v1/accounts:sendVerificationCode', ae(e, t));
      })(e, { phoneNumber: s.phoneNumber, recaptchaToken: r });
      return t;
    }
  } finally {
    n._reset();
  }
}
async function ei(e, t) {
  await bt(T(e), t);
}
class ti {
  constructor(e) {
    (this.providerId = ti.PROVIDER_ID), (this.auth = Ge(e));
  }
  verifyPhoneNumber(e, t) {
    return Zn(this.auth, e, T(t));
  }
  static credential(e, t) {
    return rt._fromVerification(e, t);
  }
  static credentialFromResult(e) {
    const t = e;
    return ti.credentialFromTaggedObject(t);
  }
  static credentialFromError(e) {
    return ti.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e) return null;
    const { phoneNumber: t, temporaryProof: n } = e;
    return t && n ? rt._fromTokenResponse(t, n) : null;
  }
}
function ni(e, t) {
  return t ? Y(t) : (B(e._popupRedirectResolver, e, 'argument-error'), e._popupRedirectResolver);
}
(ti.PROVIDER_ID = 'phone'), (ti.PHONE_SIGN_IN_METHOD = 'phone');
class ii extends Ye {
  constructor(e) {
    super('custom', 'custom'), (this.params = e);
  }
  _getIdTokenResponse(e) {
    return tt(e, this._buildIdpRequest());
  }
  _linkToIdToken(e, t) {
    return tt(e, this._buildIdpRequest(t));
  }
  _getReauthenticationResolver(e) {
    return tt(e, this._buildIdpRequest());
  }
  _buildIdpRequest(e) {
    const t = {
      requestUri: this.params.requestUri,
      sessionId: this.params.sessionId,
      postBody: this.params.postBody,
      tenantId: this.params.tenantId,
      pendingToken: this.params.pendingToken,
      returnSecureToken: !0,
      returnIdpCredential: !0
    };
    return e && (t.idToken = e), t;
  }
}
function ri(e) {
  return Rt(e.auth, new ii(e), e.bypassAuthState);
}
function si(e) {
  const { auth: t, user: n } = e;
  return B(n, t, 'internal-error'), St(n, new ii(e), e.bypassAuthState);
}
async function oi(e) {
  const { auth: t, user: n } = e;
  return B(n, t, 'internal-error'), bt(n, new ii(e), e.bypassAuthState);
}
class ai {
  constructor(e, t, n, i, r = !1) {
    (this.auth = e),
      (this.resolver = n),
      (this.user = i),
      (this.bypassAuthState = r),
      (this.pendingPromise = null),
      (this.eventManager = null),
      (this.filter = Array.isArray(t) ? t : [t]);
  }
  execute() {
    return new Promise(async (e, t) => {
      this.pendingPromise = { resolve: e, reject: t };
      try {
        (this.eventManager = await this.resolver._initialize(this.auth)),
          await this.onExecution(),
          this.eventManager.registerConsumer(this);
      } catch (e) {
        this.reject(e);
      }
    });
  }
  async onAuthEvent(e) {
    const { urlResponse: t, sessionId: n, postBody: i, tenantId: r, error: s, type: o } = e;
    if (s) return void this.reject(s);
    const a = {
      auth: this.auth,
      requestUri: t,
      sessionId: n,
      tenantId: r || void 0,
      postBody: i || void 0,
      user: this.user,
      bypassAuthState: this.bypassAuthState
    };
    try {
      this.resolve(await this.getIdpTask(o)(a));
    } catch (e) {
      this.reject(e);
    }
  }
  onError(e) {
    this.reject(e);
  }
  getIdpTask(e) {
    switch (e) {
      case 'signInViaPopup':
      case 'signInViaRedirect':
        return ri;
      case 'linkViaPopup':
      case 'linkViaRedirect':
        return oi;
      case 'reauthViaPopup':
      case 'reauthViaRedirect':
        return si;
      default:
        j(this.auth, 'internal-error');
    }
  }
  resolve(e) {
    $(this.pendingPromise, 'Pending promise was never set'),
      this.pendingPromise.resolve(e),
      this.unregisterAndCleanUp();
  }
  reject(e) {
    $(this.pendingPromise, 'Pending promise was never set'),
      this.pendingPromise.reject(e),
      this.unregisterAndCleanUp();
  }
  unregisterAndCleanUp() {
    this.eventManager && this.eventManager.unregisterConsumer(this),
      (this.pendingPromise = null),
      this.cleanUp();
  }
}
const ci = new ne(2e3, 1e4);
async function ui(e, t, n) {
  const i = Ge(e);
  z(e, t, ct);
  const r = ni(i, n);
  return new hi(i, 'signInViaPopup', t, r).executeNotNull();
}
async function di(e, t, n) {
  const i = T(e);
  z(i.auth, t, ct);
  const r = ni(i.auth, n);
  return new hi(i.auth, 'reauthViaPopup', t, r, i).executeNotNull();
}
async function li(e, t, n) {
  const i = T(e);
  z(i.auth, t, ct);
  const r = ni(i.auth, n);
  return new hi(i.auth, 'linkViaPopup', t, r, i).executeNotNull();
}
class hi extends ai {
  constructor(e, t, n, i, r) {
    super(e, t, i, r),
      (this.provider = n),
      (this.authWindow = null),
      (this.pollId = null),
      hi.currentPopupAction && hi.currentPopupAction.cancel(),
      (hi.currentPopupAction = this);
  }
  async executeNotNull() {
    const e = await this.execute();
    return B(e, this.auth, 'internal-error'), e;
  }
  async onExecution() {
    $(1 === this.filter.length, 'Popup operations only handle one event');
    const e = Sn();
    (this.authWindow = await this.resolver._openPopup(this.auth, this.provider, this.filter[0], e)),
      (this.authWindow.associatedEvent = e),
      this.resolver._originValidation(this.auth).catch((e) => {
        this.reject(e);
      }),
      this.resolver._isIframeWebStorageSupported(this.auth, (e) => {
        e || this.reject(q(this.auth, 'web-storage-unsupported'));
      }),
      this.pollUserCancellation();
  }
  get eventId() {
    var e;
    return (null === (e = this.authWindow) || void 0 === e ? void 0 : e.associatedEvent) || null;
  }
  cancel() {
    this.reject(q(this.auth, 'cancelled-popup-request'));
  }
  cleanUp() {
    this.authWindow && this.authWindow.close(),
      this.pollId && window.clearTimeout(this.pollId),
      (this.authWindow = null),
      (this.pollId = null),
      (hi.currentPopupAction = null);
  }
  pollUserCancellation() {
    const e = () => {
      var t, n;
      (
        null === (n = null === (t = this.authWindow) || void 0 === t ? void 0 : t.window) ||
        void 0 === n
          ? void 0
          : n.closed
      )
        ? (this.pollId = window.setTimeout(() => {
            (this.pollId = null), this.reject(q(this.auth, 'popup-closed-by-user'));
          }, 2e3))
        : (this.pollId = window.setTimeout(e, ci.get()));
    };
    e();
  }
}
hi.currentPopupAction = null;
const pi = new Map();
class fi extends ai {
  constructor(e, t, n = !1) {
    super(
      e,
      ['signInViaRedirect', 'linkViaRedirect', 'reauthViaRedirect', 'unknown'],
      t,
      void 0,
      n
    ),
      (this.eventId = null);
  }
  async execute() {
    let e = pi.get(this.auth._key());
    if (!e) {
      try {
        const t = (await (async function (e, t) {
          const n = _i(t),
            i = vi(e);
          if (!(await i._isAvailable())) return !1;
          const r = 'true' === (await i._get(n));
          return await i._remove(n), r;
        })(this.resolver, this.auth))
          ? await super.execute()
          : null;
        e = () => Promise.resolve(t);
      } catch (t) {
        e = () => Promise.reject(t);
      }
      pi.set(this.auth._key(), e);
    }
    return this.bypassAuthState || pi.set(this.auth._key(), () => Promise.resolve(null)), e();
  }
  async onAuthEvent(e) {
    if ('signInViaRedirect' === e.type) return super.onAuthEvent(e);
    if ('unknown' !== e.type) {
      if (e.eventId) {
        const t = await this.auth._redirectUserForId(e.eventId);
        if (t) return (this.user = t), super.onAuthEvent(e);
        this.resolve(null);
      }
    } else this.resolve(null);
  }
  async onExecution() {}
  cleanUp() {}
}
async function mi(e, t) {
  return vi(e)._set(_i(t), 'true');
}
function gi(e, t) {
  pi.set(e._key(), t);
}
function vi(e) {
  return Y(e._redirectPersistence);
}
function _i(e) {
  return Ne('pendingRedirect', e.config.apiKey, e.name);
}
function Ii(e, t, n) {
  return (async function (e, t, n) {
    const i = Ge(e);
    z(e, t, ct);
    const r = ni(i, n);
    return await mi(r, i), r._openRedirect(i, t, 'signInViaRedirect');
  })(e, t, n);
}
function yi(e, t, n) {
  return (async function (e, t, n) {
    const i = T(e);
    z(i.auth, t, ct);
    const r = ni(i.auth, n);
    await mi(r, i.auth);
    const s = await ki(i);
    return r._openRedirect(i.auth, t, 'reauthViaRedirect', s);
  })(e, t, n);
}
function Ti(e, t, n) {
  return (async function (e, t, n) {
    const i = T(e);
    z(i.auth, t, ct);
    const r = ni(i.auth, n);
    await At(!1, i, t.providerId), await mi(r, i.auth);
    const s = await ki(i);
    return r._openRedirect(i.auth, t, 'linkViaRedirect', s);
  })(e, t, n);
}
async function wi(e, t) {
  return await Ge(e)._initializationPromise, Ei(e, t, !1);
}
async function Ei(e, t, n = !1) {
  const i = Ge(e),
    r = ni(i, t),
    s = new fi(i, r, n),
    o = await s.execute();
  return (
    o &&
      !n &&
      (delete o.user._redirectEventId,
      await i._persistUserIfCurrent(o.user),
      await i._setRedirectUser(null, t)),
    o
  );
}
async function ki(e) {
  const t = Sn(`${e.uid}:::`);
  return (
    (e._redirectEventId = t),
    await e.auth._setRedirectUser(e),
    await e.auth._persistUserIfCurrent(e),
    t
  );
}
class bi {
  constructor(e) {
    (this.auth = e),
      (this.cachedEventUids = new Set()),
      (this.consumers = new Set()),
      (this.queuedRedirectEvent = null),
      (this.hasHandledPotentialRedirect = !1),
      (this.lastProcessedEventTime = Date.now());
  }
  registerConsumer(e) {
    this.consumers.add(e),
      this.queuedRedirectEvent &&
        this.isEventForConsumer(this.queuedRedirectEvent, e) &&
        (this.sendToConsumer(this.queuedRedirectEvent, e),
        this.saveEventToCache(this.queuedRedirectEvent),
        (this.queuedRedirectEvent = null));
  }
  unregisterConsumer(e) {
    this.consumers.delete(e);
  }
  onEvent(e) {
    if (this.hasEventBeenHandled(e)) return !1;
    let t = !1;
    return (
      this.consumers.forEach((n) => {
        this.isEventForConsumer(e, n) &&
          ((t = !0), this.sendToConsumer(e, n), this.saveEventToCache(e));
      }),
      this.hasHandledPotentialRedirect ||
        !(function (e) {
          switch (e.type) {
            case 'signInViaRedirect':
            case 'linkViaRedirect':
            case 'reauthViaRedirect':
              return !0;
            case 'unknown':
              return Si(e);
            default:
              return !1;
          }
        })(e) ||
        ((this.hasHandledPotentialRedirect = !0), t || ((this.queuedRedirectEvent = e), (t = !0))),
      t
    );
  }
  sendToConsumer(e, t) {
    var n;
    if (e.error && !Si(e)) {
      const i =
        (null === (n = e.error.code) || void 0 === n ? void 0 : n.split('auth/')[1]) ||
        'internal-error';
      t.onError(q(this.auth, i));
    } else t.onAuthEvent(e);
  }
  isEventForConsumer(e, t) {
    const n = null === t.eventId || (!!e.eventId && e.eventId === t.eventId);
    return t.filter.includes(e.type) && n;
  }
  hasEventBeenHandled(e) {
    return (
      Date.now() - this.lastProcessedEventTime >= 6e5 && this.cachedEventUids.clear(),
      this.cachedEventUids.has(Ai(e))
    );
  }
  saveEventToCache(e) {
    this.cachedEventUids.add(Ai(e)), (this.lastProcessedEventTime = Date.now());
  }
}
function Ai(e) {
  return [e.type, e.eventId, e.sessionId, e.tenantId].filter((e) => e).join('-');
}
function Si({ type: e, error: t }) {
  return 'unknown' === e && 'auth/no-auth-event' === (null == t ? void 0 : t.code);
}
const Ri = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  Ni = /^https?/;
async function Oi(e) {
  if (e.config.emulator) return;
  const { authorizedDomains: t } = await (async function (e, t = {}) {
    return ce(e, 'GET', '/v1/projects', t);
  })(e);
  for (const e of t)
    try {
      if (Ci(e)) return;
    } catch (e) {}
  j(e, 'unauthorized-domain');
}
function Ci(e) {
  const t = Q(),
    { protocol: n, hostname: i } = new URL(t);
  if (e.startsWith('chrome-extension://')) {
    const r = new URL(e);
    return '' === r.hostname && '' === i
      ? 'chrome-extension:' === n &&
          e.replace('chrome-extension://', '') === t.replace('chrome-extension://', '')
      : 'chrome-extension:' === n && r.hostname === i;
  }
  if (!Ni.test(n)) return !1;
  if (Ri.test(e)) return i === e;
  const r = e.replace(/\./g, '\\.');
  return new RegExp('^(.+\\.' + r + '|' + r + ')$', 'i').test(i);
}
const Pi = new ne(3e4, 6e4);
function Di() {
  const e = Nn().___jsl;
  if (null == e ? void 0 : e.H)
    for (const t of Object.keys(e.H))
      if (
        ((e.H[t].r = e.H[t].r || []), (e.H[t].L = e.H[t].L || []), (e.H[t].r = [...e.H[t].L]), e.CP)
      )
        for (let t = 0; t < e.CP.length; t++) e.CP[t] = null;
}
let Li = null;
function Mi(e) {
  return (
    (Li =
      Li ||
      (function (e) {
        return new Promise((t, n) => {
          var i, r, s;
          function o() {
            Di(),
              gapi.load('gapi.iframes', {
                callback: () => {
                  t(gapi.iframes.getContext());
                },
                ontimeout: () => {
                  Di(), n(q(e, 'network-request-failed'));
                },
                timeout: Pi.get()
              });
          }
          if (
            null === (r = null === (i = Nn().gapi) || void 0 === i ? void 0 : i.iframes) ||
            void 0 === r
              ? void 0
              : r.Iframe
          )
            t(gapi.iframes.getContext());
          else {
            if (!(null === (s = Nn().gapi) || void 0 === s ? void 0 : s.load)) {
              const t = Hn('iframefcb');
              return (
                (Nn()[t] = () => {
                  gapi.load ? o() : n(q(e, 'network-request-failed'));
                }),
                xn(`https://apis.google.com/js/api.js?onload=${t}`).catch((e) => n(e))
              );
            }
            o();
          }
        }).catch((e) => {
          throw ((Li = null), e);
        });
      })(e)),
    Li
  );
}
const Ui = new ne(5e3, 15e3),
  Fi = {
    style: { position: 'absolute', top: '-100px', width: '1px', height: '1px' },
    'aria-hidden': 'true',
    tabindex: '-1'
  },
  Vi = new Map([
    ['identitytoolkit.googleapis.com', 'p'],
    ['staging-identitytoolkit.sandbox.googleapis.com', 's'],
    ['test-identitytoolkit.sandbox.googleapis.com', 't']
  ]);
function xi(e) {
  const t = e.config;
  B(t.authDomain, e, 'auth-domain-config-required');
  const n = t.emulator
      ? ie(t, 'emulator/auth/iframe')
      : `https://${e.config.authDomain}/__/auth/iframe`,
    i = { apiKey: t.apiKey, appName: e.name, v: r },
    s = Vi.get(e.config.apiHost);
  s && (i.eid = s);
  const o = e._getFrameworks();
  return o.length && (i.fw = o.join(',')), `${n}?${g(i).slice(1)}`;
}
const Hi = { location: 'yes', resizable: 'yes', statusbar: 'yes', toolbar: 'no' };
class ji {
  constructor(e) {
    (this.window = e), (this.associatedEvent = null);
  }
  close() {
    if (this.window)
      try {
        this.window.close();
      } catch (e) {}
  }
}
function qi(e, t, n, i = 500, r = 600) {
  const s = Math.max((window.screen.availHeight - r) / 2, 0).toString(),
    o = Math.max((window.screen.availWidth - i) / 2, 0).toString();
  let c = '';
  const u = Object.assign(Object.assign({}, Hi), {
      width: i.toString(),
      height: r.toString(),
      top: s,
      left: o
    }),
    d = a().toLowerCase();
  n && (c = Le(d) ? '_blank' : n), Pe(d) && ((t = t || 'http://localhost'), (u.scrollbars = 'yes'));
  const l = Object.entries(u).reduce((e, [t, n]) => `${e}${t}=${n},`, '');
  if (
    (function (e = a()) {
      var t;
      return xe(e) && !!(null === (t = window.navigator) || void 0 === t ? void 0 : t.standalone);
    })(d) &&
    '_self' !== c
  )
    return (
      (function (e, t) {
        const n = document.createElement('a');
        (n.href = e), (n.target = t);
        const i = document.createEvent('MouseEvent');
        i.initMouseEvent('click', !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 1, null),
          n.dispatchEvent(i);
      })(t || '', c),
      new ji(null)
    );
  const h = window.open(t || '', c, l);
  B(h, e, 'popup-blocked');
  try {
    h.focus();
  } catch (e) {}
  return new ji(h);
}
function Wi(e, t, n, i, s, o) {
  B(e.config.authDomain, e, 'auth-domain-config-required'),
    B(e.config.apiKey, e, 'invalid-api-key');
  const a = {
    apiKey: e.config.apiKey,
    appName: e.name,
    authType: n,
    redirectUrl: i,
    v: r,
    eventId: s
  };
  if (t instanceof ct) {
    t.setDefaultLanguage(e.languageCode),
      (a.providerId = t.providerId || ''),
      (function (e) {
        for (const t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
        return !0;
      })(t.getCustomParameters()) || (a.customParameters = JSON.stringify(t.getCustomParameters()));
    for (const [e, t] of Object.entries(o || {})) a[e] = t;
  }
  if (t instanceof ut) {
    const e = t.getScopes().filter((e) => '' !== e);
    e.length > 0 && (a.scopes = e.join(','));
  }
  e.tenantId && (a.tid = e.tenantId);
  const c = a;
  for (const e of Object.keys(c)) void 0 === c[e] && delete c[e];
  return `${(function ({ config: e }) {
    if (!e.emulator) return `https://${e.authDomain}/__/auth/handler`;
    return ie(e, 'emulator/auth/handler');
  })(e)}?${g(c).slice(1)}`;
}
const zi = class {
  constructor() {
    (this.eventManagers = {}),
      (this.iframes = {}),
      (this.originValidationPromises = {}),
      (this._redirectPersistence = bn),
      (this._completeRedirectFn = Ei),
      (this._overrideRedirectResult = gi);
  }
  async _openPopup(e, t, n, i) {
    var r;
    $(
      null === (r = this.eventManagers[e._key()]) || void 0 === r ? void 0 : r.manager,
      '_initialize() not called before _openPopup()'
    );
    return qi(e, Wi(e, t, n, Q(), i), Sn());
  }
  async _openRedirect(e, t, n, i) {
    var r;
    return (
      await this._originValidation(e),
      (r = Wi(e, t, n, Q(), i)),
      (Nn().location.href = r),
      new Promise(() => {})
    );
  }
  _initialize(e) {
    const t = e._key();
    if (this.eventManagers[t]) {
      const { manager: e, promise: n } = this.eventManagers[t];
      return e ? Promise.resolve(e) : ($(n, 'If manager is not set, promise should be'), n);
    }
    const n = this.initAndGetManager(e);
    return (
      (this.eventManagers[t] = { promise: n }),
      n.catch(() => {
        delete this.eventManagers[t];
      }),
      n
    );
  }
  async initAndGetManager(e) {
    const t = await (async function (e) {
        const t = await Mi(e),
          n = Nn().gapi;
        return (
          B(n, e, 'internal-error'),
          t.open(
            {
              where: document.body,
              url: xi(e),
              messageHandlersFilter: n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
              attributes: Fi,
              dontclear: !0
            },
            (t) =>
              new Promise(async (n, i) => {
                await t.restyle({ setHideOnLeave: !1 });
                const r = q(e, 'network-request-failed'),
                  s = Nn().setTimeout(() => {
                    i(r);
                  }, Ui.get());
                function o() {
                  Nn().clearTimeout(s), n(t);
                }
                t.ping(o).then(o, () => {
                  i(r);
                });
              })
          )
        );
      })(e),
      n = new bi(e);
    return (
      t.register(
        'authEvent',
        (t) => {
          B(null == t ? void 0 : t.authEvent, e, 'invalid-auth-event');
          return { status: n.onEvent(t.authEvent) ? 'ACK' : 'ERROR' };
        },
        gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
      ),
      (this.eventManagers[e._key()] = { manager: n }),
      (this.iframes[e._key()] = t),
      n
    );
  }
  _isIframeWebStorageSupported(e, t) {
    this.iframes[e._key()].send(
      'webStorageSupport',
      { type: 'webStorageSupport' },
      (n) => {
        var i;
        const r =
          null === (i = null == n ? void 0 : n[0]) || void 0 === i ? void 0 : i.webStorageSupport;
        void 0 !== r && t(!!r), j(e, 'internal-error');
      },
      gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
    );
  }
  _originValidation(e) {
    const t = e._key();
    return (
      this.originValidationPromises[t] || (this.originValidationPromises[t] = Oi(e)),
      this.originValidationPromises[t]
    );
  }
  get _shouldInitProactively() {
    return je() || De() || xe();
  }
};
class Gi extends class {
  constructor(e) {
    this.factorId = e;
  }
  _process(e, t, n) {
    switch (t.type) {
      case 'enroll':
        return this._finalizeEnroll(e, t.credential, n);
      case 'signin':
        return this._finalizeSignIn(e, t.credential);
      default:
        return K('unexpected MultiFactorSessionType');
    }
  }
} {
  constructor(e) {
    super('phone'), (this.credential = e);
  }
  static _fromCredential(e) {
    return new Gi(e);
  }
  _finalizeEnroll(e, t, n) {
    return (function (e, t) {
      return ce(e, 'POST', '/v2/accounts/mfaEnrollment:finalize', ae(e, t));
    })(e, {
      idToken: t,
      displayName: n,
      phoneVerificationInfo: this.credential._makeVerificationRequest()
    });
  }
  _finalizeSignIn(e, t) {
    return (function (e, t) {
      return ce(e, 'POST', '/v2/accounts/mfaSignIn:finalize', ae(e, t));
    })(e, {
      mfaPendingCredential: t,
      phoneVerificationInfo: this.credential._makeVerificationRequest()
    });
  }
}
class Bi {
  constructor() {}
  static assertion(e) {
    return Gi._fromCredential(e);
  }
}
Bi.FACTOR_ID = 'phone';
var Ki = '@firebase/auth';
class $i {
  constructor(e) {
    (this.auth = e), (this.internalListeners = new Map());
  }
  getUid() {
    var e;
    return (
      this.assertAuthConfigured(),
      (null === (e = this.auth.currentUser) || void 0 === e ? void 0 : e.uid) || null
    );
  }
  async getToken(e) {
    if (
      (this.assertAuthConfigured(), await this.auth._initializationPromise, !this.auth.currentUser)
    )
      return null;
    return { accessToken: await this.auth.currentUser.getIdToken(e) };
  }
  addAuthTokenListener(e) {
    if ((this.assertAuthConfigured(), this.internalListeners.has(e))) return;
    const t = this.auth.onIdTokenChanged((t) => {
      e((null == t ? void 0 : t.stsTokenManager.accessToken) || null);
    });
    this.internalListeners.set(e, t), this.updateProactiveRefresh();
  }
  removeAuthTokenListener(e) {
    this.assertAuthConfigured();
    const t = this.internalListeners.get(e);
    t && (this.internalListeners.delete(e), t(), this.updateProactiveRefresh());
  }
  assertAuthConfigured() {
    B(this.auth._initializationPromise, 'dependent-sdk-initialized-before-auth');
  }
  updateProactiveRefresh() {
    this.internalListeners.size > 0
      ? this.auth._startProactiveRefresh()
      : this.auth._stopProactiveRefresh();
  }
}
const Ji = d('authIdTokenMaxAge') || 300;
let Yi = null;
function Xi(t = i()) {
  const n = e(t, 'auth');
  if (n.isInitialized()) return n.getImmediate();
  const r = X(t, { popupRedirectResolver: zi, persistence: [Vn, En, bn] }),
    s = d('authTokenSyncURL');
  if (s) {
    const e =
      ((o = s),
      async (e) => {
        const t = e && (await e.getIdTokenResult()),
          n = t && (new Date().getTime() - Date.parse(t.issuedAtTime)) / 1e3;
        if (n && n > Ji) return;
        const i = null == t ? void 0 : t.token;
        Yi !== i &&
          ((Yi = i),
          await fetch(o, {
            method: i ? 'POST' : 'DELETE',
            headers: i ? { Authorization: `Bearer ${i}` } : {}
          }));
      });
    un(r, e, () => e(r.currentUser)), cn(r, (t) => e(t));
  }
  var o;
  const a =
    ((c = 'auth'),
    null === (h = null === (l = u()) || void 0 === l ? void 0 : l.emulatorHosts) || void 0 === h
      ? void 0
      : h[c]);
  var c, l, h;
  return a && Ke(r, `http://${a}`), r;
}
var Qi;
(Qi = 'Browser'),
  t(
    new R(
      'auth',
      (e, { options: t }) => {
        const n = e.getProvider('app').getImmediate(),
          i = e.getProvider('heartbeat'),
          { apiKey: r, authDomain: s } = n.options;
        return ((e, n) => {
          B(r && !r.includes(':'), 'invalid-api-key', { appName: e.name }),
            B(!(null == s ? void 0 : s.includes(':')), 'argument-error', { appName: e.name });
          const i = {
              apiKey: r,
              authDomain: s,
              clientPlatform: Qi,
              apiHost: 'identitytoolkit.googleapis.com',
              tokenApiHost: 'securetoken.googleapis.com',
              apiScheme: 'https',
              sdkClientVersion: qe(Qi)
            },
            o = new ze(e, n, i);
          return (
            (function (e, t) {
              const n = (null == t ? void 0 : t.persistence) || [],
                i = (Array.isArray(n) ? n : [n]).map(Y);
              (null == t ? void 0 : t.errorMap) && e._updateErrorMap(t.errorMap),
                e._initializeWithPersistence(i, null == t ? void 0 : t.popupRedirectResolver);
            })(o, t),
            o
          );
        })(n, i);
      },
      'PUBLIC'
    )
      .setInstantiationMode('EXPLICIT')
      .setInstanceCreatedCallback((e, t, n) => {
        e.getProvider('auth-internal').initialize();
      })
  ),
  t(
    new R(
      'auth-internal',
      (e) => ((e) => new $i(e))(Ge(e.getProvider('auth').getImmediate())),
      'PRIVATE'
    ).setInstantiationMode('EXPLICIT')
  ),
  n(
    Ki,
    '0.21.0',
    (function (e) {
      switch (e) {
        case 'Node':
          return 'node';
        case 'ReactNative':
          return 'rn';
        case 'Worker':
          return 'webworker';
        case 'Cordova':
          return 'cordova';
        default:
          return;
      }
    })(Qi)
  ),
  n(Ki, '0.21.0', 'esm2017');
export {
  D as ActionCodeOperation,
  st as ActionCodeURL,
  Ye as AuthCredential,
  V as AuthErrorCodes,
  et as EmailAuthCredential,
  at as EmailAuthProvider,
  lt as FacebookAuthProvider,
  N as FactorId,
  pt as GithubAuthProvider,
  ht as GoogleAuthProvider,
  nt as OAuthCredential,
  dt as OAuthProvider,
  P as OperationType,
  rt as PhoneAuthCredential,
  ti as PhoneAuthProvider,
  Bi as PhoneMultiFactorGenerator,
  O as ProviderId,
  $n as RecaptchaVerifier,
  mt as SAMLAuthProvider,
  C as SignInMethod,
  gt as TwitterAuthProvider,
  Vt as applyActionCode,
  un as beforeAuthStateChanged,
  En as browserLocalPersistence,
  zi as browserPopupRedirectResolver,
  bn as browserSessionPersistence,
  xt as checkActionCode,
  Ft as confirmPasswordReset,
  Ke as connectAuthEmulator,
  jt as createUserWithEmailAndPassword,
  M as debugErrorMap,
  fn as deleteUser,
  Bt as fetchSignInMethodsForEmail,
  on as getAdditionalUserInfo,
  Xi as getAuth,
  me as getIdToken,
  ge as getIdTokenResult,
  vn as getMultiFactorResolver,
  wi as getRedirectResult,
  Re as inMemoryPersistence,
  Vn as indexedDBLocalPersistence,
  X as initializeAuth,
  zt as isSignInWithEmailLink,
  Ot as linkWithCredential,
  Xn as linkWithPhoneNumber,
  li as linkWithPopup,
  Ti as linkWithRedirect,
  yn as multiFactor,
  dn as onAuthStateChanged,
  cn as onIdTokenChanged,
  ot as parseActionCodeURL,
  U as prodErrorMap,
  Ct as reauthenticateWithCredential,
  Qn as reauthenticateWithPhoneNumber,
  di as reauthenticateWithPopup,
  yi as reauthenticateWithRedirect,
  Ee as reload,
  Kt as sendEmailVerification,
  Ut as sendPasswordResetEmail,
  Wt as sendSignInLinkToEmail,
  an as setPersistence,
  yt as signInAnonymously,
  Nt as signInWithCredential,
  Pt as signInWithCustomToken,
  qt as signInWithEmailAndPassword,
  Gt as signInWithEmailLink,
  Yn as signInWithPhoneNumber,
  ui as signInWithPopup,
  Ii as signInWithRedirect,
  pn as signOut,
  kt as unlink,
  hn as updateCurrentUser,
  Yt as updateEmail,
  Xt as updatePassword,
  ei as updatePhoneNumber,
  Jt as updateProfile,
  ln as useDeviceLanguage,
  $t as verifyBeforeUpdateEmail,
  Ht as verifyPasswordResetCode
};

//# sourceMappingURL=firebase-auth.js.map
