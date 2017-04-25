var jsonToString = JSON.stringify;

function dumpStack(store) {
  var i = 0;

  if (store.fn.name == "") {
    console.log("Calling function:", store.fn.toString());
  } else {
    console.log("Calling function:", store.fn.name);
  }
  console.log("Input(s):");
  store.input.map((a, k) => console.log(k + ":", jsonToString(a)));
  console.log("Output:");
  console.log(store.output);
  return store.output;
}

/**
 * trace - Use to dump the argument received by a function
 * before calling it.
 *
 * @param {string} message Message to log.
 * @param {Function} f A continuation function.
 * @return {Function}
 */
export default function trace(f, message, context) {
  var ctx = context ? context : null;
  return function(x) {
    var store = {};
    var args = [...arguments];
    store.message = message || "";
    store.fn = f;
    store.input = args;
    store.context = context;
    try {
      var res = f.apply(ctx, args);
      store.output = res;
      return dumpStack(store);
    } catch(e) {
      store.error = e;
      store.stack = e.stack;
      console.log("[Exception]" + message, jsonToString(store));
    }
    console.log("Bailing out on trace. Return argument: ", x);
    return x;
  };
}
