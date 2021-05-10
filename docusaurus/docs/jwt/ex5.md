---
title: "Ex 5: JWT Validation"
sidebar_label: "Ex 5: JWT Validation"
---

Let's work with this encoded JWT.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX
VCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiw
ibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4
iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0
.151Nm8rnunxacN0rzwZdtaFgdOC-cWe
R-TpZB7SEy30
```

This looks like an encoded JWT, namely two dots
separating an encoded string into three parts:
a header, a payload and a signature.


1. Copy the encoded JWT above into the the
   https://jwt.io/ **Encoded** box.  Noticed how the
   HMAC signature is automatically detected.

2. Paste `County of Orange` in the entry field for
   the HMAC secret.  It seems to validate, but that's
   only because it's updating the encoded signature to
   match with each character you type.

3. Paste the above encoded JWT into the **Encoded**
   field again.  Notice the signature does not match.

4. Enter `County of Los Angeles` into the entry field
   for the secret.

5. Paste the JWT into the **Encoded** field again
   (for the third time).  It should be valid this time.

-------------

Validating a JWT signed with an RSA key is similar.

1. Paste the encoded JWT in the **Encoded** field.

2. Paste the issuer certificate into the **Public Key** field.
