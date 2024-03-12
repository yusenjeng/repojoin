import { repojoin, folderjoin } from '../src'

const repoUrl = 'https://github.com/yusenjeng/repojoin-test'

const case1 = `
# File: repojoin-test-main/src/a.js

const a = 1

# File: repojoin-test-main/src/b.ts

const b = 2`

const case2 = `
# File: repojoin-test-main/src/a.js

const a = 1

# File: repojoin-test-main/src/b.ts

const b = 2

# File: repojoin-test-main/src/c/c.c

#include <stdio.h>
int main() {
   printf("Hello, World!");
   return 0;
}
`

const case3 = `
# File: repojoin-test-testing/src/a.js

const a = 1

# File: repojoin-test-testing/src/b.ts

const b = 2

# File: repojoin-test-testing/src/c/c.c

#include <stdio.h>
int main() {
   printf("Hello, World!");
   return 0;
}


# File: repojoin-test-testing/src/cc/cc.cc

#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}`

const case4 =
  "\n# File: test/data/c/a.c\n\n#include <stdio.h>\nint main() {\n   // printf() displays the string inside quotation\n   printf(\"Hello, World!\");\n   return 0;\n}\n\n# File: test/data/js/a.js\n\nconsole.log('js')\n\n\n# File: test/data/ts/a.ts\n\nconsole.log('ts')\n"

describe('repojoin', () => {
  it('successfully joins repository files based on target extensions', async () => {
    const result = await repojoin(repoUrl, ['.js', '.ts'])
    expect(result).toBe(case1)

    const result2 = await repojoin(repoUrl, ['.js', '.ts', 'c'])
    expect(result2).toBe(case2)

    const result3 = await repojoin(
      repoUrl,
      ['.js', '.ts', 'c', 'cc'],
      'testing'
    )
    expect(result3).toBe(case3)
  })
})

describe('folderjoin', () => {
  it('successfully joins files within a folder recursively based on target extensions', () => {
    const result = folderjoin('test/data/', ['.ts', '.js', '.c'])
    console.log(JSON.stringify(result))
    expect(result).toBe(case4)
  })
})
