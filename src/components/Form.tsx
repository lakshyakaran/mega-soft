import React from "react";
import {
  TextField,
  MaskedTextField,
  ITextFieldStyles,
} from "office-ui-fabric-react/lib/TextField";
import {
  Stack,
  IStackProps,
  IStackStyles,
} from "office-ui-fabric-react/lib/Stack";
import "./style.css";

function Form() {
  const stackTokens = { childrenGap: 50 };
  const stackStyles: Partial<IStackStyles> = {
    root: {
      width: 650,
    },
  };

  const textfelidStyle: Partial<ITextFieldStyles> = {
    root: {
      ".ms-TextField-wrapper": {},
    },
  };
  return (
    <div className="form-container">
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <TextField required label="ID" styles={textfelidStyle} />
        <TextField required label="Description" styles={textfelidStyle} />
      </Stack>
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <TextField label="Review From" styles={textfelidStyle} />
        <TextField label="Appraisal To" styles={textfelidStyle} />
      </Stack>
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <TextField label="Review From" styles={textfelidStyle} />
        <TextField label="Appraisal To" styles={textfelidStyle} />
      </Stack>
      <h3>form to add </h3>
    </div>
  );
}
export default Form;
