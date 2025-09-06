import { useState, useEffect, useRef } from "react";

export default function useFormData(initial = {}) {
  const [data, setData] = useState(initial);
  const [isSaved, setIsSaved] = useState(true);
  const unsavedRef = useRef(false);

  useEffect(() => {
    unsavedRef.current = !isSaved;
  }, [isSaved]);

  useEffect(() => {
    function handleBeforeUnload(e) {
      if (!isSaved) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isSaved]);

  function update(partial) {
    setData((prev) => ({ ...prev, ...partial }));
    setIsSaved(false);
  }

  function markSaved() {
    setIsSaved(true);
  }

  return { data, update, markSaved, isSaved };
}
