import type PocketBase from 'pocketbase';

type GetItemList = {
	filters?: {
		tags?: string[];
		category?: string[];
		slugsAvoid?: string[];
	};
	page?: number;
	itemsPerPage?: number;
};

export async function getExamplesList<T>(client: PocketBase, input?: GetItemList) {
	try {
		/**TODO: filters */

		const itemsList = await client
			.collection<T>('item')
			//just change the filters accordingly
			.getFullList({
				filter: `show=true${
					input?.filters?.slugsAvoid
						? `&&${input.filters.slugsAvoid.map((slug) => `slug!='${slug}'`).join('||')}`
						: ''
				}`,
				sort: '-date'
			});

		if (!itemsList) {
			throw new Error('Unable to retrieve list of items');
		}

		//If there are thumbnails or images
		// return itemsList.map((w) => {
		//   const thumbnail = client.files.getURL(w, w.thumbnail, {
		//     thumb: "300x300",
		//   });
		//   return { ...w, thumbnail };
		// });
		return itemsList;
	} catch (err) {
		console.error(`An error has occurred while fetching items list: `, err);
		return undefined;
	}
}
