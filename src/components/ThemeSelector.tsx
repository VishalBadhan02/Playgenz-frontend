
import React from 'react';
import { useTheme } from './ThemeProvider';
import { Check, SunMedium, Moon, Palette } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const themes = [
  {
    name: 'Light',
    id: 'light',
    icon: SunMedium,
    bgColor: 'bg-white',
    textColor: 'text-neutral-950',
  },
  {
    name: 'Dark',
    id: 'dark',
    icon: Moon,
    bgColor: 'bg-neutral-950',
    textColor: 'text-white',
  },
  {
    name: 'Read',
    id: 'read',
    icon: Palette,
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-900',
    indicatorColor: 'bg-amber-600',
  },
  {
    name: 'Green',
    id: 'green',
    icon: Palette,
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-900',
    indicatorColor: 'bg-emerald-600',
  },
  {
    name: 'Purple',
    id: 'purple',
    icon: Palette,
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-900',
    indicatorColor: 'bg-purple-600',
  }
];

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {theme === 'light' && <SunMedium className="h-[1.2rem] w-[1.2rem]" />}
          {theme === 'dark' && <Moon className="h-[1.2rem] w-[1.2rem]" />}
          {theme !== 'light' && theme !== 'dark' && <Palette className="h-[1.2rem] w-[1.2rem]" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => {
          const Icon = t.icon;
          return (
            <DropdownMenuItem
              key={t.id}
              onClick={() => setTheme(t.id as any)}
              className={cn(
                'flex items-center gap-2 cursor-pointer',
                theme === t.id && 'bg-secondary'
              )}
            >
              <div className={cn(
                'flex h-6 w-6 items-center justify-center rounded-md',
                t.bgColor,
                t.textColor
              )}>
                <Icon className="h-4 w-4" />
              </div>
              <span className="flex-1">{t.name}</span>
              {theme === t.id && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
