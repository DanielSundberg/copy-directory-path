'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as copyPaste  from 'copy-paste';
import * as path from 'path';
import { sync as commandExists }  from 'command-exists';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)

    console.log('Congratulations, your extension "copy-directory-path" is now active!');

    let disposable = vscode.commands.registerCommand('extension.copyDirectoryPath', () => {

        if ((process.platform === "linux") && !commandExists('xclip')) {
            vscode.window.showErrorMessage(`Xclip is required for this command to work!\nPlease run 'apt-get install xclip' or 'yum install xclip'...`);
            console.error(`Xclip is required for this command to work!\nPlease run 'apt-get install xclip' or 'yum install xclip'...`);
            return;
        }

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        let filename = editor.document.fileName;

        // Extract and return directory path
        if (filename.includes(path.sep)) {
            let dirPath = path.dirname(filename);
            copyPaste.copy(dirPath, () => vscode.window.showInformationMessage(`Directory path "${dirPath}" has been copied to clipboard`));
        } else {
            vscode.window.showErrorMessage(`Could not parse path in "${filename}"!`)
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}