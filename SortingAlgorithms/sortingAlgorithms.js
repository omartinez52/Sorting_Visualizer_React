export const mergeSort = (array) => {
  if (array.length <= 1) return array;
  const animations = [];
  const auxilaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxilaryArray, animations);
  return animations;
};
export const countingSort = (array) => {
  const animations = [];
  if (array.length > 1) {
    array = countingSortHelper(array, animations);
  }
  return animations;
};
export const heapSort = (array) => {
  if (array.length <= 1) return array;
  const animations = [];
  const n = array.length - 1;
  for (let i = Math.floor(n / 2); i >= 0; i--) heapify(array, n, i, animations);
  for (let j = n; j >= 0; j--) {
    const animation = {
      comparison: [0, j],
      swap: [0, j],
    };
    [array[0], array[j]] = [array[j], array[0]];
    animations.push(animation);
    heapify(array, j, 0, animations);
  }
  return animations;
};
export const bubbleSort = (array) => {
  if (array.length <= 1) return array;
  const animations = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        const animation = {
          comparison: [j, j + 1],
          swap: [j, j + 1],
        };
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        animations.push(animation);
      }
    }
  }
  return animations;
};
export const quickSort = (array) => {
  if (array.length <= 1) return array;
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
};
export const radixSort = (array) => {
  const animations = [];
  console.log(array);
  if (array.length > 1) {
    let maxElement = 0;
    for (let element of array) if (maxElement < element) maxElement = element;
    for (let div = 1; Math.floor(maxElement / div) > 0; div *= 10) {
      array = radixCountingSort(array, div, animations);
    }
  }
  return animations;
};
export const oddEvenSort = (array) => {
  const animations = [];
  if (array.length >= 1) {
    let isSorted = false;
    while (!isSorted) {
      isSorted = true;
      //bubble sort on even index numbers
      for (let i = 0; i < array.length; i += 2) {
        if (array[i] > array[i + 1]) {
          const animation = {
            comparison: [i, i + 1],
            swap: [i, i + 1],
          };
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          isSorted = false;
          animations.push(animation);
        }
      }
      //bubble sort on odd index numbers
      for (let i = 1; i < array.length; i += 2) {
        if (array[i] > array[i + 1]) {
          const animation = {
            comparison: [i, i + 1],
            swap: [i, i + 1],
          };
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          isSorted = false;
          animations.push(animation);
        }
      }
    }
    console.log(array);
    return animations;
  }
  return animations;
};
export const combSort = (array) => {
  const animations = [];
  if (array.length >= 1) {
    let gap = array.length;
    let swapped = true;
    while (gap !== 1 || swapped === true) {
      // next gap
      gap = Math.floor((gap * 10) / 13) > 1 ? Math.floor((gap * 10) / 13) : 1;
      swapped = false;
      for (let i = 0; i < array.length - gap; i++) {
        if (array[i] > array[i + gap]) {
          const animation = {
            comparison: [i, i + gap],
            swap: [i, i + gap],
          };
          [array[i], array[i + gap]] = [array[i + gap], array[i]];
          swapped = true;
          animations.push(animation);
        }
      }
    }
  }
  return animations;
};
export const circleSort = (array) => {
  const animations = [];
  if (array.length >= 1) {
    // call function until no swaps have been done
    while (recursiveCircleSort(array, 0, array.length, animations)) {}
  }
  return animations;
};
export const dualPivotQuickSort = (array) => {
  const animations = [];
  if (array.length >= 1) {
    dualPivotQuickSortHelper(array, 0, array.length - 1, animations);
  }
  console.log(array);
  return animations;
};
export const selectionSort = (array) => {
  const animations = [];
  if (array.length >= 1) {
    for (let i = 0; i < array.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIdx]) minIdx = j;
      }
      animations.push({
        comparison: [i, minIdx],
        swap: [i, minIdx],
      });
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }
  }
  console.log(array);
  return animations;
};
export const insertionSort = (array) => {
  const animations = [];
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (array[j] < array[j - 1]) {
      animations.push({
        comparison: [j, j - 1],
        swap: [j, j - 1],
      });

      [array[j], array[j - 1]] = [array[j - 1], array[j]];
      j--;
    }
  }
  return animations;
};
export const shellSort = (array) => {
  const animations = [];
  const n = array.length;
  for (
    let interval = Math.floor(n / 2);
    interval > 0;
    interval = Math.floor(interval / 2)
  ) {
    for (let i = 0; i < n; i++) {
      const tempI = i;
      let temp = array[i];
      var j;
      for (j = i; j >= interval && array[j - interval] > temp; j -= interval) {
        animations.push({
          comparison: [j, j - interval],
          swap: [j, array[j - interval]],
        });
        animations.push({
          comparison: [j, j - interval],
          swap: [j - interval, array[j]],
        });
        [array[j], array[j - interval]] = [array[j - interval], array[j]];
      }
      animations.push({
        comparison: [j, j],
        swap: [j, temp],
      });
      array[j] = temp;
    }
  }
  return animations;
};
function dualPivotQuickSortHelper(array, low, high, animations) {
  if (low < high) {
    let pivots = dualPivotPartition(array, low, high, animations);
    dualPivotQuickSortHelper(array, low, pivots[0] - 1, animations);
    dualPivotQuickSortHelper(array, pivots[0] + 1, pivots[1] - 1, animations);
    dualPivotQuickSortHelper(array, pivots[1] + 1, high, animations);
  }
}
function dualPivotPartition(array, low, high, animations) {
  if (array[low] > array[high]) {
    animations.push({
      comparison: [low, high],
      swap: [low, high],
    });
    [array[low], array[high]] = [array[high], array[low]];
  }
  let j = low + 1,
    k = low + 1;
  let g = high - 1,
    lPivot = array[low],
    rPivot = array[high];
  while (k <= g) {
    // swap elements less than pivot
    if (array[k] < lPivot) {
      animations.push({
        comparison: [k, j],
        swap: [k, j],
      });
      [array[k], array[j]] = [array[j], array[k]];
      j++;
    }
    // check if element is greater than or equal to right pivot
    else if (array[k] >= rPivot) {
      while (array[g] > rPivot && k < g) g--;
      animations.push({
        comparison: [k, g],
        swap: [k, g],
      });
      [array[k], array[g]] = [array[g], array[k]];
      g--;
      if (array[k] < lPivot) {
        animations.push({
          comparison: [k, j],
          swap: [k, j],
        });
        [array[k], array[j]] = [array[j], array[k]];
        j++;
      }
    }
    k++;
  }
  j--;
  g++;
  // bring pivots to appropriate places
  [array[low], array[j]] = [array[j], array[low]];
  [array[high], array[g]] = [array[g], array[high]];
  animations.push({
    comparison: [low, j],
    swap: [low, j],
  });
  animations.push({
    comparison: [high, g],
    swap: [high, g],
  });
  return [j, g];
}
function recursiveCircleSort(array, low, high, animations) {
  /**
   * Function to perform circular swaps recursively
   * This function returns true if there was a swap
   * operation performed.
   */
  let swapped = false;
  if (low === high) return false;
  let lo = low,
    hi = high;
  // swap elements
  while (lo < hi) {
    if (array[lo] > array[hi]) {
      const animation = {
        comparison: [lo, hi],
        swap: [lo, hi],
      };
      [array[lo], array[hi]] = [array[hi], array[lo]];
      animations.push(animation);
    }
    lo++;
    hi--;
  }
  //special case for odd sized lists
  if (lo === hi) {
    if (array[lo] > array[hi + 1]) {
      const animation = {
        comparison: [lo, hi + 1],
        swap: [lo, hi + 1],
      };
      [array[lo], array[hi + 1]] = [array[hi + 1], array[lo]];
      animations.push(animation);
      swapped = true;
    }
  }
  // recursive case to check the traverse lists as sublists
  const mid = Math.floor((high - low) / 2);
  let firstHalf = recursiveCircleSort(array, low, low + mid, animations);
  let secondHalf = recursiveCircleSort(array, low + mid + 1, high, animations);
  return swapped || firstHalf || secondHalf;
}
function quickSortHelper(array, start, end, animations) {
  if (start >= end) return;
  let q = partition(array, start, end, animations);
  quickSortHelper(array, start, q - 1, animations);
  quickSortHelper(array, q + 1, end, animations);
}
function partition(array, start, end, animations) {
  const pivot = array[end];
  let i = start;
  for (let j = start; j < end; j++) {
    if (array[j] < pivot) {
      const animation = {};
      animation.comparison = [j, end];
      animation.swap = [i, j];
      [array[i], array[j]] = [array[j], array[i]];
      animations.push(animation);
      i++;
    }
  }
  const animation = {
    comparison: [i, end],
    swap: [i, end],
  };
  [array[i], array[end]] = [array[end], array[i]];
  animations.push(animation);
  return i;
}
function heapify(array, n, i, animations) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) largest = left;
  if (right < n && array[right] > array[largest]) largest = right;
  if (largest !== i) {
    const animation = {
      comparison: [i, largest],
      swap: [i, largest],
    };
    [array[i], array[largest]] = [array[largest], array[i]];
    animations.push(animation);
    heapify(array, n, largest, animations);
  }
}
function mergeSortHelper(array, start, end, auxAry, animations) {
  if (start === end) return;
  let mid = Math.floor((end + start) / 2);
  mergeSortHelper(auxAry, start, mid, array, animations);
  mergeSortHelper(auxAry, mid + 1, end, array, animations);
  merge(array, start, mid, end, auxAry, animations);
}
function merge(array, start, mid, end, auxAry, animations) {
  let i = start;
  let k = start;
  let j = mid + 1;
  while (i <= mid && j <= end) {
    const animation = {};
    animation.comparison = [i, j];
    if (auxAry[i] <= auxAry[j]) {
      animation.swap = [k, auxAry[i]];
      array[k++] = auxAry[i++];
    } else {
      animation.swap = [k, auxAry[j]];
      array[k++] = auxAry[j++];
    }
    animations.push(animation);
  }
  while (i <= mid) {
    animations.push({
      comparison: [i, i],
      swap: [k, auxAry[i]],
    });
    array[k++] = auxAry[i++];
  }
  while (j <= end) {
    animations.push({
      comparison: [j, j],
      swap: [k, auxAry[j]],
    });
    array[k++] = auxAry[j++];
  }
}
function radixCountingSort(array, div, animations) {
  const C = [...Array(10).keys()].map((i) => 0);
  const B = [...Array(array.length).keys()].map((i) => 0);
  for (let element of array) C[Math.floor(element / div) % 10]++;
  for (let i = 1; i < C.length; i++) C[i] += C[i - 1];
  for (let j = B.length - 1; j >= 0; j--) {
    const animation = {
      comparison: [j, j],
      swap: [C[Math.floor(array[j] / div) % 10] - 1, array[j]],
    };
    B[C[Math.floor(array[j] / div) % 10] - 1] = array[j];
    C[Math.floor(array[j] / div) % 10]--;
    animations.push(animation);
  }
  return B;
}
function countingSortHelper(array, animations) {
  let maxElement = 0;
  for (let element of array) if (element > maxElement) maxElement = element;
  const C = [...Array(maxElement + 1).keys()].map((i) => 0);
  const B = [...Array(array.length).keys()].map((i) => 0);
  for (let element of array) C[element]++;
  for (let i = 1; i < C.length; i++) C[i] += C[i - 1];
  for (let j = B.length - 1; j >= 0; j--) {
    const animation = {
      comparison: [j, j],
      swap: [C[array[j]] - 1, array[j]],
    };
    B[C[array[j]] - 1] = array[j];
    C[array[j]]--;
    animations.push(animation);
  }
  return B;
}
