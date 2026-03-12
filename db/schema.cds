namespace employee.app;

using { managed } from '@sap/cds/common';

entity Books {
  key ID    : Integer;
      title : String;
      stock : Integer;
}

entity Employees : managed {
  key ID         : UUID;
      name       : String;
      email      : String;
      department : String;
      role       : String;
}

entity LeaveRequests : managed {
  key ID        : UUID;
      employee  : Association to Employees;
      fromDate  : Date;
      toDate    : Date;
      reason    : String;
      status    : String;
}

entity Payroll : managed {
  key ID        : UUID;
      employee  : Association to Employees;
      salary    : Decimal(15,2);
      bonus     : Decimal(15,2);
      payDate   : Date;
}

entity Onboarding : managed {
  key ID        : UUID;
      employee  : Association to Employees;
      startDate : Date;
      documents : String;
      status    : String;
}

entity Departments : managed {
  key ID    : UUID;
      name  : String;
}