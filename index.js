import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()
const app = express()

app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {

    const {email, password} = req.body    

    if (email && email !== "" && password && password !== "") {


        const emailExists = await prisma.users.findUnique({
            where: {
                email
            }
        })
    
        if (emailExists) {
            await prisma.users.update({
                where: {
                    email
                },
                data: {
                    password
                }
            })
        } else { 
            await prisma.users.create({
                data: {
                  email,
                  password,
                },
            })           
        }
        return res.json({ success: true })
    }

    return res.json({ success: false })

})

app.listen(5555, () => console.log("[Server] - Listening on 5555"))