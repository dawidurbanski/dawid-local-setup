#!/usr/bin/env node

'use strict';

var fs = require('fs');
var dir = process.cwd() + '/tmp';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}