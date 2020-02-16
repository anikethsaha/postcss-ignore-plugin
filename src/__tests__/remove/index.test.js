const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const plugin = require('../../remove');

function run(fixturename) {
  it(
    'should match the snapshot for ' + fixturename.replace('.css', ''),
    (done) => {
      const input = fs.readFileSync(
        path.join(__dirname, `./fixtures/${fixturename}`),
        'utf8'
      );
      let result = postcss([plugin.default()]).process(input, {
        from: undefined,
      });
      expect(result.css).toMatchSnapshot();
      done();
    }
  );
}

fs.readdirSync(path.join(__dirname, './fixtures')).forEach((fixtureName) => {
  run(fixtureName);
});
