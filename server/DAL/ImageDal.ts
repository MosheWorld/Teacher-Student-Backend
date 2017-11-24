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
    public GetImageByID(imageID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.logger.debug("Enter Image", "DAL GetImageByID", { imageID: imageID });

            let image = DataBaseConnector.findOne({ _id: new ObjectID(imageID) }, (error, image) => {
                if (error) { reject("Error occurred when getting image by ID from database."); }
                return image ? image : null;
            });

            resolve(image);
        });
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

    public DeleteByID(id) {
        return new Promise((resolve, reject) => {
            this.logger.debug("Enter DeleteByID", "DAL DeleteByID", id);

            DataBaseConnector.deleteOne({_id: new ObjectID(id)}, (error) => {
                if (error) { reject("Error occurred when deleting image from database."); }
                resolve();
            })
        });
    }
    //#endregion
}