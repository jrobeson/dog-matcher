import logo from "/dog-matcher-logo.png";

export default function Header() {
  return (
    <div className="sticky shadow-sm">
      <header className="w-full bg-stone-100">
        <div className="container mx-2 mb-3 flex items-center gap-3">
          <img src={logo} alt="DogMatcher's Logo" className="rounded-full" />
          <span className="text-2xl text-rose-600">DogMatcher</span>
        </div>
      </header>
    </div>
  );
}
