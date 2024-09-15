// Set this component as a client component
"use client";
// Form Stylesheets
import "@/stylesheets/components/form.css";
// Form Requirements
import { FormEvent, useEffect, useRef, useState } from "react";
import Modal from "./modal";
import Input from "./input";
// Modal Settings Type
type ModalSettings = {
  open: boolean;
  status: "success" | "error" | "loading";
  message: string;
};
// Form Props
type Props = {
  api: string;
  method: "GET" | "POST" | "PUT";
  button: string;
  modal: {
    success: string;
    error: string;
    loading: string;
  };
  children: React.ReactNode;
};
// Form Main Function
function Form({ api, method, button, modal, children }: Props) {
  // Init and Default Modal Settings
  const INIT_MODAL_SETTINGS: ModalSettings = {
    open: false,
    status: "loading",
    message: modal.loading,
  };
  // Button Disabled State that always starts with true
  const [disabled, SetDisabled] = useState<boolean>(true);
  // Modal Init Settings
  const [modalSettings, SetModalSettings] =
    useState<ModalSettings>(INIT_MODAL_SETTINGS);
  // Form Reference
  const REFERENCE = useRef<HTMLFormElement | null>(null);
  // Form Submit Function
  const Submit = async (event: FormEvent<HTMLFormElement>) => {
    // Avoid refreshing the page
    event.preventDefault();
    // Create a Form Data with actual form
    const FORM = new FormData(event.currentTarget);
    // Get the data form every input in form
    const DATA = Object.fromEntries(FORM.entries());
    // Open Modal
    SetModalSettings({
      ...modalSettings,
      open: true,
    });
    // Make a request to project api to make something
    const RESPONSE = await fetch(`/api/${api}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DATA),
    });
    // Change the modal info to success info if response is ok, otherwise set error info
    SetModalSettings({
      open: true,
      status: RESPONSE.ok ? "success" : "error",
      message: RESPONSE.ok ? modal.success : modal.error,
    });
  };
  // Form Main Use Effect Hook
  useEffect(() => {
    // Update Disable Attribute in Submit Button
    const UpdateButton = () => {
      // If the Reference Exists, continue
      if (REFERENCE.current) {
        // First, get every Input and Textarea in the Form
        // Later, create a new key-value array with input name and aria-invalid attribute
        // Example: [ ["name", true], ["email", false] ]
        const inputsList = Array.from(
          REFERENCE.current.querySelectorAll<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          >("input, textarea, select")
        ).map((input) => [
          input.name,
          input.getAttribute("aria-invalid") === "false",
        ]);
        // Create a new object from a key-value array
        // Example: From [ ["name", true], ["email", false] ] to { name: true, email: false }
        const FORM_OBJECT = Object.fromEntries(inputsList);
        console.log(FORM_OBJECT)
        // Get values from FORM_OBJECT to check if every value is true
        // If it is true, set false, if not, set true
        SetDisabled(!Object.values(FORM_OBJECT).every(Boolean));
      }
    };
    // Update Button Function Call
    UpdateButton();
    // Create a new observer for "aria invalid" attributes to update the disabled attribute on the Submit button
    // Mutation Observer can observe changes in the DOM
    const ARIA_INVALID_OBSERVER = new MutationObserver(UpdateButton);
    // If the Reference Exists, continue
    if (REFERENCE.current) {
      // Aria Invalid Observer can observe attributes and subtrees, but focuses on the aria-invalid attribute
      ARIA_INVALID_OBSERVER.observe(REFERENCE.current, {
        attributes: true,
        subtree: true,
        attributeFilter: ["aria-invalid"],
      });
    }
    // When useEffect finishes, unmount the observer
    return () => {
      ARIA_INVALID_OBSERVER.disconnect();
    };
  }, []);
  // Return Form Component
  return (
    <>
      {/* Main Form */}
      <form
        className="form-container"
        ref={REFERENCE}
        onSubmit={method !== "GET" ? Submit : undefined}
        action={method === "GET" ? `/${api}` : undefined}
      >
        {/* Inputs and Textarea Components */}
        {children}
        {/* Sent Message Button */}
        <button type="submit" disabled={disabled}>
          {button}
        </button>
      </form>
      {/* If the modal settings has the value open to true, display modal, if not, hide it */}
      {modalSettings.open && (
        <Modal
          status={modalSettings.status}
          Close={() => SetModalSettings(INIT_MODAL_SETTINGS)}
        >
          {modalSettings.message}
        </Modal>
      )}
    </>
  );
}

export default Form;
