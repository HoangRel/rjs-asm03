import { useState } from "react";

const useInput = (validValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validValue(enteredValue);
  const hasError = !valueIsValid && isTouched;
};
