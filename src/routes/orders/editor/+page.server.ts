import type {Actions, RequestEvent} from "@sveltejs/kit";
import {superValidate} from "sveltekit-superforms/server";
import {type Order, orderSchema} from "$lib/core/models/order.model";
import type {PageServerLoadEvent} from "../../../../.svelte-kit/types/src/routes/orders/editor/$types";
import {fail, redirect} from "@sveltejs/kit";
import {HttpClient} from "$lib/core/api/axiosInstance";
import {AxiosError} from "axios";
import {message} from "sveltekit-superforms/server";

export async function load(event: PageServerLoadEvent) {
    const form = await superValidate(event, orderSchema);

    return {
        form,
    };
}
export const actions: Actions = {
    default: async (event: RequestEvent) => {
        const form = await superValidate(event, orderSchema);

        console.log('form -> ', form.data);

        if (!form.valid) return fail(400, { form });

        let order: Order | undefined;
        try {
            const orderResponse = await HttpClient.post<Order>(
                "/orders",
                form.data,
                event.locals.user
            );

            order = orderResponse.data;
        }catch (e){
            if (e instanceof AxiosError)
                return message(form, {
                    text: e.response?.data.message,
                    status: e.response?.status || 500,
                });
            throw fail(500, { form });
        }

        if (order) throw redirect(307, `/orders/${order.id}`);
    }
}