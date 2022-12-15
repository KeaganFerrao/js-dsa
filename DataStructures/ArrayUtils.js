class ArrayUtils {
    // compareFn returns positive, negative or 0;
    #defaultCompare(a, b) {
        if (a > b) {
            return 1
        } else if (a < b) {
            return -1;
        }
        return 0;
    }

    selectionSort(arr, compareFn = this.#defaultCompare) {
        if (typeof compareFn !== 'function') {
            throw new Error('Comparator Function should be a function');
        }

        for (let i = 0; i < arr.length; i++) {
            let minIdx = i;
            for (let j = i; j < arr.length; j++) {
                if (compareFn(arr[minIdx], arr[j]) > 0) {
                    minIdx = j;
                }
            }
            //Swap Elements
            [arr[minIdx], arr[i]] = [arr[i], arr[minIdx]];
        }

        return arr;
    }

    bubbleSort(arr, compareFn = this.#defaultCompare) {
        if (typeof compareFn !== 'function') {
            throw new Error('Comparator Function should be a function');
        }
        let swapped;
        for (let i = 0; i < arr.length; i++) {
            swapped = false
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (compareFn(arr[j], arr[j + 1]) > 0) {
                    //Swap Elements
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    swapped = true;
                }
            }

            //If the inner loop does not swap any element means the array is already sorted, so we can break.
            if (swapped === false) {
                break;
            }
        }

        return arr;
    }

    insertionSort(arr, compareFn = this.#defaultCompare) {
        if (typeof compareFn !== 'function') {
            throw new Error('Comparator Function should be a function');
        }
        for (let i = 1; i < arr.length; i++) {
            for (let j = i; j >= 1; j--) {
                if (compareFn(arr[j - 1], arr[j]) > 0) {
                    [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
                }
            }
        }

        return arr;
    }

    #partition(arr, lower, upper, compareFn) {
        let pivot = arr[lower];
        let start = lower;
        let end = upper;

        while (start < end) {
            while (compareFn(arr[start], pivot) <= 0) {
                start++;
            }
            while (compareFn(arr[end], pivot) > 0) {
                end--;
            }
            if (start < end) {
                //Swap
                [arr[start], arr[end]] = [arr[end], arr[start]];
            }
        }
        [arr[lower], arr[end]] = [arr[end], arr[lower]];
        return end;
    }

    quickSort(arr, compareFn = this.#defaultCompare, low = 0, high = arr.length - 1) {
        if (typeof compareFn !== 'function') {
            throw new Error('Comparator Function should be a function');
        }
        if (low < high) {
            let pi = this.#partition(arr, low, high, compareFn);

            this.quickSort(arr, compareFn, low, pi - 1);
            this.quickSort(arr, compareFn, pi + 1, high);
        }

        return arr;
    }

    #merge(arr, l, m, r, compareFn) {
        let i = 0;
        let j = 0;
        let k = l;

        let L = arr.slice(l, m + 1);
        let R = arr.slice(m + 1, r + 1);
        while (i < L.length && j < R.length) {
            if (compareFn(L[i], R[j]) < 0) {
                arr[k++] = L[i++];
            } else {
                arr[k++] = R[j++];
            }
        }

        while (i < L.length) {
            arr[k++] = L[i++];
        }

        while (j < R.length) {
            arr[k++] = R[j++];
        }
    }

    mergeSort(arr, compareFn = this.#defaultCompare, l = 0, r = arr.length - 1) {
        if (typeof compareFn !== 'function') {
            throw new Error('Comparator Function should be a function');
        }
        // Recursively divide the array until one element remains.
        if (l >= r) {
            return;
        }

        let m = Math.floor((l + r) / 2);
        this.mergeSort(arr, compareFn, l, m);
        this.mergeSort(arr, compareFn, m + 1, r);

        // Merge the divided parts in sorted order.
        this.#merge(arr, l, m, r, compareFn);

        return arr;
    }
}

module.exports = ArrayUtils;