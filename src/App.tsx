import './App.css';
import React,{ useState } from 'react';
import usePow  from './util/usePow';
import { useDidUpdate } from './util/useDidUpdate';
function App() {
  const [flag, setFlag] = useState<boolean>(true)
  const [arr,setArr] = useState<number[]>([1, 2, 3])
  debugger
  const data = usePow(arr)
  const changeArr = ():void=> {
    let a = JSON.parse(JSON.stringify(arr))
    a.push(2)
    console.log(a)
    setArr(a)
  }
  // useDidUpdate(changeArr)
  return (
    <div>
      <div>数字：{JSON.stringify(data)}</div>
      <button color='primary' onClick={() => {setFlag(v => !v)}}>切换</button>
      <button color='primary' onClick={() => {changeArr()}}>改变数组</button>
       <div>切换状态：{JSON.stringify(flag)}</div>
    </div>
  );
}

export default App;
