---
title: JWT Signatures
sidebar_label: JWT Signatures
---

JWS (JSON Web Signatures) are specified in many forms.  But two of them are most
common: one for symmetric and one for asymmetric signatures.

## HMAC – Symmetric

HMAC with SHA-256 hashes is the most common symmetric JWT signature.

The shared secret can be any sequence of characters.  It is best to use a
secret that is not easily recognized by a casual viewing.  A good source
of random characters for use with this kind of password is

https://www.grc.com/passwords.htm

The header has the form
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

## RSA - Asymmetric

RSA with SHA-256 hashes is the most common asymmetric JWT signature.

Only the public key is shared.  Unlike in the case of SSL certificates used to
verify an unfamiliar host server, self-signing a JWT signing certificate so long
as their is a reliable way to distributed the certificate between parties.
In particular, the CN (common name) field should be the name of the application
issuing the JWT, not the fully qualified name of a host server.

The easiest way to generate an asymmetric public/private key pair is with OpenSSL.
The signature generated with RSA is larger than the HMAC signatures.

The header has the from
```json
{
  "alg": "RS256",
  "typ": "JWT"
}
```

