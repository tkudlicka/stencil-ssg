import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import fs from 'fs';
import https from 'https';
import os from 'os';

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https
            .get(url, (response) => {
                if (response.statusCode !== 200) {
                    return reject(new Error(`Failed to download file: HTTP ${response.statusCode}`));
                }
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            })
            .on('error', (err) => {
                fs.unlink(dest, () => reject(err));
            });
    });
}

export function injectHydratedCiHeader() {
    const tmpFolder = os.tmpdir();
    const localScriptPath = path.join(tmpFolder, 'hydrateScript.js');
    const htmlFilePath = path.join(__dirname, '../', 'dist', 'index.html');
    return {
        name: 'inject-hydrated-ci-header',
        async writeBundle() {
            const scriptUrl = process.env.ACCOUNTS_PIGMENT_CDN_URL + '/ci-header-footer/hydrate/index.js';
            await downloadFile(scriptUrl, localScriptPath);

            console.log('vite-plugin-ssg-header.js: Requiring the downloaded script...');
            const hydrateModule = await import(`file://${localScriptPath}`);

            if (typeof hydrateModule.renderToString !== 'function') {
                throw new Error('vite-plugin-ssg-header.js: The required method renderToString was not found in the module.');
            }

            console.log('vite-plugin-ssg-header.js: Reading the index.html file...');
            const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

            console.log('vite-plugin-ssg-header.js: Hydrating the HTML using renderToString...');
            const hydratedHtml = await hydrateModule.renderToString(htmlContent, {
                fullDocument: true,
                serializeShadowRoot: true,
                prettyHtml: true,
            });

            console.log('vite-plugin-ssg-header.js: Writing the hydrated HTML back to index.html...');
            fs.writeFileSync(htmlFilePath, hydratedHtml.html, 'utf-8');
            console.log('vite-plugin-ssg-header.js: Hydration process complete.');
        },
    };
}

interface buildParams {
    mode: string;
}

// https://vitejs.dev/config/
export default function config(params: buildParams) {
    const prefixes = ['VITE_', 'ACCOUNTS_'];
    process.env = { ...process.env, ...loadEnv(params.mode, process.cwd(), prefixes) };

    const plugins = [
        react(),
        splitVendorChunkPlugin(),
        injectHydratedCiHeader(),
    ];

    return defineConfig({
        plugins,
        build: {
            commonjsOptions: {
                transformMixedEsModules: true,
            },
            target: ['es2015'],
            rollupOptions: {
                output: {
                    format: 'es',
                },
            },
            sourcemap: true,
        },
        envPrefix: prefixes,
        resolve: {
            alias: {
                '~': `${path.resolve(__dirname, 'src')}`,
            },
        },
        server: {
            port: 3080,
            host: '0.0.0.0',
        },
    });
}
