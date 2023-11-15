import {fail} from "@sveltejs/kit";
import { HttpClient } from "$lib/core/api/axiosInstance";
import { AxiosError } from "axios";
import {DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from "$lib/core/consts";
import type {Pageable} from "$lib/core/models/pageable.model";
import type {Order} from "$lib/core/models/order.model";
import type {PageServerLoadEvent} from "../../../../../.svelte-kit/types/src/routes/$types";

export async function load(event: PageServerLoadEvent) {
  const customerId = event.url.pathname.split("/")[2];

  let pageIndex: string =
      event.url.searchParams.get("page") || DEFAULT_PAGE_INDEX;
  let pageSize: string =
      event.url.searchParams.get("size") || DEFAULT_PAGE_SIZE;
  let citySearch: string | null = event.url.searchParams.get("city");
  let siteSearch: string | null = event.url.searchParams.get("site");
  let statusSearch: string | null = event.url.searchParams.get("status");
  let orderFromSearch: string | null = event.url.searchParams.get("order-from");
  let orderToSearch: string | null = event.url.searchParams.get("order-to");
  let shipFromSearch: string | null = event.url.searchParams.get("ship-from");
  let shipToSearch: string | null = event.url.searchParams.get("ship-to");

  let params = {
    page: pageIndex,
    size: pageSize,
    "from-order-date": orderFromSearch,
    "to-order-date": orderToSearch,
    "from-ship-date": shipFromSearch,
    "to-ship-date": shipToSearch,
    status: statusSearch,
    site: siteSearch,
    city: citySearch,
    customer: customerId,
  };

  console.log('loading page')
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
