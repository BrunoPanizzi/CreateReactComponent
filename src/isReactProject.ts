import { workspace } from 'vscode'

export default async function isReactProject() {
  if (workspace.workspaceFolders === undefined) return false

  const wf = workspace.workspaceFolders[0].uri.path

  try {
    const doc = await workspace.openTextDocument(wf + '\\package.json')
    const content = JSON.parse(doc.getText())
    const isReact = !!content.dependencies.react

    return isReact
  } catch {
    return false
  }
}
