const fs = require('fs');
const path = require('path');
const helperPlugin = require('./helper/_testPlugin.js');
const postcss = require('postcss');
const plugin = require('..');

function run(fixturename, data = []) {
  it(
    'should match the snapshot for ' + fixturename.replace('.css', ''),
    (done) => {
      const input = fs.readFileSync(
        path.join(__dirname, `./fixtures/${fixturename}`),
        'utf8'
      );

      let result = postcss([
        helperPlugin({ data }),
        plugin.default(),
      ]).process(input, { from: undefined });

      expect(result.css).toMatchSnapshot();

      done();
    }
  );
}

fs.readdirSync(path.join(__dirname, './fixtures'))
  .filter((filename) => /(.).css/g.test(filename))
  .forEach((fixtureName) => {
    const data = require(path.join(
      __dirname,
      `./fixtures/${fixtureName.replace('.css', '')}.json`
    ));
    run(fixtureName, data);
  });
