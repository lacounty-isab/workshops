---
id: branchname
title: Branch Names
sidebar_label: Naming Branches
---

Sometimes forward slashes are used
to organize branches hierarchically (e.g. `da/issue23` or
`pubdef/issue45`).  Using hierachical branch names works fine
so long as you observe the following **cautionary note**.
Under the covers (i.e. in the `.git/refs/heads` folder), each
branch pointer name is also a file name.  This file simply
contains the SHA1 hash of the commit it references.  If your
branch name contains a slash, then the file name is really a path
name containing directories relative to `.git/refs/heads`.

```
$ git branch --list lasd/*
  lasd/gards
  lasd/juvwrnt
$ cat .git/refs/heads/lasd/gards
143449187ae79e04122045b38353b13fae3fbb4b
```

In the example above, I listed only branches related to `lasd`.
We can see that under the covers, it's a very small file containing
the SHA1 hash of the commit (i.e. its commit pointer).

The problem that can happen is if someone later decides to create
a branch named `probation` to do all probation work.  That becomes
a **file** named `.git/refs/heads/probation`.  Then later, they
try to create a `probation/issue28`.  This attempts to create a
**directory** named `probation` with a file named `issue28` inside
it.  This results in an error because there is already a **file**
named `probation`.

As long as you keep this restriction in mind, hierarchical branch
names work fine.
