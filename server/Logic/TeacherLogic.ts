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
    public async GetAll(): Promise<TeacherInterface[]> {
        let tDal = new TeacherDal();

        let teacherCollection = await tDal.GetAll();
        return teacherCollection;
    }

    public async GetByID(id): Promise<any> {
        let tDal = new TeacherDal();

        let teacher: TeacherInterface = await tDal.GetByID(id);
        return teacher;
    }

    public async Create(teacherData: TeacherInterface): Promise<void> {
        let tDal = new TeacherDal();
        let iManager = new ImageLogic();

        let image = teacherData.image;
        teacherData.image = undefined;

        const teacherObjectID = await tDal.Create(teacherData);

        let newImageObject = {
            image: image,
            teacherID: new ObjectID(teacherObjectID)
        };

        const imageObjectID = await iManager.Create(newImageObject);

        // Those three functions runs in parallel to reduce performance.
        this.SendEmails(teacherData);

        tDal.UpdateImage(teacherObjectID, imageObjectID.toString());
    }

    public async DeleteByID(id): Promise<void> {
        let tDal = new TeacherDal();
        let iManager = new ImageLogic();

        let teacher = await this.GetByID(id);

        // Run in parallel, no dependency between functions.
        tDal.DeleteByID(id);
        iManager.DeleteByID(teacher.image);
    }

    public async SearchTeacher(searchTeacherModel: SearchTeacherInterface): Promise<TeacherInterface[]> {
        let tDal = new TeacherDal();
        return await tDal.SearchTeacher(this.BuildSearchQuery(searchTeacherModel));
    }

    public async AddRecommendToExistingTeacher(id, recommendData: RecommendationsInterface): Promise<void> {
        let tDal = new TeacherDal();
        let currentTeacher = await this.GetByID(id);

        if (currentTeacher == null || currentTeacher._id == null) {
            throw new Error("User not found.");
        }

        // Adding new recommendation to the recommendation list for specific teacher.
        let recommendCollection: any[] = currentTeacher.recommendations;
        recommendCollection.push(recommendData);

        // Calculates new rate for the teacher.
        let newRate: number = 0;
        for (let recommend of recommendCollection) {
            newRate += recommend.rate;
        }
        newRate = newRate / recommendCollection.length;
        newRate = parseFloat((Math.round(newRate * 100) / 100).toFixed(2));

        tDal.UpdateRecommendations(currentTeacher._id, recommendCollection, newRate);
    }

    public async GetListOfTeachersByID(listOfTeacherID: string[]): Promise<TeacherInterface[]> {
        let tDal = new TeacherDal();

        let teacherListToReturn: TeacherInterface[] = [];

        for (let id of listOfTeacherID) {
            let teacher: TeacherInterface = await tDal.GetByID(id);
            teacherListToReturn.push(teacher);
        }

        return teacherListToReturn;
    }
    //#endregion

    //#region Private Methods
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

    private GetIncludesArrayQuery(data: any /* Should be TeachesSubjectsInterface or TeachesInstitutionsInterface */): any {
        if (data == null) {
            return { $gt: 0 }
        } else {
            return data;
        }
    }

    private GetTeachesAtQuery(data: TeachesAt): any {
        if (data == null || data == TeachesAt.Both) {
            return { $gt: 0 }
        } else {
            return { $in: [data, 3] }
        }
    }

    private GetGenderQuery(data: number): any {
        if (data == null || data === 3) {
            return { $gt: 0 }
        } else {
            return data;
        }
    }

    private async SendEmails(teacherModel: TeacherInterface): Promise<any> {
        let eManager = new Emailer();

        eManager.SendEmailToTeacherAsync('Welcome new teacher ✔', teacherModel);
        eManager.SendEmailToOwnerAsync('New teacher has joined ✔', teacherModel);
    }
    //#endregion
}