// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { Client } from "pg";

// Function to connect to PostgreSQL
async function connectToPostgres() {
  const host = await vscode.window.showInputBox({
    placeHolder: "Enter PostgreSQL host",
  });
  const port = await vscode.window.showInputBox({
    placeHolder: "Enter PostgreSQL port",
    value: "5432",
  });
  const user = await vscode.window.showInputBox({
    placeHolder: "Enter PostgreSQL user",
  });
  const password = await vscode.window.showInputBox({
    placeHolder: "Enter PostgreSQL password",
    password: true,
  });
  const database = await vscode.window.showInputBox({
    placeHolder: "Enter PostgreSQL database name",
  });

  if (!host || !port || !user || !password || !database) {
    vscode.window.showErrorMessage("All fields are required.");
    return;
  }

  const client = new Client({
    host,
    port: parseInt(port),
    user,
    password,
    database,
  });

  try {
    await client.connect();
    vscode.window.showInformationMessage(
      "Connected to PostgreSQL successfully!"
    );
  } catch (err: any) {
    vscode.window.showErrorMessage(`Connection failed: ${err.message}`);
  } finally {
    await client.end();
  }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "convntionenforcer.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from convntionEnforcer!"
      );
    }
  );

  let connectCommand = vscode.commands.registerCommand(
    "convntionenforcer.connectToPostgres",
    async () => {
      await connectToPostgres();
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(connectCommand);
}

export function deactivate() {}
