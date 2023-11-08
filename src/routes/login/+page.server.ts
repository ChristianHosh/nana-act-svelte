import { type Actions, fail, redirect } from "@sveltejs/kit";
import type { RequestEvent } from "../../../.svelte-kit/types/src/routes/login/$types";
import { LoginSchema } from "$lib/core/models/user.model";
import { superValidate } from "sveltekit-superforms/server";
import { HttpClient } from "$lib/core/api/axiosInstance";
import type { JwtToken } from "$lib/core/models/jwtToken.model";
import { AxiosError } from "axios";

/** @type {import('./$types').PageServerLoad} */
// @ts-ignore
export async function load(event) {
  const form = await superValidate(event, LoginSchema);

  return {
    form,
  };
}

/** @type {import('./$types').Actions} */
export const actions: Actions = {
  // @ts-ignore
  default: async (event: RequestEvent) => {
    const redirectTo = event.url.searchParams.get("redirectTo");

    const form = await superValidate(event, LoginSchema);

    if (!form.valid) return fail(400, { form });

    try {
      const jwtResponse = await HttpClient.post<JwtToken>(
        "/auth/login",
        form.data
      );
      event.cookies.set("jwt-token", jwtResponse.data.token, { path: "/" });
    } catch (e) {
      if (e instanceof AxiosError)
        return fail(e.response?.status || 500, {
          form,
          message: e.response?.data.message,
        });
      throw fail(500, { form });
    }

    if (redirectTo) throw redirect(307, `/${redirectTo.slice(1)}`);
    throw  redirect(307, "/");
  },
};
