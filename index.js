#!/usr/bin/env node

'use strict';

const { exec } = require('child_process');
const fse = require('fs-extra');
const { default: slugify } = require('slugify');
const Handlebars = require("handlebars");

const args = process.argv.slice(2);

const name = args[0];
const slug = slugify(name.toLowerCase());

const dir = `${process.cwd()}/${slug}`;

console.log(__dirname);

if (!fse.existsSync(dir)){
    fse.mkdirSync(dir);
}

fse.copySync(`${__dirname}/template/src`, `${dir}/src`);

const templateData = { name, slug };

const templates = [
    {
        file: 'index.html',
        path: 'index.html.hbs'
    },
    {
        file: 'package.json',
        path: 'package.json.hbs'
    }
];

for (const { file, path } of templates) {
    fse.readFile(`${__dirname}/template/${path}`, 'utf8', (err, data) => {
        const template = Handlebars.compile(data);
        fse.writeFileSync(`${dir}/${file}`, template(templateData));
    });
}

exec('npm install', {cwd: dir}, (err, stdout, stderr) => {
    if (err) {
        return;
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});