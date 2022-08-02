# Merge Checklist

## Did you add any new packages?

Make sure to check the [Snyk Vulnerability DB](https://snyk.io) to see if any
packages have known security issues. Use `snyk test` in the service's directory.

Eventually we will get this integrated into the CI, but it costs money.

## Did you add any new regex's?

Make sure to check regexes against [safe-regex](https://www.npmjs.com/package/safe-regex).
Just run `node safe.js '(x+x+)+y'`. If your regex is unsafe, there are usually
alternatives to it.