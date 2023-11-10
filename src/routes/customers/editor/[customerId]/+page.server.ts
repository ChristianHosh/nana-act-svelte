import {fail} from "@sveltejs/kit";
import {HttpClient} from "$lib/core/api/axiosInstance";
import {AxiosError} from "axios";
import type {Customer} from "$lib/core/models/customer.model";

// @ts-ignore
export async function load(event) {
  const customerId = event.url.pathname.split("/")[3];

  try {
    let customerResponse = await HttpClient.get<Customer>(
        `/customers/${customerId}`,
        event.locals.user
    );

    return {
      customer: customerResponse.data,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      throw fail(e.response?.status || 400);
    }
    throw fail(500);
  }
}

export const actions = {
  default: async (event: any) => {

  }
};
