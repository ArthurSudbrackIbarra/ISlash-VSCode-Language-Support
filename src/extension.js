const vscode = require('vscode');

const ISLASH_SNIPPETS = require('../snippets/islash-code-snippets.json')

function activate() {
    console.log("ISlash extension activated.");
    vscode.languages.registerHoverProvider('islash', {
        provideHover(document, position) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);
            const snippet = ISLASH_SNIPPETS[word]
            if (snippet) {
                const content = new vscode.MarkdownString(snippet.description)
                content.appendCodeblock(snippet.body[0], "ISlash")
                return new vscode.Hover(content, new vscode.Range(position, position));
            }
        }
    });
}

function deactivate() {
    console.log("ISlash extension deactivated.")
}

module.exports = {
    activate,
    deactivate
}
