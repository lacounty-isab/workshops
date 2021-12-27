---
title: Concept Review
sidebar_label: Concept Review
---

Having worked directly with Postman for a few exercises,
now is a good time to review some Postman concepts.

## Workspace

Workspaces serve to delineate **sharing** of artifacts.
When you have elements you wish to share, you share the
*workspace* in which they are contained.  When you determine
how to organize your requests into workspaces, you should
be thinking of how they are likely to be shared.  Artifacts
that will be used by the same group of people can be managed
easily within the same workspace.

When a new workspace is created, one must specify its type.

* _Personal_ workspace – Artifacts to which only you have access.

* _Private_ workspace – Only invited team members have access.

* _Team_ workspace – All team members have access.

* _Public_ workspace – The general public has access.

Often a team workspace starts as a personal workspace until
the owner is ready to share it.  It can be converted to private
or team when it's ready to be shared.


## Collection

A *collection* refers to a collection of request definitions.

* Collections can be subdivided into folders

* Configuration variables, scripts and authentication methods
  can be scoped at the collection, the folder, or individual
  request level.

* It's common to dedicate a collection to an API specification.

* Read/write roles can specified at this level.

* A collection is defined inside a workspace.  It may be copied,
  moved or synchronized between workspaces.

:::tip
The last point means that you may opt to develop a collection
in your own personal workspace; then share it with a team workspace
later.
:::


## Environment

A collection is a set of variables with values defined for each
environment.  Each workspace has its own set of environments.


## API

In the Postman context, an *API* is an OpenAPI specification in
either YAML or JSON format.

* It provides the interface for your API
  * payload formats
  * operational methods and URIs
  * header requirements
  * security requirements
  * expected response codes and their associated formats

* An API definition can be the basis for generating a collection.

* An API is defined inside a workspace; usually the same workspace
  in which its associated collections are defined.
