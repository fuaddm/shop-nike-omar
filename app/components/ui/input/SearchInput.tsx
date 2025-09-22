import { Search } from 'lucide-react';
import { Button, Input, type InputProps } from 'react-aria-components';

import { cn } from '@libs/cn';

export function SearchInput(properties: InputProps) {
  const { className, ...rest } = properties;

  return (
    <label
      className="relative z-0 block w-full"
      htmlFor="header-search"
    >
      <Input
        {...rest}
        id="header-search"
        placeholder="Axtar..."
        className={cn('bg-surface w-full rounded-xl px-4 py-3 text-sm focus:outline-none', className)}
      />
      <Button>
        <Search className="bg-surface-container stroke-on-surface absolute top-1/2 right-1 box-content h-[calc(100%-8px)] w-4 -translate-y-1/2 rounded-xl px-4" />
      </Button>
    </label>
  );
}
