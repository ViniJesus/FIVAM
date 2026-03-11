interface InputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  type: string;
}

const Input = ({ value, setValue, label, type }: InputProps) => {
  return (
    <label>
      {/* {label} */}
      <input
        className="bg-accent/10 text-text-secundary w-full rounded-md px-4 py-2.5"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        placeholder={label}
      />
    </label>
  );
};

export default Input;
