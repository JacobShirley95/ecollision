// Generated by CoffeeScript 1.10.0
(function() {
  var EaselJSRenderer, ParticleRenderer, SimulationRenderer,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ParticleRenderer = require('./particle-renderer');

  SimulationRenderer = require('../simulation-renderer');

  module.exports = EaselJSRenderer = (function(superClass) {
    var renderObjs;

    extend(EaselJSRenderer, superClass);

    renderObjs = [];

    function EaselJSRenderer(canvasName, engine) {
      this.canvasName = canvasName;
      this.engine = engine;
      EaselJSRenderer.__super__.constructor.call(this, this.canvasName, this.engine);
      this.stage = new createjs.Stage(this.canvasName);
      this.engine.addListener("update", function() {
        var i, len, particle, results;
        results = [];
        for (i = 0, len = renderObjs.length; i < len; i++) {
          particle = renderObjs[i];
          results.push(particle.capture());
        }
        return results;
      });
    }

    EaselJSRenderer.prototype.addParticle = function(particle) {
      var pr;
      pr = new ParticleRenderer(particle);
      this.stage.addChild(pr.displayObj);
      return renderObjs.push(pr);
    };

    EaselJSRenderer.prototype.removeParticle = function(particle) {};

    EaselJSRenderer.prototype.draw = function(interpolation) {
      var i, len, particle;
      for (i = 0, len = renderObjs.length; i < len; i++) {
        particle = renderObjs[i];
        particle.draw(interpolation);
      }
      return this.stage.update();
    };

    return EaselJSRenderer;

  })(SimulationRenderer);

}).call(this);
