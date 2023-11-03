import { redirect } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').Handle} */
// @ts-ignore
export async function handle({ event, resolve }) {
  const jwt = event.cookies.get("jwt-token");
  event.locals.user = jwt ? jwt : null;

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
