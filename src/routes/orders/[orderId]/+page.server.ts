import type {PageServerLoadEvent} from "../../../../.svelte-kit/types/src/routes/orders/[orderId]/$types";
import {HttpClient} from "$lib/core/api/axiosInstance";
import {AxiosError} from "axios";
import {fail} from "@sveltejs/kit";
import type {Order} from "$lib/core/models/order.model";

export async function load(event: PageServerLoadEvent) {
    let orderId = event.url.pathname.split("/")[2];

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