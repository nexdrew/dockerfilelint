var expect = require('chai').expect
var dockerfilelint = require('../lib/index');
var fs = require('fs');
var _ = require('lodash');

describe("index", function(){
  describe("#busybox", function(){
    it("validates the busybox Dockerfile has no issues", function(){
      expect(dockerfilelint.run(fs.readFileSync('./test/examples/Dockerfile.busybox', 'UTF-8'))).to.be.empty;
    });
  });

  describe("#debian", function(){
    it("validates the debian Dockerfile has no issues", function(){
      expect(dockerfilelint.run(fs.readFileSync('./test/examples/Dockerfile.debian', 'UTF-8'))).to.be.empty;
    });
  });

  describe("#mongo", function(){
    it("validates the mongo Dockerfile has 1 issue (known issue)", function(){
      expect(dockerfilelint.run(fs.readFileSync('./test/examples/Dockerfile.mongo', 'UTF-8'))).to.have.length(1);
    });
  });

  describe("#mysql", function(){
    it("validates the mysql Dockerfile has 1 issue (known issue)", function(){
      expect(dockerfilelint.run(fs.readFileSync('./test/examples/Dockerfile.mysql', 'UTF-8'))).to.have.length(1);
    });
  });

  describe("#nginx", function(){
    it("validates the nginx Dockerfile has 1 issue (known issue)", function(){
      expect(dockerfilelint.run(fs.readFileSync('./test/examples/Dockerfile.nginx', 'UTF-8'))).to.have.length(1);
    });
  });

  describe("#node", function(){
    it("validates the node Dockerfile has no issues", function(){
      expect(dockerfilelint.run(fs.readFileSync('./test/examples/Dockerfile.node', 'UTF-8'))).to.be.empty;
    });
  });

  describe("#redis", function(){
    it("validates the redis Dockerfile has no issues", function(){
      expect(dockerfilelint.run(fs.readFileSync('./test/examples/Dockerfile.redis', 'UTF-8'))).to.be.empty;
    });
  });

  describe("#registry", function(){
    it("validates the mysql Dockerfile has 1 issue (known issue)", function(){
      expect(dockerfilelint.run(fs.readFileSync('./test/examples/Dockerfile.registry', 'UTF-8'))).to.have.length(1);
    });
  });

  describe("#swarm", function(){
    it("validates the swarm Dockerfile has no issues", function(){
      expect(dockerfilelint.run(fs.readFileSync('./test/examples/Dockerfile.swarm', 'UTF-8'))).to.be.empty;
    });
  });

  describe("#ubuntu", function(){
    it("validates the ubuntu Dockerfile has no issues", function(){
      expect(dockerfilelint.run(fs.readFileSync('./test/examples/Dockerfile.ubuntu', 'UTF-8'))).to.be.empty;
    });
  });

  describe("#misc", function(){
    it("validates the misc Dockerfile have the exact right issues reported", function(){
      var expected = [
          { title: 'First Command Must Be FROM',
            line: 6 },
          { title: 'First Command Must Be FROM',
            line: 6 },
          { title: 'Base Image Missing Tag',
            line: 5 },
          { title: 'First Command Must Be FROM',
            line: 6 },
          { title: 'Base Image Latest Tag',
            line: 6 },
          { title: 'Capitalize Dockerfile Instructions',
            line: 7 },
          { title: 'Invalid Command',
            line: 7 },
          { title: 'Missing Arguments',
            line: 9 },
          { title: 'Missing Required Arguments',
            line: 11 },
          { title: 'Invalid Line',
            line: 11 },
          { title: 'Use Of sudo Is Not Allowed',
            line: 12 },
          { title: 'Missing parameter for `apt-get`',
            line: 14 },
          { title: '`apt-get upgrade` Is Not Allowed',
            line: 13 },
          { title: 'Missing parameter for `apt-get`',
            line: 14 },
          { title: 'Consider `--no-install-recommends`',
            line: 14 },
          { title: 'apt-get dist-upgrade Is Not Allowed',
            line: 15 },
          { title: 'apt-get update with matching cache rm',
            line: 16 },
          { title: 'apt-get update without matching apt-get install',
            line: 16 },
          { title: 'Consider `--no-cache or --update with rm -rf /var/cache/apk/*`',
            line: 17 },
          { title: 'Consider `--virtual` when using apk add and del together in a command.',
            line: 18 },
          { title: 'Invalid Port Exposed',
            line: 20 },
          { title: 'Expose Only Container Port',
            line: 21 },
          { title: 'Invalid Argument Format',
            line: 23 },
          { title: 'Label Is Invalid',
            line: 24 },
          { title: 'Label Is Invalid',
            line: 24 },
          { title: 'Extra Arguments',
            line: 26 },
          { title: 'Invalid WORKDIR',
            line: 27 },
          { title: 'Invalid ADD Source',
            line: 31 },
          { title: 'Invalid ADD Destination',
            line: 31 }
        ];

      var result = dockerfilelint.run(fs.readFileSync('./test/examples/Dockerfile.misc', 'UTF-8'));
      expect(result).to.have.length(expected.length);

      _.forEach(result, function(r) {
        delete r['description'];
        delete r['category'];
      });

      expect(result).to.deep.equal(expected);
    });
  });
});
