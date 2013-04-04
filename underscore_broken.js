(function() {
  
  // Call iterator(value, key, obj) for each element of obj
  var each = function(obj, iterator) {
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        iterator(obj[i], i, obj);
      }
    } else {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator(obj[key], key, obj);
        }
      }
    }
  };

  // Determine if the array or object contains a given value (using `===`).
  var contains = function(obj, target) {
    result = false;
    each(obj, function(x) {
      if (target === x) { result = true; }
    });
    return result;
  };

  // Return the results of applying an iterator to each element.
  var map = function(array, iterator) {
    results = [];
    if(array === null) { return [] };
    for (var i = 0; i < array.length; i++) {
      results.push(iterator(array[i]));
    }
    return results;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  var pluck = function(obj, property) {
    results = [];
    each(obj, function(x) {
      results.push(x[property])
    });
    return results;
  };

  // Return an array of the last n elements of an array. If n is undefined,
  // return just the last element.
  var last = function(array, n) {
    result = [];
    if (array === null) {return undefined};
    if (n === undefined) { n = 1; }
    if (n > array.length) { n = array.length; }
    var start = array.length - n;
    for (start; start < array.length; start++) {
      result.push(array[start]);
    }
    return result;
  };

  // Like last, but for the first elements
  var first = function(array, n) {
    result = [];
    if (array === null) {return undefined};
    if (n === undefined) { n = 1; }
    if (n > array.length) { n = array.length; }
    for (i = 0; i < n; i++) {
      result.push(array[i]);
    }
    return result;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  // 
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(previous_value, item){
  //     return previous_value + item;
  //   }, 0); // should be 6
  //
  var reduce = function(obj, iterator, initialValue) {
    result = initialValue || 0;
    each(obj, function(x) {
      result = iterator(result,x);
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  var select = function(array, iterator) {
    if (!array) { return []; }
    results = [];
    for (var i=0; i<array.length; i++) {
      if (iterator(array[i])) { results.push(array[i]); }
    }
    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  var reject = function(array, iterator) {
    results = [];
    each(array, function(x) {
      if (!iterator(x)) { results.push(x); }
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  var every = function(obj, iterator) {
    result = true;
    if (!iterator) {
      iterator = function (x) { return !!x; };
    }
    each(obj, function(x) {
      if (!iterator(x)) { result = false; }
    });
    return result;
  };

  // Determine whether any of the elements pass a truth test.
  var any = function(obj, iterator) {
    result = false;
    if (!iterator) {
      iterator = function (x) { return !!x; };
    }
    each(obj, function(x) {
      if (iterator(x)) { result = true; }
    });
    return result;
  };

  // Produce a duplicate-free version of the array.
  var uniq = function(array) {
    var resultArray = [];
    var filterDuplicates = function(result, x){
      if(contains(resultArray, x)) {
        return result;
      }
      else {
        result.push(x);
        return result;
      }
    };
    return reduce(array,filterDuplicates,resultArray);
  };

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  
  // Return a function that calls the callback
  // The callback calls the function only once 
  var once = function(func) {
    var beenCalled = false;
    var answer;
    return function() {
      if (beenCalled === true) {
        return answer;
      } else {
        beenCalled = true;
        answer = func();
        return answer;
      }
    }
  }

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  var memoize = function(func) {
    var history = {};

    return function(x) {
      if (history.hasOwnProperty(x)) {
        return history[x];
      } else {
        history[x] = func(x);
        return history[x];
      }
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  var delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments,2);
    f = function() { return func(args) };
    setTimeout(f, wait);
  };

  // Extend a given object with all the properties of the passed in 
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  //
  var extend = function(obj) {
    var args = Array.prototype.slice.call(arguments);
    for (var i = 1; i < args.length; i++) {
      for (prop in args[i]) {
        obj[prop] = args[i][prop];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  var defaults = function(obj) {
    args = arguments;
    for (var i = 1; i < args.length; i++) {
      for (prop in args[i]) {
        if (arguments[i].hasOwnProperty(prop) && obj[prop] === undefined) {
          obj[prop] = args[i][prop];
        }
      }
    }
    return obj;
  };

  // Flattens a multidimensional array to a one-dimensional array that
  // contains all the elements of all the nested arrays.
  //
  // Hints: Use Array.isArray to check if something is an array
  //
  var flatten = function(nestedArray, result) {
    result = [];
    for (var i = 0; i < nestedArray.length; i++) {
      if (Array.isArray(nestedArray[i])) {
        var inner = flatten(nestedArray[i]);
        for (var j = 0; j < inner.length; j++) {
          result.push(inner[j]);
        }
      } else {
        result.push(nestedArray[i]);

      }
    }
    return result;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  var sortBy = function(obj, iterator) {
  };

  // Zip together two or more arrays with elements of the same index 
  // going together.
  // 
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3]]
  var zip = function() {
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  var intersection = function(array) {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  var difference = function(array) {
  };

  // Shuffle an array.
  var shuffle = function(obj) {
  };

  // EXTRA CREDIT:
  // Return an object that responds to chainable function calls for
  // map, pluck, select, etc
  //
  // See README for details
  var chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See README for details
  var throttle = function(func, wait) {
  };

  this._ = {
    each: each,
    contains: contains,
    map: map,
    pluck: pluck,
    last: last,
    first: first,
    reduce: reduce,
    select: select,
    reject: reject,
    every: every,
    any: any,
    uniq: uniq,
    once: once,
    memoize: memoize,
    delay: delay,
    extend: extend,
    defaults: defaults,
    flatten: flatten,
    sortBy: sortBy,
    zip: zip,
    intersection: intersection,
    difference: difference,
    shuffle: shuffle,
    chain: chain,
    throttle: throttle
  };


}).call(this);
