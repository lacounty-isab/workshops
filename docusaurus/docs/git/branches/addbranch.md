---
id: addbranch
title: Show Branches
sidebar_label: Show Branches
---

When a merge turns into a fast-forward merge, life is good.
It means that we "merged" into a branch before anyone else did.
Effectly it wasn't much of a merge, just an extra series of
commits.

Next we'll simulate a case where a commit was added to the
`master` branch **before** our merge operation.

### Master Commit

To this end, let's go "back in time" by changing to our
`GitWorkshop/samples2` directory.  We created this directory
in Step 8 of the last exercise.

```console
GitWorkshop/samples1$ cd ../samples2
GitWorkshop/samples2$ git log --oneline
81d60de (HEAD -> B1) Songs to compositions.
c2e8b4e Pruned dead URL from Ch 21.
10f629d (origin/master, origin/HEAD, master) Added Python and fixed typos.
b83eb9b Initial version.
GitWorkshop/samples2$ git branch
* B1
  master
GitWorkshop/samples2$ git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.
GitWorkshop/samples2$ git branch
  B1
* master
```

We saw that HEAD still pointed to `B1`.  So we changed to `master`
using the `checkout` command.

![Starting point](/git/images/noConflict01.svg)

We further confirm our status with the `log` command.  Since we
are on the `master` branch, we only see the first two commits.

```console
GitWorkshop/samples2$ git log --oneline
10f629d (HEAD -> master, origin/master, origin/HEAD) Added Python and fixed typos.
b83eb9b Initial version.
```

After all this, we're back-in-time before the `B1` merge.

Edit `hg17.txt`.

:::note
The conversion of `songs` to `compositions` on line 17 that
we performed in the last exercise is no longer there.  That change
is still in the repository.  But the `master` branch doesn't have
that change.  Only the `B1` branch has that change.
:::

Edit line 10 to change
`thirty-seven` to `forty-two` and save the file.
Run the `diff` command to confirm your change.

```console
GitWorkshop/samples2$ git diff
diff --git a/hg17.txt b/hg17.txt
-bunkers some thirty-seven miles from the stage,
+bunkers some forty-two miles from the stage,
```

Add this change as a commit.

```console
GitWorkshop/samples2$ git add .
GitWorkshop/samples2$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   hg17.txt

GitWorkshop/samples2$ git commit -m "Forty-two miles."
[master 4878aee] Forty-two miles.
 1 file changed, 1 insertion(+), 1 deletion(-)
```

This latest change is represented as commit `C` in the updated
diagram.  When we list the log, we only see entries _reachable_
from commit `C`.

![New commit C](/git/images/noConflict02.svg)

```console
GitWorkshop/samples2$ git log --oneline
4878aee (HEAD -> master) Forty-two miles.
10f629d (origin/master, origin/HEAD) Added Python and fixed typos.
b83eb9b Initial version.
```

This concept of _reachable_ is important for understanding many Git
operations.  A node in a 
[directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph)
is _reachable_ from node `C` if it may reached from node `C` by traversing
edges of the graph in the direction of the arrows.

In the graph above, commits `A`, `B` and `C` are reachable from `C`.
Commits `X` and `Y` are not reachable from `C`.

By default, the `git log` command only displays commits reachable from `HEAD`.


### Display Branch Commits

By providing a branch name to the `log` command, we can see all log entries
for commits reachable from that branch.  To see the commits reachable from
`B1`:

```console
GitWorkshop/samples2$ git log --oneline B1
81d60de (B1) Songs to compositions.
c2e8b4e Pruned dead URL from Ch 21.
10f629d (origin/master, origin/HEAD) Added Python and fixed typos.
b83eb9b Initial version.
```

The commits reachable from `B1` are, following the arrows:
`Y`, `X`, `B` and `A`.

![B1 Log](/git/images/noConflict03.svg)

This is the order in which they are listed by the `log` command.  
This also happens to be reverse chronological order.
In this way, we can view all logs from the commits on any particular
branch.  We are not restricted to viewing the log history of `HEAD`.
`HEAD` is simply the default.

But **all the commits** reachable by any particular node is usually
much more than we want.  Our sample repository is small.
Real life repositories have hundreds of commits.  We saw earlier
a common way of restricting the output is with `-N` where `N` is 
a number.

```
GitWorkshop/samples2$ git log --oneline -2 B1
81d60de (B1) Songs to compositions.
c2e8b4e Pruned dead URL from Ch 21.
```

In the example above, we used `-2` to restrict the history to two entries.

Another common inquiry is:

> List the commits on a branch since the branch was created.

For this kind of inquiry, Git support *set subtraction*,
denoted by the `..` operator (two periods), for the `log` command.

In our current example, the branch point is node `B`.
Node `C` has been added to the `master` branch and nodes
`X` and `Y` have been added to the `B1` branch.
But how do we readily see this without the pretty picture
above drawn for us each time?

The answer is *set subtraction*.  The nodes unique to `B1` are all
the nodes reachable from `Y` *minus* all the nodes reachable from `C`.

![Set Subtraction](/git/images/noConflict04.svg)

```
GitWorkshop/samples2$ git log --oneline master..B1
81d60de (B1) Songs to compositions.
c2e8b4e Pruned dead URL from Ch 21.
```

We can ask the question for the `master` branch:

> Which commits have been made to `master` since the `B1` branch?

We just flip the order of the arguments in the subtraction operator.


![Set Subtraction](/git/images/noConflict05.svg)

```
GitWorkshop/samples2$ git log --oneline B1..master
4878aee (HEAD -> master) Forty-two miles.
```

The subtraction operator assumes `HEAD` when the commit is omitted.
Since `HEAD` is currently pointing to `master`, the last two commands
above may be abbreviated as follows.

```
GitWorkshop/samples2$ git log --oneline ..B1
81d60de (B1) Songs to compositions.
c2e8b4e Pruned dead URL from Ch 21.
GitWorkshop/samples2$ git log --oneline B1..
4878aee (HEAD -> master) Forty-two miles.
```

### Display Code Differences

Another Git command that uses the set subtraction operator is the `diff`
command.  In a strange case of inconsistency, the set subtraction for
the `diff` command is **three dots** instead of two.  (Two dots means
something else, as we'll see shortly).

![diff three dots](/git/images/noConflict06.svg)

```
GitWorkshop/samples2$ git diff --compact-summary master...B1
 hg17.txt | 2 +-
 hg21.txt | 2 --
 2 files changed, 1 insertion(+), 3 deletions(-)
```

This shows the difference between the branch-point of `master` and
`B1` (node `B`) and the latest commit on `B1`.

Once again, we can see the difference along the `master` branch by
flipping the arguments.

```
GitWorkshop/samples2$ git diff --compact-summary B1...master
 hg17.txt | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

Another notion of set difference is the *symmetric difference*.
This is defined as the *union* of two sets *minus* their *intersection*.
It's all the elements that are in one set or the other,
but **not** in both.

Unlike displaying log messages, code changes have a "sign" or
"direction" associated with them.  If you _make a change_ by
adding two lines to a file, you _undo the change_ by removing
those two lines from the file.

Despite the set theory term *symmetric difference*, the display
of the change is actually *antisymmetric*.  It has a distinct
direction which is reversed when the order of the parameters is
reversed.

![diff two dots](/git/images/noConflict07.svg)

In the diagram above, the difference (with double dots) show us how to
go **from master to B1**.  That means

1. **undo** commit `C`,
2. **apply** commit `X`,
3. **apply** commit `Y`.

```
GitWorkshop/samples2$ git diff --compact-summary master..B1
 hg17.txt | 4 ++--
 hg21.txt | 2 --
 2 files changed, 2 insertions(+), 4 deletions(-)
GitWorkshop/samples2$ git diff --compact-summary B1..master
 hg17.txt | 4 ++--
 hg21.txt | 2 ++
 2 files changed, 4 insertions(+), 2 deletions(-)
```

The opposite order means start at `Y`

1. **undo** `Y`,
2. **undo** `X`,
3. **apply** `C`.

Without the `--compact--summary` option, all the details of the
changes are listed.

