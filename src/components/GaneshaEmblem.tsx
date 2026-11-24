export function GaneshaEmblem({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`ganesha-emblem${small ? " ganesha-emblem--small" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="44" />
        <circle cx="50" cy="50" r="38" />
        <path d="M50 18v7m0 50v7M18 50h7m50 0h7M27 27l5 5m36 36 5 5m0-46-5 5M32 68l-5 5" />
        <path d="M39 37c0-7 5-12 11-12s11 5 11 12v10c0 7-5 12-11 12s-11-5-11-12V37Z" />
        <path d="M39 40c-5-7-13-5-15 1-2 7 4 14 15 13m22-14c5-7 13-5 15 1 2 7-4 14-15 13" />
        <path d="M50 59v9c0 8-7 12-13 8m13-8c0-5 5-8 9-5 4 4 1 9-3 10" />
        <path d="M44 37h.1m11-.1h.1M44 31c2-2 4-3 6-3s4 1 6 3M43 69h14" />
        <path d="M25 51c3 2 7 3 12 3m38-3c-3 2-7 3-12 3" />
      </svg>
    </span>
  );
}
