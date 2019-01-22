import {getChildPerms} from '../models/permissions.types'

/**
 * middleware that checks if user has required permissions to access a route
 * Only supports one required permission at the moment
 * 
 */


module.exports = (requiredPerm) => {
  return (req, res, next) => {

    const userPerms = req.user.permissions

    // Admin-permission can access every route
    if (req.user.permissions.some((perm) => perm === 'ADMIN')) {
      next()
      return
    }

    // check if required permission can be found for user
    if (userPerms.some((userPerm) => (userPerm === requiredPerm) || (getChildPerms(userPerm).includes(requiredPerm)))) {
      next()
    } else {
      return res.status(401).send({message: 'Unauhorized access!'})
    }
  }
}