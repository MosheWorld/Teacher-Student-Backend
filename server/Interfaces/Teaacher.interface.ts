import { TeachesAt } from '../Enums/TeachesAt.Enum';
import { TeachesInstitutions } from './../Enums/TeachesInstitutions.Enum';
import { RecommendationsInterface } from './Recommendations.interface';

export interface TeacherInterface {
    age: number;
    rate: number;
    priceTo: number;
    priceFrom: number;
    phone: string;
    email: string;
    image: string;
    gender: string;
    lastName: string;
    firstName: string;
    personalMessage: string;
    teachesAt: TeachesAt;
    teachesInstitutions: TeachesInstitutions[];
    recommendations: RecommendationsInterface[];

}