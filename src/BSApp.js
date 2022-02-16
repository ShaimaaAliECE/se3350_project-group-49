import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useRef, useCallback} from 'react'

function BSApp({mode}) {

const [difficulty, setDifficulty]=useState(mode);
const [displayedArray, setArray]=useState([]);
const [sortedArray,setSortedArray]=useState([1]);
const [barEffects, setBarEffects] =useState([]);
const [playing, setPlaying] = useState(false);
const [swap, setSwap] = useState(false);
const [baseArray, setBaseArray] = useState([])
const [index, setIndex] = useState([0,1]);
const [lengt, setLengt]=useState(0);
const [time, setTime] = useState(0);
const [done, setDone]=useState(false);
const [lives, setlives] = useState(3);
const [winner, setWinner] = useState(false);
const [userArray, setUserArray] = useState("");
const swapFNRef=useRef(()=>{})
const compareRef=useRef(()=>{})
const noSwapFNRef=useRef(()=>{})

const compareArrays = (a1, a2) => {
  if (a1.length !== a2.length) return false;
  for (let i = 0; i < a1.length;i++) {
    if (a1[i] !== a2[i]) return false;
  }
  return true;
}


useEffect(() => {
  

  if(!playing) return;

  let  workingArray=[...baseArray]
  setArray(workingArray)
  bubblesort(baseArray)
  compare();



  function swapFN(){

    workingArray=[...workingArray]
    const tmp=workingArray[index[0]]
    workingArray[index[0]]=workingArray[index[1]]
    workingArray[index[1]]=tmp
    setArray(workingArray);
    setIndex([index[0]++,index[1]++]);
    return 
  
  }swapFNRef.current=swapFN;

function noSwapFN(){
  setIndex([index[0]++,index[1]++]);
  return
}noSwapFNRef.current=noSwapFN;


  function compare(){

    if(index[0]==lengt){
      setIndex([index[0]=0,index[1]=1]);
      setLengt(lengt-1);
      console.log(lengt);
    }
   
    
    setBarEffects({
      [index[0]]:'green',
      [index[1]]:'red'
    })
  
    
    if(workingArray[index[0]]>workingArray[index[1]])
    {
      setSwap(true)
    }
    else{
      setSwap(false)
    }

    
      if(compareArrays(sortedArray,workingArray))
      {
        setDone(true);
        setWinner(true);
        setPlaying(false);
      }
    

  
  }compareRef.current=compare;

},[baseArray ,playing])



useEffect(()=>{
	if(playing){
	const timerId = setInterval(() => setTime(time+1), 10);
			return () => clearInterval(timerId);
	}
})




const swapFN=useCallback(()=>{swapFNRef.current();},[swapFNRef])
const compare=useCallback(()=>{compareRef.current();},[compareRef])
const noSwapFN=useCallback(()=>{noSwapFNRef.current();},[noSwapFNRef])


const createArray=() =>{
switch(difficulty) {
  case 1: setBaseArray(generateArray(10,1,20))
          setPlaying(true); 
          setLengt(9);   
    break;
  case 2:
          setBaseArray(generateArray(20,1,50))
          setPlaying(true); 
          setLengt(19);   
    break;
  case 3:
          setBaseArray(generateArray(50,1,100))
          setPlaying(true); 
          setLengt(49);   
    break;
  case 4:if(userArray=="")
        {
          setBaseArray(generateArray(10,1,20))
          setLengt(9)
        }
        else
        {
            let tempo=splitterOfArrays()
            let lento=tempo.length-1
            bubblesort(tempo)
            setBaseArray(tempo)
            setLengt(lento)
        }
        setPlaying(true);
    break;
  default:
          setBaseArray(generateArray(10,1,20))
          setPlaying(true); 
          setLengt(9);   
    break;
}
}

const splitterOfArrays=()=>{

  let newArr=userArray.split(',').map(Number)
  return newArr;
}

const generateArray=(length,min,max) =>{

const nmin=Math.ceil(min)
const nmax=Math.floor(max+1)
let array=Array.from({length:length},()=>Math.floor(Math.random()*(nmax-nmin)+nmin));
bubblesort(array);
return array
}


const bubblesort = (arr)=> {

  let temp=[...arr]
  let swapped=false;
let i,j;


  for(i=0; i<temp.length; i++) {
swapped=false;

for(j=0;j<temp.length; j++) {
if(temp[j]>temp[j+1])
{
  let nt=temp[j];
  temp[j]=temp[j+1]
  temp[j+1]=nt
  swapped=true;
}
}

if(!swapped)
{
  break;
}
  }

setSortedArray(temp);
}



const swapBTN=()=>{
if(swap)
{
  swapFN()
}
else
{
  if(difficulty>0&&difficulty!=4)
  {
    setlives(lives-1)
    checklives()
  }
  
}
compare()
}


const noSwapBTN=()=>{
if(!swap){
  noSwapFN()
}
else
{
 if(difficulty>0&&difficulty!=4)
 {
   setlives(lives-1)
   checklives()
 }
 
}

compare()
}

const nxtStep=()=>{
if(swap){
  swapFN() 
}
else
{
  noSwapFN()
}

compare()


}


const checklives=()=>{
  if(lives<=1)
  {
    setPlaying(false)
    setDone(true)
  }

}
const displayTime = () => {
  let minutes = Math.floor((time/100/60)).toString().padStart(2,"0");
  let seconds = Math.floor((time/100%60)).toString().padStart(2,"0");
  let ms = (time).toString().padStart(2,"0").slice(-2);
  return minutes+":"+seconds+":"+ms;
  }

  const drawLives = () => {
    let dispLives = [];
    for (let i = 0; i < lives; i++) {
      dispLives.push(<label key={i} style={{border:"solid 1px black"}}>{"<3"}</label>);
    }
    return (
      <div>
          {
            dispLives
          }
      </div>
    );
  }

const displaytut = () => {
  
if(playing){

  if(swap)
  {
  return (<div><label>swap the two numbers around </label></div>)
  }
  else
  {
    return (<div><label>compare and move on </label></div>)
  }

}
else if (done)
{
  return (<div><label>Array is Sorted tutorial complete </label></div>)
}

}


const displayWinner=() => {

  if(winner){
return (<div><label>You Have Won......Yay!</label></div>)
  }
  else{
    return (<div><label>You Have Lost, take a break and watch Shrek 2 </label></div>)
  }



}

const restart=()=>{
  setArray([])
setSortedArray([1])
setBarEffects([])
setPlaying(false)
setBaseArray([])
setIndex([index[0]=0,index[1]=1]);
setLengt(0)
setTime(0)
setDone(false)
setlives(3)
setWinner(false)
setUserArray("")

}
 const display=()=>{

return(<div>
  {(!playing&&!done)&&difficulty==4?<input type="text" placeholder="a,b,c but in numbers" required onChange={e=>setUserArray(e.target.value)}></input>:null}
  {(playing||done)&&difficulty>0?<label className="timer">{displayTime()}</label>:null}
<div className="array">
  {displayedArray.map((value, index)=>(
    <button key={index}
    style={{ left: index*30,
             width:30,
             bottom: 0,
             height:30,
             backgroundColor: barEffects[index],
          }}
          title={`Value: ${value}`}
          >{value}</button>
  ))}


  </div>
  <br/>
  <div>
  
  {!playing&&!done?<button onClick={() => createArray()}>Start</button>:null}
  </div>

  <div>
  {playing&&difficulty>=0?<button onClick={swapBTN}>Swap</button>:null}
  {playing&&difficulty>=0?<div className="divider"/>:null}
  {playing&&difficulty>=0?<button onClick={noSwapBTN}>Don't Swap</button>:null}

  {playing&&difficulty==-1?<button onClick={nxtStep}>Next Step</button>:null}
  </div>
  <br/>
  {difficulty<1?displaytut():null}
  {difficulty>0&&done?displayWinner():null}
  {difficulty>0&&playing&&difficulty!=4?drawLives():null}

  <br/>
  {done?<button onClick={restart}>Restart?</button>:null}
  </div>)

  
 }
 
 
 
  return (
    <div className="App">
      <h1>Bubble Sort</h1>
      {display()}
    </div>
  );
}

export default BSApp;
