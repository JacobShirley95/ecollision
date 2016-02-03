// Generated by CoffeeScript 1.10.0
(function() {
  var Particle, Simulation, Widget,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Widget = require("./widget");

  Particle = require('../objects/particle');

  module.exports = Simulation = (function(superClass) {
    var selected;

    extend(Simulation, superClass);

    selected = -1;

    function Simulation(canvasName, engine, settings) {
      this.engine = engine;
      this.settings = settings;
      Simulation.__super__.constructor.call(this, canvasName);
      this.engine.width = this.width;
      this.engine.height = this.height;
    }

    Simulation.prototype.resize = function(newWidth, newHeight) {
      return this.engine.setBounds(newWidth, newHeight);
    };

    Simulation.prototype.addParticle = function(x, y, mass, radius, style) {
      var particle;
      particle = new Particle(x, y, radius, style, this.settings);
      particle.mass = mass;
      particle.addEventListener("click", (function(_this) {
        return function(ev) {
          var i, p, results;
          if (selected !== -1) {
            p = _this.engine.particles[selected];
            p.deselect();
            _this.onDeselect(p);
          }
          i = 0;
          results = [];
          while (i < _this.engine.particles.length) {
            p = _this.engine.particles[i];
            if (p.displayObj === ev.target) {
              if (i !== selected) {
                _this.onSelect(p);
                selected = i;
                p.select();
              } else {
                selected = -1;
              }
              break;
            }
            results.push(i++);
          }
          return results;
        };
      })(this));
      this.stage.addChild(particle.displayObj);
      this.engine.particles.push(particle);
      return particle;
    };

    Simulation.prototype.onSelect = function(particle) {};

    Simulation.prototype.onDeselect = function(particle) {};

    Simulation.prototype.removeParticle = function(index) {
      this.stage.removeChild(this.engine.particles[index].displayObj);
      return this.engine.particles.splice(index, 1);
    };

    Simulation.prototype.loadParticles = function(toBeLoaded) {
      var j, len, obj, particle, results;
      this.restart();
      results = [];
      for (j = 0, len = toBeLoaded.length; j < len; j++) {
        obj = toBeLoaded[j];
        particle = this.addParticle(obj.x, obj.y, obj.mass, obj.radius, obj.style);
        particle.xVel = obj.xVel;
        particle.yVel = obj.yVel;
        results.push(particle.cOR = obj.cOR);
      }
      return results;
    };

    Simulation.prototype.saveParticles = function(saved) {
      var j, len, particle, ref, results;
      ref = this.engine.particles;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        particle = ref[j];
        results.push(saved.push(particle.copy()));
      }
      return results;
    };

    Simulation.prototype.removeSelected = function() {
      if (selected !== -1) {
        this.removeParticle(selected);
        return selected = -1;
      }
    };

    Simulation.prototype.getSelected = function() {
      var sel;
      sel = null;
      if (selected !== -1) {
        sel = this.engine.particles[selected];
      }
      return sel;
    };

    Simulation.prototype.getSelectedID = function() {
      return selected;
    };

    Simulation.prototype.restart = function() {
      this.stage.removeAllChildren();
      selected = -1;
      return this.engine.reset();
    };

    Simulation.prototype.draw = function(interpolation) {
      var diffX, diffY, j, len, newX, newY, particle, ref;
      ref = this.engine.particles;
      for (j = 0, len = ref.length; j < len; j++) {
        particle = ref[j];
        newX = particle.x;
        newY = particle.y;
        if (this.settings.global.enableInterpolation) {
          diffX = particle.x - particle.lastX;
          diffY = particle.y - particle.lastY;
          newX = particle.lastX + (interpolation * diffX);
          newY = particle.lastY + (interpolation * diffY);
        }
        particle.draw(newX, newY);
      }
      return this.stage.update();
    };

    return Simulation;

  })(Widget);

}).call(this);
