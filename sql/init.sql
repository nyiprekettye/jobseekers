--------------------------------------------------------
--  File created - vas�rnap-m�jus-06-2018   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Sequence COMPANY_RATING_SEQUENCE
--------------------------------------------------------

   CREATE SEQUENCE  "COMPANY_RATING_SEQUENCE"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 61 CACHE 20 NOORDER  NOCYCLE ;
--------------------------------------------------------
--  DDL for Sequence COMPANY_SEQUENCE
--------------------------------------------------------

   CREATE SEQUENCE  "COMPANY_SEQUENCE"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 81 CACHE 20 NOORDER  NOCYCLE ;
--------------------------------------------------------
--  DDL for Sequence JOB_ADVERTISEMENT_SEQUENCE
--------------------------------------------------------

   CREATE SEQUENCE  "JOB_ADVERTISEMENT_SEQUENCE"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 101 CACHE 20 NOORDER  NOCYCLE ;
--------------------------------------------------------
--  DDL for Sequence JOBSEEKER_LAST_LOGIN_SEQUENCE
--------------------------------------------------------

   CREATE SEQUENCE  "JOBSEEKER_LAST_LOGIN_SEQUENCE"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 21 CACHE 20 NOORDER  NOCYCLE ;
--------------------------------------------------------
--  DDL for Sequence JOBSEEKERS_APPLY_JOB_SEQUENCE
--------------------------------------------------------

   CREATE SEQUENCE  "JOBSEEKERS_APPLY_JOB_SEQUENCE"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 61 CACHE 20 NOORDER  NOCYCLE ;
--------------------------------------------------------
--  DDL for Sequence JOBSEEKERS_CV_SEQUENCE
--------------------------------------------------------

   CREATE SEQUENCE  "JOBSEEKERS_CV_SEQUENCE"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 41 CACHE 20 NOORDER  NOCYCLE ;
--------------------------------------------------------
--  DDL for Sequence JOBSEEKERS_JOB_TYPE_SEQUENCE
--------------------------------------------------------

   CREATE SEQUENCE  "JOBSEEKERS_JOB_TYPE_SEQUENCE"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 161 CACHE 20 NOORDER  NOCYCLE ;
--------------------------------------------------------
--  DDL for Sequence JOBSEEKERS_RATING_SEQUENCE
--------------------------------------------------------

   CREATE SEQUENCE  "JOBSEEKERS_RATING_SEQUENCE"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 21 CACHE 20 NOORDER  NOCYCLE ;
--------------------------------------------------------
--  DDL for Sequence JOBSEEKERS_SEQUENCE
--------------------------------------------------------

   CREATE SEQUENCE  "JOBSEEKERS_SEQUENCE"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 161 CACHE 20 NOORDER  NOCYCLE ;
--------------------------------------------------------
--  DDL for Table JOBSEEKERS_RATING
--------------------------------------------------------

  CREATE TABLE "JOBSEEKERS_RATING" 
   (	"ID" NUMBER(10,0), 
	"JOBSEEKER_ID" NUMBER(10,0), 
	"COMPANY_ID" NUMBER(10,0), 
	"RATING" NUMBER(10,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table JOBSEEKERS_JOB_TYPE
--------------------------------------------------------

  CREATE TABLE "JOBSEEKERS_JOB_TYPE" 
   (	"ID" NUMBER(10,0), 
	"JOBSEEKER_ID" NUMBER(10,0), 
	"JOB_TYPE_ID" NUMBER(10,0), 
	"PROFESSION" VARCHAR2(2 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table JOBSEEKERS_CV
--------------------------------------------------------

  CREATE TABLE "JOBSEEKERS_CV" 
   (	"ID" NUMBER(10,0), 
	"JOBSEEKER_ID" NUMBER(10,0), 
	"NAME" VARCHAR2(300 BYTE), 
	"JOBSEEKERS_CV_LANGUAGE" VARCHAR2(30 BYTE), 
	"CONTENT" VARCHAR2(3000 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table JOBSEEKERS_APPLY_JOB
--------------------------------------------------------

  CREATE TABLE "JOBSEEKERS_APPLY_JOB" 
   (	"ID" NUMBER(10,0), 
	"JOBSEEKER_ID" NUMBER(10,0), 
	"JOB_ADVERTISEMENT_ID" NUMBER(10,0), 
	"ISAPPLY" VARCHAR2(2 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table JOBSEEKERS_ADMIN
--------------------------------------------------------

  CREATE TABLE "JOBSEEKERS_ADMIN" 
   (	"ID" NUMBER(10,0), 
	"USERNAME" VARCHAR2(200 BYTE), 
	"PASSWORD" VARCHAR2(200 BYTE), 
	"EMAIL" VARCHAR2(200 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table JOBSEEKERS
--------------------------------------------------------

  CREATE TABLE "JOBSEEKERS" 
   (	"ID" NUMBER(10,0), 
	"NAME" VARCHAR2(200 BYTE), 
	"PASSWORD" VARCHAR2(200 BYTE), 
	"EMAIL" VARCHAR2(200 BYTE), 
	"REGSTRATION_DATE" DATE DEFAULT (sysdate), 
	"CITY" VARCHAR2(100 BYTE), 
	"BIRTH" NUMBER(10,0), 
	"ACTIVE" VARCHAR2(3 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table JOBSEEKER_LAST_LOGIN
--------------------------------------------------------

  CREATE TABLE "JOBSEEKER_LAST_LOGIN" 
   (	"ID" NUMBER(10,0), 
	"JOBSEEKER_ID" NUMBER(10,0), 
	"LAST_LOGIN_DATE" DATE DEFAULT (sysdate)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table JOB_TYPE
--------------------------------------------------------

  CREATE TABLE "JOB_TYPE" 
   (	"ID" NUMBER(10,0), 
	"JOB_TYPE_NAME" VARCHAR2(500 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table JOB_ADVERTISEMENT
--------------------------------------------------------

  CREATE TABLE "JOB_ADVERTISEMENT" 
   (	"ID" NUMBER(10,0), 
	"COMPANY_ID" NUMBER(10,0), 
	"JOB_TYPE_ID" NUMBER(10,0), 
	"ADV_INSPECTED" VARCHAR2(13 BYTE), 
	"ADV_ARCHIVE" VARCHAR2(10 BYTE), 
	"NAME" VARCHAR2(200 BYTE), 
	"DESCRIPTION" VARCHAR2(3000 BYTE), 
	"CITY" VARCHAR2(200 BYTE), 
	"PAYMENT" NUMBER, 
	"JOB_GIVE_UP_DATE" DATE DEFAULT (sysdate)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table COMPANY_RATING
--------------------------------------------------------

  CREATE TABLE "COMPANY_RATING" 
   (	"ID" NUMBER(10,0), 
	"JOBSEEKER_ID" NUMBER(10,0), 
	"COMPANY_ID" NUMBER(10,0), 
	"RATING" NUMBER(10,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table COMPANY
--------------------------------------------------------

  CREATE TABLE "COMPANY" 
   (	"ID" NUMBER(10,0), 
	"USERNAME" VARCHAR2(60 BYTE), 
	"PASSWORD" VARCHAR2(200 BYTE), 
	"NAME" VARCHAR2(200 BYTE), 
	"EMAIL" VARCHAR2(200 BYTE), 
	"TAX_NUMBER" NUMBER, 
	"ADDRESS_CITY" VARCHAR2(300 BYTE), 
	"ADDRESS" VARCHAR2(300 BYTE), 
	"REG_DATE" DATE DEFAULT (sysdate)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index SYS_C00270735
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYS_C00270735" ON "JOBSEEKERS_RATING" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index SYS_C00262070
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYS_C00262070" ON "JOBSEEKERS_JOB_TYPE" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index SYS_C00273712
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYS_C00273712" ON "JOBSEEKERS_CV" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index SYS_C00267313
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYS_C00267313" ON "JOBSEEKERS_APPLY_JOB" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index SYS_C00260894
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYS_C00260894" ON "JOBSEEKERS_ADMIN" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index SYS_C00262069
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYS_C00262069" ON "JOBSEEKERS" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index SYS_C00278432
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYS_C00278432" ON "JOBSEEKER_LAST_LOGIN" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index SYS_C00259742
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYS_C00259742" ON "JOB_TYPE" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index SYS_C00264157
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYS_C00264157" ON "JOB_ADVERTISEMENT" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index SYS_C00270738
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYS_C00270738" ON "COMPANY_RATING" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index SYS_C00256956
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYS_C00256956" ON "COMPANY" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Trigger JOBSEEKER_LAST_LOGIN
--------------------------------------------------------

  CREATE OR REPLACE TRIGGER "JOBSEEKER_LAST_LOGIN" 
	BEFORE INSERT ON JOBSEEKER_LAST_LOGIN   
    FOR EACH ROW 
    DECLARE 
    asd varchar2(30);
BEGIN 

	FOR LOOP_LAST_LOGIN IN ( 
		SELECT MAX(LAST_LOGIN_DATE) AS LAST_LOGIN_DATE, JOBSEEKER_ID 
		FROM JOBSEEKER_LAST_LOGIN 
		GROUP BY JOBSEEKER_ID
	)
	LOOP     
    
    
	 if to_date(sysdate, 'DD/MM/YYYY') -30 > to_date(LOOP_LAST_LOGIN.LAST_LOGIN_DATE, 'DD/MM/YYYY') then
		UPDATE JOBSEEKERS
		SET ACTIVE = '0'
		WHERE ID = LOOP_LAST_LOGIN.JOBSEEKER_ID ;
	  else
		UPDATE JOBSEEKERS
		SET ACTIVE = '1'
		WHERE ID = LOOP_LAST_LOGIN.JOBSEEKER_ID ;
	  end if;

	END LOOP LOOP_JOB_TYPE;
    
END;
/
ALTER TRIGGER "JOBSEEKER_LAST_LOGIN" ENABLE;
--------------------------------------------------------
--  DDL for Trigger JOBSEEKERS_ULOAD_PROFESSION
--------------------------------------------------------

  CREATE OR REPLACE TRIGGER "JOBSEEKERS_ULOAD_PROFESSION" 
	AFTER INSERT ON JOBSEEKERS   
    FOR EACH ROW 
    DECLARE 
    asd varchar2(30);
BEGIN 
	FOR LOOP_JOB_TYPE IN ( SELECT ID FROM JOB_TYPE )
	LOOP        
        INSERT INTO JOBSEEKERS_JOB_TYPE VALUES (
			JOBSEEKERS_JOB_TYPE_SEQUENCE.NEXTVAL, 
			:NEW.ID,
			LOOP_JOB_TYPE.ID,
			1
		);
	END LOOP LOOP_JOB_TYPE;
END;
/
ALTER TRIGGER "JOBSEEKERS_ULOAD_PROFESSION" ENABLE;
--------------------------------------------------------
--  DDL for Function UPDATE_ADVERTISEMENT_INSPECTED
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "UPDATE_ADVERTISEMENT_INSPECTED" 	(
		ADV_ID NUMBER, 
		var_INSPECTED VARCHAR2
		) 
	RETURN varchar2
    IS
        PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN 
    UPDATE JOB_ADVERTISEMENT SET ADV_INSPECTED =var_INSPECTED WHERE ID = ADV_ID ;
    commit;
	RETURN 'done';
END UPDATE_ADVERTISEMENT_INSPECTED;

/
--------------------------------------------------------
--  DDL for Function INSERT_JOBSEEKERS_JOB_TYPE
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "INSERT_JOBSEEKERS_JOB_TYPE" (
		U_JOBSEEKER_ID NUMBER, 
		U_JOB_TYPE_ID NUMBER
		) 
	RETURN varchar2
    IS
        PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN 
    INSERT INTO JOBSEEKERS_JOB_TYPE VALUES (
			JOBSEEKERS_JOB_TYPE_SEQUENCE.NEXTVAL, 
			U_JOBSEEKER_ID,
			U_JOB_TYPE_ID,
			1
		);
    commit;
	RETURN 'done';
END INSERT_JOBSEEKERS_JOB_TYPE;

/
--------------------------------------------------------
--  DDL for Function DELETE_JOBSEEKERS_APPLY_JOB
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "DELETE_JOBSEEKERS_APPLY_JOB" (
		U_APPLY_JOB_ID NUMBER
		) 
	RETURN varchar2
    IS
        PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN 
    DELETE FROM JOBSEEKERS_APPLY_JOB WHERE ID =U_APPLY_JOB_ID;
    commit;
	RETURN 'done';
END DELETE_JOBSEEKERS_APPLY_JOB;

/
--------------------------------------------------------
--  DDL for Function DEL_ABOVE_AND_INS_JOBSE_RATING
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "DEL_ABOVE_AND_INS_JOBSE_RATING" (
		U_JOBSEEKER_ID NUMBER, 
		U_COMPANY_ID NUMBER,
		U_RATING NUMBER
		) 
	RETURN varchar2
    IS
        PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN 
	DELETE FROM JOBSEEKERS_RATING 
		WHERE JOBSEEKER_ID =U_JOBSEEKER_ID
		AND COMPANY_ID =U_COMPANY_ID;

    INSERT INTO JOBSEEKERS_RATING VALUES (
			JOBSEEKERS_RATING_SEQUENCE.NEXTVAL, 
			U_JOBSEEKER_ID,
			U_COMPANY_ID,
			U_RATING
		);
    commit;
	RETURN 'done';
END DEL_ABOVE_AND_INS_JOBSE_RATING;

/
--------------------------------------------------------
--  DDL for Function JOBSEEKERS_INSERT_FUNC
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "JOBSEEKERS_INSERT_FUNC" (JOBSEEKERS_name VARCHAR2, JOBSEEKERS_email VARCHAR2, JOBSEEKERS_password VARCHAR2, JOBSEEKERS_city VARCHAR2, JOBSEEKERS_birth NUMBER) 
return varchar2
is
PRAGMA AUTONOMOUS_TRANSACTION;
begin
INSERT INTO JOBSEEKERS (ID, NAME, EMAIL, PASSWORD, CITY, BIRTH) VALUES (JOBSEEKERS_SEQUENCE.NEXTVAL, JOBSEEKERS_name, JOBSEEKERS_email, JOBSEEKERS_password, JOBSEEKERS_city, JOBSEEKERS_birth);
COMMIT;
return 'done';
end JOBSEEKERS_INSERT_FUNC;

/
--------------------------------------------------------
--  DDL for Function JOB_ADVERTISEMENT_INSERT_FUNC
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "JOB_ADVERTISEMENT_INSERT_FUNC" 	(
		COMPANY_ID NUMBER, 
		JOB_TYPE_ID NUMBER, 
		NAME VARCHAR2, 
		DESCRIPTION VARCHAR2, 
		CITY VARCHAR2,
        PAYMENT NUMBER
		) 
	RETURN varchar2
    IS
        PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN 
	INSERT INTO JOB_ADVERTISEMENT VALUES (
			JOB_ADVERTISEMENT_SEQUENCE.NEXTVAL, 
			COMPANY_ID, 
			JOB_TYPE_ID, 
			0,
            0,
			NAME, 
			DESCRIPTION, 
			CITY, 
            PAYMENT,
			sysdate
		);
	COMMIT;
	RETURN 'done';
END JOB_ADVERTISEMENT_INSERT_FUNC;

/
--------------------------------------------------------
--  DDL for Function UPDATE_ADVERTISEMENT_DATAS
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "UPDATE_ADVERTISEMENT_DATAS" 	(
		ADV_ID VARCHAR2, 
		ADV_COMPANY_ID VARCHAR2, 
		var_NAME VARCHAR2,
		var_DESC VARCHAR2,
		var_CITY VARCHAR2,
		var_PAYMENT NUMBER
        ) 
	RETURN varchar2
    IS
        PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN 
    UPDATE JOB_ADVERTISEMENT 
	SET NAME = var_NAME, 
	DESCRIPTION = var_DESC, 
	CITY = var_CITY, 
    PAYMENT = var_PAYMENT, 
	ADV_ARCHIVE = 0, 
	ADV_INSPECTED = 0 
	WHERE ID = ADV_ID AND COMPANY_ID =ADV_COMPANY_ID ;
    commit;
	RETURN 'done';
END UPDATE_ADVERTISEMENT_DATAS;

/
--------------------------------------------------------
--  DDL for Function UPDATE_JOBSEEKERS_APPLY_JOB
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "UPDATE_JOBSEEKERS_APPLY_JOB" (
		U_ID NUMBER,
		U_IS_APPLY VARCHAR2
		) 
	RETURN varchar2
    IS
        PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN 
	UPDATE JOBSEEKERS_APPLY_JOB 
	SET ISAPPLY = U_IS_APPLY
	WHERE ID = U_ID;
    commit;
	RETURN 'done';
END UPDATE_JOBSEEKERS_APPLY_JOB;

/
--------------------------------------------------------
--  DDL for Function INSERT_JOBSEEKER_FUNC
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "INSERT_JOBSEEKER_FUNC" (JOBSEEKERS_name VARCHAR2, JOBSEEKERS_email VARCHAR2, JOBSEEKERS_password VARCHAR2, JOBSEEKERS_city VARCHAR2) 
RETURN VARCHAR2 IS
   result NUMBER;
BEGIN
    --INSERT INTO JOBSEEKERS (ID) VALUES (JOBSEEKERS_SEQUENCE.NEXTVAL);
    INSERT INTO JOBSEEKERS (ID,NAME, EMAIL, PASSWORD, CITY) VALUES (JOBSEEKERS_SEQUENCE.NEXTVAL, JOBSEEKERS_name, JOBSEEKERS_email, JOBSEEKERS_password, JOBSEEKERS_city);
    result := 1;
    RETURN result;
END;

/
--------------------------------------------------------
--  DDL for Function UPDATE_JOBSEEKERS_JOB_TYPE
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "UPDATE_JOBSEEKERS_JOB_TYPE" (
		U_JOBSEEKER_ID NUMBER, 
		U_JOB_TYPE_ID NUMBER,
		U_PROFESSION VARCHAR2
		) 
	RETURN varchar2
    IS
        PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN 
    UPDATE JOBSEEKERS_JOB_TYPE 
	SET PROFESSION = U_PROFESSION
	WHERE JOBSEEKER_ID = U_JOBSEEKER_ID AND JOB_TYPE_ID = U_JOB_TYPE_ID ;
    commit;
	RETURN 'done';
END UPDATE_JOBSEEKERS_JOB_TYPE;

/
--------------------------------------------------------
--  DDL for Function UPDATE_ADVERTISEMENT_ARCHIVE
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "UPDATE_ADVERTISEMENT_ARCHIVE" 	(
		ADV_ID NUMBER, 
		var_ARCHIVE VARCHAR2
		) 
	RETURN varchar2
    IS
        PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN 
    UPDATE JOB_ADVERTISEMENT SET ADV_ARCHIVE =var_ARCHIVE, ADV_INSPECTED= 0 WHERE ID = ADV_ID ;
    commit;
	RETURN 'done';
END UPDATE_ADVERTISEMENT_ARCHIVE;

/
--------------------------------------------------------
--  DDL for Function DELETE_JOBSEEKERS_CV
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "DELETE_JOBSEEKERS_CV" (
		U_CV_ID NUMBER
		) 
	RETURN varchar2
    IS
        PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN 
    DELETE FROM JOBSEEKERS_CV WHERE ID =U_CV_ID;
    commit;
	RETURN 'done';
END DELETE_JOBSEEKERS_CV;

/
--------------------------------------------------------
--  DDL for Function INSERT_JOBSEEKER_LAST_LOGIN
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "INSERT_JOBSEEKER_LAST_LOGIN" (
		U_JOBSEEKER_ID NUMBER
		) 
	RETURN varchar2
    IS
        PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN 	
    INSERT INTO JOBSEEKER_LAST_LOGIN VALUES (
			JOBSEEKER_LAST_LOGIN_SEQUENCE.NEXTVAL, 
			U_JOBSEEKER_ID,
			sysdate
		);
        
    UPDATE JOBSEEKERS
		SET ACTIVE = '1'
		WHERE ID = U_JOBSEEKER_ID;
    commit;
	RETURN 'done';
END INSERT_JOBSEEKER_LAST_LOGIN;

/
--------------------------------------------------------
--  DDL for Function INSERT_JOBSEEKERS_CV
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "INSERT_JOBSEEKERS_CV" (
		U_JOBSEEKER_ID NUMBER, 
		U_NAME VARCHAR2,
		U_JOBSEEKERS_CV_LANGUAGE VARCHAR2,
		U_CONTENT VARCHAR2
		) 
	RETURN varchar2
    IS
        PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN 	
    INSERT INTO JOBSEEKERS_CV VALUES (
			JOBSEEKERS_CV_SEQUENCE.NEXTVAL, 
            U_JOBSEEKER_ID,
			U_NAME,
			U_JOBSEEKERS_CV_LANGUAGE,
			U_CONTENT
		);
    commit;
	RETURN 'done';
END INSERT_JOBSEEKERS_CV;

/
--------------------------------------------------------
--  DDL for Function INSERT_JOBSEEKERS_APPLY_JOB
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "INSERT_JOBSEEKERS_APPLY_JOB" (
		U_JOBSEEKER_ID NUMBER, 
		U_JOB_ADVERTISEMENT_ID NUMBER
		) 
	RETURN varchar2
    IS
        PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN 
    INSERT INTO JOBSEEKERS_APPLY_JOB VALUES (
			JOBSEEKERS_APPLY_JOB_SEQUENCE.NEXTVAL, 
			U_JOBSEEKER_ID,
			U_JOB_ADVERTISEMENT_ID,
			0
		);
    commit;
	RETURN 'done';
END INSERT_JOBSEEKERS_APPLY_JOB;

/
--------------------------------------------------------
--  DDL for Function DEL_ABOVE_AND_INS_COMP_RATING
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "DEL_ABOVE_AND_INS_COMP_RATING" (
		U_JOBSEEKER_ID NUMBER, 
		U_COMPANY_ID NUMBER,
		U_RATING NUMBER
		) 
	RETURN varchar2
    IS
        PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN 
	DELETE FROM COMPANY_RATING 
		WHERE JOBSEEKER_ID =U_JOBSEEKER_ID
		AND COMPANY_ID =U_COMPANY_ID;

    INSERT INTO COMPANY_RATING VALUES (
			COMPANY_RATING_SEQUENCE.NEXTVAL, 
			U_JOBSEEKER_ID,
			U_COMPANY_ID,
			U_RATING
		);
    commit;
	RETURN 'done';
END DEL_ABOVE_AND_INS_COMP_RATING;

/
--------------------------------------------------------
--  DDL for Function COMPANY_INSERT_FUNC
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "COMPANY_INSERT_FUNC" 	(
		COMPANY_USERNAME VARCHAR2, 
		COMPANY_PASSWORS VARCHAR2, 
		COMPANY_NAME VARCHAR2, 
		COMPANY_EMAIL VARCHAR2, 
		COMPANY_TAX_NUMBER NUMBER, 
		COMPANY_ADDRESS_CITY VARCHAR2, 
		COMPANY_ADDRESS VARCHAR2
		) 
	RETURN varchar2
    IS
        PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN 
	INSERT INTO COMPANY VALUES (
			COMPANY_SEQUENCE.NEXTVAL, 
			COMPANY_USERNAME, 
			COMPANY_PASSWORS, 
			COMPANY_NAME, 
			COMPANY_EMAIL, 
			COMPANY_TAX_NUMBER, 
			COMPANY_ADDRESS_CITY, 
			COMPANY_ADDRESS,
            sysdate
		);
	COMMIT;
	RETURN 'done';
END COMPANY_INSERT_FUNC;

/
--------------------------------------------------------
--  DDL for Function DELETE_JOBSEEKERS_JOB_TYPE
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "DELETE_JOBSEEKERS_JOB_TYPE" (
		U_JOBSEEKER_ID NUMBER, 
		U_ID NUMBER
		) 
	RETURN varchar2
    IS
        PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN 
    DELETE FROM JOBSEEKERS_JOB_TYPE WHERE ID = U_ID AND JOBSEEKER_ID = U_JOBSEEKER_ID;
    commit;
	RETURN 'done';
END DELETE_JOBSEEKERS_JOB_TYPE;

/
--------------------------------------------------------
--  Constraints for Table JOBSEEKERS_RATING
--------------------------------------------------------

  ALTER TABLE "JOBSEEKERS_RATING" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table JOBSEEKERS_JOB_TYPE
--------------------------------------------------------

  ALTER TABLE "JOBSEEKERS_JOB_TYPE" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table JOBSEEKERS_CV
--------------------------------------------------------

  ALTER TABLE "JOBSEEKERS_CV" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table JOBSEEKERS_APPLY_JOB
--------------------------------------------------------

  ALTER TABLE "JOBSEEKERS_APPLY_JOB" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table JOBSEEKERS_ADMIN
--------------------------------------------------------

  ALTER TABLE "JOBSEEKERS_ADMIN" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table JOBSEEKERS
--------------------------------------------------------

  ALTER TABLE "JOBSEEKERS" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table JOBSEEKER_LAST_LOGIN
--------------------------------------------------------

  ALTER TABLE "JOBSEEKER_LAST_LOGIN" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table JOB_TYPE
--------------------------------------------------------

  ALTER TABLE "JOB_TYPE" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table JOB_ADVERTISEMENT
--------------------------------------------------------

  ALTER TABLE "JOB_ADVERTISEMENT" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table COMPANY_RATING
--------------------------------------------------------

  ALTER TABLE "COMPANY_RATING" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table COMPANY
--------------------------------------------------------

  ALTER TABLE "COMPANY" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
