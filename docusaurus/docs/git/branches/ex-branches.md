---
id: ex-branches
title: Exercise 6 - Fast Forward Merge
sidebar_label: Exercise 6
---

1. To prepare for this exercise, which demonstrates
   the first two branch types described above,
   remove the `samples2` directory created during
   Exercise 3.

2. Create a clone of the `samples` repository
   and change to its directory.

   ```console
   GitWorkshop$ git clone samples samples1
   Cloning into 'samples1'...
   done.
   GitWorkshop$ ls
   isabrepo/ repo1/    repo2/    samples/  samples1/
   GitWorkshop$ cd samples1
   GitWorkshop/samples1$
   ```

3. Create a new branch named `B1` and make it the 
   current branch.  Use the `git branch` command
   to verify the branch status before and after
   each step.

   ```console
   GitWorkshop/samples1$ git branch
   * master
   GitWorkshop/samples1$ git branch B1
   GitWorkshop/samples1$ git branch
     B1
   * master
   ```

   At this point we have defined a new branch `B1`.
   But it is **not** the current branch (`HEAD` does not
   point to it).

   ![Create new branch](/git/images/ff02.svg)

   To make `B1` the current branch, use the `checkout`
   command.

   ```console
   GitWorkshop/samples1$ git checkout B1
   Switched to branch 'B1'
   GitWorkshop/samples1$ git branch
   * B1
     master
   ```

   ![Checkout new branch](/git/images/ff03.png)

   The `branch` and the `checkout` command is often
   combined into a single shortcut command

   ```console
   git checkout -b B1
   ```

   This will **create** the branch `B1` if it doesn't
   already exist, and then **make it the current branch**.
   Whichever method you use, the output from
   `git branch` should be consistent with the figure above.

   ```console
   GitWorkshop/samples1$ git branch
   * B1
     master
   ```

4. Edit `hg21.txt`.  Remove the first two lines that contain a dead
   URL and a blank line.  After editing this file, the first line
   should say "Chapter 21."  Save the change.

5. Commit this change to the **B1** branch.

   ```console
   GitWorkshop/samples1$ git status
   On branch B1
   Changes not staged for commit:
     (use "git add <file>..." to update what will be committed)
     (use "git checkout -- <file>..." to discard changes in working directory)

   	modified:   hg21.txt

   GitWorkshop/samples1$ git add .
   GitWorkshop/samples1$ git commit -m "Pruned dead URL from Ch 21."
   [B1 c2e8b4e] Pruned dead URL from Ch 21.
   ```


   ![First branch commit](/git/images/ff04.svg)

   I drew the `X` commit at an angle to express my intention that
   this commit is a branch separate from `master`.  But there is nothing
   in the graph that makes this so.  I just drew it this way.
   Let's reconcile the logs and the branch pointers.

   ```console
   GitWorkshop/samples1$ git log --oneline
   c2e8b4e (HEAD -> B1) Pruned dead URL from Ch 21.
   10f629d (origin/master, origin/HEAD, master) Added Python and fixed typos.
   b83eb9b Initial version.
   GitWorkshop/samples1$ git branch -v
   * B1     c2e8b4e Pruned dead URL from Ch 21.
     master 10f629d Added Python and fixed typos.
   ```

   The asterisk next to `B1` in the `git branch -v` output shows that
   `B1` is still our current branch.  `master` is still pointing to
   commit `B`; but `B1` has advanced to commit `X`.

6. Edit `hg17.txt`.  Change `songs` to `compositions` on line 17.
   Save the file.

7. Commit this second change to the `B1` branch.

   ```console
   GitWorkshop/samples1$ git diff
   diff --git a/hg17.txt b/hg17.txt
   --- a/hg17.txt
   +++ b/hg17.txt
   
   -Their songs are on the whole very simple and mostly
   +Their compositions are on the whole very simple and mostly

   GitWorkshop/samples1$ git add .
   GitWorkshop/samples1$ git commit -m "Songs to compositions."
   [B1 81d60de] Songs to compositions.
   ```

   In the example above we ran the `diff` command.  For brevity
   I cut out much of its output.  Then we commit to the **B1**
   branch.  This configuration is depicted below.

   ![Second branch commit](/git/images/ff05.svg)

   It is consistent with the output from the log.  `B1` is
   two commits ahead of `master`.

   ```console
   GitWorkshop/samples1$ git log --oneline
   81d60de (HEAD -> B1) Songs to compositions.
   c2e8b4e Pruned dead URL from Ch 21.
   10f629d (origin/master, origin/HEAD, master) Added Python and fixed typos.
   b83eb9b Initial version.
   ```

8. At this point we've reached a fork in the road where I wish to
   demonstrate two different scenarios.  To this end let's clone
   the current `sample1` repository to `sample2`.

   Change to the parent directory and run the clone command.
   Then change to the `samples2` directory and fetch the state
   of the `master` branch to `samples2`.

   ```console
   GitWorkshop/samples1$ cd ..
   GitWorkshop$ ls
   isabrepo/ repo1/    repo2/    samples/  samples1/
   GitWorkshop$ git clone samples1 samples2
   Cloning into 'samples2'...
   done.
   GitWorkshop$ cd samples2
   GitWorkshop/samples2$ git log --oneline
   81d60de (HEAD -> B1, origin/HEAD, origin/B1) Songs to compositions.
   c2e8b4e Pruned dead URL from Ch 21.
   10f629d (origin/master) Added Python and fixed typos.
   b83eb9b Initial version.
   ```

   Notice that the `master` branch is missing from the clone.
   That's because `HEAD` points `B1` instead of `master`.
   However, the remote tracking branches were copied
   (more on those in Part 2).  We can use the `branch` command
   to create a local `master` branch in `samples2`.

   ```console
   GitWorkshop/samples2$ git branch master origin/master
   Branch 'master' set up to track remote branch 'master' from 'origin'.
   GitWorkshop/samples2$ git branch -v
   * B1     81d60de Songs to compositions.
     master 10f629d Added Python and fixed typos.
   GitWorkshop/samples2$ cd ../samples1
   GitWorkshop/samples1$
   ```

   After getting `samples2` ready, we switched back to `samples1`
   to continue this exercise with Step 9.  We'll return to
   `samples2` in the next exercise.

   Now we're ready to merge our changes to the `master` branch.
   The target for a Git merge operation is **always** the current
   branch.  If we want to merge **B1** into **master**, we first
   have to make **master** the current branch.  The source of the
   merge will be referenced in the **merge** command.

9. Change the current branch from `B1` to `master`.

   ```console
   GitWorkshop/samples1$ git branch
   * B1
     master
   GitWorkshop/samples1$ git checkout master
   Switched to branch 'master'
   Your branch is up to date with 'origin/master'.
   GitWorkshop/samples1$ git branch
     B1
   * master
   ```

   When we changed to the `master` branch, all the files in the
   working copy changed, too.  If we peek into our files, all
   the changes we added on the `B1` branch are no longer visible.

   ![Switch to back to master](/git/images/ff06.svg)

10. Run the `merge` command referencing the `B1` branch.

    ```console
    GitWorkshop/samples1$ git merge B1
    Updating 10f629d..81d60de
    Fast-forward
     hg17.txt | 2 +-
     hg21.txt | 2 --
     2 files changed, 1 insertion(+), 3 deletions(-)
    ```

    Notice the phrase `Fast-forward`.  This means it was a
    "trivial" merge.  Instead of merging one set of changes
    into another set of changes, we only had one set of changes
    to begin with.  This amounts to simply advancing the
    `master` pointer.

    ![Fast-forward](/git/images/ff07.svg)

The `X` and `Y` commits constitute the work done on the `B1`
branch.  Since no other commits had been made to the `master`
branch, the merge was a *fast-forward merge*.  This happens
when the merge is logically equivalent to having applied the
commits directly to `master` without branching.  In this case
there is **no additional commit**.  The `Y` commit becomes the
head of the branch for both `master` and `B1`.

Note that immediately after the merge, `master` is still the
current branch. If there is no more work to be done on the `B1`
branch, we may delete it.

```console
GitWorkshop/samples1$ git branch
  B1
* master
GitWorkshop/samples1$ git branch -d B1
Deleted branch B1 (was 81d60de).
GitWorkshop/samples1$ git branch
* master
```

![Delete-branch](/git/images/ff08.svg)

