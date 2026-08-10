using employee.app as employee from '../db/schema';

// Demo file: intentionally violates several CDS lint rules so `cds lint`
// produces a spread of errors + warnings. Delete this file to go back to clean.

// entity name should start UPPERCASE  -> @sap/cds/start-entities-uppercase
entity demoOrders {
  key ID      : Integer;
      Title   : String;   // element should start lowercase -> start-elements-lowercase
      order   : String;   // SQL reserved word              -> no-db-keywords
      $custom : String;   // dollar-prefixed name           -> no-dollar-prefixed-names
}

// empty restrictions -> @sap/cds/auth-no-empty-restrictions
@restrict: []
entity DemoOpen as projection on employee.Employees;

// '= null' instead of 'is null' -> @sap/cds/sql-null-comparison
entity DemoNulls as select from employee.Employees { ID, name } where email = null;
