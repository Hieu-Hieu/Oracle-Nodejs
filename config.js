// var oracledb = require('oracledb');
import oracledb from 'oracledb';
global.USERNAME = '';
global.PASSWORD = '';

async function Open(sql, binds, autoCommit) {
  console.log('glo: ' + USERNAME)
  const cns = {
    user: global.USERNAME || "supper",
    password: global.PASSWORD || "supper",
    connectString: "localhost:1521/ORCLPDB"
  }

  let cnn = await oracledb.getConnection(cns);
  let result = await cnn.execute(sql, binds, { autoCommit });
  cnn.release();
  console.log(cnn._events)
  return result;
}

export default Open;
