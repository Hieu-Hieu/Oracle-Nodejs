import oracledb from 'oracledb';
import { userModel } from '../models/user.model.js'
import jwt from 'jsonwebtoken';

const getAllUsers = async (req, res) => {
  try {
    const result = await userModel.list();
    const lsst = await userModel.listUserName();
    let listUName = [];
    lsst.rows.map(x => listUName.push(x[0]))

    if (result) {
      let Users = [];

      result.rows.map(user => {
        let userSchema = {
          "ID": user[1],
          "USERNAME": user[0],
          "LOCK_DATE": user[4] ? user[4] : 'Not set',
          "ACCOUNT_STATUS": user[3],
          "CREATED": user[9],
          "DEFAULT_TABLESPACE": user[6],
          "TEMPORARY_TABLESPACE": user[7],
          "PROFILE": user[10],
        }

        Users.push(userSchema);
      });

      // res.json(Users);
      res.render('home', { users: Users, listUName });
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
    const listUName = await userModel.listUserName();
    let listUserName = [];
    listUName.rows.map(x => listUserName.push(x[0]))
    // console.log(listUserName)
    const listPrivName = ['CREATE PROFILE', 'ALTER PROFILE', 'DROP PROFILE', 'CREATE ROLE', 'ALTER ANY ROLE', 'DROP ANY ROLE', 'GRANT ANY ROLE',
      'CREATE SESSION', 'CREATE ANY TABLE', 'ALTER ANY TABLE', 'DROP ANY TABLE', 'SELECT ANY TABLE', 'DELETE ANY TABLE', 'INSERT ANY TABLE', 'UPDATE ANY TABLE',
      'CREATE TABLE', 'CREATE USER', 'ALTER USER', 'DROP USER']
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

      res.render('privileges', { users: Users, listPrivName, listUserName });

    }
  } catch (error) {
    console.log(error)
    res.render('privileges', { users: null, error: error })
  }
}

const getPrv = async (req, res) => {
  // try {
  //   if (req.params.username)
  //     const result = await userModel.listPrivilegesByUserName(req.params.username);
  //   const listUName = await userModel.listUserName();
  //   let listUserName = [];
  //   listUName.rows.map(x => listUserName.push(x[0]))
  //   // console.log(listUserName)
  //   const listPrivName = ['CREATE PROFILE', 'ALTER PROFILE', 'DROP PROFILE', 'CREATE ROLE', 'ALTER ANY ROLE', 'DROP ANY ROLE', 'GRANT ANY ROLE',
  //     'CREATE SESSION', 'CREATE ANY TABLE', 'ALTER ANY TABLE', 'DROP ANY TABLE', 'SELECT ANY TABLE', 'DELETE ANY TABLE', 'INSERT ANY TABLE', 'UPDATE ANY TABLE',
  //     'CREATE TABLE', 'CREATE USER', 'ALTER USER', 'DROP USER']
  //   if (result) {
  //     let Users = [];

  //     result.rows.map(user => {
  //       let userSchema = {
  //         "GRANTEE": user[0],
  //         "PRIVILEGE": user[1],
  //         "ADMIN_OPTION": user[2],
  //         "COMMON": user[3],
  //         "INHERITED": user[4],
  //       }

  //       Users.push(userSchema);
  //     });

  //     res.send(Users);

  //   }
  // } catch (error) {
  //   console.log(error)
  //   // res.render('privileges', { users: null, error: error })
  // }
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
    const listProfileName = await userModel.listProfileName();
    let lisProfileNames = [];
    listProfileName.rows.map(x => lisProfileNames.push(x[0]))
    console.log(lisProfileNames)

    if (result) {
      let profiles = [];

      result.rows.map(p => {
        let profileSchema = {
          "PROFILE": p[0],
          "RESOURCE_NAME": p[1],
          "LIMIT": p[2],
          "USERNAME": p[3],
        }

        profiles.push(profileSchema);
      });

      res.render('profiles', { profiles, lisProfileNames });

    }

  } catch (error) {
    console.log(error)
    res.render('profiles', { profiles: null, error: error, lisProfileNames })
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
        { expiresIn: "30h" }
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

const addProfile = async (req, res) => {
  try {
    console.log(req.body)
    const NAME = req.body.NAME || DEFAULT;
    const SESSIONS_PER_USER = req.body.SESSIONS_PER_USER || DEFAULT;
    const IDLE_TIME = req.body.IDLE_TIME || DEFAULT;
    const CONNECT_TIME = req.body.CONNECT_TIME || DEFAULT;

    const result = await userModel.addProfile(NAME, SESSIONS_PER_USER, IDLE_TIME, CONNECT_TIME);

    if (result) {
      // res.render('profiles', { profiles });
      res.redirect('users/profiles')
    }

  } catch (error) {
    console.log(error)
    res.render('profiles', { profiles: null, error: error })
  }
}

const updateProfile = async (req, res) => {
  try {
    console.log(req.body)
    const NAME = req.body.NAME || DEFAULT;
    const SESSIONS_PER_USER = req.body.SESSIONS_PER_USER || DEFAULT;
    const IDLE_TIME = req.body.IDLE_TIME || DEFAULT;
    const CONNECT_TIME = req.body.CONNECT_TIME || DEFAULT;

    const result = await userModel.updateProfile(NAME, SESSIONS_PER_USER, IDLE_TIME, CONNECT_TIME);

    if (result) {
      // res.render('profiles', { profiles });
      res.redirect('users/profiles')
    }

  } catch (error) {
    console.log(error)
    res.render('profiles', { profiles: null, error: error })
  }
}

const removeProfile = async (req, res) => {
  try {

    const NAME = req.body.NAME;
    if (NAME) {
      const result = await userModel.deleteProfile(NAME);

      if (result) {
        // res.render('profiles', { profiles });
        res.redirect('users/profiles')
      }
    } else {
      res.redirect('users/profiles')
    }

  } catch (error) {
    console.log(error)
    res.render('profiles', { profiles: null, error: error })
  }
}

const addRole = async (req, res) => {
  try {

    const NAME = req.body.NAME;
    const PASSWORD = req.body.PASSWORD || '';

    if (NAME) {
      const result = await userModel.addRole(NAME, PASSWORD);

      if (result) {
        // res.render('profiles', { profiles });
        console.log('add role success')
        res.redirect('users/roles')
      }
    } else {
      res.redirect('users/roles')
      console.log('no data')
    }

  } catch (error) {
    console.log(error)
    res.redirect('users/roles')
    // res.render('profiles', { profiles: null, error: error })
  }
}

const dropRole = async (req, res) => {
  try {

    const NAME = req.body.NAME;

    if (NAME) {
      const result = await userModel.dropRole(NAME);
      res.redirect('users/roles')
    } else {
      res.redirect('users/roles')
    }

  } catch (error) {
    console.log(error)
    res.redirect('users/roles')
    // res.render('profiles', { profiles: null, error: error })
  }
}

const dropUser = async (req, res) => {
  try {

    const NAME = req.body.NAME;

    if (NAME) {
      const result = await userModel.dropUser(NAME);
      res.redirect('/users')
    } else {
      res.redirect('/users')
    }

  } catch (error) {
    console.log(error)
    res.redirect('users')
    // res.render('profiles', { profiles: null, error: error })
  }
}

const alterRole = async (req, res) => {
  try {

    const NAME = req.body.NAME;
    const PASSWORD = req.body.PASSWORD;

    if (NAME && PASSWORD) {
      const result = await userModel.alterRole(NAME, PASSWORD);
      console.log(result);
      res.redirect('users/roles')
    } else {
      res.redirect('users/roles')
    }

  } catch (error) {
    console.log(error)
    res.redirect('users/roles')
    // res.render('profiles', { profiles: null, error: error })
  }
}

const grantPrivilegeToUser = async (req, res) => {
  try {

    const NAME = req.body.NAME;
    const PRIVILEGE = req.body.PRIVILEGE;

    if (NAME && PRIVILEGE) {
      const result = await userModel.grantPrivToUser(NAME, PRIVILEGE);
      // console.log(result);
      // console.log("Name " + NAME + " P: " + PRIVILEGE)
      res.redirect('users/privileges')
    } else {
      res.redirect('users/privileges')
    }

  } catch (error) {
    console.log(error)
    res.redirect('users/privileges')
    // res.render('profiles', { profiles: null, error: error })
  }
}

const getUserProfile = async (req, res) => {
  try {

    // res.json(Users);
    res.render('userProfile', {});
    // res.send(result)

  } catch (error) {
    console.log(error)
    res.render('userProfile', { users: null, error: error })
  }
}

const loadDataCreateUser = async (req, res) => {
  try {

    const tableSpaces = await userModel.listTableSpace();
    const profileNames = await userModel.listProfileName();
    let listTableSpace = [];
    let listProfileName = [];
    tableSpaces.rows.map(x => listTableSpace.push(x[0]))
    profileNames.rows.map(x => listProfileName.push(x[0]))
    // res.send({ listProfileName, listTableSpace })
    // res.json(Users);
    res.render('addUser', { listTableSpace, listProfileName });
    // res.send(result)

  } catch (error) {
    console.log(error)
    // res.render('userProfile', { users: null, error: error })
  }
}

const createUser = async (req, res) => {
  try {
    const { USERNAME, PASSWORD, DEFAULT_TABLESPACE, QUOTA, QUOTA_ON, PROFILE } = req.body;
    let sql = '';
    if (USERNAME && PASSWORD) {
      sql = `CREATE USER ${USERNAME} 
      IDENTIFIED BY ${PASSWORD} `
      if (DEFAULT_TABLESPACE) {
        sql += `DEFAULT TABLESPACE ${DEFAULT_TABLESPACE} `
      }
      if (QUOTA && QUOTA_ON) {
        sql += `QUOTA ${QUOTA} ON ${QUOTA_ON} `
      }
      if (PROFILE) {
        sql += `PROFILE ${PROFILE}`
      }
    }
    const result = await userModel.createUser(sql);
    console.log(sql);
    res.redirect('/users')

  } catch (error) {
    console.log(error)
    res.render('userProfile', { users: null, error: error })
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
  addProfile,
  updateProfile,
  removeProfile,
  addRole,
  dropRole,
  alterRole,
  grantPrivilegeToUser,
  getPrv,
  getUserProfile,
  loadDataCreateUser,
  createUser,
  dropUser,
};

