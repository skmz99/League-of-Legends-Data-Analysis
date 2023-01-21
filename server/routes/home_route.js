const express = require('express');
const router = express.Router();
const home_controller = require('../controller/home_controller');
//import {view} from "../controller/home_controller";

router.get('/view',home_controller.view);

router.get('/championName',home_controller.distinctChampionName);

router.get('/allVar', home_controller.viewAll);

router.all('/champData', home_controller.champData);

router.all('/champGraph', home_controller.champGraph);

router.all('/script', home_controller.randomForest);

module.exports = router;
