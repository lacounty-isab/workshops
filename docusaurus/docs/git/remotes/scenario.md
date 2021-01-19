---
title: Remote Scenario
sidebar_label: Exercise 9
---

In this exercise, we simulate a concurrent development
scenario in excructiating detail, describing how problems
occur and how to avoid them.

## Preparation

We're going to simulate a remote repository for
the next exercise.  But it should be emphasized
that the "simulation" is only in regard to the
network connection.  In every other way, it will
be a legitimate remote.  Git does not treat remote
repositories on separate machines differently than
it does remote repositories on the local machine.

1. Clone our sample repository to a new directory
   `samples8`.

   ```console
   GitWorkshop$ git clone https://github.com/lacounty-isab/gitwkspex6 samples8
   ```

   This creates the source for our scenario.

2. Create a bare repository to represent the
   shared server repository.

   ```console
   GitWorkshop$ git clone --bare samples8 sR
   ```

3. Clone `sR` to `sL17` and `sL21`.

   ```console {1,4}
   GitWorkshop$ git clone sR sL17
   Cloning into 'sL17'...
   done.
   GitWorkshop$ git clone sR sL21
   Cloning into 'sL21'...
   done.
   ```

After these three preparation steps, you should have
three new directories: `sR`, `sL17` and `sL21`,
corresponding to the three DAGs shown below.

![Start workflow](/git/images/workflow20.png)


## First Branch

First we simulate the user at repository `sL17`.

4. Change to the `sL17` directory.

5. Change `songs` to `compositions` on Line 17 of `hg17.txt`
   like we did before.

6. Add and commit the change.

   ```console {1-5}
   GitWorkshop$ cd sL17
   GitWorkshop/sL17$ vi hg17.txt
   GitWorkshop/sL17$ git add .
   GitWorkshop/sL17$ git commit -m "Songs to Compositions in hg17.txt"
   GitWorkshop/sL17$ git log --oneline
   8e5d42c (HEAD -> master) Songs to Compositions in hg17.txt
   d0d9eea (origin/master, origin/HEAD) Added Python and fixed typos.
   79647d7 Initial version.
   ```

   The log output shows three commits in reverse chronological order.
   These represent:

   * __C__ - `8e5d42c` – the commit we just made

   * __B__ - `d0d9eea` – the newest commit on the server

   * __A__ – `79647d7` – the initial commit

   in the diagram below.

   ![Next commit](/git/images/workflow21.png)

   List the branch pointer locations.

   ```console {1}
   GitWorkshop/sL17$ git branch -av
   * master                8e5d42c [ahead 1] Songs to Compositions in hg17.txt
     remotes/origin/HEAD   -> origin/master
     remotes/origin/master d0d9eea Added Python and fixed typos.
   ```

   Be sure you can reconcile the log output, the figure, and the branch
   output in terms of the following:

   * `master` – points to **C** and is the current branch
     (remember the asterisk)

   * `origin/master` – the tracking branch still points to **B**

   :::note
   We are ignoring the right side of the figure for now.
   :::

## Push Commit

Now we're going to assume `L21` does the same thing in their local
repository. That would give us the figure above.
We're not going to simulate L21 yet; instead, we're going to stick
with L17 and show why things go wrong.

The next step for `L17` is to push the commit to the remote `R`.
It's important to understand that we cannot push to a remote unless
the remote tracking branch is consistent with the remote branch.
In the diagram to the right,

* __remote tracking branch__ is the yellow box labelled `origin/master`
  in `L17`.

* __remote branch__ is the blue box `master` in `R`.

Presently, they both point to commit `B`, which makes them consistent.
But this is not obvious to `L17`.  Perhaps someone pushed a commit to
`R` since we last checked.  In order to check, `L17` should refresh the
remote tracking branch to make sure it is accurate.  Then push the update.

7. Refresh the tracking branch.

   ```console {1,4}
   GitWorkshop/sL17$ git fetch origin master
   From GitWorkshop/sR
    * branch            master     -> FETCH_HEAD
   GitWorkshop/sL17$ git log --oneline
   8e5d42c (HEAD -> master) Songs to Compositions in hg17.txt
   d0d9eea (origin/master, origin/HEAD) Added Python and fixed typos.
   79647d7 Initial version.
   ```

   We can see that we're up to date (no changes from before to the
   tracking branch).

8. Push our local commit to `R`.

   ```console {1,3}
   GitWorkshop/sL17$ git push origin master
   ... d0d9eea..8e5d42c  master -> master
   GitWorkshop/sL17$ git log --oneline
   8e5d42c (HEAD -> master, origin/master, origin/HEAD) Songs to Compositions in hg17.txt
   d0d9eea Added Python and fixed typos.
   79647d7 Initial version.
   ```

Now we see that three branch point to commit `C`:

* `L17` local `master`
* `L17` remote tracking `master`
* `R` remote `master`

![Push Commit](/git/images/workflow22.png)

## Problem

But this doesn't bid well for `L21`. An attempt to refresh from
`R` will show more than just `L21` is out of date.  It will show
that the `master` sequence of `R` (`C`, `B`, `A`) is incompatible
with the `master` sequence of `L21` (`D`, `B`, `A`).  At this point
`L21` is stuck and can no longer work with the `master` branch.

:::danger
This what happens when two developers try to commit to the same
branch without proper synchronization/communication.
:::

:::caution
You don't need two developers to reach this predicament.  The same
developer with clones of a repository on different workstations can
encounter the same problem.  It can be avoided by always remembering
to fetch before the commit.
:::


## Second Branch

The way to avoid this problem is to limit commits to the `master`
branch to a single person or a small group of people who communicate
well.  Everyone else commits to different branches that are **merged**
to `master`.  This eliminates the race condition described above.

The rest of this exercise will be a demonstration of this practice.
We'll go *back in time* to right after the `l17` local commit.  But
this time we'll designate `L17` as the `master` branch owner.
Meanwhile, `L21` will perform work on a new local branch named `i42`.

9. Change to the `L21` repository and create a new `i42` branch.

   ```console {1,2,4,6}
   GitWorkshop/sL17$ cd ../sL21
   GitWorkshop/sL21$ git branch -a
   * master
     remotes/origin/HEAD -> origin/master
     remotes/origin/master
   GitWorkshop/sL21$ git checkout -b i42
   Switched to a new branch 'i42'
   GitWorkshop/sL21$ git branch -a
   * i42
     master
     remotes/origin/HEAD -> origin/master
     remotes/origin/master
  ```

10. Remove the first two lines from `hg21.txt` (which should be a
    URL and a blank line).

11. Add the change to the staging area and commit.

    ```console {1,2,5}
    GitWorkshop/sL21$ git add hg21.txt
    GitWorkshop/sL21$ git commit -m "Removed two lines."
    [i42 02a6929] Removed two lines.
     1 file changed, 2 deletions(-)
    GitWorkshop/sL21$ git log --oneline
    02a6929 (HEAD -> i42) Removed two lines.
    d0d9eea (origin/master, origin/HEAD, master) Added Python and fixed typos.
    79647d7 Initial version.
    ```

    We're now at the point where both developers have something
    to commit on top of the `B` commit.  `L17` commited to local
    `master` as before.  But `L21` commited to local `i42`.

    ![Push Commit](/git/images/workflow23.png)

    Now each developer pushes his local branch to the shared remote.
    The `L17` push was done back in Step 8.

12. Push the local `i42` branch to the shared remote.

    ```console {1,5}
    GitWorkshop/sL21$ git push origin i42
    ...
    To GitWorkshop/sR
     * [new branch]      i42 -> i42
    GitWorkshop/sL21$ git branch -a
    * i42
      master
      remotes/origin/HEAD -> origin/master
      remotes/origin/i42
      remotes/origin/master
    ```

Here is the state after both `L17` and `L21` have pushed their
local branches to the shared repository. 

![Push Commit](/git/images/workflow24.png)

Note the following:

* The remote tracking branch `origin/i42` for `L21` was created
  automatically by the first `git push origin i42`.

* The `L21` branch pointer for `master` has not changed.  It's
  outdated, but not in conflict.

* At this point, all three repository contents are different.
  This is not a problem so long as branches are used this way.

## Fetch

At this point, the developer for `L21` informs the `master`
owner (`L17`) that branch `i42` is available in the shared
remote for merging into `master`.

13. Change to the `L17` repository and fetch the `i42` branch.
 
    ```console {1,2,6,11}
    GitWorkshop/sL21$ cd ../sL17
    GitWorkshop/sL17$ git branch -a
    * master
      remotes/origin/HEAD -> origin/master
      remotes/origin/master
    GitWorkshop/sL17$ git fetch origin i42
    . . .
    From GitWorkshop/sR
     * branch            i42        -> FETCH_HEAD
     * [new branch]      i42        -> origin/i42
    GitWorkshop/sL17$ git branch -a
    * master
      remotes/origin/HEAD -> origin/master
      remotes/origin/i42
      remotes/origin/master
    ```

    In the listing above, note how before the `git fetch`,
    the only remote tracking branch is `origin/master`.
    After the `fetch`, there is also `origin/i42`.
    This is also reflected in the diagram below.

    ![Push Commit](/git/images/workflow25.png)

    :::important
    A powerful aspect of Git is that we fetched this branch
    without disrupting any work we were doing in our L17
    repository.
    :::

    As it happened, we weren't in the middle of anything
    when we performed the fetch.  But we could have been in the
    middle of a task with many uncommited files in our working
    copy, and this fetch would have worked the same way.
    We can **fetch the branch** when we have the connectivity
    we need.  We can **work with the branch** without the
    connectivity.

## Another Commit

The `L17` developer has fetched the `i42` branch, but is not
ready to work with it yet; and that's perfectly fine.
Fetching the content of other branches does **not** disrupt
our working copy activity.

14. Still in the `L17` repository, edit `hg17.txt`: change
    the text on line 10 from `thirty-seven` to `forty-two`.

    ```diff
    -bunkers some thirty-seven miles from the stage,
    +bunkers some forty-two miles from the stage,
    ```

15. Add and commit the change to `master`.

    ```console {1,4}
    GitWorkshop/sL17$ git commit -m "37 to 42"
    [master 01a19f8] 37 to 42
     1 file changed, 1 insertion(+), 1 deletion(-)
    GitWorkshop/sL17$ git log --oneline
    01a19f8 (HEAD -> master) 37 to 42
    8e5d42c (origin/master, origin/HEAD) Songs to Compositions in hg17.txt
    d0d9eea Added Python and fixed typos.
    79647d7 Initial version.
    ```

![Another commit](/git/images/workflow26.png)

This last commit is `E` on the diagram above.
The `L17` local `master` is now one commit ahead of the
remote tracking branch `master`.  The log listing in
Step 15 and the figure both show the four commits of
the `L17` local `master` branch.

## Merge

Developer `L17` is now ready to merge the changes from
branch `i42`.  Note that we have no local `i42` branch.
All we have is the remote tracking branch `origin/i42`.
But that's fine since we're only reading from it as the
source of the merge.

16. Merge the `i42` branch from `origin/i42` to `master`.

    ```console {1,6}
    GitWorkshop/sL17$ git branch -a
    * master
      remotes/origin/HEAD -> origin/master
      remotes/origin/i42
      remotes/origin/master
    GitWorkshop/sL17$ git merge origin/i42 -m "Merged i42 to master."
    Merge made by the 'recursive' strategy.
     hg21.txt | 2 --
     1 file changed, 2 deletions(-)
    ```

    The comment is included in the merge command in this
    example; it's common to leave it off of the command
    and enter it interactively.

![Local Merge](/git/images/workflow27.png)

The DAG for `L17` is reflected in the `git log` command if we
include the `--graph` option.
Be sure you can identify the following in both the figure above
and the log output below.

```console {1}
GitWorkshop/sL17$ git log --oneline --graph
*   82b8b8f (HEAD -> master) Merged i42 to master.
|\
| * 02a6929 (origin/i42) Removed two lines.
* | 01a19f8 37 to 42
* | 8e5d42c (origin/master, origin/HEAD) Songs to Compositions in hg17.txt
|/
* d0d9eea Added Python and fixed typos.
* 79647d7 Initial version.
```

The merge commit **F** (`82b8b8`) is the new `HEAD` of
the master branch.
The remote tracking branch for master is behind local
for `L21`, but still accurately reflects the state of
the remote `R`.  In fact, this local activity has resulted
in no changes to any remote tracking branches.

## Push Merge

17. `L17` pushes the result of the merge to the shared
    remote `R`.

    ```console {1,3}
    GitWorkshop/sL17$ git push origin master
    . . . .
    GitWorkshop/sL17$ git log --oneline --graph
    *   82b8b8f (HEAD -> master, origin/master, origin/HEAD) Merged i42 to master.
    |\
    | * 02a6929 (origin/i42) Removed two lines.
    * | 01a19f8 37 to 42
    * | 8e5d42c Songs to Compositions in hg17.txt
    |/
    * d0d9eea Added Python and fixed typos.
    * 79647d7 Initial version.
    ```

From the `L17` log, the `git push` is reflected only in
the movement of the tracking branch pointer.

![Local Merge](/git/images/workflow28.png)

The remote `R` now has the two new commits from `L17`
along with the fact that commit `F` is a merge of
commits `D` and `E`.

It is now the responsibility of `L17` to notify `L21`
(and anyone else) of the availability of the merge.

The `L21` developer's work has been merged into the
`master` branch by the `L17` developer and pushed to
the shared remote repository `R`.  But this is still
not visible to the `L21` developer until refreshed
from the remote `master`.

18. Change to the L21 repository and fetch the updated
    `master` branch from `R`.

    ```console {1,2,6,11}
    GitWorkshop/sL17$ cd ../sL21
    GitWorkshop/sL21$ git log --oneline --graph
    * 02a6929 (HEAD -> i42, origin/i42) Removed two lines.
    * d0d9eea (origin/master, origin/HEAD, master) Added Python and fixed typos.
    * 79647d7 Initial version.
    GitWorkshop/sL21$ git fetch origin master
    . . . . . .
    From GitWorkshop/sR
     * branch            master     -> FETCH_HEAD
       d0d9eea..82b8b8f  master     -> origin/master
    GitWorkshop/sL21$ git log --oneline --graph
    * 02a6929 (HEAD -> i42, origin/i42) Removed two lines.
    * d0d9eea (master) Added Python and fixed typos.
    * 79647d7 Initial version.
    ```

Note once again that the `git fetch` did not disrupt any
work `L21` might have been doing.  The logs before and
after the fetch show the same entries.
However, close inspection of the log outputs show that
some branch pointers have moved around.  Let's compare
the figures.  This is the situation after the fetch.

![Local Merge](/git/images/workflow29.png)

The `L21` situation looks a lot different in the figure.
But it's consistent with the log output.  The current
branch is still `i42` and `origin/master` is no longer
reachable from `i42`; though local `master`
(which is now 3 commits behind) is still reachable.
Both log output shows **D** → **B** → **A**.

The previous slide showed `L21` could fetch all the
merge activity without disrupting local activity.
But now it's time to refresh the merge to our local
`master`.  As always with a merge, the first step is
to change to the target branch.

19. Change to local master branch.

    ```console {1}
    GitWorkshop/sL21$ git checkout master
    Switched to branch 'master'
    Your branch is behind 'origin/master' by 4 commits, and can be fast-forwarded.
      (use "git pull" to update your local branch)
    ```

    It tells us `master` is behind by 4 commits.
    But the good news is that it can be fast-forwarded;
    otherwise we have to "merge the merge", which we
    wouldn't do because we're not suppose to be
    contributing commits directly to `master`.

20. Merge from the remote tracking branch.

    ```console {1}
    GitWorkshop/sL21$ git merge origin/master
    Updating d0d9eea..82b8b8f
    Fast-forward
    ```

    All merges to `master` should be fast-forward for
    developers who do not commit directly to `master`.

21. Remove the local and remote `i42` branch pointer.

    ```console {1,3}
    GitWorkshop/sL21$ git branch -d i42
    Deleted branch i42 (was 02a6929).
    GitWorkshop/sL21$ git branch -d -r origin/i42
    Deleted remote-tracking branch origin/i42 (was 02a6929).
    ```

    Note that deleting a remote branch requires the `-r`
    flag.

    ![L21 Summary](/git/images/workflow31.jpg)

The diagram below shows the final state after the local
merge by `L21`.

![Local Merge](/git/images/workflow30.png)

