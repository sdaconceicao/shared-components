'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

const appDirectory = fs.realpathSync(process.cwd());
const envPublicUrl = process.env.PUBLIC_URL;
const nodePaths = (process.env.NODE_PATH || '')
    .split(process.platform === 'win32' ? ';' : ':')
    .filter(Boolean)
    .filter(folder => !path.isAbsolute(folder))
    .map(resolveApp);

function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

function ensureSlash(path, needsSlash) {
    const hasSlash = path.endsWith('/');
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return path + '/';
    } else {
        return path;
    }
}

function getPublicUrl(appPackageJson) {
    return envPublicUrl || require(appPackageJson).homepage;
}

function getServedPath(appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson),
          servedUrl = envPublicUrl || (
            publicUrl ? url.parse(publicUrl).pathname : '/'
    );
    return ensureSlash(servedUrl, true);
}

module.exports = {
    path,
    appBuild: resolveApp('dist'),
    appHtml: resolveApp('styleguide/index.html'),
    appIndexJs: resolveApp('src/index.js'),
    appStyleguide: resolveApp('styleguide'),
    appStyleguideJs: resolveApp('styleguide/Styleguide.jsx'),
    appPackageJson: resolveApp('package.json'),
    node: resolveApp('node_modules'),
    appSrc: resolveApp('src'),
    yarnLockFile: resolveApp('yarn.lock'),
    appNodeModules: resolveApp('node_modules'),
    nodePaths: nodePaths,
    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServedPath(resolveApp('package.json'))
};