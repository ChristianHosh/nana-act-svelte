// @ts-ignore
export async function handle({ event, resolve }) {
    const jwt = event.cookies.get('jwt-token');
    event.locals.user = jwt ? jwt : null;

    return resolve(event);
}