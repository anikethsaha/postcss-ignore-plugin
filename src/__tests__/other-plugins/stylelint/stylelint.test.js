import fs from 'fs';

import path from 'path';
import postcss from 'postcss';
import stylelint from 'stylelint';

import cssnanoIgnoreRemove from '../../../remove';
import cssnanoIgnoreAdd from '../../../add';

const run = (fixturename) => {
  const code = fs.readFileSync(
    path.join(__dirname, `/fixtures/${fixturename}`),
    'utf8'
  );
  it(
    'should ignore the cssnano-ignore-line comments for stylelint ' +
      fixturename,
    (done) => {
      postcss([
        cssnanoIgnoreRemove(),
        stylelint({
          config: {
            rules: { 'property-no-unknown': true, 'unit-no-unknown': true },
          },
        }),
        cssnanoIgnoreAdd(),
      ])
        .process(code)
        .then((resultObject) => {
          const stylelintWarnings = resultObject.messages.slice(1);
          expect(stylelintWarnings).toMatchSnapshot();
          done();
        });
    }
  );
};
fs.readdirSync(path.join(__dirname, `./fixtures`)).forEach(run);
