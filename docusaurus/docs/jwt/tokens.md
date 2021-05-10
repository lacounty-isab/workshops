---
title: Security Tokens
sidebar_label: Security Tokens
---

In the context of distributed applications, a *security token* is
a set of claims about a *principal*.  A principal can be a person,
a machine or another program.  When the token is included as part
of a remote execution request, the claims provide information to
the receiver of the request about characteristics of the principal.
These characteristics may be used by the receiver to determine
whether the principal is entitled to certain operations.

It must be possible for the source of the token to be *verifiable*;
otherwise anyone could create a token asserting whatever claims
they wished.  In the context of JWTs, the source of a token is
called an *issuer*.

Issuers generally manifest themselves in one of three ways
that are diagrammed below.

1. __Web Application Cookies__ – After the web application authenticates
   a user, it creates a token and returns the token to the user's browser
   as a *cookie*.  A browser cookie will be returned to the web application
   for each request.  The application validates the token in the cookie
   to identify the user for each request.  Since the web application
   generated the token and signed it, the web application is validating
   its own signature.  Symmetric encryption is generally used in this case.


![Issuers](/jwt/jwt01.svg)

2. __System to System__ – The server must trust the issuer of a token from
   another system.  Often the issuer is the callling system itself.  If the
   number of calling systems isn't too large, the service provider can simply
   store a secret or certificate for each one.  Either symmetric or asymmetric
   encryption is used in this case.

3. __Identity Provider (IDP)__ – This pattern is a generalization of the
   previous two options.  The principal authentication is delegated to an
   IDP which issues a token signed by its own certificate which is trusted
   throughout the enterprise.  Service providers (SPs) only need to trust
   the IDP certificate in order to validate a token.  Asymmetric is the only
   practical mode of encryption in this case.

