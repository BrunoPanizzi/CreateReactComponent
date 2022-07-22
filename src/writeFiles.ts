import { mkdirSync, writeFile } from 'node:fs'
import { join } from 'node:path'
import { workspace } from 'vscode'

class Writer {
  basePath: string
  componentName: string

  constructor(basePath: string, componentName: string) {
    this.basePath = basePath
    this.componentName = componentName
  }

  write(file: string, writer: (name: string) => string) {
    writeFile(join(this.basePath, file), writer(this.componentName), (e) => {
      if (e) {
        console.log('something went wrong')
        console.log(e)
      }
    })
  }
}

export default function writeFiles(componentName: string) {
  const cwd = workspace.workspaceFolders![0].uri.path
  let finalPath = join(cwd, 'src', 'components', componentName)

  while (finalPath.startsWith('/') || finalPath.startsWith('\\')) {
    finalPath = finalPath.slice(1)
  }

  mkdirSync(finalPath)

  const writer = new Writer(finalPath, componentName)

  writer.write('index.ts', indexContent)
  writer.write(`${componentName}.tsx`, componentContent)
  writer.write('styles.ts', stylesContent)
}

const indexContent = (name: string) => `export { default } from './${name}'`
const componentContent = (name: string) => `import { Container } from './styles'

interface props {}

export default function ${name}({}: props) {
  return (
    <Container>
      <p>${name}</p>
    </Container>
  )
} 
  `
const stylesContent = () => `import styled from 'styled-component'
  
export const Container = styled.div\`\``
