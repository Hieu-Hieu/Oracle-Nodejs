import Open from '../config.js'

let data = [];

const list = () => {
  let sql = `SELECT * FROM DBA_USERS ORDER BY created DESC`;
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

const listRoles = () => {
  let sql = 'select * from DBA_ROLES';
  const result = Open(sql, [], false);
  data = result;

  return data;
}

const listProfiles = () => {
  let sql = `SELECT * FROM DBA_USERS ORDER BY created DESC`;
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
};