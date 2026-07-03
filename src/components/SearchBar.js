import React, { useMemo } from 'react';

const SearchBar = ({ value, onChange, suggestions = [], onSelectSuggestion, placeholder = 'Search articles, tags, authors…' }) => {
  const hasSuggestions = useMemo(() => suggestions && suggestions.length > 0, [suggestions]);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
      {hasSuggestions && (
        <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow">
          {suggestions.map((s, idx) => (
            <li
              key={`${s._id || s.id || s.title}-${idx}`}
              className="cursor-pointer px-4 py-2 hover:bg-gray-50"
              onClick={() => onSelectSuggestion && onSelectSuggestion(s)}
            >
              <div className="text-sm font-medium text-gray-900">{s.title}</div>
              {s.user?.username || s.author?.name ? (
                <div className="text-xs text-gray-500">By {s.author?.name || s.user?.username}</div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
