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

It saves from having to type the full remote URL each
time it is referenced.
It simply maps a name to a URL.
It does not confirm or deny the existence of a repository
at that URL.
A repository created as a clone is automatically configured
with a remote named origin referencing the source repository.

```console {1,4,5}
GitWorkshop$ git clone https://github.com/lacounty-isab/workshops myrepo
Cloning into 'myrepo'...
Resolving deltas: 100% (280/280), done.
GitWorkshop$ cd myrepo
GitWorkshop/myrepo$ git remote -v
origin	https://github.com/lacounty-isab/workshops (fetch)
origin	https://github.com/lacounty-isab/workshops (push)
```

The remote name, `origin`, is configured for fetch and push
(more on these commands later).
This is done for convenience since one often wishes to
perform synchronization operations after a clone.
No remote entries initially exist for new repositories.

The `git remote` command is used to **add**, **view**,
**rename** and **remove** remote entries.  With no options,
it will simply list the remote entries.  Add `-v` to see
the full entry.  Below are examples using the repository
we cloned previoiusly.

```console {1,3,6,7,10-13}
GitWorkshop/myrepo$ git remote
origin
GitWorkshop/myrepo$ git remote -v
origin	https://github.com/lacounty-isab/workshops (fetch)
origin	https://github.com/lacounty-isab/workshops (push)
GitWorkshop/myrepo$ git remote rename origin github
GitWorkshop/myrepo$ git remote -v
github	https://github.com/lacounty-isab/workshops (fetch)
github	https://github.com/lacounty-isab/workshops (push)
GitWorkshop/myrepo$ git remote remove github
GitWorkshop/myrepo$ git remote -v
GitWorkshop/myrepo$ git remote add origin https://github.com/lacounty-isab/workshops
GitWorkshop/myrepo$ git remote -v
origin	https://github.com/lacounty-isab/workshops (fetch)
origin	https://github.com/lacounty-isab/workshops (push)
```

Most Git hosting services provide the remote URL on a
repository page.  A few examples are shown below.  The
first one is from GitHub.

![GitHub Repository URL](/git/images/remote1.jpg)

This next one is from AWS CodeCommit.

![CodeCommit Repository URL](/git/images/remote2.jpg)

For any Git hosting service, there will be a links that you
can click to copy the remote URL to your clipboard.
This link can then be added as a remote into your local
repository.

### Protocols

Git supports several protocols for communicating between a
Git server listener and a Git client.

* __local__ – In this case there is no network activity; the
  Git client works with both repositories on your workstation.

* __git__ – This is a proprietary protocol that is rarely used
  anymore.  The advantage is that it works with little configuration.
  The drawbacks are that it is neither secure nor firewall friendly.

* __ssh__ – This tunnels the Git protocol over SSH.  This has the
  benefit of encrypting the connection and is very firewall friendly.
  The drawback is that it requires each client to install an SSH
  certificate on the server.

* __https__ - This mode acts like an HTTPS server.  The user must be
  authenticated on each request; but usually the credentials can be
  cached and reused for subsequent requests.  This varies by the
  features on the Git client.

These days, Git hosting services take care of the security configurations,
making the bottom two options the most common.

### Bare Repositories

We briefly discussed bare repositories in Part 1.  A *bare repository*
has no working copy, just the repository itself.  All server copies
are bare repositories since you can only push a commit to a bare
repository.  You can pull from a non-bare; but it's an error to push
to one.

A naming convention for directories containing a bare repository is
to add `.git` to the end.  This is not common for folder names, so this
makes the folder's use clear.  Even though most Git hosting services
implement this convention, they still allow us to leave the `.git`
off the end of our remote URL definitions.  However, for the local
folders we use in our exercises, the Git client will be more strict.


### Tracking Branches

A *tracking branch* tracks the status of a branch in a remote repository.
We typically don't make commits to a tracking branch directly.  Rather,
a tracking branch is updated each time we fetch updates from or push
up to the remote.

:::caution
Our tracking branch is **not** updated when **someone else** updates
the remote repository.  That's why it's important that we fetch the
latest state of the remote branch before working with it.
:::

Locally, we identify a tracking branch by prefacing the name with the
remote name.  For example, the tracking branch for `master` on a remote
named `origin` is referenced in Git commands as `origin/master`.

The figure below models three machines.  The one on the left is a
bare repository on a shared server.  The middle and right DAGs
represent developer workstations.  Each has a `master` branch
and a tracking branch named `origin/master`.  In this case,
each of the local tracking branches accurately reflect the state
of the `master` branch of the remote machine.

![Start workflow](/git/images/workflow20.png)

In the next exercise, we're going to prepare repositories as
represented above and see how this configuration evolves.
