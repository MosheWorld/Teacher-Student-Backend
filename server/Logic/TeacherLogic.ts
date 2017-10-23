import { TeacherInterface } from './../Entities/Teaacher.interface';
import { TeacherDal } from './../DAL/TeacherDAL';

export class TeacherLogic {

    public async GetAll() {
        let tDal = new TeacherDal();

        let teacherCollection = await tDal.GetAll();
        return teacherCollection;
    }

    public async Create(teacherData: TeacherInterface) {
        let tDal = new TeacherDal();
        await tDal.Create(teacherData);
    }
}