import * as vscode from 'vscode';
import GitService from './utils/GitService';
import EditorController from './commands/EditorController';
import SettingsPageController from './commands/SettingsPageController';
import CopyFromScmInputBoxCommand from './commands/CopyFromScmInputBoxCommand';
import { Command } from './definitions';

export async function activate(context: vscode.ExtensionContext) {
  const git = new GitService();

  const editorController = new EditorController(context, git);
  const settingsPageController = new SettingsPageController(context);

  const copyFromScmInputBoxCommand = new CopyFromScmInputBoxCommand(
    git,
    editorController
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      Command.OpenEditor,
      editorController.openInTheMainView,
      editorController
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      Command.OpenSettings,
      settingsPageController.run,
      settingsPageController
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      Command.CopyFromScmInputBox,
      copyFromScmInputBoxCommand.run,
      copyFromScmInputBoxCommand
    )
  );
}

export function deactivate() {}
