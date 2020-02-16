import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import postcss from 'postcss';
import cssnano from 'cssnano';
import cssnanoIgnoreRemove from '../../../remove';
import cssnanoIgnoreAdd from '../../../add';

function buildDefaultPresetFixtures(fixturename) {
  const input = fs.readFileSync(
    path.join(__dirname, `../fixtures/input/${fixturename}`),
    'utf8'
  );

  return postcss([
    cssnanoIgnoreRemove(),
    cssnano({
      preset: 'default',
    }),
    cssnanoIgnoreAdd(),
  ])
    .process(input, {
      from: undefined,
    })
    .then((result) => {
      return fse.writeFile(
        `${path.join(__dirname, '../fixtures/output')}/${fixturename}`,
        result.css
      );
    });
}

fs.readdirSync(path.join(__dirname, '../fixtures/input')).forEach(
  buildDefaultPresetFixtures
);
