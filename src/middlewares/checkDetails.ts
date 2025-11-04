import express, {type Request, type Response, type   NextFunction} from 'express'


export function checkDetails(req:Request, res: Response ,  next: NextFunction) {
            const{firstName, lastName, emailAddress, userName, password } = req.body;
            if (!firstName) {
                res.status(400).json({message: " Name required"})
                return;    
            }
            if (!lastName) {
                res.status(400).json({message: "Last Name required"})
                return;    
            }
            if (!emailAddress) {
                res.status(400).json({message: "Email Address required"})
                return;    
            }
            if (!userName) {
                res.status(400).json({message: "User Name required"})
                return;    
            }
            if (!password) {
                res.status(400).json({message: "Password required"})
                return;    
            }
            next();
    
}