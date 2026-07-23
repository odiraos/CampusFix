export default function Header({ title }) {
  return (
    <header className="bg-white shadow px-8 py-4">
      <h2 className="text-2xl font-semibold">
        {title}
      </h2>
    </header>
  );
}