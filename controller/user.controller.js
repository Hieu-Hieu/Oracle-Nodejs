export const selectAllUsers = async (req, res) => {
  let result;
  try {
    connection = await oracledb.getConnection({
      user: "supper",
      password: "supper",
      connectString: "localhost:1521/ORCLPDB"
    });

    console.log('connected to database');
    // run query to get all employees select username from dba_users;
    // result = await connection.execute(
    //   "CREATE TABLE abcde (" +
    //   "id INT PRIMARY KEY," +
    //   "color VARCHAR2 (100) NOT NULL)");

    result = await connection.execute("SELECT * FROM session_privs ORDER BY privilege");
    if (result) {
      console.log('ok')
    }

  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    // if (result.rows.length == 0) {
    //   //query return zero employees
    //   return res.send('query send no rows');
    // } else {
    //   //send all employees
    //   return res.send(result.rows);
    // }
    if (result) {
      return res.send(result)
    }

  }
}