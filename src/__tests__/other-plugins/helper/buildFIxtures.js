import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import postcss from 'postcss';

import cssnanoIgnoreRemove from '../../../remove';
import cssnanoIgnoreAdd from '../../../add';

function buildDefaultPresetFixtures(fixturename, plugin, pluginPkg) {
  console.log(
    `\n [BUILDING : ${fixturename}] for ${plugin} which is located @ ${pluginPkg}`
  );
  const input = fs.readFileSync(
    path.join(__dirname, `../fixtures/${plugin}/input/${fixturename}`),
    'utf8'
  );

  return postcss([
    cssnanoIgnoreRemove(),
    require(pluginPkg),
    cssnanoIgnoreAdd(),
  ])
    .process(input, {
      from: undefined,
    })
    .then((result) => {
      return fse.writeFile(
        `${path.join(
          __dirname,
          `../fixtures/${plugin}/output`
        )}/${fixturename}`,
        result.css
      );
    });
}

const pluginLists = [
  'autoprefixer',
  'postcss-preset-env',
  '../testplugins/custom-plugin-changing-messages-type',
];
pluginLists.forEach((plugin) => {
  const pluginPkg = plugin;

  if (plugin.split('testplugins/').length > 1) {
    // its a local package , resolve it locally
    plugin = plugin.split('testplugins/')[1];
  }

  fs.readdirSync(path.join(__dirname, `../fixtures/${plugin}/input`)).forEach(
    (fixturename) => {
      buildDefaultPresetFixtures(fixturename, plugin, pluginPkg);
    }
  );
});
