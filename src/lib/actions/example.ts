import client from '$lib/pb';

export async function getBlogFromSlug<T>(slug: string | null) {
	try {
		const list = await client
			.collection<T | undefined>('blog') //use Pick to restrict type
			.getFullList({ fields: 'slug,id' });

		if (!list) {
			throw new Error('Unable to retrieve list of ___');
		}
		const id = ''; // do comparison here eg.
		// list.find((item) => item.slug === slug)

		if (!id) {
			throw new Error('Item not found');
		}

		const item = await client.collection<T | undefined>('item_name').getOne(id);

		if (!item) {
			throw new Error('Unable to find item, check if item exists or if the id is correct');
		}

		return item;
	} catch (err) {
		console.error(`An error has occurred while fetching item with slug ${slug}: `, err);
		return null;
	}
}
