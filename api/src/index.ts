import type { Response } from 'express';

const express = require('express');

const app = express();
const port = 5001;

app.get('/', (req: Request, res: Response) => {
  res.send('See you space cowboy...');
});

app.listen(port);

// eslint-disable-next-line no-console
console.log(`[app] Running ... \n[app] Url: http://localhost:${port}`);
