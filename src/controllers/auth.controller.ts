import { Request, Response } from 'express'
import { postAuthService, logoutUser} from '../services/auth.service'

export const postAuthController = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body

  try {
    const result = await postAuthService(username, password)

    if (result === 'Username not found') {
      res.status(404).send({ message: 'Username not found' })
      return
    } 

    if (result === 'Invalid credentials') {
      res.status(401).send({ message: 'Invalid credentials' })
      return
    }

    res.status(200).send({ token: result })
  } catch (error) {
    console.error('Authentication Error:', error)
    res.status(500).send({ message: 'Internal server error' })
  }
}

export const logoutController = (req: Request, res: Response): void => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) {
    res.status(400).send({ message: 'Token is required' })
    return
  }

  logoutUser(token)
  res.status(200).send({ message: 'Logged out successfully' })
};

export const getTokenTest = async (req: Request, res: Response): Promise<void> => {
  res.status(200).send({message : 'Token can be used'})
}