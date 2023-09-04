import { Field, ErrorMessage } from "formik";
import React from "react";

function AccountModalFormItem({ item, errors, touched }) {
  console.log("item:", item);
  return (
    <div className="form-row">
      <div className="form-group col">
        <label>{item.label}</label>
        <Field
          name={item.fieldName}
          type={item.type && item.type}
          as={item.as && item.as}
          className={
            "form-control" +
            (errors + "." + item.fieldName && touched + "." + item.fieldName
              ? " is-invalid"
              : "")
          }
        >
          {item.options &&
            item.options.map((option) => (
              <option value={option.value}>{option.name}</option>
            ))}
        </Field>
        <ErrorMessage
          name={item.fieldName}
          component="div"
          className="invalid-feedback"
        />
      </div>
    </div>
  );
}

export default AccountModalFormItem;