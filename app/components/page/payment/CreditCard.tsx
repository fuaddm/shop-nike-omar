import { EllipsisVertical } from 'lucide-react';
import { Button } from 'react-aria-components';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';

import { MasterCard } from '@icons/payment/MasterCard';
import { Visa } from '@icons/payment/Visa';

export function CreditCard({
  cardType,
  fullName,
  cardNumber,
  deleteCreditCard,
}: {
  cardType: 'Visa' | 'Mastercard' | 'Unknown';
  fullName: string;
  cardNumber: string;
  deleteCreditCard: () => void;
}) {
  return (
    <div className="aspect-[1.586/1] rounded-xl bg-gray-200 transition hover:bg-gray-100">
      <div className="flex h-full flex-col justify-between">
        <div className="me-4 mt-2 flex justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="ms-4 mt-2 aspect-square h-fit rounded-full py-1 transition hover:bg-gray-300 focus:outline-none">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 border-none"
              align="start"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Button
                    onPress={() => deleteCreditCard()}
                    className="w-full"
                  >
                    Delete
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {cardType === 'Visa' && <Visa className="h-14 w-auto" />}
          {cardType === 'Mastercard' && <MasterCard className="h-14 w-auto" />}
        </div>
        <div className="grid gap-1 ps-5 pb-4">
          <div className="font-mono leading-tight">{fullName}</div>
          <div className="font-mono leading-tight">{cardNumber}</div>
        </div>
      </div>
    </div>
  );
}
