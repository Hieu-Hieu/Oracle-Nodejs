// var oracledb = require('oracledb');
import oracledb from 'oracledb';

const cns = {
  user: "supper",
  password: "supper",
  connectString: "localhost:1521/ORCLPDB"
}

async function Open(sql, binds, autoCommit) {
  let cnn = await oracledb.getConnection(cns);
  let result = await cnn.execute(sql, binds, { autoCommit });
  cnn.release();
  return result;
}

export default Open;
