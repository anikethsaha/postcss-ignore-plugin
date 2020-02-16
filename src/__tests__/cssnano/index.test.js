import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import cssnano from 'cssnano';
import cssnanoIgnoreRemove from '../../remove';
import cssnanoIgnoreAdd from '../../add';

function runWithDefaultPreset(fixturename) {
  it(
    'should match the snapshot for [' +
      fixturename.replace('.css', '') +
      '] using default cssnano preset',
    (done) => {
      const input = fs.readFileSync(
        path.join(__dirname, `./fixtures/input/${fixturename}`),
        'utf8'
      );
      postcss([
        cssnanoIgnoreRemove(),
        cssnano({
          preset: 'default',
        }),
        cssnanoIgnoreAdd(),
      ])
        .process(input)
        .then((result) => {
          const output = fs.readFileSync(
            path.join(__dirname, `./fixtures/output/${fixturename}`),
            'utf8'
          );

          expect(result.css).toBe(output);
          done();
        });
    }
  );
}

fs.readdirSync(path.join(__dirname, './fixtures/input')).forEach(
  runWithDefaultPreset
);
