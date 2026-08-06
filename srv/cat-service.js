const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

    const { Employees, LeaveRequests, Payroll, Onboarding } = this.entities;

    const db = await cds.connect.to('db');


    this.before("READ", Employees, (req) => {
        const user = req.user;
        if (user.is("Admin") || user.is("HRManager")) return;
        if (user.is("Employee")) {
            req.query.where({ ID: user.id });
        }
    });


    this.before(["CREATE", "UPDATE", "DELETE"], Employees, (req) => {
        if (!req.user.is("Admin") && !req.user.is("HRManager")) {
            req.reject(403, "Only HR or Admin can manage employees");
        }
    });


    this.before("READ", LeaveRequests, async (req) => {
        const user = req.user;
        if (user.is("Admin") || user.is("HRManager")) return;
        if (user.is("Manager")) {
            const team = await db.run(
                SELECT.from(Employees)
                    .columns('ID')
                    .where({ manager_ID: user.id })
            );
            const ids = team.map(e => e.ID);
            req.query.where({ employee_ID: { in: ids } });
            return;
        }

        if (user.is("Employee")) {
            req.query.where({ employee_ID: user.id });
        }

    });


    this.before("CREATE", LeaveRequests, (req) => {
        if (!req.user.is("Employee")) {
            req.reject(403, "Only employees can request leave");
        }
        req.data.employee_ID = req.user.id;
        req.data.status = "Pending";
    });


    this.before("UPDATE", LeaveRequests, async (req) => {
        const record = await db.run(
            SELECT.one.from(LeaveRequests)
                .where({ ID: req.data.ID })
        );
        if (!record) req.reject(404);
        if (req.user.is("Admin") || req.user.is("HRManager")) return;
        if (req.user.is("Employee")) {
            if (record.employee_ID !== req.user.id) {
                req.reject(403);
            }
        }
    });


    this.before("DELETE", LeaveRequests, async (req) => {
        const record = await db.run(
            SELECT.one.from(LeaveRequests)
                .where({ ID: req.data.ID })
        );
        if (!record) req.reject(404);
        if (req.user.is("Admin")) return;
        if (req.user.is("Employee") && record.employee_ID === req.user.id) return;
        req.reject(403);

    });

    this.before("READ", Payroll, (req) => {
        const user = req.user;
        if (user.is("Admin") || user.is("PayrollManager")) return;
        if (user.is("Employee")) {
            req.query.where({ employee_ID: user.id });
        }
    });


    this.before(["CREATE", "UPDATE", "DELETE"], Payroll, (req) => {
        if (!req.user.is("Admin") && !req.user.is("PayrollManager")) {
            req.reject(403, "Not authorized to manage payroll");
        }
    });

    this.before("READ", Onboarding, (req) => {
        const user = req.user;
        if (user.is("Admin") || user.is("HRManager")) return;
        if (user.is("Employee")) {
            req.query.where({ employee_ID: user.id });
        }
    });


    this.before(["CREATE", "UPDATE", "DELETE"], Onboarding, (req) => {
        if (!req.user.is("Admin") && !req.user.is("HRManager")) {
            req.reject(403, "Only HR can manage onboarding");
        }
    });

    const northwind = await cds.connect.to('Northwind');

    this.on('getSuppliers', async () => {
        const res = await northwind.send({
            method: 'GET',
            path: '/Suppliers?$select=SupplierID,CompanyName,City,Country'
        });
        return res.value.map(s => ({
            ID: s.SupplierID,
            CompanyName: s.CompanyName,
            City: s.City,
            Country: s.Country
        }));
    });

});