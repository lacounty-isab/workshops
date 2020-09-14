---
id: ex-commit
title: Exercise 4 - Second Commit
sidebar_label: Exercise 4
---

In this exercise we're going to reinforce the basic lifecycle
with another commit.  We'll continue using the `GitWorkspace/samples`
directory.  At this point, we should have the following configuration.


![Init](/git/images/secondCommit1.png)

This is the same as the end of Exercise 2, with the addition of
two pointers.

* __master__ - represents a branch.  There is nothing special about this
  branch or its name, other than Git creates one for us with each new
  repository.  It is, however, commonly retained and used.  It's a
  pointer to a commit object, usually the last one in a sequence of
  commit objects representing a branch.

* __HEAD__ - is a bookmark of sorts.  It helps Git determine where to
  apply its commands.  Since we intend for our commands to apply to
  a particular branch, `HEAD` usually refernces a branch pointer rather
  than directly to a commit.  Hence it's usually a pointer to a pointer.

We're going to make two edits in the exercise:

- Change a file that has already been committed.
- Add the Python file that was excluded before.

But first we're going to simulate an accident.


1. Let's say we wish to edit `hg17.txt`.  But somehow it accidently
   got deleted.  Simulate this condition by deleting `hg17.txt`
   yourself.

   ![Init](/git/images/secondCommit2.png)

2. Verify with

   ```
   GitWorkshop/samples$ git status
   ```

   The `status` command will be one of your most commonly used commands.

3. Of course `hg17.txt` still exists, both as a commit and within
   the staging area.  The following command will restore `hl17.txt`
   from the **staging area** to the **working copy**.

   ```
   GitWorkshop/samples$ git checkout hg17.txt
   ```

   and verify the status.

4. Open `hg17.txt` inside a text editor.

   ```
   From: <http://www.p2r.se/music/disaster.htm>

   Chapter 17

   The Hitch Hiker's Guide to the Galaxy notes that
   **Disaster Area**, a plutonium rock band from the
   ```

5. Delete the first two lines so that the first line is
   **Chapter 17**.  Then change "Hitch Hiker's" to
   "Hitchhiker's".  Save the file and close the editor.

6. Run the **diff** command to verify your changes.

   ```
   GitWorkshop/samples$ git diff
   diff --git a/hg17.txt b/hg17.txt
   index d330bb2..1e9969d 100644
   --- a/hg17.txt
   +++ b/hg17.txt
   @@ -1,8 +1,6 @@
   -From: <http://www.p2r.se/music/disaster.htm>
   -
    Chapter 17

   -The Hitch Hiker's Guide to the Galaxy notes that
   +The Hitchhiker's Guide to the Galaxy notes that
    **Disaster Area**, a plutonium rock band from the
    Gagrakacka Mind Zones, are generally held to be not
    only the loudest rock band in the Galaxy, but in
   ```

   This will list the changes between the files in the **staging area**
   and their corresponding files in the **working copy**.

   ![Init](/git/images/secondCommit3.png)

7. Now that we've verfied our change to this file, let's add it.

   ```
   GitWorkshop/samples$ git add hg17.txt
   ```

8. Try the **diff** command again.  It should show no changes.
   That's because it only compares the staging area to the working
   copy.  If your change has already been added to the staging
   area, it is consistent with the working copy.

   ![Init](/git/images/secondCommit4.png)

   To check differences between the staging area and the latest
   commit, add the `--cached` flag.

   ```
   GitWorkshop/samples$ git diff --cached
   ```

   This is not as commonly done.

9. Now let's turn our attention to the Python program that was
   omitted the first time around.  We'll use a short cut to 
   add the Python program.

   ```
   GitWorkshop/samples$ git add .
   ```

   This says add **everything** (recursively) starting with the
   current directory (the `.` means current directory).
   In our case this is what we want.
   But sometimes this can add more than you want.
   It's always good to check the status before committing.
 
10. Run the commit.

    ```
    GitWorkshop/samples$ git commit -m "Added Python and fixed typos."
    ```


The result is a new commit.  (There is only one staging area and
working copy.)

![Init](/git/images/secondCommit5.png)

:::note
* The **master** pointer automatically advances.
* Since **HEAD** references **master**, it is implicitly advanced.
* The new commit points backward in time to the old commit.  This is
  another subtle but important difference between Git and tools like
  CVS and SVN.
:::
