export default function Dropdown({
  options = [],
  value = "",
  onChange,
  placeholder = "Select...",
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-3 py-2 w-full"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value || o} value={o.value ?? o}>
          {o.label ?? o}
        </option>
      ))}
    </select>
  );
}
