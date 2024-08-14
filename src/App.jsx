import { useState, useCallback, useEffect } from "react";
import "./App.css";

function App() {
  const [pass, setpass] = useState("");
  const [length, setlength] = useState(8);
  const [isnum, setisnum] = useState(false);
  const [splchar, setsplchar] = useState(false);

  const passgenerator = useCallback(() => {
    let password = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isnum) {
      string += "0123456789";
    }
    if (splchar) {
      string += "!@#$%^&*()_+";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * string.length + 1);
      password += string.charAt(char);
    }
    setpass(password);
    // console.log("this is generated password " + password + 
    // "this is length "+ length+"this is isnum "+isnum+"this is splchar "+splchar);
  }, [isnum, splchar, length]);

  useEffect(() => {
    passgenerator();
  }, [passgenerator, length, isnum, splchar]);

  const copy = () => {
    navigator.clipboard.writeText(pass);
  };

  return (
    <>
      <div className="container">
        <h1>Password Generator</h1>

        <div className="firstrow">
          {/* input and button  */}
          <input type="text" value={pass} placeholder="password" readOnly id="passfield"/>
          <button onClick={copy}>copy</button>
        </div>
        <div className="options">
          <input
            type="range"
            value={length}
            min="8"
            max="14"
            onChange={(e) => setlength(e.target.value)}
            name="length"
            id="length"
          />
          <label for="length">Length({length})</label>

          <input
            type="checkbox"
            name="num"
            id="num"
            defaultChecked={isnum}
            onChange={() => setisnum((prev) => !prev)}
          />
          <label for="num">Numbers</label>

          <input
            type="checkbox"
            name="splchar"
            id="splchar"
            defaultChecked={splchar}
            onChange={() => setsplchar((prev) => !prev)}
          />
          <label for="splchar">Symbol</label>
        </div>
      </div>
    </>
  );
}

export default App;
