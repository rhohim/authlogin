import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { substring } from '../config/environment'
import db from '../utils/connectDB'
import UserType from '../type/auth.type'
import { logger } from '../utils/logger'
const tokenBlacklist = new Set()

export const postAuthService = (username: string, password: string): Promise<string | UserType> => {
  const TOKEN_EXP = '1h'
  const substringToRemove = substring || ''
  const sql = 'SELECT * FROM user WHERE username = ?'

  return new Promise((resolve, reject) => {
    db.query(sql, [username], (error: any, result: any) => {
      if (error) {
        console.error('Database Error:', error)
        return reject(new Error('Server error'))
      }

      if (result.length === 0) {
        return resolve('Username not found')
      }

      const user = result[0]
      const originalString = user.password
      const pass = originalString.replace(substringToRemove, '')

      bcrypt.compare(password, pass, (err, isMatch) => {
        if (err) {
          console.error('Error Comparing Passwords:', err)
          return reject(new Error('Server error'))
        }

        if (!isMatch) {
          return resolve('Invalid credentials')
        }

        const secretKey = `${username}:${password}:${new Date().getTime()}`
        const token = jwt.sign({ userId: user.id, password: user.password }, secretKey, { expiresIn: TOKEN_EXP })
        resolve(token)
      })
    })
  })
}

export const logoutUser = (token: string): void => {
  tokenBlacklist.add(token)
  logger.info('User logged out and token invalidated')
}

export const checkTokenBlacklisted = (token: string): boolean => {
  return tokenBlacklist.has(token);
};