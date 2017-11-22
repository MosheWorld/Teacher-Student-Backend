import { Router, Request, Response } from 'express';

import { Logger } from './../LogService/logger';
import { ImageLogic } from '../Logic/ImageLogic';

//#region Members
let logger = new Logger();
const router: Router = Router();
//#endregion

//#region Routers
router.post('/getimagebyid', (req: Request, res: Response) => {
    try {
        logger.info("Enter", "image/getimagebyid");

        let imageID = req.body.imagePath;

        if (imageID == null || imageID == "") {
            logger.error("Model is not valid.", "image/getimagebyid");
            res.status(400).send("Model is not valid.");
        }

        let iManager = new ImageLogic();

        iManager.GetImageByID(imageID)
            .then((image) => {
                res.json(image);
            }).catch((error) => {
                res.status(400).send(error.message);
            });

        logger.info("Out", "image/getimagebyid");
    } catch (ex) {
        logger.error("Out", "image/getimagebyid", ex.message);
        res.status(400).send(ex.message);
    }
});
//#endregion

export const ImageController: Router = router;