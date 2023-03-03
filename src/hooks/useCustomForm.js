import { useState } from "react";

const useCustomForm = (initialValues = {}, onSubmit) => {
  const [formData, setFormValues] = useState(initialValues);

  const handleInputChange = (event) => {
    event.persist();
    if (event.target.type === 'number') {
      setFormValues({ ...formData, [event.target.name]: parseInt(event.target.value)});
    } 
    //Added handler to the boolean
    else if (event.target.value === "true" || event.target.value === "false"){
      setFormValues({ ...formData, [event.target.name]: Boolean(event.target.value) });
    }
    else{
    setFormValues({ ...formData, [event.target.name]: event.target.value });
    }
  };
  console.log(formData);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const reset = () => {
    setFormValues(initialValues);
  };

  return [formData, handleInputChange, handleSubmit, reset];
};

export default useCustomForm;
