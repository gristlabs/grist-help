"use strict";
/**
 *
 * Builds the keyboard shortcuts help page.
 *
 *    node build-shortcuts.js [-i] grist-root
 *
 * Reads the grist shortcuts from the grist source tree specified by `grist-root` and generates a
 * formatted content, which is then inserted into the target file (`help/en/docs/keyboard-shortcuts.md`)
 * in-between the two markers `<!-- START -->` and `<!-- END -->`. Logs the resulting page to
 * standard output, or save to the target file if `-i` (the edit in place option) is passed.
 *
 */

const fs = require('fs');
const path = require('path');

const TARGET_FILE = __dirname + '/help/en/docs/keyboard-shortcuts.md';

const KEY_MAP_MAC = {
  Mod: '⌘',
  Alt: '⌥',
  Shift: '⇧',
  Ctrl: '⌃',
  Left: '←',
  Right: '→',
  Up: '↑',
  Down: '↓',
};

const KEY_MAP_WIN = {
  Mod: 'Ctrl',
  Left: '←',
  Right: '→',
  Up: '↑',
  Down: '↓',
};

function getHumanKey(key, isMac) {
  const keyMap = isMac ? KEY_MAP_MAC : KEY_MAP_WIN;
  let keys = key.split('+').map(s => s.trim());
  keys = keys.map(k => {
    if (k in keyMap) { return keyMap[k]; }
    if (k.length === 1) { return k.toUpperCase(); }
    return k;
  });
  keys = keys.map(k => `*${k}*`);
  return keys.join(isMac ? ' ' : ' + ');
}

function dumpKeys(groups) {

  let content = '';

  groups.forEach((group) => {

    // Build the table content
    let tableContent =  '';
    group.commands.forEach((cmd) => {
      if (!cmd.keys || !cmd.keys.length || !cmd.desc) { return; }
      const macHumanKeys = cmd.keys.map((key) => `<code class="keys">${getHumanKey(key, true)}</code>`).join(',');
      const winHumanKeys = cmd.keys.map((key) => `<code class="keys">${getHumanKey(key, false)}</code>`).join(',');
      tableContent += `| ${macHumanKeys} | ${winHumanKeys} | ${cmd.desc} |\n`;
    });

    if (!tableContent) { return ;}

    // Adds group header
    content += `###${group.group}\n`;

    // Adds tables header
    content += `| Key (Mac) | Key (Windows) | Description | \n`;
    content += `| - | - | - | \n`;
    content += tableContent;
    content += '\n';
  });

  return content;
}

function main() {
  const argv = process.argv.slice(2);
  let i = 0;
  let editInPlace = false;
  let gristAppRoot;
  for (; i < argv.length; ++i){
    if (argv[i] === '-i') {
      editInPlace = true;
    } else {
      gristAppRoot = argv[i];
    }
  }

  if (!gristAppRoot) {
    console.log('Missing file argument');
    process.exit(1);
  }

  // loads commands from grist app source tree.
  const {groups} = require(path.join(gristAppRoot, 'app/client/components/commandList'));

  let content = '';
  content += dumpKeys(groups);

  const data = fs.readFileSync(TARGET_FILE, 'utf8');
  const newFileContent = data.replace(/(?<=<!-- START -->\n).*(?=<!-- END -->)/s, content);

  if (editInPlace) {
    // write to target file
    fs.writeFileSync(TARGET_FILE, newFileContent, 'utf8');
  } else {
    // dump to the std output
    console.log(newFileContent);
  }
}

if (require.main === module) {
  main();
}
