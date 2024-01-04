function checkSameContent(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false; // Arrays have different lengths
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false; // Elements at index i are different
    }
  }

  return true; // Arrays have the same content
}

function subtractArrays(array1, array2) {
  const result = [];

  for (let i = 0; i < array1.length; i++) {
    const subtractedValue = array1[i] - array2[i];
    result.push(subtractedValue);
  }

  return result;
}

function isSubArrayPresent(first, second) {
  for (let i = 0; i < first.length; i++) {
    const subArray = first[i];

    if (subArray.length === second.length) {
      let isMatch = true;

      for (let j = 0; j < subArray.length; j++) {
        if (subArray[j] !== second[j]) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        return true;
      }
    }
  }

  return false;
}

function delay(time) {
  var delay = time; // 5 second delay
  var now = new Date();
  var desiredTime = new Date().setSeconds(now.getSeconds() + delay);

  while (now < desiredTime) {
    now = new Date(); // update the current time
  }
}
