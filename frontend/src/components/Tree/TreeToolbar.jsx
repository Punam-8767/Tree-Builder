export default function TreeToolbar({
  onExport,
}) {
  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={onExport}
        className="bg-blue-600 hover:bg-blue-700 transition-all px-6 py-3 rounded-xl font-semibold shadow-lg"
      >
        Export Tree
      </button>
    </div>
  );
}