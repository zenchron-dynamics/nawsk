#!/usr/bin/env node

'use strict';
const path = require('path');
const FtpDeploy = require("ftp-deploy");
const chalk = require('chalk');
const log = console.log;
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));

const config = require(path.resolve(__dirname, '../' + args.config));

function deploy() {
    const ftpDeploy = new FtpDeploy();
    ftpDeploy.on('upload-error', function (data) {
        console.log(data.err); // data will also include filename, relativePath, and other goodies
    });

    ftpDeploy.on('uploaded', function (data) {
        log(chalk.red('Uploaded File ' + data.transferredFileCount + ' Out Of: ' + data.totalFilesCount))
    });
    ftpDeploy.on('uploading', function (data) {
        log(chalk.blueBright('Filename: ' + data.filename));
    });
    ftpDeploy.on('error', function (data) {
        console.log(data); // same data as uploading event
    });

    ftpDeploy.deploy(config, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('finished');
        }
    });
}

module.exports = deploy();