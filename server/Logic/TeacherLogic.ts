import { _ } from 'lodash';

import { TeacherDal } from './../DAL/TeacherDAL';
import { TeachesAt } from '../Enums/TeachesAt.Enum';
import { TeacherInterface } from './../Interfaces/Teaacher.interface';

export class TeacherLogic {
    public async GetAll() {
        let tDal = new TeacherDal();

        let teacherCollection = await tDal.GetAll();
        return teacherCollection;
    }

    public async GetByID(id) {
        let tDal = new TeacherDal();

        let teacher = await tDal.GetByID(id);
        return teacher;
    }

    public async Create(teacherData: TeacherInterface) {
        let tDal = new TeacherDal();
        await tDal.Create(teacherData);
    }

    public async Delete(id) {
        let tDal = new TeacherDal();

        let response = await tDal.DeleteByID(id);
        return response;
    }

    public async SearchTeacher(searchData: any) {
        let teacherCollection = await this.GetAll();
        let teacherCollectionToReturn: any[] = [];

        teacherCollection.forEach(element => {
            // Teaches institutions check.
            if (_.includes(element.teachesInstitutions, searchData.teachesInstitutions)) {
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
        });

        return teacherCollectionToReturn;
    }

    public async AddRecommendToExistingTeacher(id, recommendData) {
        let tDal = new TeacherDal();
        let currentTeacher = await this.GetByID(id);

        if (currentTeacher == null || currentTeacher._id == null) {
            throw new Error("User not found.");
        }

        // Adding new recommendation to the recommendation list for specific teacher.
        let recommendCollection: any[] = currentTeacher.recommendations;
        recommendCollection.push(recommendData);

        // Calculates new rate for the teacher.
        let newRate:number = 0;
        for (let recommend of recommendCollection) {
            newRate += recommend.rate;
        }
        newRate = newRate / recommendCollection.length;
        newRate = parseFloat((Math.round(newRate * 100)/100).toFixed(2));

        return tDal.UpdateRecommendations(currentTeacher._id, recommendCollection, newRate);
    }

    public async GetListOfTeachersByID(listOfTeacherID) {
        let teacherListToReturn: any = [];
        let tDal = new TeacherDal();

        for (let id of listOfTeacherID) {
            let teacher = await tDal.GetByID(id);
            teacherListToReturn.push(teacher);
        }

        return teacherListToReturn;
    }

    private IsNumberInRange(lowerRange1: number, upperRange1: number, lowerRange2: number, upperRange2: number) {
        if(upperRange2 < lowerRange1){
            return false;
        }else{
            return true;
        }
    }

    private IsGenderMatch(genderTeacher: string, genderSearch: string) {
        let isGenderOkay: boolean = false;

        switch (genderSearch) {
            case '':
                isGenderOkay = true;
                break;
            case 'Male':
                isGenderOkay = genderTeacher === 'Male' || genderTeacher === '' ? true : false;
                break;
            case 'Female':
                isGenderOkay = genderTeacher === 'Female' || genderTeacher === '' ? true : false;
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
            case TeachesAt.Both:
                isGenderOkay = true;
                break;
            case TeachesAt.Home:
                isGenderOkay = teachesAtTeacher === TeachesAt.Home || teachesAtTeacher === TeachesAt.Both ? true : false;
                break;
            case TeachesAt.AcademicInstitution:
                isGenderOkay = teachesAtTeacher === TeachesAt.AcademicInstitution || teachesAtTeacher === TeachesAt.Both ? true : false;
                break;
            default:
                isGenderOkay = false;
                break;
        }

        return isGenderOkay;
    }
}