import * as Services from './../../services/cluster.services'
import * as EXPRESS from 'express'
import JWT from 'jsonwebtoken'

const getClusters : EXPRESS.RequestHandler = (req, res) =>{
    const API : any = String(process.env.API) 
    const API_FRONT = req.headers.api_key
    if (API != API_FRONT) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }
    //suppoosing im gettting a token
    const token : any = req.headers.token
    if (!token) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }
    const decoded : any = JWT.verify(token, String(process.env.JWT_SECRET))
    if (!decoded) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }
    const owner : any = decoded.id
    Services.getClusters(owner).then((data : any) =>{
        if (data.length) {
            res.status(200).send(data)
            return
        }
        res.status(404).send("There's 0 clusters so far ")
    }
    ).catch((err : any) =>{
        console.log(err)
        res.status(500).send("Internal server error")
    })

}

export default getClusters