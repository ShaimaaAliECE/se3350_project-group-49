// Merge sort that outputs a 2D array consisting of every step required to sort the array.
const mergesort = (arr) => {
    // If the array only has one number or is empty, return the array as an element in an array (return type is 2D array)
    if (arr.length <= 1) return [arr];
    let ans = [arr];
    let out = [];

    // Find midpoints of the array to split in half (prefer to make left side bigger so add 1)
    let m = Math.floor((arr.length+1) / 2);

    // Recursively run mergesort on the two halves of the array.
    const leftArr = mergesort(arr.slice(0, m));
    ans = ans.concat(leftArr);
    const rightArr = mergesort(arr.slice(m, arr.length));
    ans = ans.concat(rightArr);

    // Set counter variables to 0 for left and right side.
    let l = 0; let r = 0;
    // Assign the left and right arrays to the returned merge sorts last index 
    // Since return is 2D array and the last index is the sorted array from the last recursive step
    let la = leftArr[leftArr.length-1];
    let ra = rightArr[rightArr.length-1];

    // Loop through the arrays and merge them (smallest to lowest).
    while (l < la.length && r < ra.length) {
        if (la[l] < ra[r]) {
            out[out.length] = la[l];
            ++l;
        }
        else {
            out[out.length] = ra[r];
            ++r;
        }
    }
    // Merge any remaining numbers in the non-empty array.
    if (l == la.length) out = out.concat(ra.slice(r));
    else out = out.concat(la.slice(l));

    // Push the sorted array to the end of the output array and return.
    ans[ans.length] = out;
    return ans;
}