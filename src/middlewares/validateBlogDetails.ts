import { type Request, type Response, type NextFunction} from "express";

export function validateDetails(req: Request, res: Response, next: NextFunction){
    const { blogTittle, synopsis} = req.body;
    if (!blogTittle) {
        res.status(400).json({message: "Blog tittle is required"});
        return;
        
    }
    if (!synopsis) {
        res.status(400).json({message: "Synopsis is required"});
        return;
    }
    next();

}