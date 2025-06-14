
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface MemberSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const MemberSearch: React.FC<MemberSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search members..."
        className="pl-9 pr-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default MemberSearch;
