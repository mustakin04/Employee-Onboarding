import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step4Schema } from "../utils/validationSchemas";
import { calculateAge } from "../utils/helpers";

export default function Step4EmergencyContact({ data, update, next, back }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      emergencyName: data.emergencyName || "",
      emergencyRelationship: data.emergencyRelationship || "",
      emergencyPhone: data.emergencyPhone || "",
      guardianName: data.guardianName || "",
      guardianPhone: data.guardianPhone || "",
    },
  });

  useEffect(() => {
    const sub = watch((val) => update(val));
    return () => sub.unsubscribe();
  }, [watch]);

  const age = calculateAge(data.dob);

  function onSubmit(values) {
    if (age < 21) {
      if (!values.guardianName || !values.guardianPhone) {
        alert("Guardian required if under 21");
        return;
      }
    }
    update(values);
    next();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Contact Name</label>
        <input {...register("emergencyName")} className="border rounded px-3 py-2 w-full" />
        {errors.emergencyName && <p className="text-red-600">{errors.emergencyName.message}</p>}
      </div>

      <div>
        <label>Relationship</label>
        <input {...register("emergencyRelationship")} className="border rounded px-3 py-2 w-full" />
      </div>

      <div>
        <label>Phone</label>
        <input {...register("emergencyPhone")} placeholder="+1-123-456-7890" className="border rounded px-3 py-2 w-full" />
      </div>

      {age < 21 && (
        <>
          <div>
            <label>Guardian Name</label>
            <input {...register("guardianName")} className="border rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label>Guardian Phone</label>
            <input {...register("guardianPhone")} placeholder="+1-123-456-7890" className="border rounded px-3 py-2 w-full" />
          </div>
        </>
      )}

      <div className="flex justify-between">
        <button type="button" onClick={back} className="px-4 py-2 bg-gray-200 rounded">Back</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
      </div>
    </form>
  );
}
