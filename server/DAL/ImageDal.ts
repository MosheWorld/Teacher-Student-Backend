import { ObjectID } from 'mongodb';
import { Logger } from './../LogService/logger';
import DataBaseConnector from '../Models/ImageModel';

export class ImageDal {
    //#region Members
    private logger;
    //#endregion

    //#region Constructor
    public constructor() {
        this.logger = new Logger();
    }
    //#endregion

    //#region Public Methods
    public async GetImageByID(imageID: string) {
        this.logger.debug("Enter Image", "DAL GetImageByID", { imageID: imageID });
        let image = await DataBaseConnector.findOne({ _id: new ObjectID(imageID) });
        return image;
    }

    public Create(TeacherIDImage: any) {
        return new Promise((resolve, reject) => {
            this.logger.debug("Enter Create", "DAL Create", TeacherIDImage);

            DataBaseConnector.collection.insert(TeacherIDImage, (error) => {
                if (error) { reject("Error occurred when inserting to Teacher Create database."); }
                resolve(TeacherIDImage._id);
            });
        });
    }
    //#endregion
}