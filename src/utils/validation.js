import { useState, useCallback } from "react";

export function FormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());

    if (!isValidEmail) {
      
    }
  };

  // const resetForm = useCallback(
  //   (newValues = {}, newErrors = {}, newIsValid = false) => {
  //     setValues(newValues);
  //     setErrors(newErrors);
  //     setIsValid(newIsValid);
  //   },
  //   [setValues, setErrors, setIsValid]
  // );

  return { values, handleChange, errors, isValid, setValues, isValidEmail };
}