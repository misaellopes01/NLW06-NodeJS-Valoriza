import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

    // Receive Token
    const authToken = request.headers.authorization

    // Validate if token is filled
    if (!authToken) {
        return response.status(401).end()
    }

    // Verify if token is valid

    // A way get the value that you want from an array |- Split function divide the value of a var/const/let 
    const [, token] = authToken.split(" ")
    // console.log(token)

    try {
        
        // Desestruturando o DECODE, pegando somente { sub } 
        const { sub } = verify(token, "dca08962d2fc78a2e8e3798a145dbc82") as IPayload // Forcing verify as Payload Interface   
        request.user_id = sub
        return next()

    } catch (error) {

        return response.status(401).end()

    }

    // Get User Info

   

}