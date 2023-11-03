import { redirect } from "@sveltejs/kit";

// @ts-ignore
export async function load(event) {
  if (!event.locals.user)
    throw redirect(307, `/login?redirectTo=${event.url.pathname}`);
  throw redirect(307, "/dashboard");
}