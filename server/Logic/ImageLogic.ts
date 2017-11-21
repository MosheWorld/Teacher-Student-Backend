import { ImageDal } from './../DAL/ImageDal';
import { Logger } from './../LogService/logger';

export class ImageLogic {
    private logger;

    public constructor() {
        this.logger = new Logger();
    }

    public async GetImageByID(imageID: string) {
        this.logger.debug("Enter Image", "Logic GetImageByID", imageID);
        let iManager = new ImageDal();

        let image = await iManager.GetImageByID(imageID);
        return image;
    }
}