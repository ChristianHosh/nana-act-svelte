/** @type {import('./$types').LayoutServerLoad} */
// @ts-ignore
export function load({locals}) {
    return {
        user: locals.user
    };
}