import { ImageDal } from './../DAL/ImageDal';
import { Logger } from './../LogService/logger';

export class ImageLogic {
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
        this.logger.debug("Enter Image", "Logic GetImageByID", imageID);
        let iManager = new ImageDal();

        let image = await iManager.GetImageByID(imageID);
        return image;
    }

    public async Create(TeacherIDImage: any) {
        this.logger.debug("Enter Create", "Logic Create", TeacherIDImage);
        let iManager = new ImageDal();
        return await iManager.Create(TeacherIDImage);
    }
    //#endregion
}