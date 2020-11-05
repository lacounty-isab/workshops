---
id: delbranch
title: Delete a Branch
sidebar_label: Delete Branches
---

We're done with the `B1` branch; but the pointer is still hanging
around.  If we want to continue working on the `B1` branch past
this point, we probably want to start from the new merge point.
To this end, we wish to remove the `B1` pointer and recreate it
from commit `D`.

![Delete branch](/git/images/noConflict10.svg)

```console
GitWorkshop/samples2$ git branch
  B1
* master
GitWorkshop/samples2$ git branch -d B1
Deleted branch B1 (was 81d60de).
GitWorkshop/samples2$ git branch
* master
```

Git makes the deletion of the `B1` branch point easy.
It was pointing to node `Y` and there was already another
element pointing to `Y` (namely node `D`).  So we can
always reach node `Y` through `D` if we have to;
we're not losing access to it by deleting the `B1` branch
pointer.

![Pointer Gone](/git/images/noConflict11.svg)

Deleting branches makes people nervous.  But we're not really
deleting the branch; we're deleting the pointer that created
the branch.  We can still reach either branch from commit `D`.
And we *do* have a pointer to commit `D`; namely `master`.
If we removed the `master` pointer, we'd be in trouble.
According to the diagram, there would be no way to find
the end of the branch.  Let's see what happens.

```console
git branch -d master
error: Cannot delete branch 'master' checked out.
```

So it won't let me delete a branch that I've got checked out.
That's good.


What if we had continued with another commit on branch `B1`
and then tried to delete `B1`?

![Extra Commit](/git/images/noConflict12.svg)

Then there would be no easy way to reach node `Z` through
available pointers.  Git will recognize this and refuse the
deletion with a warning that the branch is *not fully merged*.
Sometimes you still want to delete such a branch (for example,
you want to discard any changes you amde on the branch without
a merge).  Then you use the same command with a capital `-D`
option

```console
git branch -D B1
```

This will delete the branch pointer regardless of whether it had
been merged.  After this, node `Z` is essentially unreachable since
there is no path to it through available pointers.  Git will
eventually delete it.

![Commit Gone](/git/images/noConflict13.svg)
