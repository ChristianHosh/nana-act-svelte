import {redirect, type RequestEvent} from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').Handle} */
// @ts-ignore
export async function handle({ event, resolve }: {event: RequestEvent}) {
  const jwt = event.cookies.get("jwt-token");
  event.locals.user = jwt ? jwt : null;

  if (!event.url.pathname.startsWith("/login")){
    if (!event.locals.user){
      throw redirect(307, `/login?redirectTo=${event.url.pathname}`)
    }
  }else {
    if (event.locals.user){
      throw redirect(307, "/dashboard")
    }
  }

  return resolve(event);
}

/** @type {import('@sveltejs/kit').HandleServerError} */
// @ts-ignore
export async function handleError({ error, event }) {
  if (error.status === 401) {
    event.cookies.delete("jwt-token");
    event.locals.user = null;
    throw redirect(307, "/login");
  }
  return {
    message: "Something Went Wrong, Try Again Later!",
  };
}
