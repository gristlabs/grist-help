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
  Del: 'Delete',
  // For the shortcuts in use, it's more helpful not to distinguish Backspace from Delete on Mac
  Backspace: 'Delete',
};

const KEY_MAP_WIN = {
  Mod: 'Ctrl',
  Left: '←',
  Right: '→',
  Up: '↑',
  Down: '↓',
  Del: 'Delete',
};

function getHumanKey(key, isMac) {
  if (typeof key !== 'string') {
    // PlatformSpecificCommandKey, of the form {default, mac?}.
    key = (isMac && key.mac) || key.default;
  }
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

function unique(strings) {
  return [...new Set(strings)];
}

function getMarkupForKeys(keys, isMac) {
  return unique(keys.map((key) => `<code class="keys">${getHumanKey(key, isMac)}</code>`)).join(',');
}

function dumpKeys(groups) {

  let content = '';

  groups.forEach((group) => {

    // Build the table content
    let tableContent =  '';
    group.commands.forEach((cmd) => {
      if (!cmd.keys || !cmd.keys.length || !cmd.desc) { return; }
      const macHumanKeys = getMarkupForKeys(cmd.keys, true);
      const winHumanKeys = getMarkupForKeys(cmd.keys, false);
      tableContent += `| ${macHumanKeys} | ${winHumanKeys} | ${cmd.desc()} |\n`;
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
  if (process.argv.length <= 2) {
    console.log(`\
Builds the keyboard shortcuts help page.

  node build-shortcuts.js [-i] grist-root

Reads the grist shortcuts from the grist source tree specified by \`grist-root\` and generates a
formatted content, which is then inserted into the target file (\`help/en/docs/keyboard-shortcuts.md\`)
in-between the two markers \`<!-- START -->\` and \`<!-- END -->\`. Logs the resulting page to
standard output, or save to the target file if \`-i\` (the edit in place option) is passed.

What's actually looked up is 'app/client/components/commandList' under \`grist-root\`'s
'_build' or '_build/core' directory, i.e. Grist should be built.
`);
    process.exit(1);
  }
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

  // Loads commands from the built grist tree. Imports of 'app/...' modules (including
  // transitive ones from commandList) resolve via NODE_PATH, which Node only reads at
  // startup, so re-initialize module paths after setting it. The two paths cover the
  // layouts of grist-core and full-grist checkouts.
  process.env.NODE_PATH = ['_build', '_build/core']
    .map((dir) => path.join(gristAppRoot, dir)).join(path.delimiter);
  require('module')._initPaths();
  const {groups} = require('app/client/components/commandList');

  // Command descriptions are localized; initialize the checkout's own i18next instance
  // (the one localization.ts uses) with its English translations.
  const i18next = require(path.join(gristAppRoot, 'node_modules/i18next'));
  const translations = require(path.join(gristAppRoot, 'static/locales/en.client.json'));
  i18next.init({lng: 'en', defaultNS: 'client', resources: {en: {client: translations}}});

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
