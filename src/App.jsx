import { useState } from "react";
import "./App.css";

function App() {
  const inputOtp = () => {
    return (
      <input
        maxLength="1"
        type="text"
        className="w-16 h-12 rounded-md mr-3 text-center text-xl"
      />
    );
  };

  return (
    <form action="">
      <h3 className="text-3xl mb-8">Please fill the OTP</h3>
      <div>
        {inputOtp()}
        {inputOtp()}
        {inputOtp()}
        {inputOtp()}
        {inputOtp()}
        {inputOtp()}
      </div>
      <button className="mt-4 w-32 border border-solid bg-[#3b3b3b] rounded hover:bg-[#252525] hover:border-[#3b3b3b]">
        Submit
      </button>
    </form>
  );
}

export default App;
