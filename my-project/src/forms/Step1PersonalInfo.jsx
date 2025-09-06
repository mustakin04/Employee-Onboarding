import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema } from "../utils/validationSchemas";
import FileUpload from "../components/FileUpload";
import { calculateAge } from "../utils/helpers";

export default function Step1PersonalInfo({ data, update, next }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: data.fullName || "",
      email: data.email || "",
      phone: data.phone || "",
      dob: data.dob || "",
      profilePicture: data.profilePicture || null,
    },
  });

  useEffect(() => {
    const sub = watch((val) => update(val));
    return () => sub.unsubscribe();
  }, [watch]);

  function onSubmit(values) {
    update(values);
    next();
  }

  function onFileChange(obj) {
    setValue("profilePicture", obj);
    update({ profilePicture: obj });
  }

  const age = calculateAge(watch("dob"));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block">Full Name</label>
        <input {...register("fullName")} className="border rounded px-3 py-2 w-full" />
        {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="block">Email</label>
        <input {...register("email")} className="border rounded px-3 py-2 w-full" />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block">Phone</label>
        <input placeholder="+1-123-456-7890" {...register("phone")} className="border rounded px-3 py-2 w-full" />
        {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block">Date of Birth</label>
        <input type="date" {...register("dob")} className="border rounded px-3 py-2" />
        {errors.dob && <p className="text-red-600 text-sm">{errors.dob.message}</p>}
        {age !== null && <p className="text-sm text-gray-600">Age: {age}</p>}
      </div>

      <div>
        <label className="block">Profile Picture (optional)</label>
        <FileUpload value={watch("profilePicture")} onChange={onFileChange} />
      </div>

      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
      </div>
    </form>
  );
}
