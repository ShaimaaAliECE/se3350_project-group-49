import './App.css';
import { mergesort } from "./MergeSort.js";
import { useEffect, useState } from 'react';

function App() {
  const [sorted, setSorted] = useState([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let newSorted = mergesort([4,3,2,1,8,7,6,5]);
    setSorted([...newSorted]);
    setStep(0);
  }, []);

  const calcArr = () => {
    if (sorted.length === 0) return [];
    let out = [];
    let stack = [0];
    let sumLoss = 0;
    out[out.length] = sorted[0];
    for (let i = 1; i <= step; i++) {
      if (sorted[i].length <= sorted[stack[stack.length-1]].length) {
        stack[stack.length] = i;
        out[out.length] = sorted[i];
        sumLoss = 0;
      }
      else {
        sumLoss += sorted[i].length;
        stack = stack.slice(0,-2);
        stack[stack.length-1] = i;
        out[out.length-1-sumLoss] = sorted[i];
      }
    }
    return out;
  }

  const displayArr = (arr) => {
    if (arr.length === 0) return;
    let newStack = [arr[0].length];
    let out =  
              '<div key="Frame" class="Frame">' +
              '<div key="0" class="Container">';
              for (let v = 0; v < arr[0].length; v++) {
                out=out+'<Button>'+arr[0][v]+'</Button>';
              }
              out = out + '<br/>'
    for (let i = 1; i < arr.length; i++) {
      while (arr[i].length >= newStack[newStack.length-1]) {
        out += '</div>';
        newStack = newStack.slice(0,-1);
      }
        if (arr[i].length < newStack[newStack.length-1] && arr[i].length > 1) {
          newStack[newStack.length] = arr[i].length;
        } 
        out=out+'<div key='+i+' class="Container">';
        for (let v = 0; v < arr[i].length; v++) {
          out=out+'<Button>'+arr[i][v]+'</Button>';
        }
        if (arr[i].length !== 1) out = out + '<br/>';
        else out = out + '</div>';
    }
    for (let i = 0; i <= newStack.length; i++) {
      out = out+'</div>';
    }
      return <div className='Frame' dangerouslySetInnerHTML={{__html: out}}></div>;
  }

  const display = () => {
    let arr = calcArr();
    console.log(arr);
    return displayArr(arr);
  }

  return (
    <div className="App">
    <button onClick={() => setStep((step+1)%sorted.length)}></button>
      {display()}
    </div>
  );
}

export default App;
