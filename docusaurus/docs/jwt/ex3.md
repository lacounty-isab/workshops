---
title: "Ex 3: HMAC Signatures"
sidebar_label: "Ex 3: HMAC Signatures"
---

1. Open your Chrome browser to https://jwt.io and scroll
   down to the debugger section.

2. Make sure **HS256** is selected for the Algorithm setting
   at the top.

3. Replace the text `your-256-bit-secret` with your own secret.

4. Notice how the signature changes in the encoding section as
   you alter the secret.

5. Delete a single character from the blue encoded token.
   Notice the signature is no longer valid.

![JWT Debugger](/jwt/jwt03.png)

Note the direction of impact (indicated by the black arrow above).

| Change to | Updates| Note   |
|-----------|---------|--------|
|HMAC Secret |the encoded signature | The signature is always valid.
|The encoded signature|the validity status|The way to check a secret.

If you want to check the validity of a certain secret:

1. Paste the secret first
2. Then paste the encoded token.

Reversing this order will simply update the signature instead of
validating it.
