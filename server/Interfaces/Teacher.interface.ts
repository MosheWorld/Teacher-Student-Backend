import { TeachesAtEnum } from '../Enums/TeachesAt.Enum';
import { TeachesSubjectsEnum } from './../Enums/TeachesSubjects.Enum';
import { TeachesInstitutionsEnum } from './../Enums/TeachesInstitutions.Enum';
import { RecommendationsInterface } from './Recommendations.interface';

export interface TeacherInterface {
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: number;
    rate: number;
    gender: number;
    priceTo: number;
    priceFrom: number;
    image?: String;
    personalMessage: string;
    teachesAt: TeachesAtEnum;
    teachesSubjects: TeachesSubjectsEnum[];
    teachesInstitutions: TeachesInstitutionsEnum[];
    recommendations: RecommendationsInterface[];
}