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
--------------------ROLE------------------
--Role là một tập hợp bao gồm các quyền và các role khác.  
--Role được gán cho các user hoặc các role khác. 

--Lấy tất cả roles
 select * from DBA_ROLES;
--Lấy role name:
 select role from DBA_ROLES;

 --tạo 1 role mới
 CREATE ROLE myrole; 

 -- gán quyền cho user/ role
 GRANT quyền To user/role;
 GRANT DELETE ANY TABLE TO salapati;

--	Xem thông tin các quyền hệ thống đã được gán cho user hiện tại: 
SELECT * FROM user_sys_privs; 
--  Xem thông tin các quyền đối tượng đã được gán cho user hiện tại: 
SELECT * FROM user_tab_privs_recd; 



--lấy tất cả profiles và user có profile đó
SELECT DBA_PROFILES.profile, resource_name, limit, USERNAME,created
FROM DBA_PROFILES  inner join DBA_USERS  on DBA_PROFILES.profile = DBA_USERS.profile ORDER BY created DESC;





-------------------------------------------------------
-- Hàm kiểm tra username password
CREATE OR REPLACE FUNCTION validateUser (username IN VARCHAR2,
passwd IN VARCHAR2)
RETURN NUMBER
IS
lv_pwd_raw RAW (128);
lv_enc_raw RAW (2048);
lv_user_hash RAW (128);
lv_user_salt RAW (128);
lv_hash_found VARCHAR2 (300);
BEGIN
  SELECT SUBSTR (spare4, 3, 40)
  INTO lv_user_hash
  FROM sys.user$
  WHERE name = UPPER (username);

  SELECT SUBSTR (spare4, 43, 20)
  INTO lv_user_salt
  FROM sys.user$
  WHERE name = UPPER (username);

  lv_pwd_raw := UTL_RAW.cast_to_raw (passwd) || HEXTORAW (lv_user_salt);
  lv_enc_raw := sys.DBMS_CRYPTO.hash (lv_pwd_raw, DBMS_CRYPTO.hash_sh1);
  lv_hash_found := UTL_RAW.cast_to_varchar2 (lv_enc_raw);

  IF lv_enc_raw = lv_user_hash
  THEN
    RETURN 1;
  ELSE
    RETURN 0;
  END IF;
  EXCEPTION
  WHEN NO_DATA_FOUND
  THEN
    RETURN 0;
  WHEN OTHERS
  THEN
    raise_application_error (
    -20001,
    'An error was encountered - ' || SQLCODE || ' -ERROR- ' || SQLERRM);
END;

select validateUser('SUPPER', 'supper') from dual;

--tạo user------
CREATE USER sidney 
    IDENTIFIED BY out_standing1 
    DEFAULT TABLESPACE example 
    TEMPORARY TABLESPACE temp
    QUOTA 10M ON example 
    QUOTA 5M ON system 
    PROFILE app_user;
  
--select table space name
 SELECT TABLESPACE_NAME FROM USER_TABLESPACES where status='ONLINE';

------------Profiles----------------
CREATE PROFILE developer_hieu LIMIT
  SESSIONS_PER_USER 2
  IDLE_TIME 60
  CONNECT_TIME 480;

ALTER PROFILE developer_hieu LIMIT
  SESSIONS_PER_USER 5
  CONNECT_TIME 600
  IDLE_TIME 30;

  --xóa
DROP PROFILE test CASCADE;

--lấy list tên profile
select distinct PROFILE from DBA_PROFILES;