import { ImageDal } from './../DAL/ImageDal';

export class ImageLogic {
    //#region Public Methods
    public async GetImageByID(imageID: string) {
        let iManager = new ImageDal();

        let image = await iManager.GetImageByID(imageID);
        return image;
    }

    public async Create(TeacherIDImage: any) {
        let iManager = new ImageDal();
        return await iManager.Create(TeacherIDImage);
    }

    public async DeleteByID(id) {
        let iManager = new ImageDal();
        iManager.DeleteByID(id);
    }
    //#endregion
}