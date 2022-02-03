import './App.css';
import { mergesort } from "./MergeSort.js";
import { useEffect, useState } from 'react';
import { MergeTree } from './MergeTree';
import { waitFor } from '@testing-library/react';
import { TransgenderTwoTone } from '@mui/icons-material';

// modes: -1 = lesson
//         0 = practice
//        >0 = levels

function App({mode}) {
  const [sorted, setSorted] = useState([]);
  const [step, setStep] = useState(0);
  const [userIn, setUserIn] = useState({l:0,r:0});
  const [turn, setTurn] = useState(true);
  const [lives, setlives] = useState(3);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [userArr, setUserArr] = useState("");

  useEffect(() => {
    if (!playing) return;
    if (step === 0) {
      if (sorted.length === 0) { 
        let out = [];
        if (mode < 0) out = generateArray(10, 20);
        else if (mode === 0) out = generateArray(10, 50);
        else out = generateArray(mode*10, mode *100);
        let newSorted = mergesort(out);
        setSorted([...newSorted]);
      }
    }
    if (step < sorted.length-1) {
      const timerId = setInterval(() => setTime(time+1), 10);
      return () => clearInterval(timerId);
    }
  }, [step, time, playing, sorted]);

  const generateArray = (len, range) => {
    let out = [];
    for (let i = 0; i < len; i++) {
      out[out.length] = Math.floor(Math.random()*range)+1;
    }
    return out;
  }

  const makeTree = () => {
    let a = [...sorted];
    if (a.length === 0) return new MergeTree([0]);
    let cur = new MergeTree(a[0]);
    if (a.length === 1) return cur;
    let max = step < sorted.length? step : sorted.length-1;
    for (let i = 1; i <= max;i++) {
      if (a[i].length < cur.val.length) {
        let newNode = new MergeTree(a[i]);
        newNode.setParent(cur);
        cur.addChild(newNode);
        if (a[i].length !== 1) cur = newNode; 
      } else {
        cur.val = a[i];
        if (cur.parent !== null)
          cur = cur.parent;
      }
      if (cur.full()) {
        cur.close();
      }
    }
    return cur;
  }

  const handleButton = (e, tree, i) => {
    e.preventDefault();
    let newRange = {...userIn};
    if (tree.open) {
      if (turn) {
        newRange.l = i;
      } else {
        newRange.r = i;
      }
      if (newRange.l > newRange.r) {
        let r = newRange.r;
        newRange.r = newRange.l;
        newRange.l = r;
      }
      setTurn(!turn);
      setUserIn({...newRange})
    } else if (userIn.l + userIn.r < tree.parent.val.length) {
      if (tree.parent.left === tree) {
        tree.parent.val[userIn.l + userIn.r] = tree.val[userIn.l];
        setUserIn({l:userIn.l+1, r:userIn.r});
      } else {
        tree.parent.val[userIn.l + userIn.r] = tree.val[userIn.r];
        setUserIn({l:userIn.l, r:userIn.r+1});
      }
    } else setUserIn({l:0,r:0});
  }

  const chooseButtonColor = (tree, cur, i) => {
    let color = "#CBF";
    if (cur.open) {
      if (tree === cur) {
        if (i >= userIn.l && i <= userIn.r) {
          color = "#5D8";
        } else color = "#C38";
      }
    }
    else {
      if (tree === cur) {
        if (i === userIn.l+userIn.r) color = "#AA4"
      }
      if (tree === cur.left) color = "#3D5";
      else if (tree === cur.right) color = "#D35";
    }
    return color;
  }

  const chooseBorder = (tree, cur, i) => {
    let border = "";
    if (!cur.open && ((tree === cur.left && i === userIn.l) || (tree === cur.right &&  i === userIn.r))) {
      return "solid gold 2px";
    }
    return border;
  }

  const displayTree = (tree, cur) => {
    if (sorted.length === 0) return;
    if (tree === null) return;
    let out = tree.val;
    let check = (tree.open && tree===cur) || (!cur.open && (tree===cur.left || tree===cur.right));
    let s = sorted[sorted.length-1];
    let num = s[s.length-1];
    let buttonList = <div className='Container' key={tree.val}>
                        {
                          out.map((n,i) => 
                          <div className='Container' key={i}> 
                          {i}
                            <br/>
                            <button 
                              className='mergebutton'
                              disabled={!check} 
                              style={{
                                height:`calc(${(n/num+1)}*2vh)`,
                                bottom:0,
                                backgroundColor:chooseButtonColor(tree, cur, i),
                                border:chooseBorder(tree,cur,i)
                              }} 
                              onClick={(e) => handleButton(e,tree,i)}
                              key={i}>
                              {n}
                            </button>
                          </div>
                          )
                        }
                      </div>
    if (tree.leaf()) return (buttonList);
    if (tree.right!=null) return (
      <div className='Container' key={tree.val}>
        {buttonList}
        <br/>
        {displayTree(tree.left,cur)}{displayTree(tree.right,cur)}
      </div>
    );
    return (
      <div className='Container' key={tree.val}>
        {buttonList}
        <br/>
        {displayTree(tree.left, cur)}
      </div>
    );
  }

  const drawLives = () => {
    let dispLives = [];
    for (let i = 0; i < lives; i++) {
      dispLives.push(<label key={i} style={{border:"solid 1px black"}}>{"<3"}</label>);
    }
    return (
      <span className='leftright'>
          {
            dispLives
          }
      </span>
    );
  }

  const displayTime = () => {
    let minutes = Math.floor((time/100/60)).toString().padStart(2,"0");
    let seconds = Math.floor((time/100%60)).toString().padStart(2,"0");
    let ms = (time).toString().padStart(2,"0").slice(-2);
    return minutes+":"+seconds+"."+ms;
  }

  const display = () => {
    let cur = makeTree();
    let root = cur.root();
    if (step === sorted.length-1) cur.open = true;
    return (
    <div className='Frame'>
    {mode===0&&uiArray()}
    <button className='nextstep' 
        onClick={(e) => checkStep(e, cur)}>
        {playing?step+1 < sorted.length-1?"Next":step+1===sorted.length-1?"Finish":"Restart":"Start"}
    </button>
      {playing&&<div className='displaybox'>
        <div className='displayHead'>
          <label className='leftright'>left: {userIn.l} right: {userIn.r}</label>
          <label className='timer' style={{alignSelf:"center"}}>Step: {(step+1)%(sorted.length)}/{sorted.length-1}</label>
          <label className="timer">{mode>=0 && displayTime()}</label>
        </div>
        <div className='Frame'>
        {displayTree(root, cur)}
        </div>
        {mode>0&&drawLives()}
      </div>}
      {mode<0&&<label style={{color:"white"}}>{printStep(cur)}</label>}
      
    </div>
    );
  }

  const uiArray = () => {
    return (
      <input className='uiArr' disabled={playing} type="text" placeholder='Numbers (a, b, c..)' onChange={(e) => userInput(e)} value={userArr}></input>
    );
  }

  const userInput = (e) => {
    e.preventDefault();
    setUserArr(e.target.value);
    console.log(e.target.value);
  }

  const parseUI = () => {
    if (userArr.length === 0) {setSorted([]); return;}
    let arr = userArr.split(',');
    let goodArr = true;
    console.log(arr);
    let out = [];
    for (let i = 0; i < arr.length; i++) {
      let s = arr[i].trim();
      if (isNaN(s)) {goodArr=false; break;}
      out.push(Number(s));
    }
    if (goodArr)
      setSorted(mergesort(out));
    else setSorted([]);
    console.log(out);
  }

  const printStep = (cur) => {
    if (cur.val.length === 1 || cur === null) return "";
    if (mode < 0 && refresh) {
      console.log(cur);
      if (cur.open || step === 0) {
        console.log(cur);
        if (cur.left === null) {
          setUserIn({l:0,r:Math.floor((cur.val.length+1)/2)-1});
        } else if (cur.right === null) {
          setUserIn({l:Math.floor((cur.val.length+1)/2),r:cur.val.length});
        } else {
          setUserIn({l:0, r:cur.val.length})
        }
        setRefresh(false);
      } else if (time%25===0) {
        if (userIn.l + userIn.r < cur.val.length) {
          cur.val[userIn.l+userIn.r] = cur.right.val[userIn.r];
          if (userIn.l >= cur.left.val.length) setUserIn({l:userIn.l, r:userIn.r+1});
          else if (cur.right.val[userIn.r] <= cur.left.val[userIn.l]) setUserIn({l:userIn.l, r:userIn.r+1});
          else {
            cur.val[userIn.l+userIn.r] = cur.left.val[userIn.l];
            if (userIn.r >= cur.right.val.length) setUserIn({l:userIn.l+1, r:userIn.r});
            else if (cur.left.val[userIn.l] <= cur.right.val[userIn.r]) setUserIn({l:userIn.l+1, r:userIn.r});
          }
          setTime(time+1);
        } else {
          setRefresh(false);
        }
      }
    }

    if (!playing) return;
    if (cur.open) {
      if (cur.left === null) {
        return "Select the first half of the array.";
      } else if (cur.right == null) {
        return "Select the second half of the array."
      }
    } else {
      return "Merge numbers one by one, choosing the array with the lowest number"
    }
  }

  const checkStep = (e, cur) => {
    console.log(sorted);
    console.log(cur);
    console.log(step);
    if (mode < 0) {
      setTime(1);
      setUserIn({l:0,r:0});
      setRefresh(true);
      if (!playing) {
        setPlaying(true); 
        setStep(0);
        return;
      }
      if (step+1 > sorted.length-1) {
        setStep(0);
        setUserIn({l:0,r:0});
        return;
      }
      setStep(step+1);
      return; 
    }
    if (!playing) {
      if (mode === 0) parseUI();
      setPlaying(true); 
      setTime(0);
      setStep(0);
      setlives(3);
      return;
    }
    if (sorted.length <= 1) {setPlaying(false);return;}
    let newStep = (step+1);
    e.preventDefault();
    let v = cur.val;
    if (cur.open) v = cur.val.slice(userIn.l, userIn.r+1);
    let s = sorted[newStep];
    if (compareArrays(v,s)) {
      if (newStep === sorted.length-1) {
        setUserIn({l:0,r:0});
        setStep(step+1);
        endGame(true);
        return;
      }
      setStep(newStep);
    } else if (mode > 0) {
      setlives(lives-1);
      if (lives <= 1) {
        endGame(false);
      }
    }
    setUserIn({l:0,r:0});
  }

  const endGame = (win) => {
    let out = "";
    if (win) {
      if (mode > 0) {
        out+= "WINNER!\n\n"
        out+= "Lives: " + lives + "/3\n";
      } else out += "Complete!\n\n";
    } else {
      out+= "FAILURE!\n\n"
      setTime(0);
    }
    out+= "Time: " + displayTime();
    alert(out);
    setStep(0);
    setlives(3);
    setPlaying(false);
  }

  const startPage = () => {
    let out = "MergeSort ";
    if (mode < 0) {
      return <label className='Title'>MergeSort Lesson <br/><p style={{fontSize:"small"}}>Interactive! Practice the controls here</p></label>

    } else if (mode === 0) {
      out += "Practice"
    } else {
      out += "Level " + mode;
    }
    return (
      <label className='Title'>{out}</label>
    );
  }

  const compareArrays = (a1, a2) => {
    if (a1.length !== a2.length) return false;
    for (let i = 0; i < a1.length;i++) {
      if (a1[i] !== a2[i]) return false;
    }
    return true;
  }

  return (
    <div className="MergeSort">
      {startPage()}
      {display()}
    </div>
  );
}

export default App;
