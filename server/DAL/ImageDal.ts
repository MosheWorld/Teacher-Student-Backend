import { ObjectID } from 'mongodb';
import { Logger } from './../LogService/logger';
import DataBaseConnector from '../Models/ImageModel';

export class ImageDal {
    private logger;

    public constructor() {
        this.logger = new Logger();
    }

    public async GetImageByID(imageID: string) {
        this.logger.debug("Enter Image", "DAL GetImageByID", { imageID: imageID });
        let image = await DataBaseConnector.findOne({ _id: new ObjectID(imageID) });
        return image;
    }
}