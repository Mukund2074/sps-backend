async function AdminSession(req , res){
    try {
        const userData = req.session.user;

        if(!userData){
            return res.status(401).json({message:"No Session Created ! "});
        }
        else{
             res.status(200).json({sessionData : userData, sussess:true, message:'Got it Successfully'});
             console.log(userData); 
        }
    } catch (error) {
        console.log("error");
        res.status(500).json({error: error.message});
    }
}

module.exports = {AdminSession};