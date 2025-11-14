<script lang="ts">
	import { page } from '$app/state';

	const fallbackTitle = 'Title';
	const fallbackDescription = 'Description';
	const fallbackImage = '';
	const templateTitle = 'Template';
	const BASE_URL = import.meta.env.BASE_URL || '';
	const {
		title,
		description,
		image,
		index
	}: {
		index?: boolean;
		title?: string | undefined;
		description?: string | undefined;
		image?: string | undefined;
	} = $props();

	const titleConstructor = (title?: string) => {
		return title ? `${title} | ${templateTitle}` : fallbackTitle;
	};

	const currentTitle = titleConstructor(title);
</script>

<svelte:head>
	<title>{currentTitle}</title>
	<meta name="description" content={description || fallbackDescription} />
	<meta property="og_site_name" content={import.meta.env.BASE_URL} />
	<meta property="og:url" content="{BASE_URL}{page.url.pathname.toString()}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={currentTitle} />
	<meta property="og:description" content={description || fallbackDescription} />
	<meta property="og:image" content={image || fallbackImage} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={BASE_URL} />
	<meta property="twitter:url" content="{BASE_URL}{page.url.pathname.toString()}" />
	<meta name="twitter:title" content={currentTitle} />
	<meta name="twitter:description" content={description || fallbackDescription} />
	<meta name="twitter:image" content={image || fallbackImage} />

	<link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
	<link rel="shortcut icon" href="/favicon/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content={templateTitle} />
	<link rel="manifest" href="/favicon/site.webmanifest" />
	{#if index === true}
		<meta name="robots" content="index, follow" />
	{:else}
		<meta name="robots" content="noindex, nofollow" />
	{/if}
	{@html `  <script type="application/ld+json">{
   "@context": "https://schema.org",
   "@type": "Website",
   "name": "${currentTitle}",
   "url": "${BASE_URL}${page.url.pathname}",
   "logo": "${currentTitle}"}</script>`}
</svelte:head>
