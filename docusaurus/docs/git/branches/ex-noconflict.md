---
id: ex-noconflict
title: Exercise 7 - Merge Without Conflict
sidebar_label: Exercise 7
---

It's time to merge the `B1` branch to `master`.
It's hard to remember what's happened on either of these two
branches since the split occurred; and that's fairly realistic.
So we'll start using the `git log` command technique to
check what has occurred on each branch before starting the merge.

1. Summarize commits on `master` since `B1` split from `master`.

   ```console
   GitWorkshop/samples2$ git log --oneline B1..master
   4878aee (HEAD -> master) Forty-two miles.
   ```

   We can see the change from thirty-seven to forty-two miles.

2. Summarize the commits on `B1` since `B1` split from `master`.

   ```console
   GitWorkshop/samples2$ git log --oneline master..B1
   81d60de (B1) Songs to compositions.
   c2e8b4e Pruned dead URL from Ch 21.
   ```

3. With our memory refreshed, we proceed with the merge task.
   The `merge` command takes a single branch name for the **source**
   of the merge.
   **The target is always the current branch.**
   Since we want to merge into `master`, we must make `master`
   the current branch.

   ```console
   GitWorkshop/samples2$ git checkout master
   Already on 'master'
   Your branch is ahead of 'origin/master' by 1 commit.
   ```

   As it happened, we were already on `master`.  But it didn't
   hurt to check.  We've confirmed our status depicted in the
   diagram below.

   ![B1 Log](/git/images/noConflict02.svg)

4. The merge command itself is easy.  Run 

   ```console
   GitWorkshop/samples2$ git merge B1
   Auto-merging hg17.txt
   Merge made by the 'recursive' strategy.
    hg17.txt | 2 +-
    hg21.txt | 2 --
    2 files changed, 1 insertion(+), 3 deletions(-)
   ```

   Git displays an editor window with the contents
   pre-populated as shown below.

   ```
   Merge branch 'B1'
   # Please enter a commit message to explain why this merge is necessary,
   # especially if it merges an updated upstream into a topic branch.
   #
   # Lines starting with '#' will be ignored, and an empty message aborts
   # the commit.
   ```

5. Replace the comment or accept it.  Then save and quit the editor.
   This creates the merge commit.

