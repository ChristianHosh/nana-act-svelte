import { customerSchema } from "$lib/core/models/customer.model";
import {type Actions, fail, redirect, type RequestEvent} from "@sveltejs/kit";
import { AxiosError } from "axios";
import { HttpClient } from "$lib/core/api/axiosInstance";
import type { Customer } from "$lib/core/models/customer.model";
import { superValidate } from "sveltekit-superforms/server";
import {message} from "sveltekit-superforms/server";
import type {PageServerLoadEvent} from "../../../../../.svelte-kit/types/src/routes/$types";

export async function load(event: PageServerLoadEvent) {
  const form = await superValidate(event, customerSchema);

  return {
    form,
  };
}

export const actions: Actions = {
  default: async (event: RequestEvent) => {
    const form = await superValidate(event, customerSchema);

    if (!form.valid) return fail(400, { form });

    let customer: Customer | undefined;
    try {
      const customerResponse = await HttpClient.post<Customer>(
        "/customers",
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
