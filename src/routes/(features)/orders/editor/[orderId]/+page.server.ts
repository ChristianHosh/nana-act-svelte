import {message, superValidate} from "sveltekit-superforms/server";
import {type Order, orderSchema} from "$lib/core/models/order.model";
import {HttpClient} from "$lib/core/api/axiosInstance";
import {AxiosError} from "axios";
import {fail, redirect, type RequestEvent} from "@sveltejs/kit";
import type {PageServerLoadEvent} from "../../../../../../.svelte-kit/types/src/routes/$types";

export async function load(event: PageServerLoadEvent) {
    const orderId = event.url.pathname.split("/")[3];
    const form = await superValidate(event, orderSchema);

    try{
        let orderResponse = await HttpClient.get<Order>(
            `/orders/${orderId}`,
            event.locals.user
        );

        return {
            order: orderResponse.data,
            form,
        };
    }catch (e) {
        if (e instanceof AxiosError) {
            throw fail(e.response?.status || 400);
        }
        throw fail(500);
    }
}

export const actions = {
    default: async (event: RequestEvent) => {
        const orderId = event.url.pathname.split("/")[3];
        const form = await superValidate(event, orderSchema);

        if (!form.valid) return fail(400, { form });

        let order: Order | undefined;

        try {
            const customerResponse = await HttpClient.put<Order>(
                `/orders/${orderId}`,
                form.data,
                event.locals.user
            );

            order = customerResponse.data;
        } catch (e) {
            if (e instanceof AxiosError)
                return message(form, {
                    text: e.response?.data.message,
                    status: e.response?.status || 500,
                });
            throw fail(500, { form });
        }

        if (order) throw redirect(307, `/orders/${order.id}`);
    },
};