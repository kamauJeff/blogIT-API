import express, {type Request, type Response, type   NextFunction} from 'express'
import dotenv from "dotenv";
import { register, login, logout } from './controllers/auth.ts';
import { checkDetails } from "./middlewares/checkDetails.ts";
import { checkUsernameAndEmail } from "./middlewares/checkUsernameAndEmail.ts";
import { checkPasswordStrength } from './middlewares/checkPasswordStrength.ts';


const app = express();

dotenv.config();
app.use(express.json())


app.get("/", (_req,res) =>{
    res.status(200).send("<h1>Welcome to Blogit API</h1>")
})




app.post('/auth/register', checkDetails, checkUsernameAndEmail, checkPasswordStrength, register, )
app.post("/auth/login", login);
app.post("/auth/logout", logout);

const PORT = 1000;
app.listen(PORT, function(){
    console.log(`APP is live at: http://localhost:${PORT}/`) 
});