import './App.css';
import { mergesort } from "./MergeSort.js";
import { useEffect, useState } from 'react';
import { MergeTree } from './MergeTree';

function App() {
  const [sorted, setSorted] = useState([]);
  const [step, setStep] = useState(0);
  const [userIn, setUserIn] = useState({l:0,r:0});


  useEffect(() => {
    let newSorted = mergesort([4,3,2,1,8,7,6, 8, 5]);
    setSorted([...newSorted]);
    setStep(0);
  }, []);

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

  const displayTree = (tree, cur) => {
    if (tree === null) return;
    let out = tree.val;
    let check = false;
    if (cur.open)
      check = tree === cur;
    else {
      check = tree === cur.left || tree === cur.right;
    }
    console.log(check);
    let buttonList = <div className='Container' key={tree.val}>
                        {
                          out.map((n,i) => 
                            <button style={{backgroundColor:check?"blue":"yellow"}} key={i}>{n}</button>
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

  const display = () => {
    let cur = makeTree();
    let root = cur.root();
    console.log(cur.print());
    return displayTree(root, cur);
  }

  return (
    <div className="App">
          <button onClick={() => setStep((step+1)%sorted.length)}>{step}</button>
    <br/>
      {display()}
    </div>
  );
}

export default App;
