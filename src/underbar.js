(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument.
  _.identity = (val) => val;

  /**
   * COLLECTIONS
   * ===========
   */


  // Return an array of the first n elements of an array.
  _.first = (array, n) => n === undefined ? array[0] : array.slice(0, n);


  // Like first, but for the last elements.
  _.last = (array, n) => {
    if (n === undefined) {
      return array[array.length - 1];
    } else {
      n = n <= array.length ? n : array.length;
      return array.slice(array.length - n);
    }
  };


  // Call iterator(value, key, collection) for each element of collection.
  _.each = (collection, iterator) => {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };


  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = (array, target) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === target) return i;
    }
    return -1;
  };


  // Return all elements of an array that pass a truth test.
  _.filter = (collection, test) => {
    const passed = [];
    _.each(collection, function(value) {
      if (test(value)) {
        passed.push(value);
      }
    });
    return passed;
  };


  // Return all elements of an array that don't pass a truth test.
  _.reject = (collection, test) => _.filter(collection, (value) => !test(value));


  // Produce a duplicate-free version of the array.
  _.uniq = (array) => {
    const stored = {}, unique = [];
    _.each(array, function(value) {
      if (!stored[value]) {
        unique.push(value);
      }
      stored[value] = true;
    });
    return unique;
  };


  // Return the results of applying an iterator to each element.
  _.map = (collection, iterator) => {
    const mapped = [];
    _.each(collection, function(value) {
      mapped.push(iterator(value));
    });
    return mapped;
  };


  // Takes an array of objects and returns an array of the values of
  // a certain property in it.
  _.pluck = (collection, key) => _.map(collection, (item) => item[key]);


  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. Accumulator should be
  // the return value of the previous iterator call.
  _.reduce = (collection, callback, accumulator) => {
    let initializing = accumulator === undefined ? true : false;

    _.each(collection, (value, index, collection) => {
      if (initializing) {
        accumulator = value;
        initializing = false;
      } else {
        accumulator = callback(accumulator, value);
      }
    });

    return accumulator;
  };


  // Determine if the array or object contains a given value.
  _.contains = (collection, target) => {
    return _.reduce(collection, (wasFound, item) => {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = (collection, iterator = _.identity) => {
    return _.reduce(collection, (allPassed, item) => {
      if (!allPassed) {
        return false;
      }
      return !!iterator(item);
    }, true);
  };

  // Determine whether any of the elements pass a truth test.
  _.some = (collection, iterator = _.identity) => !_.every(collection, item => !iterator(item));


  /**
   * OBJECTS
   * =======
   */

  // Extend a given object with all the properties of the passed in object(s).
  _.extend = function(...args) {
    return _.reduce(args, (extendee, obj) => {
      _.each(obj, (value, key) => {
        extendee[key] = value;
      });
      return extendee;
    });
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(...args) {
    return _.reduce(args, (extendee, obj) => {
      _.each(obj, (value, key) => {
        if (extendee[key] === undefined) {
          extendee[key] = value;
        }
      });
      return extendee;
    });
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    let result, alreadyCalled = false;

    return function() {
      if (!alreadyCalled) {
        result = func(...arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };


  // Memorize an expensive function's results by storing them.
  _.memoize = function(func) {
    const memoized = {};

    return function() {
      let args = JSON.stringify(arguments);
      if (memoized[args] === undefined) {
        memoized[args] = func(...arguments);
      }
      return memoized[args];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait, ...args) {
    setTimeout(() => {
      func(...args)
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  _.shuffle = function(array) {
    const copy = array.slice();
    _.each(copy, (value, index, collection) => {
      let temp = value, randomIdx = Math.round(Math.random() * (collection.length - 1));
      collection[index] = collection[randomIdx];
      collection[randomIdx] = temp;
    });
    return copy;
  };


  // Calls the method named by functionOrKey on each value in the list.
  _.invoke = function(collection, functionOrKey, args) {
    let func = functionOrKey, key = typeof functionOrKey === 'string';

    return _.map(collection, (val) => {
      if (key) func = val[functionOrKey];
      return func.apply(val, args);
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(collection, criterion) {
    if (typeof criterion === 'string') {
      return collection.sort((a, b) => a[criterion] > b[criterion]);
    } else if (typeof criterion === 'function'){
      return collection.sort((a, b) => criterion(a) > criterion(b));
    } else {
      return collection.sort();
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    const zipped = [];
    const longest = _.reduce(arguments, (longest, arg) => {
      let len = arg.length;
      return len > longest ? len : longest;
    }, 0);

    for (let i = 0; i < longest; i++) {
      zipped[i] = [];
      _.each(arguments, (arg) => {
        zipped[i].push(arg[i]);
      });
    }

    return zipped;
  };


  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = (nestedArray, result) => {
    return _.reduce(nestedArray, (acc, val) => Array.isArray(val) ? acc.concat(_.flatten(val)) : acc.concat([val]), []);
  };


  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the allPassed-in arrays.
  _.intersection = (...args) => _.reduce(args, (int, arg) => _.filter(int, val => _.contains(arg, val)));


  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array, ...removals) {
    removals = _.flatten(removals);
    return _.reduce(array, (diff, val) => {
      if (!_.contains(removals, val)) diff.push(val);
      return diff;
    }, []);
  };


  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = (func, wait) => {
    let callable = true;

    return () => {
      if (callable) {
        func();
        callable = false;
        setTimeout(() => { callable = true; }, wait);
      }
    }
  };

}());
