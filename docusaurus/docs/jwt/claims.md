---
title: Claims
sidebar_label: Claims
---

The whole point of JWT is to reliably convey claims about a
principal.  Some claim names are standarized as
[registered claim names](https://tools.ietf.org/html/rfc7519#section-4.1).
Common examples are

* `iss` – `iss`uer of the JWT

* `sub` – `sub`ject, the asserted identity

* `iat` – `i`ssued `at`, when the token was created

* `exp` – `exp`iry, when the token expires

* `aud` – `aud`ience, intented recipient of token

The `iss` value is used by the token consumer to determine the
public key or secret associated with the signature.

The `iat` and `exp` are *epoch timestamps*, i.e. number of
seconds since midnight UTC, January 1, 1970.

* Most programming languages provide utilities for generation
  and conversion of epoch timestamps.

* Online example at https://www.epochconverter.com.

The `aud` claim can be used to restrict the consumers that
attempt to validate the token.

The registered claim names are short in order to keep the size
of the overall token small.  There are many other standard claim
names listed in the specification.  Non-registered claim names
may also be used.  But they must still comply with JSON rules.
For example:

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 151678321
}
```

The `name` and `admin` claims are not registered claims,
but perfectly reasonable.
