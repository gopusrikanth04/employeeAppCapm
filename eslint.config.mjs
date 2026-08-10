import cds from '@sap/cds/eslint.config.mjs'
import cdsPlugin from '@sap/eslint-plugin-cds'

// ...cds.recommended = base JS rules + CAP globals.
// cdsPlugin.configs.all = the full strict CDS ruleset (naming conventions,
// SQL checks, db-keyword checks, etc.) so `cds lint`, plain `eslint .`, and the
// IDE ESLint extension all enforce CAP model conventions. The model is kept
// compliant with these rules, so `cds lint` passes clean.
export default [
  ...cds.recommended,
  cdsPlugin.configs.all,
]
