import { useMenuStore } from '@stores/menuStore';

import { useLockBodyScroll } from '@hooks/useLockScroll';

import { cn } from '@libs/cn';

import type { IMenuProperties } from '@models/components/layout/menu';

export function Menu({ ref, mouseOut, ...properties }: IMenuProperties) {
  const isOpen = useMenuStore((state) => state.isOpen);
  const setIsOpen = useMenuStore((state) => state.setIsOpen);

  useLockBodyScroll(isOpen);

  return (
    <div
      ref={ref}
      className={cn({
        'invisible absolute top-full left-0 z-10 h-[calc(100vh-100%)] w-full overflow-hidden': true,
        visible: isOpen,
      })}
      {...properties}
    >
      <div
        onMouseEnter={() => setIsOpen(false)}
        className={cn({
          'invisible absolute top-0 left-0 z-10 h-full w-full bg-black/20 opacity-0 transition dark:bg-white/20': true,
          'visible opacity-100': isOpen,
        })}
      ></div>
      <MenuMain mouseOut={mouseOut} />
    </div>
  );
}

function MenuMain({ mouseOut }: Pick<IMenuProperties, 'mouseOut'>) {
  const isOpen = useMenuStore((state) => state.isOpen);

  return (
    <div
      onMouseOut={mouseOut}
      className={cn({
        'bg-surface relative z-20 flex w-full -translate-y-1/2 py-12 opacity-0 transition': true,
        'translate-y-0 opacity-100': isOpen,
      })}
    >
      <div className="container flex flex-wrap justify-center gap-20">
        <div className="flex flex-col gap-1">
          <div className="mb-1 font-bold">New & Featured</div>
          <div className="text-on-surface-variant text-sm">Shop Sale: New Styles Added</div>
          <div className="text-on-surface-variant text-sm">Best Sellers</div>
          <div className="text-on-surface-variant text-sm">Latest Drops</div>
          <div className="text-on-surface-variant text-sm">Nike x LEGO® Collection</div>
          <div className="text-on-surface-variant text-sm">New Arrivals</div>
          <div className="text-on-surface-variant text-sm">SNKRS Launch Calendar</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="mb-1 font-bold">Shop New</div>
          <div className="text-on-surface-variant text-sm">New Arrivals</div>
          <div className="text-on-surface-variant text-sm">Nike x LEGO® Collection</div>
          <div className="text-on-surface-variant text-sm">Latest Drops</div>
          <div className="text-on-surface-variant text-sm">Shop Sale: New Styles Added</div>
          <div className="text-on-surface-variant text-sm">SNKRS Launch Calendar</div>
          <div className="text-on-surface-variant text-sm">Best Sellers</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="mb-1 font-bold">Trending</div>
          <div className="text-on-surface-variant text-sm">SNKRS Launch Calendar</div>
          <div className="text-on-surface-variant text-sm">New Arrivals</div>
          <div className="text-on-surface-variant text-sm">Nike x LEGO® Collection</div>
          <div className="text-on-surface-variant text-sm">Best Sellers</div>
          <div className="text-on-surface-variant text-sm">Latest Drops</div>
          <div className="text-on-surface-variant text-sm">Shop Sale: New Styles Added</div>
        </div>
      </div>
    </div>
  );
}
