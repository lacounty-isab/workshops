---
title: Bearer Tokens
sidebar_label: Bearer Tokens
---

A JWT can be sumitted in an HTTP in many ways. Two common ways
are

* within a URL (its special encoding allows for this)

* within an HTTP header

The [Bearer Token Standard](https://tools.ietf.org/html/rfc6750)
describes a common way to perform the latter.  It amounts to adding
the encoding token to the `Authorization` request header in the form

```
Authorization: Bearer abcdef123456
```

where `abcdef123456` is a fictitious token value.

:::note
This is a simplistic description of the bearer token specification.
It's like saying "REST is just JSON over HTTP."
:::

Many APIs that accept authentication tokens expect them as bearer
tokens.  Some implement the entire bearer specification.  Others
simply expecgt the `Authorization` header in the format described.

JWT bearer tokens are not popular in OAuth 2.0 implementations.
OAuth itself doesn't specify a token format (it's a message pattern
specification).  However, OpenID Connect (OIDC), the authentication
protocol used by web login services such as Google, Facebook and
GitHub, specifies

* OAuth for the message pattern

* JWT for the token format

* Bearer tokens for the HTTP header.

This has led to wide adoption of the JWT bearer tokens, even in the
absence of OAuth.
