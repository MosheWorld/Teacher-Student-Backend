import { TeachesAt } from '../Enums/TeachesAt.Enum';
import { TeachesSubjects } from './../Enums/TeachesSubjects.Enum';
import { TeachesInstitutions } from './../Enums/TeachesInstitutions.Enum';
import { RecommendationsInterface } from './Recommendations.interface';

export interface TeacherInterface {
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
    teachesAt: TeachesAt;
    teachesSubjects: TeachesSubjects[];
    teachesInstitutions: TeachesInstitutions[];
    recommendations: RecommendationsInterface[];
}