import cds from '@sap/cds/eslint.config.mjs'
import cdsPlugin from '@sap/eslint-plugin-cds'

// ...cds.recommended = base JS rules + CAP globals.
// cdsPlugin.configs.recommended adds the @sap/cds/* CDS *model* rules so that
// plain `eslint .` and the IDE ESLint extension flag CDS issues too — not just
// `cds lint`. (`cds lint` wires these model rules in automatically.)
export default [
  ...cds.recommended,
  cdsPlugin.configs.recommended,
]
