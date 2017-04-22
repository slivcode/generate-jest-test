# gen jest test

simple cli utility to make ts/js test.

`npm install -g generate-jest-test`

`cat ./src/fn.js`

```js
export const func = i => i;
```

`generate-jest-test ./src/fn.js`

`echo "describe('[func]', () => {})" >> src/__test__/fn.test.js`

It will resolve the names correctly as of the bracket.

0.0.2 added function `--aftercmd` so just write `--aftercmd webstorm`. to open test file automatically.

0.0.1 init commit.