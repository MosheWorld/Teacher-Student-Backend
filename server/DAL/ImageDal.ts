import { ObjectID } from 'mongodb';
import DataBaseConnector from '../DatabaseModels/ImageModel';

export class ImageDal {
    //#region Public Methods
    /**
     * Return image by image ID at database.
     * @param {string} imageID 
     */
    public GetImageByID(imageID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let image = DataBaseConnector.findOne({ _id: new ObjectID(imageID) }, (error, image) => {
                if (error) { reject("Error occurred when getting image by ID from database."); }
                return image ? image : null;
            });

            resolve(image);
        });
    }

    /**
     * Creates new image at database
     * @param TeacherIDImage 
     */
    public Create(TeacherIDImage: any): Promise<ObjectID> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.insert(TeacherIDImage, (error) => {
                if (error) { reject("Error occurred when creating new entity for image at database."); }
                resolve(TeacherIDImage._id);
            });
        });
    }
    /**
     * Remove image from database according to ID.
     * @param id Image ID.
     */
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