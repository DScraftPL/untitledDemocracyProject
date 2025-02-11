import {useRef } from 'react'

import HelldiverPanel from "./HelldiverPanel"

function App() {
  const divRef = useRef<HTMLDivElement>(null)

  const handleCtrl = (e: React.KeyboardEvent) => {
    if(e.ctrlKey){
      divRef.current?.focus();
    }
  }
  return (
    <div onKeyDown={handleCtrl}>
      <HelldiverPanel divRef = {divRef}/>
      <button>text</button>
      <input></input>
    </div>
  )
}

export default App
