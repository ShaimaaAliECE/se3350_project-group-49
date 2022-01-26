import './App.css';
import { mergesort } from "./MergeSort.js";
import { useEffect, useState } from 'react';
import { MergeTree } from './MergeTree';

function App() {
  const [sorted, setSorted] = useState([]);
  const [step, setStep] = useState(0);
  const [userIn, setUserIn] = useState({l:0,r:0});
  const [turn, setTurn] = useState(true);
  const [lives, setlives] = useState(3);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (playing) {
      if (step === 0) {
        let newSorted = mergesort([69,21,420,888,9,14,546,75]);
        setSorted([...newSorted]);
      }
      if (step < sorted.length-1) {
        const timerId = setInterval(() => setTime(time+1), 10);
        return () => clearInterval(timerId);
      }
    }
  }, [step, time, playing, sorted.length]);

  const makeTree = () => {
    let a = [...sorted];
    if (a.length === 0) return new MergeTree([0]);
    let cur = new MergeTree(a[0])
    if (a.length === 1) return cur;
    for (let i = 1; i <= step;i++) {
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
    if (tree === null) return;
    let out = tree.val;
    let check = (tree.open && tree===cur) || (!cur.open && (tree===cur.left || tree===cur.right));

    let buttonList = <div className='Container' key={tree.val}>
                        {
                          out.map((n,i) => 
                          <div className='Container' key={i}> 
                          {i}
                            <br/>
                            <button 
                              disabled={!check} 
                              style={{
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
    return minutes+":"+seconds+":"+ms;
  }

  const display = () => {
    let cur = makeTree();
    let root = cur.root();
    if (step === sorted.length-1) cur.open = true;
    return (
    <div className='Frame'>
      <div className='displaybox'>
        <div className='displayHead'>
          <label className='leftright'>left: {userIn.l} right: {userIn.r}</label>
          <label className="timer">{displayTime()}</label>
        </div>
        {displayTree(root, cur)}
        <br/>
        {drawLives()}
      </div>
      <button className='nextstep' 
        onClick={(e) => checkStep(e, cur)}>
        {playing?step+1 < sorted.length-1?"Next":step+1===sorted.length-1?"Finish":"Restart":"Start"}
        </button>
    </div>
    );
  }

  const checkStep = (e, cur) => {
    if (!playing) {
      setPlaying(true); 
      setTime(0);
      setStep(0);
      setlives(3);
      return;
    }
    let newStep = (step+1);
    e.preventDefault();
    if (newStep > sorted.length-1) {setStep(0);setUserIn({l:0,r:0});return;}
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
