import { fail, redirect, type RequestEvent } from "@sveltejs/kit";
import { HttpClient } from "$lib/core/api/axiosInstance";
import { AxiosError } from "axios";
import type { Customer } from "$lib/core/models/customer.model";
import { superValidate, message } from "sveltekit-superforms/server";
import { customerSchema } from "$lib/core/models/customer.model";
import type { PageServerLoadEvent } from "../../../../../.svelte-kit/types/src/routes/customers/editor/[customerId]/$types";

// @ts-ignore
export async function load(event: PageServerLoadEvent) {
  const customerId = event.url.pathname.split("/")[3];
  const form = await superValidate(event, customerSchema);

  try {
    let customerResponse = await HttpClient.get<Customer>(
      `/customers/${customerId}`,
      event.locals.user
    );

    return {
      customer: customerResponse.data,
      form,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      throw fail(e.response?.status || 400);
    }
    throw fail(500);
  }
}

export const actions = {
  default: async (event: RequestEvent) => {
    const customerId = event.url.pathname.split("/")[3];
    const form = await superValidate(event, customerSchema);

    if (!form.valid) return fail(400, { form });

    let customer: Customer | undefined;

    try {
      const customerResponse = await HttpClient.put<Customer>(
        `/customers/${customerId}`,
        form.data,
        event.locals.user
      );

      customer = customerResponse.data;
    } catch (e) {
      if (e instanceof AxiosError)
        return message(form, {
          text: e.response?.data.message,
          status: e.response?.status || 500,
        });
      throw fail(500, { form });
    }

    if (customer) throw redirect(307, `/customers/${customer.id}`);
  },
};
