import { redirect, useLoaderData } from 'react-router';
import { userContext } from '~/context/user-context';
import { userCookie } from '~/cookies.server';

import { AddNewAddress } from '@components/page/addresses/AddNewAddress';
import { AddressCard } from '@components/page/addresses/AddressCard';

import { authAPI } from '@api/auth-api';
import { mainAPI } from '@api/config';

import type { Route } from '.react-router/types/app/routes/+types/addresses';

export async function loader({ request, context }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userCookie.parse(cookieHeader)) || {};

  const user = context.get(userContext);
  if (!user?.isAuth) {
    return redirect('/');
  }

  const resp = await mainAPI.get('/user/countries_and_regions', {
    headers: {
      token: cookie.privateToken,
    },
  });

  let addresses;
  try {
    addresses = await mainAPI.get('/user/addresses', {
      headers: {
        token: cookie.privateToken,
      },
    });
  } catch {
    addresses = {
      data: {
        data: [],
      },
    };
  }

  return { countriesAndRegions: resp.data.data, addresses: addresses.data.data };
}

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userCookie.parse(cookieHeader)) || {};

  const formData = await request.formData();
  const actionType = formData.get('actionType');
  if (actionType === 'add') {
    const firstName = formData.get('first-name');
    const lastName = formData.get('last-name');
    const streetAddress = formData.get('street-address');
    const streetAddressSecond = formData.get('street-address-second');
    const state = formData.get('state');
    const country = formData.get('country');
    const city = formData.get('city');
    const zipCode = formData.get('zip');
    const phoneNumber = formData.get('phone-number');

    const resp = await authAPI.post('/user/add-address', cookie, {
      body: JSON.stringify({
        firstName,
        lastName,
        streetAddress,
        streetAddressSecond,
        countryId: country,
        locationId: state,
        city,
        zipCode,
        phoneNumber,
      }),
    });

    if (resp.status === 200) {
      return { success: true };
    }
    return { success: false };
  } else if (actionType === 'delete') {
    const addressId = String(formData.get('addressId'));
    try {
      await authAPI.patch(`/user/delete-address?addressId=${addressId}`, cookie, {
        headers: {
          token: cookie.privateToken,
        },
      });
    } catch {
      return { success: false };
    }

    return { success: true };
  }
  return { success: false };
}

export default function AddressesPage() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="container mt-12">
      <div className="mb-12 text-center text-3xl font-semibold">Saved Delivery Addresses</div>
      <div className="grid grid-cols-1 gap-3">
        {loaderData.addresses.map((address) => {
          return (
            <AddressCard
              key={address.address_id}
              addressId={address.address_id}
              city={address.city}
              countryId={address.country_id}
              firstName={address.first_name}
              lastName={address.last_name}
              locationId={address.location_id}
              phoneNumber={address.phone_number}
              streetAddress={address.street_address}
              streetAddressSecond={address.street_address_second}
              zipCode={address.zip_code}
            />
          );
        })}
        <AddNewAddress />
      </div>
    </div>
  );
}
