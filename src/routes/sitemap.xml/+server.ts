export async function GET({ setHeaders, url }) {
	setHeaders({
		'Content-Type': 'application/xml'
	});

	const site = url.origin;

	// type ExampleDataType = [];

	// const exampleReq = new Request(`${url.origin}/api/route-handler`);
	// const exampleData = (await (await fetch(exampleReq)).json()) as ExampleDataType[];
	// const now = new Date();

	// const exampleFetchedResults = exampleData
	// 	.map(
	// 		(page) => `
	// 			<url>
	// 				<loc>${url.origin}/${page}</loc>
	// 				<changefreq>monthly</changefreq>
	// 				<lastmod>${now}</lastmod>
	// 			</url>`
	// 	)
	// 	.join('');

	const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${site}</loc>
          <changefreq>yearly</changefreq>
        </url>
		/* Insert exampleFetchedResults */
	</urlset>`;

	return new Response(sitemap);
}
