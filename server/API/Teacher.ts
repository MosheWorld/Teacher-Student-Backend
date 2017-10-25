import { Router, Request, Response } from 'express';
import { TeacherInterface } from './../Interfaces/Teaacher.interface';
import { TeacherLogic } from './../Logic/TeacherLogic';

// Assign router to the express.Router() instance
const router: Router = Router();

router.get('/getall', (req: Request, res: Response) => {
    let tManager = new TeacherLogic();

    tManager.GetAll()
        .then((teachers) => {
            res.json(teachers);
        }).catch((error) => {
            res.status(400).send(error.message);
        });
});

router.get('/getbyid/:id', (req: Request, res: Response) => {
    let id = req.params.id;

    if (id == null) { res.status(400).send("Model is not valid."); }

    let tManager = new TeacherLogic();

    tManager.GetByID(id)
        .then((teacher) => {
            res.json(teacher);
        }).catch((error) => {
            res.status(400).send(error.message);
        });
});

router.post('/create', (req: Request, res: Response) => {

    if (req.body == null || req.body.firstName == null || req.body.lastName == null) {
        return res.status(400).send("Model is not valid.");
    }

    let tManager = new TeacherLogic();
    let teacherData: TeacherInterface = { firstName: req.body.firstName, lastName: req.body.lastName }

    tManager.Create(teacherData)
        .then((success) => {
            res.send(success);
        })
        .catch((error) => {
            res.status(400).send(error.message);
        });
});

router.delete('/delete/:id', (req: Request, res: Response) => {
    let id = req.params.id;

    if (id == null) { res.status(400).send("Model is not valid."); }

    let tManager = new TeacherLogic();

    tManager.Delete(id)
        .then((response) => {
            res.json(response);
        }).catch((error) => {
            res.status(400).send(error.message);
        });
});

export const TeacherController: Router = router;