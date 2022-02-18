export default function GenerateSteps(array) {

    const steps = [{}];

    let stepNo = 0;
    let i = -2;
    let j = 0;
    let pivot = array.length - 1;
    let sorted = -1;
    let divisions = [];

    while (sorted < array.length - 1) {

        while (j < pivot) {
            steps.push({
                doIncI: false,
                doIncJ: false,
                doPartition: false,
                doSwap: false,
                doCompare: true,
                doChangeIndex: false,
                currentArray: array,
                currentI: i,
                currentJ: j,
                currentPivot: pivot,
                stepNumber: stepNo++,
                desc: "Compare value at index J to pivot"
            });
            if (array[j] < array[pivot]) {
                if (i !== -2) {
                    steps.push({
                        doIncI: true,
                        doIncJ: false,
                        doPartition: false,
                        doSwap: false,
                        doCompare: false,
                        doChangeIndex: false,
                        currentArray: array,
                        currentI: i,
                        currentJ: j,
                        currentPivot: pivot,
                        stepNumber: stepNo++,
                        desc: "Value at J is less than pivot, therefore increment I"
                    });
                    i++;
                    steps.push({
                        doIncI: false,
                        doIncJ: false,
                        doPartition: false,
                        doSwap: true,
                        doCompare: false,
                        doChangeIndex: false,
                        currentArray: array,
                        currentI: i,
                        currentJ: j,
                        currentPivot: pivot,
                        stepNumber: stepNo++,
                        desc: "After incrementing I, swap it with J"
                    });
                    let temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                    steps.push({
                        doIncI: false,
                        doIncJ: true,
                        doPartition: false,
                        doSwap: false,
                        doCompare: false,
                        doChangeIndex: false,
                        currentArray: array,
                        currentI: i,
                        currentJ: j,
                        currentPivot: pivot,
                        stepNumber: stepNo++,
                        desc: "Now increment J"
                    });
                    j++;
                }
            } else {
                if (i !== -2) {
                    steps.push({
                        doIncI: false,
                        doIncJ: true,
                        doPartition: false,
                        doSwap: false,
                        doCompare: false,
                        doChangeIndex: false,
                        currentArray: array,
                        currentI: i,
                        currentJ: j,
                        currentPivot: pivot,
                        stepNumber: stepNo++,
                        desc: "J was bigger than the pivot, increment J"
                    });
                    j++;
                } else {
                    for(let n = -1; n < j; n++) {
                        steps.push({
                            doIncI: false,
                            doIncJ: true,
                            doPartition: false,
                            doSwap: false,
                            doCompare: false,
                            doChangeIndex: false,
                            currentArray: array,
                            currentI: i,
                            currentJ: j,
                            currentPivot: pivot,
                            stepNumber: stepNo++,
                            desc: "I hasn't been defined yet. Increment until it's at the index of J minus 1"
                        });
                        i = n;
                    }
                }
            }
        }
        steps.push({
            doIncI: true,
            doIncJ: false,
            doPartition: false,
            doSwap: false,
            doCompare: false,
            doChangeIndex: false,
            currentArray: array,
            currentI: i,
            currentJ: j,
            currentPivot: pivot,
            stepNumber: stepNo++,
            desc: "J has reached the pivot. Increment I one more time"
        });
        i++;
        steps.push({
            doIncI: false,
            doIncJ: false,
            doPartition: true,
            doSwap: false,
            doCompare: false,
            doChangeIndex: false,
            currentArray: array,
            currentI: i,
            currentJ: j,
            currentPivot: pivot,
            stepNumber: stepNo++,
            desc: "Partition array: Swap I with the Pivot and the new Pivot becomes the element below I"
        });
        let temp = array[i];
        array[i] = array[pivot];
        array[pivot] = temp;
        pivot = i - 1;
        i = -2;
        j = sorted + 1;
        divisions.push(pivot);
        if (pivot === sorted + 1) {
            steps.push({
                doIncI: false,
                doIncJ: false,
                doPartition: false,
                doSwap: false,
                doCompare: false,
                doChangeIndex: true,
                currentArray: array,
                currentI: i,
                currentJ: j,
                currentPivot: pivot,
                stepNumber: stepNo++,
                desc: "Pivot has reached the end of the array, this is sorted, move on to the next division"
            });
            sorted = pivot;
            divisions.splice(divisions.length-1,1)
            pivot = divisions[divisions.length - 1];
            i = -2;
            j = sorted + 1;
        }
    }

    return steps;
}