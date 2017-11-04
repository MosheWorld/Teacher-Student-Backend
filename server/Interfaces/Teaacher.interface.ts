import { TeachesAt } from '../Enums/TeachesAt.Enum';
import { TeachesSubjects } from '../Enums/TeachesSubjects.Enum';
import { RecommendationsInterface } from './Recommendations.interface';

export interface TeacherInterface {
    age: number;
    rate: number;
    priceTo: number;
    priceFrom: number;
    phone: string;
    email: string;
    gender: string;
    lastName: string;
    firstName: string;
    personalMessage: string;
    teachesAt: TeachesAt;
    teachesInstitutions: TeachesSubjects[];
    recommendations: RecommendationsInterface[];
}