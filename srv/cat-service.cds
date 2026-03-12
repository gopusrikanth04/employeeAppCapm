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
}
