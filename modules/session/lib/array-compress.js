module.exports.compress = function compressArrayToString(arrayToCompress, maxRadix, asciiOffset) {
  maxRadix = numberIsInteger(maxRadix) ? maxRadix : 95;
  asciiOffset = numberIsInteger(asciiOffset) ? asciiOffset : 32;
  if(asciiOffset + maxRadix > 256) throw new Error(`Your provided asciiOffset(${asciiOffset}) + maxRadix(${maxRadix}) = (${asciiOffset + maxRadix}) are greater than 256, the total number of ASCII characters available`);

  // create array of ASCII characters being used (defaults to full range of printable characters)
  const asciiRangeArr = new Array(maxRadix);
  for(let i = 0; i < maxRadix; ++i) {
    asciiRangeArr[i] = String.fromCharCode(i + asciiOffset);
  }

  // caching length for performance
  const arrayToCompressLength = arrayToCompress.length;

  if(!arrayToCompressLength) return '';

  // keep track of the different types of values appearing
  const initValType = { val: arrayToCompress[0] };
  const valTypes = [initValType];
  valTypes[`__${arrayToCompress[0]}`] = initValType;

  // used to track indices where different values contained in sparse array start
  const valuePositionTracker = { [arrayToCompress[0]]: [0] };

  // used to keep track of counts of contiguous values
  const valueTracker = [1];

  // used to keep track of current 'valueTracker' index for appending
  let currentValueTrackerPosition = 0;

  // store previous value to check if current value is different
  let prevVal = arrayToCompress[0];

  // we've initialized with first array member so skip that
  for(let i = 1; i < arrayToCompressLength; i++) {
     const val = arrayToCompress[i];

     if (val === prevVal) ++valueTracker[currentValueTrackerPosition]; // if contiguous just increment
     else {
       valueTracker.push(1); // begin count of new value
       ++currentValueTrackerPosition; // increment the position of end of array
       prevVal = val; // update previous value store

       // keep track of the arrayToCompress positions corresponding to this value
       const valPositionTracker = valuePositionTracker[val];
       if(valPositionTracker) valuePositionTracker[val].push(currentValueTrackerPosition);
       else {
         valuePositionTracker[val] = [currentValueTrackerPosition];
         const valTypeObj = {val};
         valTypes.push(valTypeObj);
         valTypes[`__${val}`] = valTypeObj; // making 'valTypes' an associative array
       }
     }
  }

  // create output string
  let outputStr = `${asciiOffset}|`;

  // determine radix and offset of each value in array and append metadata to outputStr for parsing
  const valTypesLength = valTypes.length;
  {
    // number of different values can't be greater than maxRadix
    if(valTypesLength - 1 > maxRadix) throw new Error(`Can't handle arrays with more than provided maxRadix(${maxRadix}) types of values`);

    // determine percentage of values per type and sort by them
    valTypes.sort((a, b) => {
      // adding percentages is not dry but probably more performant because not context hop
      if(!a.percentage) {
        const valPositions = valuePositionTracker[a.val];
        const valPositionsLength = valPositions.length;
        let valTotal = 0;
        for(let j = 0; j < valPositionsLength; ++j) {
          valTotal += valueTracker[valPositions[j]];
        }
        a.percentage = valTotal / arrayToCompressLength;
      }
      if(!b.percentage) {
        const valPositions = valuePositionTracker[b.val];
        const valPositionsLength = valPositions.length;
        let valTotal = 0;
        for(let j = 0; j < valPositionsLength; ++j) {
          valTotal += valueTracker[valPositions[j]];
        }
        b.percentage = valTotal / arrayToCompressLength;
      }
      return a.percentage - b.percentage;
    });

    let currentOffset = 0;
    let remainingRadix = maxRadix;
    const valTypesLengthLess1 = valTypesLength - 1;
    for(let i = 0; i < valTypesLengthLess1; ++i) {
      const valType = valTypes[i];
      let radixAlloc = valType.percentage * remainingRadix;
      let radix = Math.floor(radixAlloc);

      // special handling since 1 is min value
      if (radixAlloc < 1) {
        ++radix; // add one to radix since it'll be zero, minimum value is 1
        remainingRadix -= 1 - radixAlloc; // since the min value is 1 we need to reduce remaining allocation
      }

      valType.radix = radix;
      valType.offset = currentOffset;
      valType.valsRange = asciiRangeArr.slice(currentOffset, currentOffset + radix);
      currentOffset += radix;
      outputStr += `${valType.val}=${radix},`;
    }

    const lastOffset = currentOffset;
    const lastRadix = maxRadix - currentOffset;
    valTypes[valTypesLengthLess1].offset = lastOffset;
    valTypes[valTypesLengthLess1].radix = lastRadix;
    valTypes[valTypesLengthLess1].valsRange = asciiRangeArr.slice(lastOffset, lastOffset + lastRadix);
    outputStr += `${valTypes[valTypesLengthLess1].val}=${lastRadix}|`;
  }

  {
    // append actual data to outputStr
    let currPos = 0;
    const valueTrackerLength = valueTracker.length;
    for(let i = 0; i < valueTrackerLength; i++) {
      const valAtCurrPos = arrayToCompress[currPos]; // actual number
      const countOfVal = valueTracker[i]; // count to be flipped to into radix
      outputStr += convertFromBase10(countOfVal, valTypes[`__${valAtCurrPos}`].valsRange); // concatenate radixed value

      currPos += countOfVal; // increment position in arrayToCompress
    }
  }

  return outputStr;
}


module.exports.inflate = function inflateCompressedArray(compressedArrayString, ArrayPrototype = Array) {
  // if string is empty, return empty array
  if (!compressedArrayString.length) return [];

  const firstPipeInd = compressedArrayString.indexOf('|');
  const secondPipeInd = compressedArrayString.indexOf('|', firstPipeInd + 1);
  if(!~firstPipeInd || !~secondPipeInd) throw new Error('Missing pipe delimiters... this wasn\'t compressed with the \'compress\' method from array-compress');
  const asciiOffset = +compressedArrayString.slice(0, firstPipeInd);

  // parse metadata
  let currentOffset = 0;
  let maxRadix = 0;
  const valTypes = [];
  {
    const metadataStrs = compressedArrayString.slice(firstPipeInd + 1, secondPipeInd).split(',');
    const metadataStrsLength = metadataStrs.length;
    for(let i = 0; i < metadataStrsLength; ++i) {
      const metadata = metadataStrs[i].split('=');
      const val = +metadata[0];
      const radix = +metadata[1];
      const valType = { val, radix, offset: maxRadix };
      maxRadix += radix;
      valTypes[`__${val}`] = valType; // making associative array
      valTypes.push(valType);
    }
  }

  // create array of ASCII characters being used (defaults to full range of printable characters)
  const asciiRangeArr = new Array(maxRadix);
  for(let i = 0; i < maxRadix; ++i) {
    asciiRangeArr[i] = String.fromCharCode(i + asciiOffset);
  }

  // match ASCII character range subsets to values
  const asciiToValMap = {};
  {
    const valTypesLength = valTypes.length;
    for(let i = 0; i < valTypesLength; ++i) {
      const __memo = {};
      const valType = valTypes[i];
      const { radix, offset } = valType;
      const valsRange = asciiRangeArr.slice(offset, offset + radix);

      // store map to this value
      const val = valType.val;
      // radix has determined subset length;
      for(let j = 0; j < radix; ++j) {
        const valAtIndex = valsRange[j];
        asciiToValMap[valAtIndex] = val; // for range to corresponding value
        __memo[valAtIndex] = j; // caching for conversion to base 10
      }
      valsRange.__memo = __memo;
      valType.valsRange = valsRange;
    }
  }

  // parse compressed data
  const resultRepresentation = [];
  let fullResultLen = 0;
  {
    const compressedData = compressedArrayString.slice(secondPipeInd + 1);
    const compressedDataLengthPlus1 = compressedData.length + 1;
    let prevMappedVal = asciiToValMap[compressedData[0]];
    let currValStore = compressedData[0];
    for(let i = 1; i < compressedDataLengthPlus1; i++) { // we initialize first value and are actually depending on final loop where arr[i] is 'undefined'
      const valAtIndex = compressedData[i];
      const currMappedVal = asciiToValMap[valAtIndex];
      if(prevMappedVal === currMappedVal) currValStore += valAtIndex;
      else {
        const storeValType = valTypes[`__${prevMappedVal}`];
        const arrLength = convertToBase10(currValStore, storeValType.valsRange);
        fullResultLen += arrLength;
        currValStore = valAtIndex;
        resultRepresentation.push({
          arrLength,
          arrVal: prevMappedVal
        });
        prevMappedVal = currMappedVal;
      }
    }
  }

  const resultRepresentationLength = resultRepresentation.length;
  const result = new ArrayPrototype(fullResultLen);
  let currIndex = 0;
  for(let i = 0; i < resultRepresentationLength; ++i) {
    const { arrLength, arrVal } = resultRepresentation[i];
    result.fill(arrVal, currIndex, currIndex + arrLength);
    currIndex += arrLength;
  }

  return result;
}

function convertFromBase10(value, range) {
  const to_base = range.length;
  if (to_base === 1) return stringRepeat(range[0], value);

  let new_value = '';
  while (value > 0) {
    const remainder = value % to_base;
    new_value = `${range[remainder]}${new_value}`;
    value = (value - remainder) / to_base;
  }
  return new_value || '0';
}

function convertToBase10(value, range) {
  const from_base = range.length;
  if (from_base === 1) return value.length;

  let result = 0;
  const { __memo } = range;
  const valueLengthLess1 = value.length - 1;
  for (let i = valueLengthLess1; i >= 0; --i) {
    result += __memo[value[i]] * Math.pow(from_base, valueLengthLess1 - i);
  }
  return result;
}


// polyfill for String.prototype.repeat
function stringRepeat(val, count) {
  'use strict';
  if (val == null) {
    throw new TypeError('can\'t convert ' + val + ' to object');
  }
  var str = '' + val;
  count = +count;
  if (count != count) {
    count = 0;
  }
  if (count < 0) {
    throw new RangeError('repeat count must be non-negative');
  }
  if (count == Infinity) {
    throw new RangeError('repeat count must be less than infinity');
  }
  count = Math.floor(count);
  if (str.length == 0 || count == 0) {
    return '';
  }
  // Ensuring count is a 31-bit integer allows us to heavily optimize the
  // main part. But anyway, most current (August 2014) browsers can't handle
  // strings 1 << 28 chars or longer, so:
  if (str.length * count >= 1 << 28) {
    throw new RangeError('repeat count must not overflow maximum string size');
  }
  var rpt = '';
  for (;;) {
    if ((count & 1) == 1) {
      rpt += str;
    }
    count >>>= 1;
    if (count == 0) {
      break;
    }
    str += str;
  }
  return rpt;
}

// polyfill for Number.isInteger
function numberIsInteger(value) {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
}
