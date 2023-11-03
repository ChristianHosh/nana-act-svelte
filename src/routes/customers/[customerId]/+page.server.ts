import { fail, redirect } from "@sveltejs/kit";
import { HttpClient } from "$lib/core/api/axiosInstance";
import type { CustomerProfile } from "$lib/core/models/customerProfile.model";
import { AxiosError } from "axios";
import type { Customer } from "$lib/core/models/customer.model";

// @ts-ignore
export async function load(event) {
  if (!event.locals.user)
    throw redirect(307, `/login?redirectTo=${event.url.pathname}`);

  let customerId = event.url.pathname.split("/")[2];

  try {
    let customerProfileResponse = await HttpClient.get<CustomerProfile>(
      `/customers/${customerId}`,
      event.locals.user
    );

    return {
      customerProfile: customerProfileResponse.data,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      throw fail(e.response?.status || 400);
    }
    throw fail(500);
  }
}

// @ts-ignore
export const actions = {
  // @ts-ignore
  update: async (event) => {

  },
  // @ts-ignore
  delete: async (event) => {
    const formData = Object.fromEntries(await event.request.formData());
    const customerId: number = formData.id;

    try {
      const customerResponse = await HttpClient.delete<Customer>(
        `/customers/${customerId}`,
        event.locals.user
      );
      console.log(customerResponse.data);
    } catch (e) {
      if (e instanceof AxiosError) return fail(e.response?.status || 500);
      return fail(500);
    }
    throw redirect(307, "/customers");
  },
};
