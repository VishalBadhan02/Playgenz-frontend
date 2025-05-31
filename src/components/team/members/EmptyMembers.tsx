
import React from 'react';
import { Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const EmptyMembers: React.FC = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="py-10 px-4 text-center border rounded-md">
        <Search className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
        <h3 className="text-base font-medium mb-1">No members found</h3>
        <p className="text-sm text-muted-foreground">Try adjusting your search</p>
      </div>
    );
  }

  return (
    <tr>
      <td colSpan={4} className="p-8 text-center text-muted-foreground">
        <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
        <h3 className="text-lg font-medium mb-1">No members found</h3>
        <p>Try adjusting your search</p>
      </td>
    </tr>
  );
};

export default EmptyMembers;
