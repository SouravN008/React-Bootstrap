import { useState  , useCallback , useEffect , useRef} from 'react'
function App() {
  const [length, setLength] = useState(8)
  const[numberAllowed, setNumberAllowed]= useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState('')
  const passwordRef = useRef(null)
  const generatePassword = useCallback(()=> {
    let password = ""
     let str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy"
     if (numberAllowed) str += "0123456789"
     if (charAllowed) str += "!@#$%^&*()_+"

     for (let i = 0; i < length; i++) {
      const Char = Math.floor(Math.random() * str.length + 1)
      password += str.charAt(Char)}

      setPassword(password)
  },[length, numberAllowed, charAllowed])
 
  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }
  useEffect(() => {
    generatePassword()
  },[length, numberAllowed, charAllowed])
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 m-8 text-orange-500 ' >
      <h1 className='text-white text-center m-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
       <input  type="text"
       value={password}
       className='outline-none w-full py-1 px-3'
       placeholder='password'
       readOnly
       ref={passwordRef}
       />
       <button
       onClick={copyToClipboard}
        className='outline-none bg-yellow-500 text-white px-3 py-0.5 shrink-0'>
        copy
       </button>
      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
        min={6}
        max={20}
        value={length}
        className='cursor-pointer'
        onChange={(e) => setLength(e.target.value)}
         name='' id=''
         />
         <label htmlFor='length'>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type='checkbox' 
        defaultChecked={charAllowed}
        onChange={()=> {
          setCharAllowed((prev) => !prev)
        }}
        name=''
        id=''
        />
        <label htmlFor='number'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type='checkbox' 
        defaultChecked={numberAllowed}
        onChange={()=> {
          setNumberAllowed((prev) => !prev)
        }}
        name=''
        id=''
        />
        <label htmlFor='chatInput'>Character</label>
      </div>
      </div>
    </div>
  )
}

export default App
