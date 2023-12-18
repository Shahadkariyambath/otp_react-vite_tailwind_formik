import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const inputRef = useRef({});

  const [otp, setOtp] = useState({
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
    digitFive: "",
    digitSix: "",
  });

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  const handleChnge = (event, index) => {
    const { name, value } = event.target;

    setOtp((prev) => ({
      ...prev,
      [name]: value,
    }));

    // event.target.nextSibling.focus();
    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleBack = (event, index) => {
    if (event.key === "Backspace" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const inputRenderOtp = () => {
    return Object.keys(otp).map((keys, index) => (
      <input
        ref={(ele) => (inputRef.current[index] = ele)}
        key={index}
        maxLength="1"
        name={keys}
        type="text"
        className="w-16 h-12 rounded-md mr-3 text-center text-xl"
        onChange={(event) => handleChnge(event, index)}
        onKeyUp={(event) => handleBack(event, index)}
      />
    ));
  };

  console.log(inputRef);

  return (
    <form action="">
      <h3 className="text-3xl mb-8">Please fill the OTP</h3>
      <div>{inputRenderOtp()}</div>
      <button className="mt-4 w-32 border border-solid bg-[#3b3b3b] rounded hover:bg-[#252525] hover:border-[#3b3b3b]">
        Submit
      </button>
    </form>
  );
}

export default App;
