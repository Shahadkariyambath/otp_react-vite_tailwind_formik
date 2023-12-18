import { useEffect, useRef } from "react";
import { Formik, useFormik } from "formik";
import "./App.css";

function App() {
  const inputRef = useRef({});

  const formik = useFormik({
    initialValues: {
      // otp: {
      //   digitOne: "",
      //   digitTwo: "",
      //   digitThree: "",
      //   digitFour: "",
      //   digitFive: "",
      //   digitSix: "",
      // },
      otp: Array.from({ length: 6 }).fill(""),
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // console.log(formik.values);

  // const [otp, setOtp] = useState({
  //   digitOne: "",
  //   digitTwo: "",
  //   digitThree: "",
  //   digitFour: "",
  //   digitFive: "",
  //   digitSix: "",
  // });

  useEffect(() => {
    inputRef.current[0].focus();

    inputRef.current[0].addEventListener("paste", pasteOTP);

    return () => inputRef.current[0].removeEventListener("paste", pasteOTP);
  }, []);

  const pasteOTP = (event) => {
    const pasteValue = event.clipboardData.getData("text");

    const currentOTP = [...formik.values.otp];

    formik.values.otp.forEach((value, index) => {
      currentOTP[index] = pasteValue[index];
    });

    formik.setValues((prev) => ({
      ...prev,
      otp: currentOTP,
    }));

    // const tempObject = {};

    // Object.keys(otp).forEach((keys, index) => {
    //   tempObject[keys] = pasteValue[index];
    // });

    // formik.setValues(tempObject);

    // setOtp(tempObject);

    inputRef.current[5].focus();
  };

  const handleChnge = (event, index) => {
    // const { name, value } = event.target;
    const { value } = event.target;

    if (/[a-z]/gi.test(value)) return;

    const currentOTP = [...formik.values.otp];
    currentOTP[index] = value.slice(-1);

    // formik.setValues((prev) => ({
    //   ...prev,
    //   otp: {
    //     ...prev.otp,
    //     [name]: value,
    //   },
    // }));

    formik.setValues((prev) => ({
      ...prev,
      otp: currentOTP,
    }));

    // setOtp((prev) => ({
    //   ...prev,
    //   [name]: value.slice(-1),
    // }));

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
    return formik.values.otp.map((values, index) => (
      <input
        ref={(ele) => (inputRef.current[index] = ele)}
        key={index}
        name={index}
        value={values}
        type="text"
        className="w-16 h-12 rounded-md mr-3 text-center text-xl"
        onChange={(event) => handleChnge(event, index)}
        onKeyUp={(event) => handleBack(event, index)}
      />
    ));
  };

  return (
    <form action="">
      <h3 className="text-3xl mb-8">Please fill the OTP</h3>
      <Formik>
        <div>{inputRenderOtp()}</div>
      </Formik>

      <button
        type="button"
        className="mt-4 w-32 border border-solid bg-[#3b3b3b] rounded hover:bg-[#252525] hover:border-[#3b3b3b]"
        onClick={formik.handleSubmit}
      >
        Submit
      </button>
    </form>
  );
}

export default App;
