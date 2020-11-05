---
id: branches
title: Branches
sidebar_label: Branches
---

Branches are a very common phenomenon with Git, much more so than
with other source control tools.  This is pragmatic with Git because
a branch is nothing more than a pointer to the commit tree.  The key
to understanding branches is to understand commit trees.  

### DAG

A commit tree is a directed acyclic graph (DAG).
An example of a DAG is shown below.

![Directed Acyclic Graph](/git/images/dag1.svg)

* It's a *graph* in that it has vertices and edges
  (or points and lines if you prefer).
* It's *directed* in that each edge has a direction
  (indicated by an arrow).
* It's *acyclic* in that you can't traverse a cycle (or loop)
  by following the edges in their prescribed direction.

A Git tree is a DAG where the vertices are commits and the lines
represent changes from one commit to the next.  The direction of
the Git arrows are reverse of what one typically sees in a source
control tree: *Git arrows point to the past, not the future*.
In the figure above, `A` is the initial commit.  `B` is a commit
from which two branches emanate.  `D` is a merge commit.

It's good to draw the DAGs on paper as you initially work through
branch and merge scenarios.  After a while you start to see them in
your head and there is less need to write them down.
Since a branch is simply a pointer into our DAG commit tree,
it's helpful to work through a branch/merge scenario and observe
how the structure of the DAG and branch pointers change.
But first, a quick note on branch names.

### Branch Names

There is no "special branch" in Git from a technical standpoint.
But there is a very popular convention of using a branch named
`master` for the main branch.  When a repository is initialized,
a `master` branch is created by default.

**HEAD** is technically a branch pointer (whereas branches are
commit pointers).  So `HEAD` is a pointer to a pointer.  In
practical terms, `HEAD` determines "which branch you're on".
We can also see this in implementation terms by peeking
directly into the Git repository (inside the `.git` folder).

```console
$ cat .git/HEAD
ref: refs/heads/master
$ cat .git/refs/heads/master
5567a3e7b3724d116a9d7344d412aaf7ff2aba4c
```

The file `HEAD` contains a reference to a branch, in this
case `master`.  The file `.git/refs/heads/master` points
to a commit.

### Basic Scenario

If you've been following the exercise, the `samples` folder
should be a repository with two commits.
The green circles represent commits.  I've used capital
letters instead of commit hashes to label them.

![workflow1](/git/images/ff01.svg)

Branches are represented by blue boxes.  In the
present case, there is only the `master` branch
which is represented by `M`.  `master` is the active
branch because `HEAD` is pointing to it.
