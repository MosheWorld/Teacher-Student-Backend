import { ObjectID } from 'mongodb';
import DataBaseConnector from '../Models/ImageModel';

export class ImageDal {
    //#region Public Methods
    public GetImageByID(imageID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let image = DataBaseConnector.findOne({ _id: new ObjectID(imageID) }, (error, image) => {
                if (error) { reject("Error occurred when getting image by ID from database."); }
                return image ? image : null;
            });

            resolve(image);
        });
    }

    public Create(TeacherIDImage: any): Promise<ObjectID> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.insert(TeacherIDImage, (error) => {
                if (error) { reject("Error occurred when inserting to Teacher Create database."); }
                resolve(TeacherIDImage._id);
            });
        });
    }

    public DeleteByID(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.deleteOne({ _id: new ObjectID(id) }, (error) => {
                if (error) { reject("Error occurred when deleting image from database."); }
                resolve();
            })
        });
    }
    //#endregion
}