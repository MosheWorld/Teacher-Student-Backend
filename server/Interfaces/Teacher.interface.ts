import { TeachesAt } from '../Enums/TeachesAt.Enum';
import { TeachesSubjects } from './../Enums/TeachesSubjects.Enum';
import { TeachesInstitutions } from './../Enums/TeachesInstitutions.Enum';
import { RecommendationsInterface } from './Recommendations.interface';

export interface TeacherInterface {
    age: number;
    rate: number;
    gender: number;
    priceTo: number;
    priceFrom: number;
    phone: string;
    email: string;
    image: string;
    lastName: string;
    firstName: string;
    personalMessage: string;
    teachesAt: TeachesAt;
    teachesInstitutions: TeachesInstitutions[];
    teachesSubjects: TeachesSubjects[];
    recommendations: RecommendationsInterface[];
}