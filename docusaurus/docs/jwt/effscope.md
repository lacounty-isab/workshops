---
title: Effective Scope
sidebar_label: Effective Scope
---

*Effective Scope* accounts for the fact that not all
IDPs are equally trusted.  Some may be authoritative
for all scopes; others may only be allowed to assert
a limited set of scopes.

For example, PIMS is a DA application that authenticates
its users.

* PIMS can invoke CJIS Tables on behalf of an authenticated
  DA user.

* PIMS can associate scopes for the user in the JWT it
  creates for the user.

* PIMS should only be allowed to assert scopes permissible
  for the DA.  It should not be allowed to assert scopes
  for the Public Defender system.


![Effective Scope Diagram](/jwt/scope02.svg)

The effective scope is the intersection of

* what the issuer asserts for the principal

* what the issuer is permitted to assert

Each application determines these limits for each issuer.
