let steps = [];
let stepNo = 0;
let sorted = -1;
let thisArray = [];
let globalI = -1;
let globalJ = 0;
let globalPivot = 0;

export default function GenerateSteps(array) {

    steps = [];

    let high = array.length - 1;

    globalPivot = high;

    thisArray = [...array];

    quicksort(thisArray, 0, high);

    return steps;
}

function partition(array, low, high) {

    // Set the pivot value and initialize i and j
    let pivotValue = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {

        // If j is less than or equal to the pivot value
        if (array[j] <= pivotValue) {
            // Increment i
            globalI = i;
            globalJ = j;
            globalPivot = high;
            steps.push({
                "stepNo" : stepNo,
                "sorted" : sorted,
                "case" : determineStep(1),
                "currentI" : globalI,
                "currentJ" : globalJ,
                "currentPivot" : globalPivot,
                "currentArray" : [...thisArray]
            });
            stepNo++;

            i++;

            // Swap i and j
            globalI = i;
            globalJ = j;
            globalPivot = high;
            steps.push({
                "stepNo" : stepNo,
                "sorted" : sorted,
                "case" : determineStep(3),
                "currentI" : globalI,
                "currentJ" : globalJ,
                "currentPivot" : globalPivot,
                "currentArray" : [...thisArray]
            });
            stepNo++;

            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

        }

        // Increment j
        globalI = i;
        globalJ = j;
        globalPivot = high;
        steps.push({
            "stepNo" : stepNo,
            "sorted" : sorted,
            "case" : determineStep(0),
            "currentI" : globalI,
            "currentJ" : globalJ,
            "currentPivot" : globalPivot,
            "currentArray" : [...thisArray]
        });
        stepNo++;
    }

    // J has reached the pivot, now partition
    globalI = i;
    globalJ = high;
    globalPivot = high;
    steps.push({
        "stepNo" : stepNo,
        "sorted" : sorted,
        "case" : determineStep(2),
        "currentI" : globalI,
        "currentJ" : globalJ,
        "currentPivot" : globalPivot,
        "currentArray" : [...thisArray]
    });
    i++;
    let temp = array[i];
    array[i] = array[high];
    array[high] = temp;
    stepNo++;

    return i;
}

function quicksort(array, low, high) {

    // If the J is less than the pivot
    if (low < high) {

        // Get the pivot index to partition the array
        let pivotIndex = partition(array, low, high);

        quicksort(array, low, pivotIndex - 1);
        quicksort(array, pivotIndex + 1, high);
    }
    // Update the what's sorted
    steps.push({
        "stepNo" : stepNo,
        "sorted" : sorted,
        "case" : determineStep(4),
        "currentI" : globalI,
        "currentJ" : globalJ,
        "currentPivot" : globalPivot,
        "currentArray" : [...thisArray]
    });
    stepNo++;
    sorted = high;
}

function determineStep(n) {
    switch(n) {
        case 0: 
            return "increment j";
        case 1:
            return "increment i";
        case 2:
            return "partition";
        case 3:
            return "swap";
        case 4:
            return "change index";
        default:
            return "compare";
    }
}