-------------Hieu--------------------------------------

--tạo user supper
CREATE USER supper IDENTIFIED BY supper;
GRANT ALL PRIVILEGES TO super;
---------------------

grant select,insert, update ON DBA_TS_QUOTAS to supper;
grant select,insert, update ON DBA_PROFILES to supper;
grant select,insert, update ON DBA_SYS_PRIVS to supper;
grant select,insert, update ON DBA_ROLES to supper;

SELECT * FROM DBA_SYS_PRIVS;
  
SELECT * FROM DBA_TAB_PRIVS;
  
SELECT * FROM DBA_ROLE_PRIVS;

--Lấy tất cả roles
 select * from DBA_ROLES;
-------------------------------------------------------
