import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema } from "../utils/validationSchemas";
import { mockManagers } from "../data/managers";
import { isWeekendForCountry } from "../utils/helpers";

export default function Step2JobDetails({ data, update, next, back }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      department: data.department || "",
      position: data.position || "",
      startDate: data.startDate || "",
      jobType: data.jobType || "Full-time",
      salary: data.salary || "",
      manager: data.manager || "",
    },
  });

  const department = watch("department");
  const jobType = watch("jobType");

  useEffect(() => {
    const sub = watch((val) => update(val));
    return () => sub.unsubscribe();
  }, [watch]);

  const managersFiltered = useMemo(() => {
    if (!department) return mockManagers;
    return mockManagers.filter((m) => m.department === department);
  }, [department]);

  function onSubmit(values) {
    if (values.jobType === "Contract") {
      const s = Number(values.salary);
      if (isNaN(s) || s < 50 || s > 150) {
        alert("Contract hourly rate must be $50 - $150");
        return;
      }
    } else if (values.jobType === "Full-time") {
      const s = Number(values.salary);
      if (isNaN(s) || s < 30000 || s > 200000) {
        alert("Full-time annual salary must be $30,000 - $200,000");
        return;
      }
    }
    if (department === "HR" || department === "Finance") {
      const d = new Date(values.startDate);
      if (isWeekendForCountry(d)) {
        alert("HR/Finance start date cannot be Friday or Saturday");
        return;
      }
    }
    update(values);
    next();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Department</label>
        <select {...register("department")} className="border rounded px-3 py-2 w-full">
          <option value="">Select department</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
        {errors.department && <p className="text-red-600">{errors.department.message}</p>}
      </div>

      <div>
        <label>Position Title</label>
        <input {...register("position")} className="border rounded px-3 py-2 w-full" />
      </div>

      <div>
        <label>Start Date</label>
        <input type="date" {...register("startDate")} className="border rounded px-3 py-2" />
      </div>

      <div>
        <label>Job Type</label>
        <div className="flex space-x-4 mt-2">
          <label><input type="radio" value="Full-time" {...register("jobType")} /> Full-time</label>
          <label><input type="radio" value="Part-time" {...register("jobType")} /> Part-time</label>
          <label><input type="radio" value="Contract" {...register("jobType")} /> Contract</label>
        </div>
      </div>

      <div>
        <label>{jobType === "Contract" ? "Hourly Rate ($)" : "Salary"}</label>
        <input type="number" {...register("salary")} className="border rounded px-3 py-2 w-full" />
      </div>

      <div>
        <label>Manager</label>
        <select {...register("manager")} className="border rounded px-3 py-2 w-full">
          <option value="">Select manager</option>
          {managersFiltered.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name} — {m.department}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={back} className="px-4 py-2 bg-gray-200 rounded">Back</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
      </div>
    </form>
  );
}
