
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="p-4 border-b">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search messages..."
          className="w-full pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBox;
