import { ObjectID } from 'mongodb';

export interface RecommendationsInterface {
    rate: number;
    email: string;
    message: string;
    fullName: string;
    teacherID: string;
}