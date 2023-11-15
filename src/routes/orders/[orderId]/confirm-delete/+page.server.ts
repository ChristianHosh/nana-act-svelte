import {type Actions, error, fail, redirect, type RequestEvent} from "@sveltejs/kit";
import {HttpClient} from "$lib/core/api/axiosInstance";
import type {Order} from "$lib/core/models/order.model";
import {AxiosError} from "axios";

export const actions: Actions = {
    default: async (event: RequestEvent) => {
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