import {HttpClient} from "$lib/core/api/axiosInstance";
import type {Pageable} from "$lib/core/models/pageable.model";
import type {City} from "$lib/core/models/city.model";
import {AxiosError} from "axios";
import {fail} from "@sveltejs/kit";

// @ts-ignore
export async function load(event) {
    try {
        let pageResponse = await HttpClient.get<Pageable<City>>(
            "cities",
            event.locals.user
        )

        return {
            currentPage: pageResponse.data
        }
    }catch (e) {
        if (e instanceof AxiosError) {
            if (e) throw fail(e.response?.status || 500);
        }
        throw fail(500);
    }
}