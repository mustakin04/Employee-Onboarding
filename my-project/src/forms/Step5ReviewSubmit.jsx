export default function Step5ReviewSubmit({ data, back, onSubmitFinal, onEdit }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!data.confirmation) {
      alert("You must confirm all information");
      return;
    }
    onSubmitFinal();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Review Information</h3>
      <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">{JSON.stringify(data, null, 2)}</pre>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={data.confirmation || false}
          onChange={(e) => onEdit({ confirmation: e.target.checked })}
        />
        <label>I confirm all information is correct</label>
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={back} className="px-4 py-2 bg-gray-200 rounded">Back</button>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Submit</button>
      </div>
    </form>
  );
}
