import Open from '../config.js'

let data = [];

const list = () => {
  let sql = `SELECT * FROM DBA_USERS ORDER BY created DESC`;
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const listUserName = () => {
  let sql = 'SELECT username FROM DBA_USERS ORDER BY created DESC';
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const listQuotas = () => {
  let sql = 'select * from DBA_TS_QUOTAS';
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const listPrivileges = () => {
  let sql = 'SELECT * FROM DBA_SYS_PRIVS';
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const listPrivilegesByUserName = (name) => {
  let sql = `SELECT * FROM DBA_SYS_PRIVS where grantee = ${name}`;
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const listRoles = () => {
  // let sql = 'select * from DBA_ROLES order by role_id desc';
  let sql = 'select * from DBA_ROLES';
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const listProfiles = () => {
  let sql = `SELECT DBA_PROFILES.profile, resource_name, limit, USERNAME,created
  FROM DBA_PROFILES  inner join DBA_USERS  on DBA_PROFILES.profile = DBA_USERS.profile ORDER BY created DESC`;
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const isValidUsernamePassword = (username, password) => {
  let sql = `select validateUser(${username}, ${password}) from dual`;
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const addProfile = (NAME, SESSIONS_PER_USER, IDLE_TIME, CONNECT_TIME) => {

  let sql = `CREATE PROFILE ${NAME} LIMIT
  SESSIONS_PER_USER ${SESSIONS_PER_USER}
  IDLE_TIME ${IDLE_TIME}
  CONNECT_TIME ${CONNECT_TIME}`;
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const updateProfile = (NAME, SESSIONS_PER_USER, IDLE_TIME, CONNECT_TIME) => {

  let sql = `ALTER PROFILE ${NAME} LIMIT
  SESSIONS_PER_USER ${SESSIONS_PER_USER}
  IDLE_TIME ${IDLE_TIME}
  CONNECT_TIME ${CONNECT_TIME}`;
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const deleteProfile = (NAME) => {

  let sql = `DROP PROFILE ${NAME} CASCADE`
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const dropUser = (NAME) => {

  let sql = `DROP USER ${NAME}`
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const listProfileName = (NAME) => {

  let sql = 'select distinct PROFILE from DBA_PROFILES'
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const addRole = (NAME, PASSWORD) => {
  let sql = `CREATE ROLE ${NAME}`
  if (PASSWORD && PASSWORD !== '') {
    sql = `CREATE ROLE ${NAME} IDENTIFIED BY ${PASSWORD}`
  }
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const alterRole = (NAME, PASSWORD) => {
  let sql = `ALTER ROLE ${NAME} IDENTIFIED BY ${PASSWORD}`
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const dropRole = (NAME) => {

  let sql = `DROP ROLE ${NAME}`
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const grantPrivToUser = (NAME, PRIV) => {

  let sql = `GRANT ${PRIV} TO ${NAME}`
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const listTableSpace = () => {
  let sql = `SELECT TABLESPACE_NAME FROM USER_TABLESPACES where status='ONLINE'`;
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const createUser = (sql) => {
  const result = Open(sql, [], false);
  data = result;

  return data;
}


export const userModel =
{
  list,
  listProfiles,
  listQuotas,
  listRoles,
  listPrivileges,
  addProfile,
  deleteProfile,
  updateProfile,
  listProfileName,
  dropRole,
  addRole,
  alterRole,
  listUserName,
  grantPrivToUser,
  listTableSpace,
  createUser,
  dropUser,
};