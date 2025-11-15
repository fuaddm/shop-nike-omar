import { UserIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from 'react-aria-components';
import { Link, useFetcher } from 'react-router';
import { toast } from 'sonner';

import { useAuthModalStore } from '@stores/authModalStore';
import { useUserStore } from '@stores/userStore';

import { cn } from '@libs/cn';

export function UserButton() {
  const setIsAuthModalOpen = useAuthModalStore((state) => state.setIsOpen);
  const userData = useUserStore((state) => state.userData);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.success === true && fetcher.state === 'idle') toast.success('Logged out successfully.');
  }, [fetcher]);

  if (userData) {
    return (
      <div className="bg-surface-bright group relative grid place-content-center rounded-full p-3">
        <UserIcon className="stroke-on-surface-variant aspect-square w-6" />
        <div
          className={cn({
            'absolute top-full -right-3 p-3': true,
            'invisible -translate-y-1 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100': true,
          })}
        >
          <div className="bg-surface-container flex flex-col rounded-lg p-1 text-center">
            <div className="hover:bg-surface-bright text-primary cursor-default rounded-md px-4 py-1.5 transition">
              {userData.data.email}
            </div>
            <Link
              to="/payment"
              className="hover:bg-surface-bright rounded-md px-4 py-1.5 transition"
            >
              Payment Details
            </Link>
            <Link
              to="/orders"
              className="hover:bg-surface-bright rounded-md px-4 py-1.5 transition"
            >
              My Orders
            </Link>
            <Link
              to="/addresses"
              className="hover:bg-surface-bright rounded-md px-4 py-1.5 transition"
            >
              Addresses
            </Link>
            <Button
              onPress={() =>
                fetcher.submit(null, {
                  action: '/logout',
                  method: 'post',
                })
              }
              className="hover:bg-surface-bright w-full rounded-md px-4 py-1.5 text-red-500 transition"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Button
      onPress={() => setIsAuthModalOpen(true)}
      className="bg-surface-bright grid place-content-center rounded-full p-3"
    >
      <UserIcon className="stroke-on-surface-variant aspect-square w-6" />
    </Button>
  );
}
