import { TeacherInterface } from './../Entities/Teaacher.interface';
import { Router, Request, Response } from 'express';
import { TeacherLogic } from './../Logic/TeacherLogic';

// Assign router to the express.Router() instance
const router: Router = Router();

router.get('/getall', (req: Request, res: Response) => {
    let tManager = new TeacherLogic();

    tManager.GetAll()
        .then((teachers) => {
            res.json(teachers);
        }).catch((error) => {
            res.status(404).send(error.message);
        });
});

router.get('/create', (req: Request, res: Response) => {
    let tManager = new TeacherLogic();
    let teacherData: TeacherInterface = { firstname: "baba", lastname: "abab" };

    tManager.Create(teacherData)
        .catch((error) => {
            res.status(404).send(error.message);
        });
});

export const TeacherController: Router = router;