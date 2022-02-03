import logo from './logo.svg';
import './App.css';


import React, {useState, useReducer, useEffect, useRef, useCallback} from 'react';
let w=0
let x=0 
let y=0 
let z=0
function compare(a,b){
	if(a>b){
	return true;
	}
	else{
		return false;
	}

}
function ToSort(baseArray)
{
const [displayedArray, setArray]=useState([])
const [done, setDone] =useState(true);
const [resetCount, reset] =useReducer(0,(state)=> state+1);
const [barEffects, setBarEffects] =useState([]) 
const stepRef=useRef(()=>{})
const handleClickRef=useRef(()=>{})
const [lives, setlives] = useState(3);


useEffect(()=>{ 
let workingArray= baseArray;
setArray(workingArray);
setBarEffects({})
setDone(false);
let lengthcheck=baseArray.length

let checker=[false,0,1]
let action=[false,0,1]

		function handleClick() {

	if(checker[0]==false) {
		const ca=workingArray[checker[1]]
		const cb=workingArray[checker[2]]
		let flag=compare(ca,cb)
		if(flag)
		{
			checker[0]=true;	
		}
		else
		{
			checker[0]=false;
			checker[1]++
			checker[2]++
		}
	}

			action[1]=x;
			action[2]=z;
			if(action[0]==false)
			{
				setBarEffects({
					[action[1]]: 'red',
					[action[2]]: 'red',
                            }) 
				const a = workingArray[action[1]];
				const b = workingArray[action[2]];

				if(a>b)
				{
					action[0]=true;
				}
				else if(a<b)
				{
					action[0]=false
				}
				else
				{
					action[0]=false;
				}
			}
			else if(action[0]==true&&checker[0]==true)
			{
				if(action[1]==checker[1])
				{
					workingArray=[...workingArray]
					const tmp = workingArray[action[1]];
					workingArray[action[1]] = workingArray[action[2]];
					workingArray[action[2]] = tmp;
					setArray(workingArray);

					//make bar green to shows
					setBarEffects({
					[action[1]]: 'green',
					[action[2]]: 'green',
					})

					checker[0]=false;
					checker[1]++
					checker[2]++
				}
				else if(action[1]!=checker[1])
				{

					console.log("life is lost")
					checker[0]=false;
					lives--;
				}
			}
else{}



			/*
			
			 if(action[0] === false) {
				const a = workingArray[action[1]];
				const b = workingArray[action[2]];
				if(a > b) {
					
					checker[0]=false;
					action[0]=true;	
					
				} else if (a < b) {

					if(checker[0] == false) {
						checker[1]++
						checker[2]++
					}
					checker[0] =true;
				} 
				else {
						
				}
		
				setBarEffects({
					[action[1]]: 'red',
					[action[2]]: 'red',
                            })
						
}				
else if(action[0] ==true && checker[1]==action[1]&&checker[0]==false) {
	
	//replaces value 1 with value 2 and vice versa
	workingArray=[...workingArray]
	const tmp = workingArray[action[1]];
	workingArray[action[1]] = workingArray[action[2]];
	workingArray[action[2]] = tmp;
	setArray(workingArray);
	
	//make bar green to shows
	setBarEffects({
		[action[1]]: 'green',
		[action[2]]: 'green',
	})

	checker[1]++
	checker[2]++
	checker[0]=false
	action[0] = false
}else if(checker[1]!=action[1])
{
console.log("lose a life")
} 
else
{
throw new Error("Error");
}

*/
//reset the iterations
		if(checker[2]==lengthcheck)
			{
				for(let i=0; i<workingArray.length; i++)
				{
					if(workingArray[i]>workingArray[i+1])
					{
						checker[1]=i
						checker[2]=++i
						checker[0]=false;
						break;
					}
				}
				lengthcheck--
			}
			console.log(checker)
			}handleClickRef.current=handleClick;
		
},[resetCount, baseArray])

const step = useCallback(()=>{stepRef.current();},[stepRef]);
const handleClick = useCallback(()=>{handleClickRef.current();},[handleClickRef]);

return{
displayedArray,
done,
step,
reset,
handleClick,
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

const App=(mode)=>{ 
let size;
	switch(mode){
		case 1: size=10;
		break;
		case 2: size=20;
		break;
		case 3: size=50;
		break;
		default: size=10;
		break;
	}
	const [baseArray,setArray]=useState(makeArray(0));
	const{
		displayedArray,
		done,
		reset,
		barEffects,
		handleClick,
	}=ToSort(baseArray);
	
	return(
		<div className="container">
			<h1>Bubble sort</h1>  
			<div className="array">
				{displayedArray.map((value, index) => (
					
					<button onClick={(e)=>(handleClick(w=value,x=index,y=displayedArray[index+1],z=index+1,e))}
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
				<button onClick={() => setArray(makeArray(10))}>Start Game</button>
				
				
			</div>
		</div>
	);

}
export default App;