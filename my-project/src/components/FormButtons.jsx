export function FormButtons({
  onBack,
  onNext,
  backLabel = "Back",
  nextLabel = "Next",
  isSubmitting = false,
  showBack = true,
}) {
  return (
    <div className="flex justify-between mt-6">
      <div>
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {backLabel}
          </button>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Submitting..." : nextLabel}
        </button>
      </div>
    </div>
  );
}
