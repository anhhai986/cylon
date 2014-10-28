'use strict';

var Logger = source('logger'),
    Utils = source('utils');

describe('Logger', function() {
  afterEach(function() {
    Logger.setup(false); // to be friendly to other specs
  });

  describe("#setup", function() {
    context("with no arguments", function() {
      it("sets up a BasicLogger", function() {
        Logger.setup();
        expect(Logger.toString()).to.be.eql("BasicLogger");
      });
    });

    context("with false", function() {
      it("sets up a NullLogger", function() {
        Logger.setup(false);
        expect(Logger.toString()).to.be.eql("NullLogger");
      });
    });

    context("with a custom logger", function() {
      it("uses the custom logger", function() {
        var logger = { toString: function() { return "custom"; } };
        Logger.setup(logger);
        expect(Logger.toString()).to.be.eql("custom");
      });
    });
  });

  describe("proxies", function() {
    var logger;

    beforeEach(function() {
      logger = {
        debug: spy(),
        info: spy(),
        warn: spy(),
        error: spy(),
        fatal: spy()
      };

      Logger.setup(logger);
    });

    describe("#debug", function() {
      it("proxies to the Logger's #debug method", function() {
        Logger.debug("Hello", "World");
        expect(logger.debug).to.be.calledWith("Hello", "World");
      });
    });

    describe("#info", function() {
      it("proxies to the Logger's #info method", function() {
        Logger.info("Hello", "World");
        expect(logger.info).to.be.calledWith("Hello", "World");
      });
    });

    describe("#warn", function() {
      it("proxies to the Logger's #warn method", function() {
        Logger.warn("Hello", "World");
        expect(logger.warn).to.be.calledWith("Hello", "World");
      });
    });

    describe("#error", function() {
      it("proxies to the Logger's #error method", function() {
        Logger.error("Hello", "World");
        expect(logger.error).to.be.calledWith("Hello", "World");
      });
    });

    describe("#fatal", function() {
      it("proxies to the Logger's #fatal method", function() {
        Logger.fatal("Hello", "World");
        expect(logger.fatal).to.be.calledWith("Hello", "World");
      });
    });
  });

  describe("log levels", function() {
    var logger;

    beforeEach(function() {
      logger = {
        debug: spy(),
        info: spy(),
        warn: spy(),
        error: spy(),
        fatal: spy()
      };

      Logger.setup(logger, 'warn');
    });

    it("prevents logging of anything below the specified log level", function() {
      Logger.debug("debug message");
      Logger.info("info message");

      expect(logger.debug).to.not.be.called;
      expect(logger.info).to.not.be.called;
    });

    it("still logs anything equal or greater than the specified log level", function() {
      Logger.warn("warn message");
      Logger.error("error message");
      Logger.fatal("fatal message");

      expect(logger.warn).to.be.calledWith('warn message');
      expect(logger.error).to.be.calledWith('error message');
      expect(logger.fatal).to.be.calledWith('fatal message');
    });
  });
});
