using employee.app as employee from '../db/schema';

service EmployeeService {

    @requires: 'Admin'
    entity Employees     as projection on employee.Employees;

    @requires: [
        'Admin',
        'HRManager'
    ]
    entity Onboarding    as projection on employee.Onboarding;

    @requires: [
        'Admin',
        'PayrollManager'
    ]
    entity Payroll       as projection on employee.Payroll;

    @requires: [
        'Admin',
        'Employee',
        'Manager'
    ]
    entity LeaveRequests as projection on employee.LeaveRequests;

    type Supplier {
        ID          : Integer;
        CompanyName : String;
        City        : String;
        Country     : String;
    }

    extend service EmployeeService with {
        function getSuppliers() returns array of Supplier;
    }

    type NorthwindInvoice {
        OrderID       : Integer;
        CustomerID    : String;
        CustomerName  : String;
        ShipCity      : String;
        ShipCountry   : String;
        Salesperson   : String;
        OrderDate     : DateTime;
        ProductName   : String;
        UnitPrice     : Decimal(15, 2);
        Quantity      : Integer;
        Discount      : Double;
        ExtendedPrice : Decimal(15, 2);
        Freight       : Decimal(15, 2);
    }

    function     getInvoices()  returns array of NorthwindInvoice;
}
