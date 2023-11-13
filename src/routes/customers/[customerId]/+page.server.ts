import {type Actions, error, fail, redirect, type RequestEvent} from "@sveltejs/kit";
import { HttpClient } from "$lib/core/api/axiosInstance";
import type { CustomerProfile } from "$lib/core/models/customerProfile.model";
import { AxiosError } from "axios";
import type { Customer } from "$lib/core/models/customer.model";
import type {PageServerLoadEvent} from "../../../../.svelte-kit/types/src/routes/customers/[customerId]/$types";

// @ts-ignore
export async function load(event: PageServerLoadEvent) {
  const customerId = event.url.pathname.split("/")[2];

  try {
    let customerProfileResponse = await HttpClient.get<CustomerProfile>(
      `/customers/${customerId}/profile`,
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
export const actions: Actions = {
  delete: async (event: RequestEvent) => {
    if (!event.locals.user) throw error(401);

    const customerId = event.url.pathname.split("/")[2];

    try {
      await HttpClient.delete<Customer>(
          `/customers/${customerId}`,
          event.locals.user
      );
    } catch (e) {
      if (e instanceof AxiosError) return fail(e.response?.status || 500);
      return fail(500);
    }
    throw redirect(307, "/customers");
  },
};
