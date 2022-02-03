import logo from './logo.svg';
import './App.css';


import React, {useState, useReducer, useEffect, useRef, useCallback} from 'react';
import { useTimer } from 'react-timer-hook';

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
const handleClickRef=useRef(()=>{})
const [lives,setLives]=useState([3]);
const [playing, setPlaying] = useState(false);

let arsort=[...baseArray];
arsort=arsort.sort();


const compareArrays = (a1, a2) => {
    if (a1.length !== a2.length) return false;
    for (let i = 0; i < a1.length;i++) {
      if (a1[i] !== a2[i]) return false;
    }
    return true;
  }
useEffect(()=>{ 
let workingArray= baseArray;
setArray(workingArray);
setBarEffects({})
setDone(false);
let lengthcheck=baseArray.length

let checker=[false,0,1]
let action=[false,0,1]

		


function handleClick() {
	
	//checks what needs to be done next
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

							  //assigns clicked values to the action
			action[1]=x;
			action[2]=z;
	
			//if action is false then it checks if it needs to swap
		
		
			if(action[0]===false)
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

			//if it action is true it will then try to swap, if checker is also true
		else if(action[0]===true&&checker[0]==true)
			{
					//checks to see if action and checker are using the same index value, if it is the same, it will change it.
				if(action[1]===checker[1])
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
				//if it isnt you lose a live or something
				else if(action[1]!==checker[1])
				{
					checker[0]=false;
				}
			}
else{}
//reset the iteration to the first available swap state if we hit the end of the loop
		
if(checker[2]===lengthcheck)
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
			console.log(workingArray)
			console.log("Here")
			console.log(arsort)
			
			if(compareArrays(workingArray,arsort)) 
			{
				setPlaying(false);
			}

			}handleClickRef.current=handleClick;

			},[resetCount, baseArray])


const handleClick = useCallback(()=>{handleClickRef.current();},[handleClickRef]);
return{
displayedArray,
done,
reset,
handleClick,
barEffects,
lives,
playing,
setPlaying,
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



const App=(diff)=>{ 
let size;
let started=false;
	switch(diff){
		case 1: size=10;
		break;
		case 2: size=20;
		break;
		case 3: size=50;
		break;
		default: size=10;
		break;
	}
	const [baseArray,setArray]=useState(makeArray(size));	

	const{
		displayedArray,
		done,
		reset,
		barEffects,
		handleClick,
		lives,
		playing,
		setPlaying,
	}=ToSort(baseArray);
	const [time, setTime] = useState(0);
	

	  function startGame()
	{
		setTime(0)
	setArray(makeArray(10))
	started=true;
	setPlaying(true);
	}


useEffect(()=>{
	if(playing){
	const timerId = setInterval(() => setTime(time+1), 10);
			return () => clearInterval(timerId);
	}
})	
	
	const displayTime = () => {
		let minutes = Math.floor((time/100/60)).toString().padStart(2,"0");
		let seconds = Math.floor((time/100%60)).toString().padStart(2,"0");
		let ms = (time).toString().padStart(2,"0").slice(-2);
		return minutes+":"+seconds+":"+ms;
	  }


	return(
		<div className="container">
			<h1>Bubble sort</h1>  
			<label className="timer">{displayTime()}</label>
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
				<button onClick={() => startGame()}>Random array</button>
				<h3>Lesson Control</h3>				
			</div>
		</div>
	);

}
export default App;