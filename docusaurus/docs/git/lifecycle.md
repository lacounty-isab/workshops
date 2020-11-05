---
id: lifecycle
title: Basic Lifecycle
sidebar_label: Basic Lifecycle
---

Many of us have worked with some sort of *centralized* version control
system in the past.  Tools such as **CVS**, **SVN**, and
**ClearCase** have a basic lifecycle of

1. checkout - copy a version to local workspace
2. edit - edit working copy
3. commit - write changes back to server
4. repeat

The server contains the history of every file.  Our workstation contains
a working copy that we can edit.  But anything related to other versions
of files in terms of

* comparing them
* reading their commit comments
* creating branches
* conflict resolution

requires a connection to the server.  This is inefficient even when we
do have good network connectivity.  Git is an example of a
[distributed](https://git-scm.com/about/distributed)
version control system (DVCS).  Every copy of the repository is the full
version history.  There may be an instance that a team calls "the server."
But that's purely by convention.

There is no such thing as a "Git client" that is distinct from a Git
server.  All *checkout* and *commit* commands work on local repositories.
There are commands that push and pull changes between two repositories.
But these changes have to have been committed locally first.  There is
no notion of using a Git client to browse a server.  Rather, you clone
the server repository to a local repository on your workstation and browse
it using your workstation file manager.  This makes repository version
browsing far more efficient.

Once you have a local copy of the repository the basic lifecycle goes
like this.

1. __checkout__ - change to a branch; often create a new one.
2. __edit__ - edit working copy.
3. __stage__ - add the changes to a staging area.
4. __commit__ - commit changes.
5. __repeat__ steps 2 - 4.
6. __push__ commits to a server copy of the repository.

Note that in the case of a local-only repository, Step 6 never happens.
The commands used in the basic lifecycle are discussed in more detail below.

Reference is often made to **HEAD**.  This is a pointer that refers to
the place in the commit tree where the next commit will be applied.
