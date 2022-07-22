import { mkdirSync, writeFile } from 'node:fs'
import { join } from 'node:path'
import { workspace } from 'vscode'

function createWriter(basePath: string) {
  return (file: string, content: string) =>
    writeFile(join(basePath, file), content, (e) => {
      if (e) {
        console.log('something went wrong')
        console.log(e)
      }
    })
}

function createFiles(name: string, fileType: 'ts' | 'js') {
  // yes this looks terrible
  return [
    {
      name: `index.${fileType}`,
      content: `export { default } from './${name}'`,
    },
    {
      name: `${name}.${fileType === 'js' ? 'js' : 'tsx'}`,
      content: `import { Container } from './styles'
${fileType === 'ts' ? '\ninterface props {} \n' : ''}
export default function ${name}({}${fileType === 'ts' ? ': props' : ''}) {
  return (
    <Container>
      <p>${name}</p>
    </Container>
  )
}`,
    },
    {
      name: `styles.${fileType}`,
      content: `import styled from 'styled-components'
  
export const Container = styled.div\`\``,
    },
  ]
}

// the good stuff here
export default function writeFiles(
  componentName: string,
  fileType: 'ts' | 'js' = 'ts'
) {
  const cwd = workspace.workspaceFolders![0].uri.path
  let finalPath = join(cwd, 'src', 'components', componentName)

  while (finalPath.startsWith('/') || finalPath.startsWith('\\')) {
    finalPath = finalPath.slice(1)
  }

  mkdirSync(finalPath)

  const write = createWriter(finalPath)

  const files = createFiles(componentName, fileType)

  files.forEach(({ name, content }) => write(name, content))
}
