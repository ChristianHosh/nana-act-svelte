import type {
    LayoutServerLoadEvent,
} from "../../../../.svelte-kit/types/src/routes/customers/[customerId]/$types";
import {HttpClient} from "$lib/core/api/axiosInstance";
import type {CustomerProfile} from "$lib/core/models/customerProfile.model";
import {AxiosError} from "axios";
import {fail} from "@sveltejs/kit";

export async function load(event: LayoutServerLoadEvent) {
    const customerId = event.url.pathname.split("/")[2];

    try {
        let customerProfileResponse = await HttpClient.get<CustomerProfile>(
            `/customers/${customerId}/profile`,
            event.locals.user
        );

        return {
            customerProfile: customerProfileResponse.data,
            customer: customerProfileResponse.data.customer
        };
    } catch (e) {
        if (e instanceof AxiosError) {
            throw fail(e.response?.status || 400);
        }
        throw fail(500);
    }
}