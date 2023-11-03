import {fail, redirect} from "@sveltejs/kit";
import {HttpClient} from "$lib/core/api/axiosInstance";
import {AxiosError} from "axios";
import type {Customer} from "$lib/core/models/customer.model";

// @ts-ignore
export async function load(event) {
  if (!event.locals.user)
    throw redirect(307, `/login?redirectTo=${event.url.pathname}`);

  let customerId = event.url.pathname.split("/")[3];

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