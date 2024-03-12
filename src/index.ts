import axios from 'axios'
import AdmZip from 'adm-zip'

interface FileContent {
  path: string
  content: string
}

async function fetchRepoZip(repoUrl: string, branch: string): Promise<Buffer> {
  const zipUrl = `${repoUrl}/archive/${branch}.zip`
  const response = await axios.get(zipUrl, { responseType: 'arraybuffer' })
  return response.data as Buffer
}

function extractTargetFiles(
  zipBuffer: Buffer,
  targetExtensions: string[]
): FileContent[] {
  const zip = new AdmZip(zipBuffer)
  const zipEntries = zip.getEntries()

  return zipEntries
    .filter(
      entry =>
        !entry.isDirectory &&
        targetExtensions.some(ext => entry.entryName.endsWith(ext))
    )
    .map(entry => ({
      path: entry.entryName,
      content: entry.getData().toString('utf8'),
    }))
}

function concatenateFileContents(fileContents: FileContent[]): string {
  return fileContents
    .map(({ path, content }) => `\n# File: ${path}\n\n${content}`)
    .join('\n')
}

export async function repojoin(
  repoUrl: string,
  targetExtensions: string[],
  branch: string = 'main'
): Promise<string> {
  const zipBuffer = await fetchRepoZip(repoUrl, branch)
  const fileContents = extractTargetFiles(zipBuffer, targetExtensions)
  return concatenateFileContents(fileContents)
}
