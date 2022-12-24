const express = require('express');
const router = express.Router();
const home_controller = require('../controller/home_controller');
//import {view} from "../controller/home_controller";

router.get('/view',home_controller.view);

router.get('/championName',home_controller.distinctChampionName);

router.get('/allVar', home_controller.viewAll);

module.exports = router;
