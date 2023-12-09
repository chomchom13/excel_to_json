import express from 'express'
import { pushData, delData, getData } from '../controller/data.controller.js'

const router = express.Router();

router.get("/get", getData);
router.delete("/delete", delData);
router.post("/push", pushData);

export { router };