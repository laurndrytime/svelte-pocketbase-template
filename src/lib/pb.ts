// src/superuser.js
import PocketBase from 'pocketbase';

const client = new PocketBase(import.meta.env.BACKEND_URL);

// disable autocancellation so that we can handle async requests from multiple users
client.autoCancellation(false);

// option 1: authenticate as superuser using email/password (could be filled with ENV params)
await client
	.collection('_superusers')
	.authWithPassword(import.meta.env.PB_ADMIN_USER, import.meta.env.PB_ADMIN_PASSWORD, {
		// This will trigger auto refresh or auto reauthentication in case
		// the token has expired or is going to expire in the next 30 minutes.
		autoRefreshThreshold: 30 * 60
	});

// // option 2: OR authenticate as superuser via long-lived "API key"
// // (see https://pocketbase.io/docs/authentication/#api-keys)
// client.authStore.save("YOUR_GENERATED_SUPERUSER_TOKEN");

export default client;
