import { Request, Response } from 'express';


export function indexWelcome(req: Request, res: Response) {
    return res.json({
        message: 'Welcome to Store API'
    })
}