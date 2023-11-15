import { fail } from "@sveltejs/kit";
import { HttpClient } from "$lib/core/api/axiosInstance";
import type { Pageable } from "$lib/core/models/pageable.model";
import type { Customer } from "$lib/core/models/customer.model";
import { AxiosError } from "axios";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "$lib/core/consts";
import type {PageServerLoadEvent} from "../../../../.svelte-kit/types/src/routes/$types";

export async function load(event: PageServerLoadEvent) {
  let page: string = event.url.searchParams.get("page") || DEFAULT_PAGE_INDEX;
  let size: string = event.url.searchParams.get("size") || DEFAULT_PAGE_SIZE;
  let name: string | null = event.url.searchParams.get("name");
  let city: string | null = event.url.searchParams.get("city");
  let id: string | null = event.url.searchParams.get("id");

  let params = {
    page,
    size,
    name,
    city,
    id,
  };

  try {
    let pageResponse = await HttpClient.get<Pageable<Customer>>(
      "customers",
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
