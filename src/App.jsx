import { useState, useCallback, useEffect , useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState("8");
  const [numberused, setNumberuse] = useState(false);
  const [charused, setCharused] = useState(false);
  const [password, setPassword] = useState("");



  const passwordRef = useRef(null)

  const passowrdGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberused) str += "0123456789";
    if (charused) str += "!@#$%^&*";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberused, charused, setPassword]);

  const copypasstoClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,5)//select value in range
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passowrdGenerator()
  },[length,numberused,charused,passowrdGenerator])

  return (
    <>
      <div className="w-full h-full max-w-md mx-auto shadow-md rounded-lg px-3 py-3 my-8 text-orange-300 bg-slate-500 ">
        <h3 className="text-white text-center my-3 font-medium text-xl">Password generator</h3>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-5"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button 
          onClick={copypasstoClipboard}
          
          className="outline-none bg-green-600 text-white px-3 py-0.5 shrink-0">
            Submit
          </button>
        </div>
        <div className="flex text-sm gap-x-1 ">
          <div className="flex items-center border-non gap-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            ></input>
            <label className="font-medium text-lg">length : {length}</label>
          </div>

          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberused}
              onChange={() => {
                setNumberuse((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="flex font-medium text-lg gap-x-3">
              {" "}
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-3 ">
            <input
              type="checkbox"
              id="characterInput"
              defaultChecked={charused}
              onChange={() => {
                setCharused((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput" className="font-medium text-lg">
              {" "}
              Character
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;


//https://chatgpt.com/share/cc7fac05-a327-4f13-a0db-2ef7dc454f38