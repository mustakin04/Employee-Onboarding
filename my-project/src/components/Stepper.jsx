export default function Stepper({ step }) {
  const steps = ["Personal", "Job", "Skills", "Emergency", "Review"];
  return (
    <div className="flex items-center space-x-4 mb-6">
      {steps.map((s, i) => {
        const idx = i + 1;
        const active = idx === step;
        const done = idx < step;
        return (
          <div key={s} className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                done
                  ? "bg-green-500 text-white"
                  : active
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {idx}
            </div>
            <div
              className={`hidden md:block ${
                active
                  ? "text-blue-600"
                  : done
                  ? "text-gray-700"
                  : "text-gray-500"
              }`}
            >
              {s}
            </div>
            {i < steps.length - 1 && (
              <div className="w-8 h-px bg-gray-300"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
