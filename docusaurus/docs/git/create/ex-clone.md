---
id: ex-clone
title: Exercise 3 - Local Clone
sidebar_label: Exercise 3
---

1. In your command line, change to the `GitWorkshop` directory.  There
   should be two subdirectories: `isabrepo` and `samples`.  Each of these
   directories holds a Git repository.

2. Clone the `samples` repository locally.

   ```
   GitWorkshop$ git clone samples samples2
   ```

   This
   
   a. creates a clone of the repository and
   b. checked out a working copy from the repository.

   **Note:** There is no Python script because we did not commit that
   to the original repostory.  This reinforces the point that the
   **repository** is copied, **not** the working copy.

3. Change to the `samples2` folder and list the directory.

   ```
   GitWorkshop$ cd samples2
   GitWorkshop/samples2$ ls -a
   ./         ../        .git/      file1.txt  hg17.txt   hg21.txt
   ```

4. Delete the `.git` folder.  It is no longer a Git repository.
   But you still keep your working copy.

   ```
   GitWorkshop/samples2$ rm -rf .git
   GitWorkshop/samples2$ git log
   fatal: not a git repository (or any of the parent directories): .git
   GitWorkshop/samples2$ ls
   file1.txt  hg17.txt   hg21.txt
   ```

5. Change back to the `GitWorkshop` directory and clone the ISAB 
   repository locally.

   ```
   GitWorkshop$ git clone isabrepo repo1
   Cloning into 'repo1'...
   done.
   GitWorkshop$ ls repo1
   crypto/          ds/              octotrooper.png  regex/
   distributions/   git/             readme.md 
   ```

   Notice how fast the local clone happened when there are no network
   calls involved.

6. Make a bare clone of the ISAB repository.  A *bare* repository is
   one with **no working copy**.

   ```
   GitWorkshop$ git clone --bare isabrepo repo2
   Cloning into bare repository 'repo2'...
   done.
   GitWorkshop$ ls repo2
   HEAD         config       hooks/       objects/     refs/
   branches/    description  info/        packed-refs 
   ```

   When we list the contens of `repo2`, it is what we would normally see
   inside the `.git` folder.  Hosting services use bare repositories on
   remote servers where there is no reason to have a working copy.

--------------------

Cloning a repository locally is a good resoure for teaching yourself new
commands and operations.  You can test the operation on a local clone first,
and then apply it to other resositories later.
