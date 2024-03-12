# repojoin
`repojoin` is a utility function that allows you to fetch a GitHub repository's ZIP file, extract files with specific extensions, and concatenate their contents into a single string.

# Installation
```
npm install repojoin
```

# Parameters
- `repoUrl` (string): The URL of the GitHub repository.
- `targetExtensions` (string[]): An array of file extensions to include in the concatenated output (e.g., `['.js', '.ts', '.tsx']`).
- `branch` (string, optional): The branch of the repository to fetch. Defaults to `'main'`.

# Usage

## Merge *.js and *.ts files from a specified repository.
```js
import { repojoin } from "repojoin";

async function test1() {
  const ret = await repojoin('https://github.com/yusenjeng/repojoin-test', ['.js', '.ts']) 
  console.log(ret)
}

test1()
```

## Merge *.js, *.ts, *.c and *.cc files from a specified repository and branch (testing).

```js
import { repojoin } from "repojoin";

async function test2() {
  const ret = await repojoin('https://github.com/yusenjeng/repojoin-test', ['.js', '.ts', '.c', '.cc'], 'testing') 
  console.log(ret)
}

test2()
```

