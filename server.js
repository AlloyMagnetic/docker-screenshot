'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');
const tr = require('transliteration');
const normalizeUrl = require('normalize-url');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const phantomjs = require('phantomjs');
const binPath = phantomjs.path;

// App
const app = express();
app.get('/:url', (req, res) => {
  const url = normalizeUrl(req.params.url);
  const img = tr.slugify(url) + '.png';
  const dest = path.join(__dirname, 'thumbs/' + img);
  if (fs.existsSync(dest)) {
    res.sendFile(dest);
  }
  var childArgs = [
    '--ignore-ssl-errors=true',
    '--ssl-protocol=any',
    '--web-security=true',
    path.join(__dirname, 'rasterize.js'),
    url,
    dest,
    '1280px*800px'
  ]
  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    // handle results
    if (err) {
      console.log(stderr);
    }
    res.sendFile(dest);
  })
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);