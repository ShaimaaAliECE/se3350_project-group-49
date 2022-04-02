// Insertion sort that outputs a 2D array consisting of every step required to sort te array.
export const insertionsort = (arr) => {
    //If the array only has one number or is empty, return the array as an element in an array (return type is 2D array)
    if (arr.length <= 1) return [arr];
    let out = [];
    let iLength = arr.length;

    //Iterate through the array and shift each number into the new sorted array. 
    for(let i = 0; i < iLength; i++)
    {
        //console.log(arr);
        //Recieve value to be inserted into new array well removing it from the old array.
        let value = arr.shift();
        //console.log(value);

        let j = i-1;

        //In worst case, each insert operation into new array is proportional to the size of the output array.
        while(j >= 0 && value < out[j]){
            out[j+1] = out[j];
            j--;
        }

        out[j+1] = value;

        //console.log(out);
                
        //console.log("\n");
    }
    return out;
}

//insertionsort([1,8,4,32,15]);