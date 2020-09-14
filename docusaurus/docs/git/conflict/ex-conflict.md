---
id: ex-conflict
title: Excercise 8 - Merge Conflict
sidebar_label: Exercise 8
---

With the two files in place and a new repository we're ready
to begin Exercise 8.  The two files are displayed
below with line numbers added for reference.



```text title="file1.txt"
   1 # This file contains mappings.
   2 #
   3 a1 - 20
   4 a2 - 43
   5
   6 b1 - 39
   7 b2 - 34
   8 b3 - 44
   9
  10 c1 - 45
  11 c2 - 19
```

```text title="file2.py"
   1
   2 def print_usage():
   3    usage = """"Usage: addAudit.py [-f] [-v] <filename ...>"
   4     -f - overwrite when duplicate key encountered
   5     -v - verbose
   6     <filename ..> the name of at least one audit file."""
   7
   8    print(usage)
   9
  10 print_usage()
```


## Branch B2 Changes

1. Create a new branch `B2`.

   ```console
   GitWorkshop/samples3$ git checkout -b B2
   Switched to a new branch 'B2'
   ```

2. Edit `file1.txt` in the following way.
   a. __Line 6__: Add `,41` to the end of the line
   b. __Line 7__: Change `35` to `36`
   c. __Line 8__: Add a blank space after `44`
   d. __Line 10__: Change `45` to `55`
   e. __Line 11__: Change `19` to `29`

3. Edit `file2.py` by adding a blank space to each line
   of the `print_usage` function.  That is, add a space
   to the beginning of lines 3 - 6 and line 8.

4. Check your work with `git diff`.  Note that some changes
   are not as easy to see as others.

5. Add the changes the staging area.

6. Commit with the message `B2 changes`.

   We now have the configuration shown in the diagram below

   ![First commit](/git/images/mergeConflict01.svg)


## Branch B3 Changes

7. Now we're going to switch to a new branch `B3` starting
   from commit `A` just like `B2` did.

   ```console
   GitWorkshop/samples3$ git checkout master
   Switched to branch 'master'
   GitWorkshop/samples3$ git checkout -b B3
   Switched to a new branch 'B3'
   ```

   These two commands changed the Git branch configuration as
   shown below.

   ![b3 branch](/git/images/mergeConflict04.svg)

   Now we're ready to make `B3` changes.

8. Edit `file1.txt`.
   a. __Line 3__: change `20` to `30`.
   b. __Line 4__: change `43` to `53`.
   c. __Line 6__: add `,40`.
   d. __Line 7__: change `34` to `35`.

   ![file1.txt](/git/images/mergeConflict05.jpg)

9. Edit `file2.py`.  Replace the triple-quoted string to
   a series of print statements.  It should look like this.

   ![file2.py](/git/images/mergeConflict06.jpg)

10. Check your work with `git diff`.

11. Add the changes to the staging area.

12. Commit with the message "B3 changes."

    After the `B3` commit, we have the branch configuration shown
    below.

    ![After B3](/git/images/mergeConflict07.svg)

## Attempt Merge

We're going to perform the merge in the `master` branch.
First we'll merge `B2` (which should be fast-forward) and
then merge `B3` in which we expect a conflict.


13. The target branch is always the current branch `HEAD`.  To
    merge `B2` into `master` we first change to the `master`
    branch.

    ```console
    git checkout master
    ```

    ![Change to master](/git/images/mergeConflict08.svg)

14. Merge branch `B2` into master.  

    ```console
    git merge B2
    ```

    This should be a fast-forward merge like we did in Part 1.
    The Git DAG should now look like this.

    ![After B2 merge](/git/images/mergeConflict09.svg)

15. Finally, issue the command to merge `B3`.
    This is where the fireworks start.

    ```console
    GitWorkshop/samples3$ git merge B3
    Auto-merging file2.py
    CONFLICT (content): Merge conflict in file2.py
    Auto-merging file1.txt
    CONFLICT (content): Merge conflict in file1.txt
    Automatic merge failed; fix conflicts and then commit the result.
    ```


## Resolve Conflict

What just happened in Step 15?

Git auto-merges on a line-by-line basis.  When the same line
is changed in different ways, Git places *merge markers* around
those lines to indicate two incompatible changes were made.
They must be manually resolved.

The merge markers are on lines 6, 10 and 14 in the figure below.

![Merge markers](/git/images/mergeConflict10.jpg)

We have to decide ourselves, based on a larger perspective, how
to resolve the conflicts.  We could

* pick the left side (`master` branch version), or
* pick the right side (`B3` banch version), or
* choose something completely different from either side based
  on some knowledge about the bigger picture.

These decisons are carried out in the following three steps:


a. __Edit the lines__ within the merge markers based on your decisons.

b. __Delete the merge marker__ lines and save the file.

c. __Add the file__ to the Git staging area.


This last step is how Git know when we've complete the merge
activity for the file.  We repeat steps a, b and c for each
file in which a merge conflict occurred.

Looking at `file1.txt` above, things aren't that bad.
The top (only changed on `B2`) and the bottom (only changed on
`B3`) were auto-merged.  Only the middle third, where both `B2`
and `B3` changed lines, requires resolution.

16. Edit the lines of `file1.txt`.

    a. For entry `b1`, branch `B2` added `41` while branch `B3`
       added `40` to the value.  Let's make the decision to add
       both so that line 7 has `b1 - 39,40,41`.  Notice how we're
       implicitly making lines 7 - 9 our "definitive copy."

    b. For entry `b2`, branch `B2` changed the value to `36`
       which brnach `B3` changed to `35`.  Let's decide to keep
       `36` so that line 8 remains unchanged.
 
    c. Entry `b3` is tricky.  It looks the same in both lines 9
       and 13.  Recall that branch `B2` eroneously added a space
       at the end of the line.  In this case, we wish to accept
       the `B3` line 13 which left the line unchanged.  Remove
       the last space on line 9.

    ![file1.txt merge](/git/images/mergeConflict11.jpg)

17. Delete the merge markers.  Lines 7 - 9 are now in the form
    we want to keep.  We can delete lines 11 - 13 as well as
    the merge markers on lines 6, 10 and 14.  Then save the file.

    ![Remove merge markers](/git/images/mergeConflict12.jpg)

18. Add `file1.txt` to the Git staging area.

    ```
    git add file1.txt
    ```

19. Perform the same merge steps `a`, `b` and `c` for `file2.py`.
    This is a simpler case where we wish to only accept the `B3`
    version.  The `B2` version had simply added an extra space on
    each line, which is not uncommon for some editors.  Simply
    delete lines 3 - 10 and line 15.  Then save the file and
    add it to the staging area.

    ```python title="file2.py"
    1
    2 def print_usage():
    3    print("Usage: addAudit.py [-f] [-v] <filename ...>")
    4    print("  -f - overwrite when duplicate key encountered")
    5    print("  -v - verbose")
    6    print("  <filename ..> the name of at least one audit file.")
    7
    8 print_usage()
    9
    ```

20. With both file conflicts resolved and added to the Git staging
    area, we can now creawte the merge commit.  It should be like
    any other commit; the hard work is over.

    ```console
    git commit -m "Merge branch B3"
    ```

21. Verify the branch activity using `git log`.

    ```console
    GitWorkshop/samples3$ git log --oneline --graph
    *   a8a9c39 (HEAD -> master) Merge branch 'B3'
    |\
    | * c76d480 (origin/HEAD, origin/B3, B3) B3 changes.
    * | eaf393f (origin/B2, B2) B2 changes.
    |/
    * 4fff5a8 (origin/master) Initial version.
    ```
    
    This shows the initial version with the source of the branch
    and they come together at at commit `a8a9c39`.

    :::note
    Your commit hash may be different.
    :::

