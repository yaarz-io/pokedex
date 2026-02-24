import { useState, useEffect } from "react";

// API URL: https://pokeapi.co/api/v2/pokemon
// Each result from the API looks like: { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }

/**
 * Extracts the pokemon ID from its API URL.
 * Example: "https://pokeapi.co/api/v2/pokemon/25/" → 25
 */
function getPokemonIdFromUrl(url) {
  const segments = url.replace(/\/$/, "").split("/");
  return Number(segments[segments.length - 1]);
}

function PokemonCard({ name, url }) {
  const id = getPokemonIdFromUrl(url);

  return (
    <div className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-emerald-300 bg-emerald-50 p-4 transition-all hover:border-emerald-500 hover:bg-white hover:shadow-md">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
          className="h-20 w-20"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <span className="font-mono text-sm font-semibold capitalize text-emerald-900">
        {name}
      </span>
    </div>
  );
}

function SortButton({ active, direction, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center rounded-md border-2 px-2 font-mono text-sm transition-all ${
        active
          ? "border-emerald-600 bg-emerald-200 text-emerald-900"
          : "border-emerald-300 bg-emerald-50 text-emerald-400 hover:border-emerald-400 hover:text-emerald-600"
      }`}
    >
      {direction === "asc" ? "A→Z" : "Z→A"}
    </button>
  );
}

function CodeSnippet() {
  return (
    <pre className="mt-1 overflow-x-auto rounded border border-slate-700 bg-slate-800 p-2 text-[11px] leading-relaxed">
      <code>
        <span className="text-purple-400">function</span>{" "}
        <span className="text-blue-400">getPokemonIdFromUrl</span>
        <span className="text-slate-300">(</span>
        <span className="text-orange-300">url</span>
        <span className="text-slate-300">) {"{"}</span>
        {"\n"}
        {"  "}
        <span className="text-purple-400">const</span>{" "}
        <span className="text-slate-300">segments</span>{" "}
        <span className="text-purple-400">=</span>{" "}
        <span className="text-orange-300">url</span>
        <span className="text-slate-300">.</span>
        <span className="text-blue-400">replace</span>
        <span className="text-slate-300">(</span>
        <span className="text-emerald-400">/\\/$/</span>
        <span className="text-slate-300">, </span>
        <span className="text-emerald-300">""</span>
        <span className="text-slate-300">).</span>
        <span className="text-blue-400">split</span>
        <span className="text-slate-300">(</span>
        <span className="text-emerald-300">"/"</span>
        <span className="text-slate-300">);</span>
        {"\n"}
        {"  "}
        <span className="text-purple-400">return</span>{" "}
        <span className="text-blue-400">Number</span>
        <span className="text-slate-300">(</span>
        <span className="text-slate-300">segments[segments.</span>
        <span className="text-orange-300">length</span>{" "}
        <span className="text-purple-400">-</span>{" "}
        <span className="text-orange-300">1</span>
        <span className="text-slate-300">]);</span>
        {"\n"}
        <span className="text-slate-300">{"}"}</span>
      </code>
    </pre>
  );
}

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(null); // null | "asc" | "desc"

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => setPokemons(data.results));
  }, []);

  const filteredPokemons = pokemons
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "asc") return a.name.localeCompare(b.name);
      if (sort === "desc") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-800 p-4">
      <div className="flex w-full max-w-7xl flex-col items-start gap-6 lg:flex-row">
        {/* Pokedex device */}
        <div className="w-full lg:flex-1">
          {/* Top half of the Pokedex */}
          <div className="rounded-t-3xl border-4 border-b-2 border-pokedex-darker bg-pokedex p-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]">
            {/* Top bar: lens + indicator LEDs */}
            <div className="mb-4 flex items-center gap-3">
              {/* Big blue lens */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/30 bg-lens shadow-[inset_0_-4px_8px_rgba(0,0,0,0.3),0_0_12px_rgba(56,189,248,0.5)]">
                <div className="h-6 w-6 rounded-full bg-lens-inner opacity-80 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)]" />
              </div>
              {/* Small indicator lights */}
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.6)]" />
                <div className="h-3 w-3 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.6)]" />
                <div className="h-3 w-3 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
              </div>
            </div>

            {/* Screen area */}
            <div className="rounded-xl border-4 border-pokedex-darker bg-screen-border p-2 shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]">
              <div className="rounded-lg bg-screen p-6">
                {/* Screen header */}
                <div className="mb-4 flex items-center justify-between border-b border-emerald-300/50 pb-3">
                  <h1 className="font-mono text-2xl font-bold tracking-wider text-emerald-900">
                    POKEDEX
                  </h1>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    <span className="font-mono text-xs text-emerald-700">
                      {pokemons.length === 0 ? "LOADING" : "CONNECTED"}
                    </span>
                  </div>
                </div>

                {/* Search input + sort buttons */}
                <div className="mb-4 flex items-stretch gap-2">
                  <input
                    type="text"
                    placeholder="Search Pokemon..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 rounded-md border-2 border-emerald-300 bg-emerald-50 px-3 py-2 font-mono text-sm text-emerald-900 placeholder:text-emerald-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white"
                  />
                  <SortButton
                    active={sort === "asc"}
                    direction="asc"
                    onClick={() => setSort(sort === "asc" ? null : "asc")}
                  />
                  <SortButton
                    active={sort === "desc"}
                    direction="desc"
                    onClick={() => setSort(sort === "desc" ? null : "desc")}
                  />
                </div>

                {/* Pokemon grid */}
                <div className="grid max-h-[300px] grid-cols-2 gap-3 overflow-auto sm:grid-cols-3 md:grid-cols-4">
                  {filteredPokemons.map((pokemon) => (
                    <PokemonCard
                      key={pokemon.name}
                      name={pokemon.name}
                      url={pokemon.url}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom half / hinge area */}
          <div className="rounded-b-3xl border-4 border-t-2 border-pokedex-darker bg-pokedex-dark px-6 py-4 shadow-lg">
            {/* Decorative buttons row */}
            <div className="flex items-center justify-between">
              {/* D-pad */}
              <div className="relative h-16 w-16">
                <div className="absolute top-0 left-1/2 h-5 w-5 -translate-x-1/2 rounded-t-sm bg-slate-700" />
                <div className="absolute bottom-0 left-1/2 h-5 w-5 -translate-x-1/2 rounded-b-sm bg-slate-700" />
                <div className="absolute top-1/2 left-0 h-5 w-5 -translate-y-1/2 rounded-l-sm bg-slate-700" />
                <div className="absolute top-1/2 right-0 h-5 w-5 -translate-y-1/2 rounded-r-sm bg-slate-700" />
                <div className="absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 bg-slate-700" />
              </div>
              {/* Decorative lines */}
              <div className="flex flex-col gap-1.5">
                <div className="h-1 w-20 rounded bg-pokedex-darker" />
                <div className="h-1 w-20 rounded bg-pokedex-darker" />
                <div className="h-1 w-20 rounded bg-pokedex-darker" />
              </div>
            </div>
          </div>
        </div>

        {/* Instructions box — side by side on large screens */}
        <div className="w-full rounded-xl border border-slate-600 bg-slate-900 p-5 text-left shadow-lg lg:w-[420px] lg:shrink-0 lg:self-stretch">
          <h2 className="mb-3 font-mono text-sm font-bold uppercase tracking-wider text-slate-300">
            Instructions
          </h2>
          <ul className="space-y-3 font-mono text-xs leading-relaxed text-slate-400">
            <li>
              <span className="text-emerald-400">&#10003;</span>{" "}
              <span className="text-slate-300">Initiate the React app</span>
              <div className="mt-1 break-all rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-[11px] text-slate-300">
                <span className="select-all">
                  npm create vite@latest -- pokedex -t react -i --no-rolldown
                  --no-interactive
                </span>
              </div>
            </li>
            <li>
              <span className="text-emerald-400">&#10003;</span>{" "}
              <span className="text-slate-300">
                Fetch pokemon list from the API
              </span>
              <div className="mt-1">
                <a
                  href="https://pokeapi.co/api/v2/pokemon?limit=151"
                  target="_blank"
                  className="rounded border border-slate-600 bg-slate-800 px-1 text-blue-400 hover:text-blue-300"
                >
                  ↗ pokeapi.co/api/v2/pokemon?limit=151
                </a>
              </div>
            </li>
            <li>
              <span className="text-emerald-400">&#10003;</span>{" "}
              <span className="text-slate-300">
                Display pokemons as cards in a grid
              </span>
            </li>
            <li>
              <span className="text-emerald-400">&#10003;</span>{" "}
              <span className="text-slate-300">Filter pokemons by name</span>
            </li>
            <li>
              <span className="text-emerald-400">&#10003;</span>{" "}
              <span className="text-yellow-400 font-bold">(BONUS)</span>{" "}
              <span className="text-slate-300">
                Show pokemon image in the card
              </span>
              <div className="mt-1 break-all rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-[10px] text-slate-400">
                https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/
                <strong className="text-slate-200">[id]</strong>.png
              </div>
              <details className="mt-1 group">
                <summary className="cursor-pointer text-slate-500 select-none hover:text-slate-300 transition-colors">
                  Show helper function to extract the pokemon ID
                </summary>
                <CodeSnippet />
              </details>
            </li>
            <li>
              <span className="text-emerald-400">&#10003;</span>{" "}
              <span className="text-yellow-400 font-bold">(BONUS)</span>{" "}
              <span className="text-slate-300">
                Sort pokemons ascending / descending
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
