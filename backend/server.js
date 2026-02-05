import { Hono } from 'hono';
import { cors } from 'hono/cors';
import equipment from './endpoints/equipment.js';

const app = new Hono();

app.use('*', cors());
app.route('/equipment', equipment);

export default app;