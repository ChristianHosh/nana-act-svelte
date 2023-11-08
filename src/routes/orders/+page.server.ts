import {fail} from "@sveltejs/kit";
import {AxiosError} from "axios";
import {HttpClient} from "$lib/core/api/axiosInstance";
import type {Pageable} from "$lib/core/models/pageable.model";
import type {Order} from "$lib/core/models/order.model";
import {DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from "$lib/core/consts";

// @ts-ignore
export async function load(event) {
    let pageIndex: string = event.url.searchParams.get("page") || DEFAULT_PAGE_INDEX;
    let pageSize: string = event.url.searchParams.get("size") || DEFAULT_PAGE_SIZE;
    let citySearch: string = event.url.searchParams.get("city");
    let siteSearch: string = event.url.searchParams.get("site");
    let statusSearch: string = event.url.searchParams.get("status");
    let orderFromSearch: string = event.url.searchParams.get("order-from");
    let orderToSearch: string = event.url.searchParams.get("order-to");
    let shipFromSearch: string = event.url.searchParams.get("ship-from");
    let shipToSearch: string = event.url.searchParams.get("ship-to");

    let params = {
        'page': pageIndex,
        'size': pageSize,
        'from-order-date': orderFromSearch,
        'to-order-date': orderToSearch,
        'from-ship-date': shipFromSearch,
        'to-ship-date': shipToSearch,
        'status': statusSearch,
        'site': siteSearch,
        'city': citySearch,
    }

    try {
        let pageResponse = await HttpClient.get<Pageable<Order>>(
            "orders",
            event.locals.user,
            params
        );

        return {
            currentPage: pageResponse.data,
        };
    }catch (e){
        if (e instanceof AxiosError) {
            if (e) throw fail(e.response?.status || 500);
        }
        throw fail(500);
    }
}