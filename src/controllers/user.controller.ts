import { Response, Request } from 'express'
import * as UserService from '../services/user.service'
import UserType from '../type/user.type'
import { logger } from '../utils/logger'
import { UserValidation } from '../validations/user.validation'
import bcrypt from 'bcrypt'

export const getallUserController = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1
  const pageSize = parseInt(req.query.pageSize as string) || 15
  const start = (page - 1) * pageSize
  const end = start + pageSize

  try {
    const user: UserType[] = await UserService.getallUserService()

    if (user.length === 0) {
      res.status(404).send({
        message: 'User Not Found'
      })
      return
    }

    const paginationResult = user.slice(start, end)
    const validatedData = paginationResult.map((data) => {
      const { error } = UserValidation(data)
      if (error) {
        logger.error(`Validation error: ${error.message}`)
        res.status(400).send({
          message: 'Validation Failed',
          error: error.message
        })
      }

      return {
        id: data.id,
        data: {
          fullname: data.fullname,
          email: data.email,
          username: data.username,
          created: data.created,
          updated: data.updated,
          last_login: data.last_login,

        }
      }
    })
    logger.info(`Status 200: Get All user success`)
    res.status(200).send({
      page,
      pageSize,
      totalData: user.length,
      totalPages: Math.ceil(user.length / pageSize),
      user: validatedData,
      message: 'Success'
    })
  } catch (error) {
    logger.error(`Status 500: Error Fetching user Data - ${error}`)
    res.status(500).send({
      message: 'Error Fetching user Data',
      error: error
    })
  }
}

export const postUserController = async (req: Request, res: Response): Promise<void> => {
  const creationDate = new Date()
  const utcPlus7Date = new Date(creationDate.getTime() + 7 * 60 * 60 * 1000)
  const created_date = utcPlus7Date.toISOString().slice(0, 19).replace('T', ' ');
  const created = created_date
  const { username, fullname, email, password, updated, last_login } = req.body
  const payload = { id: 0, username, fullname, email, password, created, updated, last_login }
  const { error } = UserValidation(payload)
  if (error) {
    logger.error(`Validation error: ${error.message}`)
    res.status(400).send({
      message: 'Validation Failed',
      error: error.message
    })
    return
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = await UserService.postUserService(username, fullname, email, hashedPassword + 'dULl98s', created, updated, last_login)
    logger.info(`User created`)

    res.status(200).send({
      message: 'User Created Successfully',
      UserId: newUser.id
    })
  } catch (error) {
    res.status(500).send({
      message: 'Error Inserting User',
      error: error
    })
  }
}

export const deleteallUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    await UserService.deleteAllUserService()
    logger.info('All user deleted successfully')

    res.status(200).send({
      message: 'All user Deleted Successfully'
    })
  } catch (error) {
    res.status(500).send({
      message: 'Error Deleteing All Category',
      error: error
    })
  }
}

export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  const UserId = parseInt(req.params.id)
  if (isNaN(UserId)) {
    res.status(400).send({ message: 'Invalid User ID' })
    return
  }

  try {
    const User = await UserService.getUserByIdService(UserId)
    logger.info(`Fetched User with ID: ${UserId}`)

    const { error } = UserValidation(User)

    if (error) {
      logger.error(`Validation error for User ID ${UserId}: ${error.message}`)
      res.status(400).send({
        message: 'Validation Failed',
        error: error.message
      })
      return
    }

    res.status(200).send({
      id: User.id,
      data: {
        fullname: User.fullname,
        email: User.email,
        username: User.username,
        created: User.created,
        updated: User.updated,
        last_login: User.last_login,
      },
      message: 'Success'
    })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'User Not Found') {
        res.status(404).send({ message: 'User Not Found' })
      } else {
        logger.error(`Error fetching User: ${error.message}`)
        res.status(500).send({
          message: 'Error Fetching User',
          error: error.message || error
        })
      }
    }
  }
}

export const deletUserByIdController = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id)

  if (isNaN(userId)) {
    res.status(400).send({ message: 'Invalid user ID' })
    return
  }

  try {
    await UserService.deleteUserByIdService(userId)
    logger.info(`Deleted user with ID: ${userId}`)

    res.status(200).send({
      message: 'Deleted'
    })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'user Not Found') {
        res.status(404).send({ message: 'user Not Found' })
      } else {
        logger.error(`Error deleting user: ${error.message}`)
        res.status(500).send({
          message: 'Error Deleting user',
          error: error.message
        })
      }
    } else {
      logger.error(`Unexpected error: ${String(error)}`)
      res.status(500).send({
        message: 'Unexpected Error Deleting user',
        error: String(error)
      })
    }
  }
}

export const putUserByIdController = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id)
  const creationDate = new Date()
  const utcPlus7Date = new Date(creationDate.getTime() + 7 * 60 * 60 * 1000)
  const updated_date = utcPlus7Date.toISOString().slice(0, 19).replace('T', ' ');
  const userData = req.body
  userData['id'] = userId
  userData['updated'] = updated_date

  if (isNaN(userId)) {
    res.status(400).send({ message: 'Invalid user ID' })
    return
  }

  const { error } = UserValidation(userData)

  if (error) {
    logger.error(`Validation error for user update: ${error.message}`)
    res.status(400).send({
      message: 'Validation Failed',
      error: error.message
    })
    return
  }

  try {
    const updateduser = await UserService.updateUserByIdService(userId, userData)
    logger.info(`Updated user with ID: ${userId}`)

    res.status(200).send({
      message: 'Update Successful',
      user: updateduser
    })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'user Not Found') {
        res.status(404).send({ message: 'user Not Found' })
      } else {
        logger.error(`Error updating user: ${error.message}`)
        res.status(500).send({
          message: 'Error Updating user',
          error: error.message
        })
      }
    } else {
      logger.error(`Unexpected error: ${String(error)}`)
      res.status(500).send({
        message: 'Unexpected Error Updating user',
        error: String(error)
      })
    }
  }
}
