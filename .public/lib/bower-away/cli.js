#!/usr/bin/env node
"use strict";

require("babel-polyfill/lib/core-js/modules/es6.promise");

require("babel-polyfill/lib/core-js/modules/es6.symbol");

require("babel-polyfill/lib/core-js/modules/web.dom.iterable");

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

require("babel-polyfill/lib/core-js/modules/es6.symbol");

require("babel-polyfill/lib/core-js/modules/web.dom.iterable");

require("babel-polyfill/lib/regenerator-runtime/runtime");

require("babel-polyfill/lib/core-js/modules/es6.string.starts-with");

var main = function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var cwd, yarnPath, bowerPath, config, componentsDir, hasComponentsDir, original, expected, hadBowerComponents, source, pkgs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _pkg2, manifest, _source2, target, script, oldDirExists;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cwd = process.cwd();

            if (!fs.existsSync(path.join(cwd, 'bower.json'))) {
              if (fs.existsSync(path.join(cwd, 'node_modules', '@bower_components'))) {
                step('Done', lastMessage, true);
              } else {
                step('Browse to project directory', ['Current directory does not contain bower.json', '', 'Please browse to directory that contains your project to convert.']);
              }
            }

            yarnPath = exists('yarn', cwd);

            if (!yarnPath) {
              step('Install Yarn', ['A good first step to migrate to Yarn is installing it!', '', 'Please choose your preferred method:', 'https://yarnpkg.com/lang/en/docs/install/', '', 'One good way to install it is:', '$ npm install -g yarn', '', "At the end you should be able to confirm Yarn's version with:", '$ yarn --version', '', 'THE MINIMUM SUPPORTED VERSION OF YARN IS 1.0.0!']);
            }

            bowerPath = exists('bower');

            if (!bowerPath) {
              step('Install Bower', ['We cannot drop Bower just yet, we need it to install legacy dependencies.', '', 'As a first step, please install Bower with:', '$ npm install -g bower', '', '...or if your project requires specific version of Bower:', '$ npm install -g bower@1.4.x', '', "At the end you should be able to confirm Bower's version with:", '$ bower --version']);
            }

            config = bowerConfig.read(cwd);
            componentsDir = path.resolve(cwd, config.directory);
            hasComponentsDir = false;

            try {
              if (fs.lstatSync(componentsDir).isDirectory()) {
                hasComponentsDir = true;
              }
            } catch (e) {}

            original = {};

            if (fs.existsSync('package.json')) {
              original = JSON.parse(fs.readFileSync('package.json'));
            }

            expected = cloneDeep(original);
            hadBowerComponents = false;

            if (expected.dependencies) {
              Object.keys(expected.dependencies).forEach(function (k) {
                if (k.indexOf('@bower_components') >= 0) {
                  hadBowerComponents = true;
                  delete expected.dependencies[k];
                }
              });
            }

            if (!hasComponentsDir && !hadBowerComponents) {
              step('Install dependencies with Bower', ['We need to install dependencies the old way first. Please run:', '$ bower install', '', 'At the end you should see some packages in:', componentsDir]);
            }

            source = path.relative(process.cwd(), componentsDir);

            if (!hasComponentsDir) {
              _context.next = 44;
              break;
            }

            pkgs = fs.readdirSync(componentsDir);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 22;

            for (_iterator = pkgs[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _pkg2 = _step.value;
              manifest = JSON.parse(fs.readFileSync(path.join(componentsDir, _pkg2, '.bower.json')));
              _source2 = manifest._source;
              target = manifest._target;

              if (_source2.slice(0, 19) === 'https://github.com/') {
                _source2 = _source2.slice(19);

                if (_source2.slice(-4) === '.git') {
                  _source2 = _source2.slice(0, -4);
                }

                _source2 = _source2;
              }

              if (!('dependencies' in expected)) {
                expected.dependencies = {};
              }

              expected.dependencies["@bower_components/".concat(_pkg2)] = "".concat(_source2, "#").concat(target);
            }

            _context.next = 30;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](22);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 30:
            _context.prev = 30;
            _context.prev = 31;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 33:
            _context.prev = 33;

            if (!_didIteratorError) {
              _context.next = 36;
              break;
            }

            throw _iteratorError;

          case 36:
            return _context.finish(33);

          case 37:
            return _context.finish(30);

          case 38:
            if (_typeof(expected.engines) !== 'object') {
              expected.engines = {};
            }

            if (!expected.engines.yarn) {
              expected.engines.yarn = '>= 1.0.0';
            }

            script = "node -e \"try { require('fs').symlinkSync(require('path').resolve('node_modules/@bower_components'), '" + source + "', 'junction') } catch (e) { }\"";

            if (!expected.scripts) {
              expected.scripts = {};
            }

            if (!expected.scripts.postinstall || expected.scripts.postinstall.indexOf('bower install') >= 0) {
              expected.scripts.postinstall = script;
            } else if (expected.scripts.postinstall.indexOf('symlinkSync') == -1) {
              expected.scripts.postinstall = expected.scripts.postinstall + ' && ' + script;
            }

            if (!deepIs(expected, original)) {
              if (cli.flags.diff) {
                if (process.stdout.isTTY) {
                  console.log(difflet.compare(original, expected, {
                    indent: 2
                  }));
                }

                process.exit(0);
              } else if (cli.flags.apply) {
                fs.writeFileSync('package.json', JSON.stringify(expected, null, 2) + '\n');
              } else {
                if (fs.existsSync('package.json')) {
                  step('Update package.json', ['Changes need to be made in package.json. Please run following to preview them:', '', '$ bower-away --diff', '', 'And then apply them by running:', '', '$ bower-away --apply']);
                } else {
                  step('Update package.json', ['You need to create package.json. You can preview it by running:', '', '$ bower-away --diff', '', 'And then apply them by running:', '', '$ bower-away --apply']);
                }
              }
            }

          case 44:
            oldDirExists = false;

            try {
              if (fs.lstatSync(componentsDir).isDirectory()) {
                oldDirExists = true;
              }
            } catch (e) {}

            if (oldDirExists) {
              step('Remove old components directory', ['Now, please remove original components directory:', '$ rm -rf ' + source]);
            }

            if (!fs.existsSync(path.join(cwd, 'node_modules', '@bower_components'))) {
              step('Install dependencies with Yarn', ['Now install dependencies again with:', '$ yarn', '', 'If you encounter issues during installation, please try:', '$ yarn --ignore-engines', '', 'If it also fails, you can try following:', '$ yarn --ignore-engines --ignore-scripts && yarn postinstall', '', 'You can use this command from now on to install both npm and bower dependencies!']);
            }

            if (fs.existsSync(path.join(cwd, 'bower.json'))) {
              step('Remove bower.json and old bower components directory', ['As a last step, please remove bower.json and .bowerrc']);
            }

            step('Done', lastMessage, true);

          case 50:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[22, 26, 30, 38], [31,, 33, 37]]);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }

      function _next(value) {
        step("next", value);
      }

      function _throw(err) {
        step("throw", err);
      }

      _next();
    });
  };
}

var updateNotifier = require('update-notifier');

var meow = require('meow');

var bowerConfig = require('bower-config');

var which = require('which');

var chalk = require('chalk');

var path = require('path');

var fs = require('fs');

var _require = require('lodash'),
    startsWith = _require.startsWith;

var execa = require('execa');

var cloneDeep = require('clone-deep');

var difflet = require('difflet')({
  indent: 2
});

var deepIs = require('deep-is');

var pkg = require('./package.json');

updateNotifier({
  pkg: pkg
}).notify();
var cli = meow("\n  Usage\n    $ bower-away\n\n  Please call this command for next step to convert your project to Yarn\n  ");
var lastMessage = ['Your project is now converted to Yarn! Thank you for using Bower!', '', 'You should find all bower components in node_modules/@bower_components', '', 'The postinstall script should also link it to old location of components', '', 'It is advisable to remove postinstall script and point your tools', 'to point to node_modules/@bower_components instead, though.', '', 'You may also consider creating separate directory for front-end project with separate package.json'];

function help() {
  console.error(cli.help);
  process.exit(1);
}

function step(title, lines) {
  var last = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  console.error();
  console.error(chalk.green('# ' + title));
  console.error();
  console.error(lines.join('\n'));

  if (!last) {
    console.error();
    console.error(chalk.red("Please call bower-away once more when you're done with this!"));
  }

  console.error();
  process.exit(0);
}

function exists(bin) {
  var path;

  try {
    path = which.sync(bin);
  } catch (e) {
    return false;
  }

  return path;
}

main();