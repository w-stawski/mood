export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 border-4 border-amber-600">
      <aside className="min-w-1/4 border-r-4 border-amber-600">Sidebar</aside>
      {children}
    </div>
  );
}
