import a from 'a'
console.log(a)

// Cannot import "b" because no export specified for main
// Even though "b" package has "main" defined, "exports" causes it to be ignored by any Node version that understands "exports"
// import b from 'b'

import * as b from 'b/custom'
console.log(b)

// This will fail because export spec is missing extension. Exports file paths do not imply a .js extension
// import c from 'c/custom'

// This will fail
// Error [ERR_UNSUPPORTED_DIR_IMPORT]: Directory import '/Users/jasonkuhrt/foobar/node_modules/d/dir' is not supported resolving ES modules imported from /Users/jasonkuhrt/foobar/foo.mjs
// import dir from 'd/dir'

import * as e from 'e/dir'
console.log(e)

// This will fail. Needs to include extension
// Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/Users/jasonkuhrt/foobar/node_modules/f/dir/one' imported from /Users/jasonkuhrt/foobar/foo.mjs
// import * as f1 from 'f/dir-star/one'

// This will fail. Star does not support nothing=index semantics.
// Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './dir-star' is not defined by "exports" in /Users/jasonkuhrt/foobar/node_modules/f/package.json imported from /Users/jasonkuhrt/foobar/foo.mjs
// import * as f from 'f/dir-star'

import * as f1 from 'f/dir-star/one.mjs'
console.log(f1)

import * as g1 from 'g/dir-star-sans-extension/one'
console.log(g1)

import * as h1 from 'h/dir-star-except/one'
console.log(h1)

// This works. Cannot exclude files.
import * as h2 from 'h/dir-star-except/two'
console.log(h2)

// This works. * does not pause at /
import * as hNested1 from 'h/dir-star-except/nested1/one'
console.log(hNested1)

// This will fail. It has been excluded.
// Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './dir-star-except/nested2/one' is not defined by "exports" in /Users/jasonkuhrt/foobar/node_modules/h/package.json imported from /Users/jasonkuhrt/foobar/foo.mjs
// import * as hNested2 from 'h/dir-star-except/nested2/one'

// This will fail. The wildcard does not match nothing.
// Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './string-match' is not defined by "exports" in /Users/jasonkuhrt/foobar/node_modules/i/package.json imported from /Users/jasonkuhrt/foobar/foo.mjs
// import * as i from 'i/string-match2'

// This works. Wildcard for file names.
import * as i2 from 'i/string-match2'
console.log(i2)

// This will fail. Anything after first 2 has been excluded
// import * as i22 from 'i/string-match22'

// Needs flag --experimental-json-modules
// https://nodejs.org/api/esm.html#esm_experimental_json_modules
import j1 from 'j/multi-ext1.json'
console.log(j1)

import * as j2 from 'j/multi-ext2.mjs'
console.log(j2)

// This works. But odd. A wildcard import specifier is mapped to a singular file.
import * as k1 from 'k/wildcard/one'
import * as k2 from 'k/wildcard/two'
import * as k3 from 'k/wildcard/three'
console.log(k1)
console.log(k2)
console.log(k3)
console.log(k1 === k2, k1 === k3)

// This will fail. File spec Wildcard is treated as literal when there is no wildcard import specifier.
// Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/Users/jasonkuhrt/foobar/node_modules/l/*.mjs' imported from /Users/jasonkuhrt/foobar/foo.mjs
// import * as l from 'l/singular'

import * as l2 from 'l/wildcard-literal'
console.log(l2)

// Will work. Subpath dot import specifier is taken literally. Only root dot has special semantics.
import * as m from 'm/sub-dot/.'
console.log(m)

// Will not work. Module specifier of just "*" does not permit importing in any way.
// import * as n from 'n'

// Will not work.
// Error [ERR_INVALID_PACKAGE_TARGET]: Invalid "exports" target "*" defined for './*' in the package config /Users/jasonkuhrt/foobar/node_modules/o/package.json imported from /Users/jasonkuhrt/foobar/main.mjs; targets must start with "./"
// import * as o from 'o/anything'

// Will not work.
// TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension "" for /Users/jasonkuhrt/foobar/node_modules/p/foo/oneBar
// import * as p1 from 'p/one'
// import * as p2 from 'p/two'

// This will work. The trailing dot given by consumer appended with the wildcard suffix leads to a complete file path.
// NOTE This is quite esoteric.
import * as q from 'q/one.'
console.log(q)

// import specifier infix

// Will work. Asterisks are replaced with whatever consumer gives
import * as r1 from 'r/f*o'
import * as r2 from 'r/foo'
import * as r3 from 'r/foooooooooooooooooooooooooooooooooooooooooooooooo'
console.log(r1 === r2, r1 === r3)

// This will fail. "fo" does not match "f*o"
// import * as r4 from 'r/fo'

// This will fail. "e" in "foe" does not match "o" in "f*o"
// import * as r5 from 'r/foe'

// import specifier prefix
// Error [ERR_INVALID_PACKAGE_CONFIG]: Invalid package config /Users/jasonkuhrt/foobar/node_modules/r/package.json while importing file:///Users/jasonkuhrt/foobar/main.mjs. "exports" cannot contain some keys starting with '.' and some not. The exports object must either be an object of package subpath keys or an object of main entry condition name keys only.
import * as s from 's/oo'
