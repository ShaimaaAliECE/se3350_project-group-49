import logo from './logo.svg';
import './App.css';

import React, {useState, useReducer, useEffect, useRef, useCallback} from 'react';

function compare(a, b){
    return ['compare', a,b];
}

function swap(a,b){
    return ['swap', a,b];
}

function* bubblesort(from, to)
{
let swapped

do{
    swapped =false; 
    to -=1;

    for(let j=from; j<to; j++){
        if((yield compare(j,j+1))>0)
        {
            yield swap(j,j+1);
            swapped=true;
        }
            }

        }while(swapped);

}

function ToSort(baseArray, algorithm)
{
const [displayedArray, setArray]=useState([])
const [done, setDone] =useState(true);
const [resetCount, reset] =useReducer(0,(state)=> state+1);
const [barEffects, setBarEffects] =useState([]) 
const stepRef=useRef(()=>{})


useEffect(()=>{ 

let workingArray= baseArray;
setArray(workingArray);

setBarEffects({})
setDone(false);

const generator = algorithm(0, baseArray.length);
		let nextValue = 0;
		function doStep() {
			const action = generator.next(nextValue);
			if (action.done) {
				setDone(true);
			} else if (action.value[0] === 'compare') {
				const a = workingArray[action.value[1]];
				const b = workingArray[action.value[2]];
				if(a > b) {
					nextValue = 1;
				} else if (a < b) {
					nextValue = -1;
				} else {
					nextValue = 0;
				}
				setBarEffects({
					[action.value[1]]: 'red',
					[action.value[2]]: 'red',
                            })
} else if(action.value[0] =='swap') {
				workingArray=[...workingArray]
				const tmp = workingArray[action.value[1]];
				workingArray[action.value[1]] = workingArray[action.value[2]];
				workingArray[action.value[2]] = tmp;
				setArray(workingArray);
				setBarEffects({
					[action.value[1]]: 'green',
					[action.value[2]]: 'green',
				})
} else
{
	throw new Error("Error");
}
} stepRef.current=doStep;
},[resetCount, baseArray, algorithm])

const step = useCallback(()=>{stepRef.current();},[stepRef]);

return{
displayedArray,
done,
step,
reset,
barEffects,
}

}

function makeArray(length)
{
	const array = [];
	for(let i = 0; i < length; i++) {
		array.push(i);
	}
	array.sort(() => Math.random() < 0.5 ? 1 : -1);
	array.sort(() => Math.random() < 0.5 ? 1 : -1);
	return array;
}

const BAR_WIDTH=30;

const App=()=>{ 

	const [baseArray,setArray]=useState(makeArray(10));
	const [algorithm,setAlgorithm]=useState(()=>bubblesort);

	const{
		displayedArray,
		done,
		step,
		reset,
		barEffects,
	}=ToSort(baseArray,algorithm);
	const [playing, setPlay] = useState(false);
	
  return(
		<div className="container">
			<h1>Bubble sort</h1>  
			<div className="array">
				{displayedArray.map((value, index) => (
					<button
						key={value}
						
						style={{
							left: index * BAR_WIDTH,
							width: BAR_WIDTH,
							bottom: 0,
							height: 30,
							backgroundColor: barEffects[index],
						}}
						title={`Value: ${value}`}
					>{value}</button>
				))}
			</div>
			<div>
				<h2> Controls: </h2>
				<button onClick={() => setArray(makeArray(10))}>Random array</button>
				<h3>Lesson Control</h3>
				<button onClick={step}>Single step</button>
				
			</div>
		</div>
	);

}
export default App;