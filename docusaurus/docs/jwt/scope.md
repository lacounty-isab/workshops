---
title: Scope
sidebar_label: Scope
---

A **scope** represents

* a list of resources,

* an access level for each resource.

When a scope is associated with a user,
the user assumes the access level of the scopes.

In the diagram, user `e123456` has access to
resources in scopes **A** and **B**, but not **C**.

![Scope Diagram](/jwt/scope01.svg)

The diagram does not illustrate access levels such
as `update`, `add` or `delete`.

With HTTP, resource names and access levels are
expressed as URLs and methods, respectively.

|Scope Component| HTTP Component |Example|
|------|------|-------|
|Resource|URL|`/ChargeCode`
|Access level|Method|`POST`

