import { repoJoin } from '../src'

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

describe('repoJoin', () => {
  it('successfully joins repository files based on target extensions', async () => {
    const result = await repoJoin(repoUrl, ['.js', '.ts'])
    expect(result).toBe(case1)

    const result2 = await repoJoin(repoUrl, ['.js', '.ts', 'c'])
    expect(result2).toBe(case2)

    const result3 = await repoJoin(
      repoUrl,
      ['.js', '.ts', 'c', 'cc'],
      'testing'
    )
    expect(result3).toBe(case3)
  })
})
