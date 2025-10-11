import { getItemFromSlug } from '$lib/actions/get-single-example';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals }) => {
	try {
		const client = locals.pb;
		const item = await getItemFromSlug(client, '');

		if (item) {
			return { item };
		} else {
			return undefined;
		}
	} catch (err) {
		console.log('An error has occurred', err);
		return undefined;
	}
};
