import { Menu } from '@layout/Menu';
import { UserButton } from '@layout/UserButton';
import { Heart, Menu as MenuIcon, SearchIcon, ShoppingCartIcon } from 'lucide-react';
import { type MouseEvent, useEffect, useRef, useState } from 'react';
import { Button } from 'react-aria-components';
import { Link, useLoaderData } from 'react-router';
import type { loader } from '~/root';

import { SearchInput } from '@ui/input/SearchInput';

import { useAuthModalStore } from '@stores/authModalStore';
import { useMenuStore } from '@stores/menuStore';

import { cn } from '@libs/cn';

export function Header() {
  const loaderData = useLoaderData<typeof loader>();
  const isAuth = loaderData.user?.isAuth;
  const favCount = loaderData.favourites?.data.length ?? 0;

  const setIsOpen = useMenuStore((state) => state.setIsOpen);
  const isOpen = useMenuStore((state) => state.isOpen);
  const [selectedMainCategory, setSelectedMainCategoryId] = useState<number | null>(null);
  const isAuthModalOpen = useAuthModalStore((state) => state.isOpen);
  const [isHeaderHiding, setIsHeaderHiding] = useState<boolean>(false);

  const menuReference = useRef<HTMLDivElement | null>(null);
  const navReference = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let lastScroll = 0;

    document.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > lastScroll) {
        setIsHeaderHiding(true);
      } else {
        setIsHeaderHiding(false);
      }

      lastScroll = currentScroll;
    });
  }, []);

  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
      if (document.body.offsetWidth > 768) {
        document.body.style.paddingRight = '15px';
      }
    } else {
      setTimeout(() => {
        document.body.style.overflow = '';
        if (document.body.offsetWidth > 768) {
          document.body.style.paddingRight = '0px';
        }
      }, 150);
    }
  }, [isAuthModalOpen]);

  function mouseOut(element: MouseEvent<HTMLDivElement>) {
    if (
      element.relatedTarget instanceof Node &&
      (menuReference.current?.contains(element.relatedTarget) ||
        menuReference.current === element.relatedTarget ||
        navReference.current === element.relatedTarget ||
        navReference.current?.contains(element.relatedTarget))
    ) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }

  return (
    <>
      <div
        className={cn({
          'bg-surface-container-low sticky top-0 left-0 z-50 w-full transition duration-400': true,
          '-translate-y-full': isHeaderHiding,
        })}
      >
        <div className="bg-surface-container-low container grid grid-cols-2 items-center gap-16 py-3 lg:grid-cols-3 lg:py-0">
          <Link
            to="/"
            className="w-fit bg-gradient-to-tr from-blue-500 to-green-500 bg-clip-text text-2xl font-black text-transparent"
          >
            Nike
          </Link>
          <div
            ref={navReference}
            onMouseOut={mouseOut}
            className="relative z-0 hidden h-[72px] w-fit items-center justify-center justify-self-center lg:flex"
          >
            {loaderData.hierarchy &&
              loaderData.hierarchy.data.hierarchies.map((mainCategory) => {
                return (
                  <Link
                    onMouseEnter={() => {
                      setIsOpen(true);
                      setSelectedMainCategoryId(mainCategory.id);
                    }}
                    key={mainCategory.id}
                    to={`/products?MainCategoryId=${mainCategory.id}`}
                    className="flex h-full items-center px-3 decoration-2 underline-offset-8 hover:underline"
                  >
                    {mainCategory.name}
                  </Link>
                );
              })}
          </div>
          <div className="flex items-center justify-end gap-3">
            <div className="bg-surface-bright grid place-content-center rounded-full p-3 lg:hidden">
              <SearchIcon className="stroke-on-surface-variant aspect-square w-6" />
            </div>
            <div className="hidden lg:block">
              <SearchInput />
            </div>
            {isAuth && (
              <Link
                to="/basket"
                className="bg-surface-bright grid place-content-center rounded-full p-3"
              >
                <ShoppingCartIcon className="stroke-on-surface-variant aspect-square w-6" />
              </Link>
            )}
            {isAuth && (
              <Link
                to="/favourites"
                className="bg-surface-bright relative grid place-content-center rounded-full p-3"
              >
                <Heart className="stroke-on-surface-variant aspect-square w-6" />
                {favCount !== 0 && (
                  <div className="bg-tertiary absolute -top-2 -right-2 rounded-full px-2.5 py-0.5 text-sm text-white">
                    {favCount}
                  </div>
                )}
              </Link>
            )}
            <UserButton />
            <Button
              onPress={() => setIsOpen((previous) => !previous)}
              className={cn({
                'bg-surface-bright block aspect-square rounded-full p-3 transition lg:hidden': true,
                '-rotate-90': isOpen,
              })}
            >
              <MenuIcon className="stroke-on-surface-variant aspect-square w-6" />
            </Button>
          </div>
        </div>
        <Menu
          ref={menuReference}
          selectedMainCategoryId={selectedMainCategory}
          mouseOut={mouseOut}
        />
      </div>
    </>
  );
}
