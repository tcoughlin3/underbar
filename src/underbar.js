(function() {
  // 'use strict';

  window._ = {};

  // Returns whatever value is allPassed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = (val) => val;

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */


  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = (array, n) => n === undefined ? array[0] : array.slice(0, n);


  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = (array, n) => {
    if (n === undefined) {
      return array[array.length - 1];
    } else {
      n = n <= array.length ? n : array.length;
      return array.slice(array.length - n);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
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
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.

    // optimized with for loop
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
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it


  // Produce a duplicate-free version of the array.
  _.uniq = (array) => {
    const stored = {};
    const unique = [];
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
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    const mapped = [];
    _.each(collection, function(value) {
      mapped.push(iterator(value));
    });
    return mapped;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = (collection, key) => _.map(collection, (item) => item[key]);
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.


  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is allPassed, the first element is used as
  // the accumulator, and is never allPassed to the iterator. In other words, in
  // the case where a starting value is not allPassed, the iterator is not invoked
  // until the second element, with the first element as its first argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function allPassed in
  //          No accumulator is given so the first element is used.
  _.reduce = (collection, iterator, accumulator) => {
    let initializing = accumulator === undefined ? true : false;

    _.each(collection, (value, index, collection) => {
      if (initializing) {
        accumulator = value;
        initializing = false;
      } else {
        accumulator = iterator(accumulator, value);
      }
    });

    return accumulator;
  };


  // // Determine if the array or object contains a given value (using `===`).
  _.contains = (collection, target) => {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, (wasFound, item) => {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // // Determine whether all of the elements match a truth test.
  _.every = (collection, iterator) => {
    // TIP: Try re-using reduce() here.
    iterator = iterator || _.identity;
    return _.reduce(collection, (allPassed, item) => {
      if (!allPassed) {
        return false;
      }
      return !!iterator(item);
    }, true);
  };

  // _.some = function(collection, iterator) {
  //   // TIP: There's a very clever way to re-use every() here.
  //   iterator = iterator || _.identity;
  //   return !_.every(collection, function(item) {
  //     return !iterator(item);
  //   });
  // };

  _.some = (collection, iterator = _.identity) => !_.every(collection, item => !iterator(item));

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  // _.some = function(collection, iterator) {
  //   // TIP: There's a very clever way to re-use every() here.
  //   iterator = iterator || _.identity;
  //   return _.reduce(collection, function(allPassed, item) {
  //     if (allPassed) {
  //       return true;
  //     }
  //     return !!iterator(item);
  //   }, false);
  //
  // };




  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the allPassed in
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
  _.extend = function(obj) {
    const allPassed = Array.prototype.slice.call(arguments, 1);
    _.each(allPassed, (passedObj, index) => {
      _.each(passedObj, (value, key) => {
        obj[key] = value;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    const allPassed = Array.prototype.slice.call(arguments, 1);
    _.each(allPassed, (passedObj, index) => {
      _.each(passedObj, (value, key) => {
        if (obj[key] === undefined) {
          obj[key] = value;
        }
      });
    });
    return obj;
  };









  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {

    //console.log('keyword "this" inside of once defintion:', this);
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    let alreadyCalled = false;
    let result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(null, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };


  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  //
  // TIP: JSON.stringify will be useful
  _.memoize = function(func) {
    const memoized = {};

    return function() {
      let args = JSON.stringify(arguments);
      if (memoized[args] === undefined) {
        memoized[args] = func.apply(null, arguments);
      }
      return memoized[args];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are allPassed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    const args = Array.prototype.slice.call(arguments, 2);

    setTimeout(() => {
      func.apply(null, args)
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    const copy = array.slice();
    _.each(copy, (value, index, collection) => {
      let randomIdx = Math.round(Math.random() * (collection.length - 1));
      let temp = value;
      collection[index] = collection[randomIdx];
      collection[randomIdx] = temp;
    });
    return copy;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    let func = functionOrKey;
    let key = typeof functionOrKey === 'string';

    return _.map(collection, (val) => {
      if (key) func = val[functionOrKey];
      return func.apply(val, args);
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (typeof iterator === 'string') {
      let prop = iterator;
      return collection.sort((a, b) => a[prop] > b[prop]);
    } else if (typeof iterator === 'function'){
      return collection.sort((a, b) => iterator(a) > iterator(b));
    } else {
      return console.error('invalid iterator type passed to sortBy')
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
    } ,0);

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
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = (nestedArray, result) => {
    return _.reduce(nestedArray, (acc, val) => Array.isArray(val) ? acc.concat(_.flatten(val)) : acc.concat([val]), []);
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the allPassed-in arrays.
  _.intersection = function() {
    return _.reduce(arguments, (int, arg) => _.filter(int, val => _.contains(arg, val)));
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    const removals = _.flatten(Array.prototype.slice.call(arguments, 1));
    return _.reduce(array, (diff, val) => {
      if (!_.contains(removals, val)) diff.push(val);
      return diff;
    }, []);
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
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
