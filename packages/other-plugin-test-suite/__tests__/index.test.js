import fs from 'fs';
import path from 'path';
import postcss from 'postcss';

import cssnanoIgnoreRemove from '../../cssnano-ignore-remove/src';
import cssnanoIgnoreAdd from '../../cssnano-ignore-add/src';

function run(fixturename, plugin, pluginPkg) {
  it(
    'should match the snapshot for [' +
      fixturename.replace('.css', '') +
      '] using default cssnano preset',
    (done) => {
      const input = fs.readFileSync(
        path.join(__dirname, `./fixtures/${plugin}/input/${fixturename}`),
        'utf8'
      );
      postcss([cssnanoIgnoreRemove(), require(pluginPkg), cssnanoIgnoreAdd()])
        .process(input)
        .then((result) => {
          const output = fs.readFileSync(
            path.join(__dirname, `./fixtures/${plugin}/output/${fixturename}`),
            'utf8'
          );

          expect(result.css).toBe(output);
          done();
        });
    }
  );
}

// fs.readdirSync(path.join(__dirname, './fixtures/input')).forEach(
//   run
// );

const pluginLists = [
  'autoprefixer',
  'postcss-preset-env',
  './testplugins/custom-plugin-changing-messages-type',
];
pluginLists.forEach((plugin) => {
  const pluginPkg = plugin;

  if (plugin.split('testplugins/').length > 1) {
    // its a local package , resolve it locally
    plugin = plugin.split('testplugins/')[1];
  }

  fs.readdirSync(path.join(__dirname, `./fixtures/${plugin}/input`)).forEach(
    (fixturename) => {
      run(fixturename, plugin, pluginPkg);
    }
  );
});
