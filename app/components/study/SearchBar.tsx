import { Search, X } from "lucide-react";

export function SearchBar({ value, onChange, placeholder = "Search the archive" }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="search-bar">
      <Search size={17} aria-hidden="true" />
      <span className="sr-only">Search strains</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      {value && <button type="button" onClick={() => onChange("")} aria-label="Clear search"><X size={15} /></button>}
    </label>
  );
}

