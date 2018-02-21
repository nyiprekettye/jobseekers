import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

router.post('/login', (req, res) => {
    const { identifier, password } = req.body;

    if (identifier && identifier ==="asd"){
        if (password && password ==="asd"){
            const token = jwt.sign({
                id: 1,
                username: identifier
            }, config.jwtSecret);
            res.json({ token });
        }else {
            res.status(401).json({ errors: { form: 'Invalid Credentials' } });
        }
    }else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }
});

export default router;