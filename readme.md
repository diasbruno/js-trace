# js-trace


```js
import trace from './jstrace';

function add(x, y) {
  return x + y;
}

trace(add)(1, 2);
```


Output:
```
Calling function: add
Input(s):
0: 1
1: 2
Output:
3
```
