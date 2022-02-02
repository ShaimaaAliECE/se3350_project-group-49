import './App.css';
import { mergesort } from "./MergeSort.js";
import { useEffect, useState } from 'react';
import { MergeTree } from './MergeTree';
import { waitFor } from '@testing-library/react';

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

  useEffect(() => {
    if (step === 0) {
      let out = [];
      for (let i = 6; i >0; i--) {
        out[out.length] = i;
      }
      let newSorted = mergesort(out);
      setSorted([...newSorted]);
    }
    if (playing && step < sorted.length-1) {
      const timerId = setInterval(() => setTime(time+1), 10);
      return () => clearInterval(timerId);
    }
  }, [step, time, playing]);

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
                              disabled={!check} 
                              style={{
                                height:(n/num+1)*20,
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
      {playing&&<div className='displaybox'>
        <div className='displayHead'>
          <label className='leftright'>left: {userIn.l} right: {userIn.r}</label>
          <label className='leftright'>Step: {step+1}/{sorted.length-1}</label>
          <label className="timer">{mode>=0 && displayTime()}</label>
        </div>
        {displayTree(root, cur)}
        <br/>
        {mode>0&&drawLives()}
      </div>}
      {mode<0&&<label> {printStep(cur)}</label>}
      <button className='nextstep' 
        onClick={(e) => checkStep(e, cur)}>
        {playing?step+1 < sorted.length-1?"Next":step+1===sorted.length-1?"Finish":"Restart":"Start"}
        </button>
    </div>
    );
  }

  const printStep = (cur) => {
    if (cur === new MergeTree([0]) || cur === null) return "";
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
    if (mode < 0) {
      setTime(1);
      setUserIn({l:0,r:0});
      setRefresh(true);
      if (!playing) {
        setPlaying(true); 
        setStep(0);
        return;
      }
      if (step+1 > sorted.length-1) {setStep(0);setUserIn({l:0,r:0});return;}
      setStep(step+1);
      return; 
    }
    if (!playing) {
      setPlaying(true); 
      setTime(0);
      setStep(0);
      setlives(3);
      return;
    }
    let newStep = (step+1);
    e.preventDefault();
    console.log(mode);
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
    } else {
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
      out+= "WINNER!\n\n"
      out+= "Lives: " + lives + "/3\n"
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

  const compareArrays = (a1, a2) => {
    if (a1.length !== a2.length) return false;
    for (let i = 0; i < a1.length;i++) {
      if (a1[i] !== a2[i]) return false;
    }
    return true;
  }

  return (
    <div className="App">
      {display()}
    </div>
  );
}

export default App;
