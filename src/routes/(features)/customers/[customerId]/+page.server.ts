import {fail} from "@sveltejs/kit";
import { HttpClient } from "$lib/core/api/axiosInstance";
import { AxiosError } from "axios";
import {DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from "$lib/core/consts";
import type {Pageable} from "$lib/core/models/pageable.model";
import type {Order} from "$lib/core/models/order.model";
import type {PageServerLoadEvent} from "../../../../../.svelte-kit/types/src/routes/$types";

export async function load(event: PageServerLoadEvent) {
  const customer = event.url.pathname.split("/")[2];

  let page: string =
      event.url.searchParams.get("page") || DEFAULT_PAGE_INDEX;
  let size: string =
      event.url.searchParams.get("size") || DEFAULT_PAGE_SIZE;
  let site: string | null = event.url.searchParams.get("site");
  let status: string | null = event.url.searchParams.get("status");
  let from_order_date: string | null = event.url.searchParams.get("order-from");
  let to_order_date: string | null = event.url.searchParams.get("order-to");
  let from_ship_date: string | null = event.url.searchParams.get("ship-from");
  let to_ship_date: string | null = event.url.searchParams.get("ship-to");
  let id: string | null = event.url.searchParams.get("id");

  const params = {
    page,
    size,
    site,
    status,
    from_order_date,
    to_order_date,
    from_ship_date,
    to_ship_date,
    customer,
    id
  };

  try {
    let pageResponse = await HttpClient.get<Pageable<Order>>(
        "orders",
        event.locals.user,
        params
    );

    return {
      currentPage: pageResponse.data,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e) throw fail(e.response?.status || 500);
    }
    throw fail(500);
  }
}
