import { ObjectID } from 'mongodb';
import { ImageLogic } from './ImageLogic';
import { TeacherDal } from './../DAL/TeacherDAL';
import { Emailer } from './../Integration/Emailer';
import { TeachesAt } from '../Enums/TeachesAt.Enum';
import { TeacherInterface } from './../Interfaces/Teacher.interface';
import { SearchTeacherInterface } from '../Interfaces/SearchTeacher.interface';
import { RecommendationsInterface } from './../Interfaces/Recommendations.interface';

export class TeacherLogic {
    //#region Public Methods
    /**
     * Returns all teachers.
     * @returns {Promise<TeacherInterface[]>} Teacher model.
     */
    public async GetAll(): Promise<TeacherInterface[]> {
        let tDal = new TeacherDal();

        let teacherCollection = await tDal.GetAll();
        return teacherCollection;
    }

    /**
     * Returns teacher by his ID.
     * @param id Teacher ID.
     * @returns {Promise<any>} Teacher Model.
     */
    public async GetByID(id): Promise<any> {
        let tDal = new TeacherDal();

        let teacher: TeacherInterface = await tDal.GetByID(id);
        return teacher;
    }

    // Add model inside this function.
    /**
     * Creates new teacher at database and new image at images database.
     * Pass the responsibility to image logic to insert new image.
     * @param {TeacherInterface} teacherData Teacher model.
     */
    public async Create(teacherData: TeacherInterface): Promise<void> {
        let tDal = new TeacherDal();
        let iManager = new ImageLogic();

        let image = teacherData.image;
        teacherData.image = undefined;

        const teacherObjectID = await tDal.Create(teacherData);

        // Add interface for this model.
        let newImageObject = {
            image: image,
            teacherID: new ObjectID(teacherObjectID)
        };

        const imageObjectID = await iManager.Create(newImageObject);

        // Those three functions runs in parallel to increase performance.
        this.SendEmails(teacherData);

        tDal.UpdateImage(teacherObjectID, imageObjectID.toString());
    }

    /**
     * Removes teacher by his ID.
     * Removes the teacher image from the database by transferring the responsibility to remove to image logic class.
     * @param id Teacher ID.
     */
    public async DeleteByID(id): Promise<void> {
        let tDal = new TeacherDal();
        let iManager = new ImageLogic();

        let teacher = await this.GetByID(id);

        // Run in parallel, no dependency between functions.
        tDal.DeleteByID(id);
        iManager.DeleteByID(teacher.image);
    }

    /**
     * Searches for teachers by specific requirements of search model.
     * @param {SearchTeacherInterface} searchTeacherModel Search model.
     * @returns {Promise<TeacherInterface[]>} Teacher model.
     */
    public async SearchTeacher(searchTeacherModel: SearchTeacherInterface): Promise<TeacherInterface[]> {
        let tDal = new TeacherDal();

        let query = this.BuildSearchQuery(searchTeacherModel);
        return await tDal.SearchTeacher(query);
    }

    /**
     * Receives list of teachers by their ID.
     * @param {string[]} listOfTeacherID List of IDs.
     * @returns {Promise<TeacherInterface[]>} Teacher model.
     */
    public async GetListOfTeachersByID(listOfTeacherID: string[]): Promise<TeacherInterface[]> {
        let tDal = new TeacherDal();

        let teacherListToReturn: TeacherInterface[] = [];

        for (let id of listOfTeacherID) {
            let teacher: TeacherInterface = await tDal.GetByID(id);
            teacherListToReturn.push(teacher);
        }

        return teacherListToReturn;
    }

    public async GetTeacherByUserID(id: string) {
        if (id === null || id === undefined) {
            throw new Error("Given ID is not valid.");
        }

        let tDal = new TeacherDal();

        return await tDal.GetTeacherByUserID(id);
    }
    //#endregion

    //#region Private Methods
    /**
     * Function to build search query, builder parameters for search dynamically.
     * @param searchTeacherModel Search model.
     * @returns Returns the json built for search query for Mongo database.
     */
    private BuildSearchQuery(searchTeacherModel: SearchTeacherInterface): any {
        let entityToDataBase = {
            priceFrom: { $lt: searchTeacherModel.toPrice },
            gender: this.GetGenderQuery(searchTeacherModel.gender),
            teachesAt: this.GetTeachesAtQuery(searchTeacherModel.teachesAt),
            teachesSubjects: this.GetIncludesArrayQuery(searchTeacherModel.teachesSubjects),
            teachesInstitutions: this.GetIncludesArrayQuery(searchTeacherModel.teachesInstitutions)
        };

        return entityToDataBase;
    }

    /**
     * Receives data that MongoDB requires for query.
     * @param data Should be TeachesSubjectsInterface or TeachesInstitutionsInterface.
     * @returns Returns the json built for search query for Mongo database.
     */
    private GetIncludesArrayQuery(data: any): any {
        if (data == null) {
            return { $gt: 0 }
        } else {
            return data;
        }
    }

    /**
     * Receives data that MongoDB requires for query.
     * @param {TeachesAt} data See interface for more information.
     * @returns Returns the json built for search query for Mongo database.
     */
    private GetTeachesAtQuery(data: TeachesAt): any {
        if (data == null || data == TeachesAt.Both) {
            return { $gt: 0 }
        } else {
            return { $in: [data, 3] }
        }
    }

    /**
     * Receives data that MongoDB requires for query.
     * @param data Number for gender decision.
     * @returns Returns the json built for search query for Mongo database.
     */
    private GetGenderQuery(data: number): any {
        if (data == null || data === 3) {
            return { $gt: 0 }
        } else {
            return data;
        }
    }

    /**
     * Sends email to teacher and the owner of the application when new teacher joines.
     * @param teacherModel Teacher model.
     * @prop {Emailer} Email Email class to send emails.
     */
    private async SendEmails(teacherModel: TeacherInterface): Promise<any> {
        let eManager = new Emailer();

        eManager.SendEmailToTeacherAsync('Welcome new teacher ✔', teacherModel);
        eManager.SendEmailToOwnerAsync('New teacher has joined ✔', teacherModel);
    }
    //#endregion
}