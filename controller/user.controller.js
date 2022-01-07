import oracledb from 'oracledb';
import { userModel } from '../models/user.model.js'
import jwt from 'jsonwebtoken';

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

const getAllProfiles = async (req, res) => {
  try {
    const result = await userModel.listProfiles();
    if (result) {
      let profiles = [];

      result.rows.map(p => {
        let profileSchema = {
          "PRFILE": p[0],
          "RESOURCE_NAME": p[1],
          "LIMIT": p[2],
          "USERNAME": p[3],
        }

        profiles.push(profileSchema);
      });

      res.render('profiles', { profiles });

    }

  } catch (error) {
    console.log(error)
    res.render('roles', { roles: null, error: error })
  }
}

const checkLogin = async (username, password) => {
  console.log(password)
  const cns = {
    user: username,
    password: password,
    connectString: "localhost:1521/ORCLPDB"
  }
  try {
    let cnn = await oracledb.getConnection(cns);

    if (cnn._events) {
      return true;
    }

  } catch (error) {
    return false;
  }

  return false;
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const a = await checkLogin(username, password)

    if (a) {
      global.PASSWORD = password;
      global.USERNAME = username;

      const token = jwt.sign(
        { username, password },
        "hieu@123",
        { expiresIn: "2h" }
      );

      res
        .status(201)
        .cookie('token', 'Bearer ' + token, {
          expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
        })
        .cookie('isAdmin', true)
        .redirect('/users')

    } else {
      console.log('not login')
      res.render('login', { message: 'Sai tài khoản hoặc mật khẩu' })
    }
  } catch (err) {
    console.log('catch login')
    res.render('login', { message: 'Sai tài khoản hoặc mật khẩu' })
  }

}

export const userController =
{
  getAllUsers,
  getAllPrivileges,
  getAllQuotas,
  getAllRoles,
  login,
  getAllProfiles,
};