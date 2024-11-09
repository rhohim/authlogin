import { Application, Router } from 'express'
import UserRoute from './user.route'
import AuthRoute from '../routes/auth.route'
import swaggerRoute from '../routes/swaggerRoute'
import swaggerUi from 'swagger-ui-express'

const _routes: Array<[string, Router]> = [
  ['/api/user', UserRoute],
  ['/api', AuthRoute]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerRoute))
}
