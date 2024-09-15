// Set this component as a client component
"use client";
// Input Section Requirements
import { ChangeEvent, useState } from "react";
// Input Section Props
type Props = {
  label: string;
  type: string;
  name: string;
  example: string;
  help: string;
  autoComplete?: string;
  maxLenght?: number;
  validation?: string;
};
// Input Section Regular Expressions
const REGEX: Record<string, RegExp> = {
  // Only Positive Numbers
  // Example: 8000
  number: /^[1-9]\d*$/,
};
// Input Section Main Function
function Input({
  label,
  type,
  name,
  example,
  help,
  autoComplete,
  maxLenght,
  validation,
}: Props) {
  // Set a valid input state
  const [state, SetState] = useState<"Valid" | "Neutral" | "Invalid">(
    "Neutral"
  );
  // Input on Change Function
  const OnChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Event Value
    const VALUE = event.target.value;
    // If Value is Empty, set Neutral
    if (VALUE.length == 0) {
      SetState("Neutral");
    }
    // If is not empty, check if it is valid
    else {
      // If Value is Valid, set Valid
      if (REGEX[validation ? validation : name].test(VALUE)) {
        SetState("Valid");
        return;
      }
      // If Value is not Valid, set Invalid
      SetState("Invalid");
    }
  };
  // Returns Input Section Component
  return (
    <section>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={example}
        autoComplete={autoComplete || "on"}
        maxLength={maxLenght}
        onChange={OnChange}
        aria-invalid={state !== "Neutral" ? state === "Invalid" : undefined}
        required
      />
      {/* Help means advice to the user on what the input should be like */}
      <small>{help}</small>
    </section>
  );
}

export default Input;
