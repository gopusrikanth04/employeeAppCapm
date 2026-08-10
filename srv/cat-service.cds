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
        companyName : String;
        city        : String;
        country     : String;
    }

    extend service EmployeeService with {
        function getSuppliers() returns array of Supplier;
    }

    type NorthwindInvoice {
        orderID       : Integer;
        customerID    : String;
        customerName  : String;
        shipCity      : String;
        shipCountry   : String;
        salesperson   : String;
        orderDate     : DateTime;
        productName   : String;
        unitPrice     : Decimal(15, 2);
        quantity      : Integer;
        discount      : Double;
        extendedPrice : Decimal(15, 2);
        freight       : Decimal(15, 2);
    }

    function     getInvoices()  returns array of NorthwindInvoice;
}
