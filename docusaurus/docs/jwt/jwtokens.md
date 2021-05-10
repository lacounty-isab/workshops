---
title: JSON Web Tokens
sidebar_label: JSON Web Tokens
---

JSON Web Tokens (JWTs) have become the defacto web token format for web
applications.  The **decoded** format of a JWT is JSON, which is easily
processed by most programming languages.  The **encoded** format (the format
transmitted over the wire) is a slight variant of Base64 known as
*Base64url* optimized for transmission over HTTP.  An example of this
format is demonstrated below.

The first block of text are three segments of **Base64url encoded** text
separated by the period characters.  This is followed by the corresponding
decoded segments.  Their correspondences are color-coded.

1. the header (in red)
2. the payload (in purple)
3. the signature (in blue)

![JWT Encoded and Decoded](/jwt/jwt02.png)

This graphical breakdown is popularized by the website https://jwt.io debugger.
