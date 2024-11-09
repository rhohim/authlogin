import db from '../utils/connectDB'
import UserType from '../type/user.type'

export const getallUserService = async (): Promise<UserType[]> => {
  const sql = 'SELECT * FROM user'

  return new Promise((resolve, reject) => {
    db.query(sql, (error: any, result: UserType[]) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

export const postUserService = async (
  username: string,
  fullname: string,
  email: string,
  password: string,
  created: string,
  updated: string,
  last_login: string,
): Promise<UserType> => {
  const sql = 'INSERT INTO user (username, fullname, email, password, created, updated, last_login) VALUES (?,?,?,?,?,?,?)'
  const values = [username, fullname, email, password, created, updated, last_login]

  return new Promise((resolve, reject) => {
    db.query(sql, values, (error: any, result: any) => {
      if (error) {
        reject(error)
      } else {
        resolve({
          id: result.insertId,
          username,
          fullname,
          email,
          password,
          created,
          updated,
          last_login,
        } as UserType)
      }
    })
  })
}

export const deleteAllUserService = async (): Promise<void> => {
  const sql = 'DELETE FROM user'

  return new Promise((resolve, reject) => {
    db.query(sql, (error: any, result: any) => {
      if (error) {
        console.error('Error Deleting User: ', error)
        return reject(error)
      }

      const resetAutoIncrement = 'ALTER TABLE User AUTO_INCREMENT = 1'
      db.query(resetAutoIncrement, (error: any, result: any) => {
        if (error) {
          console.error('Error resetting auto-increment counter: ', error)
          return reject(error)
        }

        resolve()
      })
    })
  })
}

export const getUserByIdService = async (UserId: number): Promise<UserType> => {
  const sql = 'SELECT * FROM user WHERE id = ?'

  return new Promise((resolve, reject) => {
    db.query(sql, [UserId], (error: any, result: any) => {
      if (error) {
        console.error('Error Fetching User: ', error)
        return reject(error)
      }

      if (result.length === 0) {
        return reject(new Error('User Not Found'))
      }

      resolve(result[0])
    })
  })
}

export const deleteUserByIdService = async (UserId: number): Promise<void> => {
  const sql = 'DELETE FROM user WHERE id = ?'

  return new Promise((resolve, reject) => {
    db.query(sql, [UserId], (error: any, result: any) => {
      if (error) {
        console.error('Error Deleting User: ', error)
        return reject(error)
      }

      if (result.affectedRows === 0) {
        return reject(new Error('User Not Found'))
      }

      resolve()
    })
  })
}

export const updateUserByIdService = async (
  UserId: number,
  UserData: Partial<UserType>
): Promise<UserType> => {
  const fetchSql = 'SELECT username, fullname, email, password, created, updated, last_login FROM user WHERE id = ?'

  return new Promise((resolve, reject) => {
    db.query(fetchSql, [UserId], (fetchError: any, fetchResult: any) => {
      if (fetchError) {
        console.error('Error Fetching User Details: ', fetchError)
        return reject(fetchError)
      }

      if (fetchResult.length === 0) {
        return reject(new Error('User Not Found'))
      }

      const existingValues = fetchResult[0]
      const updateUsername = UserData.username !== undefined ? UserData.username : existingValues.username
      const updateFullname = UserData.fullname !== undefined ? UserData.fullname : existingValues.fullname
      const updateEmail = UserData.email !== undefined ? UserData.email : existingValues.email
      const updatePassword = UserData.password !== undefined ? UserData.password : existingValues.password
      const updateCreated = UserData.created !== undefined ? UserData.created : existingValues.created
      const updateUpdated = UserData.updated !== undefined ? UserData.updated : existingValues.updated
      const updateLast_login = UserData.last_login !== undefined ? UserData.last_login : existingValues.last_login

      const updateSql = 'UPDATE User SET username = ?, fullname = ?, email= ?, password= ?, created= ?, updated= ?, last_login= ? WHERE id = ?'
      const values = [updateUsername,updateFullname,updateEmail,updatePassword,updateCreated,updateUpdated,updateLast_login, UserId]

      db.query(updateSql, values, (error: any, result: any) => {
        if (error) {
          console.error('Error Updating User: ', error)
          return reject(error)
        }

        resolve({
          id: UserId,
          username: updateUsername,
          fullname : updateFullname,
          email : updateEmail,
          // password : updatePassword,
          created : updateCreated,
          updated : updateUpdated,
          last_login : updateLast_login
        } as UserType)
      })
    })
  })
}
