type Props = {
  label: string;
  name: string;
  optionsList: { name: string; value: string }[];
  help: string;
};

function Select({ label, name, optionsList, help }: Props) {
  return (
    <section>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} aria-invalid={false} required>
        {optionsList.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      {/* Help means advice to the user on what the input should be like */}
      <small>{help}</small>
    </section>
  );
}

export default Select;
