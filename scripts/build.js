import { build } from 'esbuild';
import fs from 'fs';

// Egyszerű template loader
const templateLoader = {
  name: 'template-loader',
  setup(build) {
    build.onLoad({ filter: /\.(pug|html)$/ }, async (args) => {
      const template = fs.readFileSync(args.path, 'utf8');
      return {
        contents: `export default ${JSON.stringify(template)}`,
        loader: 'js'
      };
    });
  }
};

// Egyszerű CSS loader
const cssLoader = {
  name: 'css-loader',
  setup(build) {
    build.onLoad({ filter: /\.(css|scss|sass)$/ }, async (args) => {
      const css = fs.readFileSync(args.path, 'utf8');
      return {
        contents: `export default ${JSON.stringify(css)}`,
        loader: 'js'
      };
    });
  }
};

// Build konfiguráció
build({
  entryPoints: ['./src/component/usersTable/index.js'],
  bundle: true,
  outfile: './build/usersTable.js',
  format: 'esm',
  plugins: [templateLoader, cssLoader]
}).catch(() => process.exit(1));