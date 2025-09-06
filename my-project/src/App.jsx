import { useState } from "react";
import Stepper from "./components/Stepper";
import useFormData from "./hooks/useFormData";
import Step1PersonalInfo from "./forms/Step1PersonalInfo";
import Step2JobDetails from "./forms/Step2JobDetails";
import Step3SkillsPreferences from "./forms/Step3SkillsPreferences";
import Step4EmergencyContact from "./forms/Step4EmergencyContact";
import Step5ReviewSubmit from "./forms/Step5ReviewSubmit";

export default function App() {
  const { data, update, markSaved, isSaved } = useFormData({});
  const [step, setStep] = useState(1);

  function next() {
    setStep((s) => Math.min(5, s + 1));
  }
  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function onSubmitFinal() {
    console.log("Final payload:", data);
    markSaved();
    alert("Form submitted ✅ (check console)");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">Employee Onboarding</h1>
        <Stepper step={step} />

        {step === 1 && <Step1PersonalInfo data={data} update={update} next={next} />}
        {step === 2 && <Step2JobDetails data={data} update={update} next={next} back={back} />}
        {step === 3 && <Step3SkillsPreferences data={data} update={update} next={next} back={back} />}
        {step === 4 && <Step4EmergencyContact data={data} update={update} next={next} back={back} />}
        {step === 5 && <Step5ReviewSubmit data={data} back={back} onSubmitFinal={onSubmitFinal} onEdit={update} />}

        <p className="mt-4 text-sm text-gray-500">
          Saved in-state: {isSaved ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
}
