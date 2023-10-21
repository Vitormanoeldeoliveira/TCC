import React from "react";
import { TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import PropTypes from "prop-types";

const Textfield = ({ name, setError, cepFormat, numeric, ...otherProps }) => {

   const { setFieldValue } = useFormikContext();
   const [field, meta] = useField(name);

   const handleChange = (event) => {
      if(otherProps.error){
         setError({
            [otherProps.error]: false
         })
      }

      let data = event.target.value;

      if(cepFormat && data.length == 8) {
         data = data.replace(/\D/g, '');
         data = data.replace(/^(\d{5})(\d{0,3})/, '$1-$2');
      }

      if(numeric) {
         data = data.replace(/[^0-9.]/g, '');
      }

      return setFieldValue(name, data);
   };
    const configTextField = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: "standard",
        onChange: handleChange,
    };

   if (meta.error) {
      configTextField.error = true;
      configTextField.helperText = meta.error;
   }

   return <TextField size="small" autoComplete="off" {...configTextField} />;
};

Textfield.propTypes = {
   error: PropTypes.bool,
   setError: PropTypes.func,
}

export default Textfield;