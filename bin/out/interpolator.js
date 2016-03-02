// Generated by CoffeeScript 1.10.0
(function() {
  var EventManager, Interpolator;

  EventManager = require("./events/event-manager");

  module.exports = Interpolator = (function() {
    var curTime, lastTime, rate1, rate2, timeStamp;

    rate1 = 0;

    rate2 = 0;

    curTime = lastTime = timeStamp = 0;

    Interpolator.prototype.interpolation = 0.0;

    Interpolator.prototype.lockFPS = false;

    function Interpolator(renderRate, updateRate, engine) {
      this.renderRate = renderRate;
      this.updateRate = updateRate;
      this.engine = engine;
      this.start = new Date().getTime();
      EventManager.eventify(this);
    }

    Interpolator.prototype.update = function() {
      var renderTime, updateTime;
      updateTime = 1000.0 / this.updateRate;
      renderTime = 1000.0 / this.renderRate;
      if (this.lockFPS) {
        curTime = new Date().getTime() - this.start;
      } else {
        curTime += renderTime;
      }
      if (curTime - lastTime >= updateTime) {
        this.fire("before-update");
        timeStamp = curTime;
        while (curTime - lastTime >= updateTime) {
          this.engine.update();
          this.fire("update");
          lastTime += updateTime;
        }
        this.fire("after-update");
      }
      return this.interpolation = Math.min(1.0, (curTime - timeStamp) / updateTime);
    };

    return Interpolator;

  })();

}).call(this);