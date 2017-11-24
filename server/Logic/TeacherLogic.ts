import { _ } from 'lodash';

import { ObjectID } from 'mongodb';
import { ImageLogic } from './ImageLogic';
import { Logger } from './../LogService/logger';
import { TeacherDal } from './../DAL/TeacherDAL';
import { TeachesAt } from '../Enums/TeachesAt.Enum';
import { TeacherInterface } from './../Interfaces/Teacher.interface';

export class TeacherLogic {
    //#region Members
    private logger;
    //#endregion

    //#region Constructor
    public constructor() {
        this.logger = new Logger();
    }
    //#endregion

    //#region Public Methods
    public async GetAll() {
        this.logger.debug("Enter Teacher", "Logic GetAll");
        let tDal = new TeacherDal();

        let teacherCollection = await tDal.GetAll();
        return teacherCollection;
    }

    public async GetByID(id) {
        this.logger.debug("Enter Teacher", "Logic GetByID", id);
        let tDal = new TeacherDal();

        let teacher = await tDal.GetByID(id);
        return teacher;
    }

    public async Create(teacherData: TeacherInterface) {
        this.logger.debug("Enter Teacher", "Logic Create", teacherData);

        let tDal = new TeacherDal();
        let iManager = new ImageLogic();

        let image = teacherData.image;
        teacherData.image = undefined;

        const teacherObjectID = await tDal.Create(teacherData);

        let newImageObject = {
            teacherID: new ObjectID(teacherObjectID),
            image: image
        };

        const imageObjectID = await iManager.Create(newImageObject);

        tDal.UpdateImage(teacherObjectID, imageObjectID.toString());
    }

    public async Delete(id) {
        this.logger.debug("Enter Teacher", "Logic Delete ", id);
        let tDal = new TeacherDal();

        let response = await tDal.DeleteByID(id);
        return response;
    }

    public async SearchTeacher(searchData: any) {
        this.logger.debug("Enter Teacher", "Logic SearchTeacher", searchData);
        let teacherCollection: any[] = await this.GetAll();
        let teacherCollectionToReturn: any[] = [];

        for (let element of teacherCollection) {
            // Teaches institutions check.
            if (this.IsInstitutionsMatch(element.teachesInstitutions, searchData.teachesInstitutions)) {
                // Teaches Subjects check.
                if (this.IsSubjectsMatch(element.teachesSubjects, searchData.teachesSubjects)) {
                    // Price check.
                    if (this.IsNumberInRange(element.priceFrom, element.priceTo, searchData.fromPrice, searchData.toPrice)) {
                        // Gender check.
                        if (this.IsGenderMatch(element.gender, searchData.gender)) {
                            // Teaches At check.
                            if (this.IsTeachesAtMatch(element.teachesAt, searchData.teachesAt)) {
                                teacherCollectionToReturn.push(element);
                            }
                        }
                    }
                }
            }
        }

        return teacherCollectionToReturn;
    }

    public async AddRecommendToExistingTeacher(id, recommendData) {
        this.logger.debug("Enter Teacher", "Logic AddRecommendToExistingTeacher", { id: id, recommendData: recommendData });
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

        return tDal.UpdateRecommendations(currentTeacher._id, recommendCollection, newRate);
    }

    public async GetListOfTeachersByID(listOfTeacherID) {
        this.logger.debug("Enter Teacher", "Logic GetListOfTeachersByID", { list: listOfTeacherID });
        let teacherListToReturn: any = [];
        let tDal = new TeacherDal();

        for (let id of listOfTeacherID) {
            let teacher = await tDal.GetByID(id);
            teacherListToReturn.push(teacher);
        }

        return teacherListToReturn;
    }
    //#endregion

    //#region Private Methods
    private IsNumberInRange(lowerRange1: number, upperRange1: number, lowerRange2: number, upperRange2: number) {
        if (upperRange2 < lowerRange1) {
            return false;
        } else {
            return true;
        }
    }

    private IsGenderMatch(genderTeacher: number, genderSearch: number) {
        let isGenderOkay: boolean = false;

        switch (genderSearch) {
            case 1:
                isGenderOkay = genderTeacher === 1 ? true : false;
                break;
            case 2:
                isGenderOkay = genderTeacher === 2 ? true : false;
                break;
            case 3:
            case null:
                isGenderOkay = true;
                break;
            default:
                isGenderOkay = false;
                break;
        }

        return isGenderOkay;
    }

    private IsTeachesAtMatch(teachesAtTeacher: number, teachesAtSearch: number) {
        let isGenderOkay: boolean = false;

        switch (teachesAtSearch) {
            case TeachesAt.Home:
                isGenderOkay = teachesAtTeacher === TeachesAt.Home || teachesAtTeacher === TeachesAt.Both ? true : false;
                break;
            case TeachesAt.AcademicInstitution:
                isGenderOkay = teachesAtTeacher === TeachesAt.AcademicInstitution || teachesAtTeacher === TeachesAt.Both ? true : false;
                break;
            case TeachesAt.Both:
            case null:
                isGenderOkay = true;
                break;
            default:
                isGenderOkay = false;
                break;
        }

        return isGenderOkay;
    }

    private IsInstitutionsMatch(elementInstitutions: any, searchInstitutions: any) {
        if (searchInstitutions == null) {
            return true;
        }
        else if (_.includes(elementInstitutions, searchInstitutions)) {
            return true;
        } else {
            return false;
        }
    }

    private IsSubjectsMatch(elementSubjects: any, searchSubject: any) {
        if (searchSubject == null) {
            return true;
        } else if (_.includes(elementSubjects, searchSubject)) {
            return true;
        } else {
            return false;
        }
    }
    //#endregion
}