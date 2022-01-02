import express from 'express';
import { createProfileFolder } from '../utils/fileUtils';

const createFolder = async (req: express.Request, res: express.Response) => {
    console.log(req.body.folder);
    const result = await createProfileFolder(req.body.folder, true);
    res.json(result);
}

export {createFolder}