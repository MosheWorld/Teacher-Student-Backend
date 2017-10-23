import { Router, Request, Response } from 'express';
import { TeacherInterface } from './../Entities/Teaacher.interface';
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

router.get('/getbyid/:id', (req: Request, res: Response) => {
    let id = req.params.id;

    if (id == null) { res.status(404).send("Model is not valid."); }

    let tManager = new TeacherLogic();

    tManager.GetByID(id)
        .then((teacher) => {
            res.json(teacher);
        }).catch((error) => {
            res.status(404).send(error.message);
        });
});

// Should be post method with TeacherInterface data.
router.get('/create', (req: Request, res: Response) => {
    let tManager = new TeacherLogic();
    let teacherData: TeacherInterface = { firstName: "a", lastName: "b" };

    tManager.Create(teacherData)
        .then((success) => {
            res.send(success);
        })
        .catch((error) => {
            res.status(404).send(error.message);
        });
});

export const TeacherController: Router = router;