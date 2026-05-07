export default function ExportModal({
  open,
  onClose,
  jsonData,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-slate-900 p-6 rounded-2xl w-[800px] border border-slate-700">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">
            Export JSON
          </h2>

          <button
            onClick={onClose}
            className="bg-red-500 px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>

        <pre className="bg-slate-950 p-5 rounded-xl overflow-auto max-h-[500px] text-green-400 text-sm">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      </div>
    </div>
  );
}