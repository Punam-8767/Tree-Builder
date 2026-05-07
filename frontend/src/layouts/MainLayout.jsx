export default function MainLayout({
  children,
}) {
  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}