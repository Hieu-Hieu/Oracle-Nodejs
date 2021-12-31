import { userModel } from '../models/user.model.js'

const getAllUsers = async (req, res) => {
  try {
    const result = await userModel.list();
    if (result) {
      let Users = [];

      result.rows.map(user => {
        let userSchema = {
          "id": user[1],
          "username": user[0],
          "expiryDate": user[5],
          "status": user[3]
        }

        Users.push(userSchema);
      });

      // res.json(Users);
      res.render('home', { users: Users });
      // res.send(result)
    }
  } catch (error) {
    console.log(error)
    res.render('home', { users: null, error: error })
  }
}

const getAllPrivileges = async (req, res) => {
  try {
    const result = await userModel.listPrivileges();
    if (result) {
      let Users = [];

      result.rows.map(user => {
        let userSchema = {
          "GRANTEE": user[0],
          "PRIVILEGE": user[1],
          "ADMIN_OPTION": user[2],
          "COMMON": user[3],
          "INHERITED": user[4],
        }

        Users.push(userSchema);
      });

      res.render('privileges', { users: Users });

    }
  } catch (error) {
    console.log(error)
    res.render('privileges', { users: null, error: error })
  }
}

const getAllQuotas = async (req, res) => {
  try {
    const result = await userModel.listQuotas();
    if (result) {
      let quotas = [];

      result.rows.map(user => {
        let quotaSchema = {
          "TABLESPACE_NAME": user[0],
          "USERNAME": user[1],
          "BYTES": user[2],
          "MAX_BYTES": user[3],
          "BLOCKS": user[4],
          "MAX_BLOCKS": user[5],
          "DROPPED": user[6],
        }

        quotas.push(quotaSchema);
      });

      res.render('quotas', { quotas });

    }
  } catch (error) {
    console.log(error)
    res.render('quotas', { quotas: null, error: error })
  }
}

const getAllRoles = async (req, res) => {
  try {
    const result = await userModel.listRoles();
    if (result) {
      let roles = [];

      result.rows.map(user => {
        let roleSchema = {
          "ROLE": user[0],
          "ROLE_ID": user[1],
          "PASSWORD_REQUIRED": user[2],
          "AUTHENTICATION_TYPE": user[3],
          "COMMON": user[4],
          "ORACLE_MAINTAINED": user[5],
          "INHERITED": user[6],
          "IMPLICIT": user[7],
          "EXTERNAL_NAME": user[8],
        }

        roles.push(roleSchema);
      });

      res.render('roles', { roles });

    }

  } catch (error) {
    console.log(error)
    res.render('roles', { roles: null, error: error })
  }
}

export const userController =
{
  getAllUsers,
  getAllPrivileges,
  getAllQuotas,
  getAllRoles,
};