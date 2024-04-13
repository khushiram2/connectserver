import {Router} from "express"
import {addContacts} from "../controllers/handleContactsUpload.js"


const router=Router();

router.post("/upload",addContacts)







export const contactsRouter=router;
