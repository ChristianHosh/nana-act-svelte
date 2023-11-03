import { fail, redirect } from "@sveltejs/kit";
import { HttpClient } from "$lib/core/api/axiosInstance";
import type { Pageable } from "$lib/core/models/pageable.model";
import type { Customer } from "$lib/core/models/customer.model";
import { AxiosError } from "axios";

// @ts-ignore
export async function load(event) {
  if (!event.locals.user)
    throw redirect(307, `/login?redirectTo=${event.url.pathname}`);

  let pageIndex: string = event.url.searchParams.get("page") || "0";
  let pageSize: string = event.url.searchParams.get("size") || "10";
  let nameSearch: string = event.url.searchParams.get("name");
  let citySearch: string = event.url.searchParams.get("city");

  let searchParams = {
    page: pageIndex,
    size: pageSize,
    name: nameSearch,
    city: citySearch,
  };

  try {
    let pageResponse = await HttpClient.get<Pageable<Customer>>(
      "customers",
      event.locals.user,
      searchParams
    );

    return {
      currentPage: pageResponse.data,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e) throw fail(e.status || 500);
    }
    throw fail(500);
  }
}
