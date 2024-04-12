import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';

import 'dotenv/config';

const nominatimURL = process.env.instanceURL;
const app = new Hono();

app.use('/*', cors());

app.get('/', (c) => {
    return c.text('IzNominatim v1.0.0 - https://github.com/IzMichael/IzNominatim');
});

app.post('/latlng', async (c) => {
    const body = (await c.req.json()) as {
        addresses: string[];
    };

    const requests = (
        await Promise.all(
            body.addresses.map(async (addr) => {
                return await fetch(nominatimURL + '/search?q=' + encodeURIComponent(addr)).then((res) => {
                    return res.json();
                });
            })
        )
    ).flat();

    if (requests?.[0]) {
        return c.json({ status: 'success', items: requests }, 200);
    } else {
        return c.json({ status: 'failed', message: 'Address not parsed.' }, 406);
    }
});

const port = parseInt(process.env.port ?? '2048');
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
});

