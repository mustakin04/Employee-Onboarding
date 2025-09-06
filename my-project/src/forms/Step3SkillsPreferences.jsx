import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema } from "../utils/validationSchemas";
import { skillsByDepartment } from "../data/skills";

export default function Step3SkillsPreferences({ data, update, next, back }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      skills: data.skills || [],
      skillExperience: data.skillExperience || {},
      workingHoursStart: data.workingHoursStart || "",
      workingHoursEnd: data.workingHoursEnd || "",
      remotePercent: data.remotePercent || 0,
      managerApproved: data.managerApproved || false,
      notes: data.notes || "",
    },
  });

  useEffect(() => {
    const sub = watch((val) => update(val));
    return () => sub.unsubscribe();
  }, [watch]);

  const department = data.department || "Engineering";
  const skills = useMemo(
    () => skillsByDepartment[department] || [],
    [department]
  );

  function onSubmit(values) {
    if (values.skills.length < 3) {
      alert("Pick at least 3 skills");
      return;
    }
    if (values.remotePercent > 50 && !values.managerApproved) {
      alert("Manager approval required when remote > 50%");
      return;
    }
    update(values);
    next();
  }

  const remote = watch("remotePercent");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Primary Skills (min 3)</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {skills.map((s) => (
            <label
              key={s}
              className="border rounded px-2 py-1 flex items-center space-x-2"
            >
              <input type="checkbox" value={s} {...register("skills")} />
              <span>{s}</span>
            </label>
          ))}
        </div>
        {errors.skills && (
          <p className="text-red-600 text-sm">{errors.skills.message}</p>
        )}
      </div>

      <div>
        <label>Experience (years) per skill</label>
        <div className="grid gap-2 mt-2">
          {(watch("skills") || []).map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <span className="w-40">{skill}</span>
              <input
                type="number"
                min="0"
                placeholder="Years"
                defaultValue={
                  (data.skillExperience && data.skillExperience[skill]) || 0
                }
                onChange={(e) => {
                  const val = Number(e.target.value || 0);
                  const cur = watch("skillExperience") || {};
                  setValue("skillExperience", { ...cur, [skill]: val });
                }}
                className="border rounded px-2 py-1 w-20"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label>Preferred Working Hours</label>
        <div className="flex space-x-2 mt-2">
          <input type="time" {...register("workingHoursStart")} className="border rounded px-2 py-1" />
          <input type="time" {...register("workingHoursEnd")} className="border rounded px-2 py-1" />
        </div>
      </div>

      <div>
        <label>Remote Work Preference: {remote}%</label>
        <input type="range" min="0" max="100" {...register("remotePercent")} />
      </div>

      {remote > 50 && (
        <div className="flex items-center space-x-2">
          <input type="checkbox" {...register("managerApproved")} id="managerApprove" />
          <label htmlFor="managerApprove">Manager Approved</label>
        </div>
      )}

      <div>
        <label>Extra Notes (max 500 chars)</label>
        <textarea {...register("notes")} maxLength={500} className="border rounded w-full px-3 py-2" />
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={back} className="px-4 py-2 bg-gray-200 rounded">Back</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
      </div>
    </form>
  );
}
