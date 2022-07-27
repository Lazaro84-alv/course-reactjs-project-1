import "./styles.css"

export const TextInput = ({ actionFn, inputValue }) => {
  return (
    <input
      className="text-input"
      onChange={actionFn}
      value={inputValue}
      type="text"
      placeholder="Type your search"
    />
  );
}