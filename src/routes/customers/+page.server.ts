import {fail, redirect} from "@sveltejs/kit";
import type {PageServerLoadEvent} from "../../../.svelte-kit/types/src/routes/customers/$types";
import {HttpClient} from "$lib/core/api/axiosInstance";
import type {Pageable} from "$lib/core/models/pageable.model";
import type {Customer} from "$lib/core/models/customer.model";

// @ts-ignore
export async function load(event){
    if (!event.locals.user)
        throw redirect(307, `/login?redirectTo=${event.url.pathname}`);

    let pageIndex: string = event.url.searchParams.get('page') || "0";
    let pageSize: string = event.url.searchParams.get('size') || "10";
    let nameSearch: string = event.url.searchParams.get('name');
    let citySearch: string = event.url.searchParams.get('city');

    let searchParams = {
        page: pageIndex,
        size: pageSize,
        name: nameSearch,
        city: citySearch,
    }

    let pageResponse = await HttpClient.get<Pageable<Customer>>('customers', event.locals.user, searchParams);

    if (pageResponse.status >= 400){
        throw fail(pageResponse.status);
    }

    return {
        currentPage: pageResponse.data
    }
}
