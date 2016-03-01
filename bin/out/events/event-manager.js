// Generated by CoffeeScript 1.10.0

/* EventManager, v1.0.1
*
* Copyright (c) 2009, Howard Rauscher
* Licensed under the MIT License
 */

(function() {
  var EventManager;

  module.exports = EventManager = (function() {
    var EventArg, _listeners;

    EventArg = (function() {
      function EventArg(name1, data1) {
        this.name = name1;
        this.data = data1;
        this.cancelled = false;
        this.removed = false;
      }

      EventArg.prototype.cancel = function() {
        return this.cancelled = true;
      };

      EventArg.prototype.remove = function() {
        return this.removed = true;
      };

      return EventArg;

    })();

    _listeners = [];

    function EventManager() {}

    EventManager.prototype.addListener = function(name, fn) {
      (_listeners[name] = _listeners[name] || []).push(fn);
      return this;
    };

    EventManager.prototype.removeListener = function(name, fn) {
      var foundAt, i, j, len1, listener, listeners;
      if (arguments.length === 1) {
        _listeners[name] = [];
      } else if (typeof fn === 'function') {
        listeners = _listeners[name];
        if (listeners !== void 0) {
          foundAt = -1;
          for (i = j = 0, len1 = listeners.length; j < len1; i = ++j) {
            listener = listeners[i];
            if (listener === fn) {
              foundAt = i;
              break;
            }
          }
          if (foundAt >= 0) {
            listeners.splice(foundAt, 1);
          }
        }
      }
      return this;
    };

    EventManager.prototype.fire = function(name, args) {
      var data, evt, i, j, len, len1, listener, listeners;
      listeners = _listeners[name];
      args = args || [];
      if (listeners !== void 0) {
        data = {};
        evt = null;
        for (i = j = 0, len1 = listeners.length; j < len1; i = ++j) {
          listener = listeners[i];
          evt = new EventArg(name, data);
          listener.apply(window, args.concat(evt));
          data = evt.data;
          if (evt.removed) {
            listeners.splice(i, 1);
            len = listeners.length;
            --i;
          }
          if (evt.cancelled) {
            break;
          }
        }
      }
      return this;
    };

    EventManager.prototype.hasListeners = function(name) {
      var ref;
      return ((ref = _listeners[name] === void 0) != null ? ref : {
        0: _listeners[name].length
      }) > 0;
    };

    EventManager.eventify = function(object, manager) {
      var func, j, len1, method, methods, results;
      methods = ['addListener', 'removeListener', 'fire'];
      manager = manager || new EventManager();
      func = function(method) {
        return object[method] = function() {
          return manager[method].apply(manager, arguments);
        };
      };
      results = [];
      for (j = 0, len1 = methods.length; j < len1; j++) {
        method = methods[j];
        results.push(func(method));
      }
      return results;
    };

    return EventManager;

  })();

}).call(this);
