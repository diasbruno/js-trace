import trace from './jstrace';

function add(x, y) {
  return x + y;
}

trace(add)(1, 2);

trace(function(x, y) { return x + y; })(1, 2);
