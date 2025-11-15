import { EllipsisVertical } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from 'react-aria-components';
import { useFetcher } from 'react-router';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';

interface IAddressCardProperties {
  addressId: string;
  city: string;
  countryId: string;
  firstName: string;
  lastName: string;
  locationId: string;
  phoneNumber: string;
  streetAddress: string;
  streetAddressSecond: string;
  zipCode: string;
}

export function AddressCard(properties: IAddressCardProperties) {
  const {
    addressId,
    firstName,
    lastName,
    city,
    countryId,
    locationId,
    phoneNumber,
    streetAddress,
    streetAddressSecond,
    zipCode,
  } = properties;

  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.success === false && fetcher.state === 'idle') {
      toast.error('Something went wrong');
    }
  }, []);

  function deleteAddress() {
    const formData = new FormData();
    formData.append('addressId', addressId);
    formData.append('actionType', 'delete');
    fetcher.submit(formData, {
      method: 'POST',
    });
  }

  return (
    <div className="bg-surface-container flex justify-between rounded-xl px-6 py-4">
      <div className="flex flex-col">
        <div className="font-medium">
          {firstName} {lastName}
        </div>
        <div className="text-on-surface-variant">{streetAddress}</div>
        {streetAddressSecond && <div className="text-on-surface-variant">{streetAddressSecond}</div>}
        <div className="text-on-surface-variant">{city}</div>
        <div className="text-on-surface-variant">{phoneNumber}</div>
        <div className="text-on-surface-variant">{zipCode}</div>
        <div className="text-on-surface-variant">{countryId}</div>
        <div className="text-on-surface-variant">{locationId}</div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="aspect-square h-fit rounded-full py-1 transition hover:bg-gray-300 focus:outline-none">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 border-none"
          align="end"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Button
                className="w-full"
                isDisabled={fetcher.state !== 'idle'}
                onPress={() => deleteAddress()}
              >
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
