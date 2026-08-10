// Demo file: intentionally violates JS lint rules. Delete to go back to clean.
const unusedThing = 123;             // -> no-unused-vars (warning)

module.exports = function () {
  console.log('lint demo running');  // -> no-console (warning)
};
