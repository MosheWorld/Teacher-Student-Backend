import { ObjectID } from 'mongodb';
import { ImageDal } from './../DAL/ImageDal';

export class ImageLogic {
    //#region Public Methods
    /**
     * Receives image by ID in database.
     * @param imageID Image ID.
     * @returns {Promise<any>} Image returned from database.
     */
    public async GetImageByID(imageID: string): Promise<any> {
        let iManager = new ImageDal();

        let image = await iManager.GetImageByID(imageID);
        return image;
    }

    /**
     * Create new image at database related to some teacher.
     * @param TeacherIDImage Teacher model ( Will be added as interface in future ).
     * @returns {Promise<ObjectID>} Returns image ID of new image from database. 
     */
    public async Create(teacherIDImage: any): Promise<ObjectID> {
        let iManager = new ImageDal();
        return await iManager.Create(teacherIDImage);
    }

    /**
     * Remove image from database.
     * @param id ID to remove, Nullable string.
     */
    public async DeleteByID(id: any): Promise<void> {
        let iManager = new ImageDal();
        iManager.DeleteByID(id);
    }
    //#endregion
}