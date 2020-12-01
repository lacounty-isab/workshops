---
title: Remotes
sidebar_label: Remotes
---

## Terms

### Clone

A *clone* is another copy of the current repository.

Sometimes it's called a *remote repository*.
It's remote in the sense that it's in a separate directory.
It doesn't have to be on a separate machine.
We saw examples early in Part 1 where we created multiple
remote repositories on the same machine with the `clone` command.
The `clone` command is the typical way to create a remote
repository.  The term clone can refer to the remote repository,
or it can refer to the Git command.

A clone is not a strict copy.
By default, the clone command only copies commits
reacheable by the master branch.  Additional branches
may be cloned through additional commands.

In this workshop, we'll use the term **clone** as

* a Git command `clone` using monospace font

* a noun – referring to a clone of a repository

* a verb – the act of creating a clone with `clone`.

### Remote

A Git *remote* is a alias for a remote location.
