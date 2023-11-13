import type { PageServerLoadEvent } from "../../../../.svelte-kit/types/src/routes/orders/[orderId]/$types";
import { HttpClient } from "$lib/core/api/axiosInstance";
import { AxiosError } from "axios";
import {type Actions, error, fail, redirect, type RequestEvent} from "@sveltejs/kit";
import type { Order } from "$lib/core/models/order.model";

export async function load(event: PageServerLoadEvent) {
  const orderId = event.url.pathname.split("/")[2];

  try {
    let orderResponse = await HttpClient.get<Order>(
      `/orders/${orderId}`,
      event.locals.user
    );

    return {
      order: orderResponse.data,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      throw fail(e.response?.status || 400);
    }
    throw fail(500);
  }
}

export const actions: Actions = {
  delete: async (event: RequestEvent) => {
      if (!event.locals.user) throw error(401);

      const orderId = event.url.pathname.split("/")[2];

      try {
          await HttpClient.delete<Order>(
              `/orders/${orderId}`,
              event.locals.user
          );
      } catch (e) {
          if (e instanceof AxiosError) return fail(e.response?.status || 500);
          return fail(500);
      }
      throw redirect(307, "/orders");
  },
};