import { useState } from "react";

export default function FileUpload({ value, onChange }) {
  const [preview, setPreview] = useState(value?.preview || null);

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPG/PNG allowed");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Max 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      onChange({ file, preview: reader.result });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <input type="file" accept=".png,.jpg,.jpeg" onChange={handleFile} />
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-24 h-24 rounded mt-2 object-cover"
        />
      )}
    </div>
  );
}
