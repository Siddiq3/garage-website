# Shared validation contract

`validation-cases.json` holds the examples every client and the API must agree
on: which mobile numbers, registration numbers, names and amounts are accepted,
and which are refused.

**This file is duplicated in three repositories** — this one, the mobile app and
the website — because each is deployed on its own and none can import from the
others. That duplication is the price of separate repos, and it is dangerous
precisely because nothing breaks loudly when the copies drift: a rule could be
relaxed here and tightened in the app, and every suite would still pass.

`validation-cases.sha256` is the guard. `tests/sharedContract.test.js`
recomputes the digest and fails if it does not match, so changing the contract is
never accidental.

## Changing a rule

1. Edit `validation-cases.json` here.
2. Run `shasum -a 256 shared/validation-cases.json | awk '{print $1}' > shared/validation-cases.sha256`.
3. Copy **both** files to the backend’s `shared/` and `garage-app/shared/`.
4. Run all three test suites. They read this file, so a rule that only some of
   them enforce will fail there.
