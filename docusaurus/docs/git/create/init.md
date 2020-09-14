---
id: init
title: Init
sidebar_label: Init
---

The Git `init` command creates a new repository.  It's normally used
to create a new local repository for files you wish to place under
source control.  This is much simpler than with CVS and SVN, where
you must first create a repository on a server (even if you're hosting
the server on your own machine), upload the files to the server, then
create a **new** directory in which to work with the files you just
uploaded.

With Git, you simply run the `init` command in the directory
that holds the working copy.


```console
git init
```

That creates an *empty* local repostory.
The left side of the figure below shows the repository in red.
The entire repository resides in a folder named `.git` that is
a child of the project root directory.  It's important to understand
that the files in black are **not** part of the repository.  They
are called *the working copy*.  At times they may be consistent with
a version in the repository.  But they are expected to drift out of
sync with the repository as we make changes.  When we *commit* these
changes, they are written to the repository.

![Init](/git/images/scmDirectories.svg)

Let's examine some differences between a local Git repository on
your workstation and that of a checked-out SVN project.
A corresponding workspace for SVN is
shown on the right side of the above diagram.  The SVN metadata is
is kept in `.svn` directories in **every folder of the project**.
(The same is true for CVS and ClearCase).  These folders contain
metadata about how the folder relates to the corresponding folder
on the server.

The next exercise demonstrates how the Git directory model is
more pragmatic.


