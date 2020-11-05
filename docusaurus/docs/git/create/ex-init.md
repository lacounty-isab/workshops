---
id: ex-init
title: Excercise 2 - Init
sidebar_label: Exercise 2
---


1. From the clone of the `workshops` repository, copy the 
   `isabrepo/git/samples` directory to `GitWorkshop`.
   After this, you should have a copy named `GitWorkshop/samples`.

2. Change to the `GitWorkshop/samples` directory in your command line.
   This represents a directory of files from which we want to
   create a new Git repository.

3. Run `git status`.  This is probably the most common Git command
   you'll ever execute.  In this context, it returns an ominous
   message that simply means we are not in the context of a Git
   repository.

   ```
   GitWorkshop/samples$ git status
   fatal: not a git repository (or any of the parent directories): .git
   ```

4. Run `git init`.  This will create an *empty local repository*.
   None of the files in this directory have been placed in this 
   repository.  That will come later.  On Windows, the new `.git`
   folder is harder to verify.  On Linux and macOS, it's apparent
   with `ls -a`.

   ```
   GitWorkshop/samples$ git init
   Initialized empty Git repository in GitWorkshop/samples/.git/
   ```

5. Run `git status`.  Now that you actually have a repository to
   work with, abeit an empty one, Git has more to say.  In particular,
   it's telling us that we have four files that are not yet tracked.

   ```
   GitWorkshop/samples$ git status
   On branch master

   No commits yet

   Untracked files:
     (use "git add <file>..." to include in what will be committed)

   	file1.txt
   	file2.py
   	hg17.txt
   	hg21.txt

   nothing added to commit but untracked files present (use "git add" to track)
   ```

   The remark "nothing added to commit" is alluding to the **staging area**.
   In Git there are three states in which a version of a file can occupy:
   the working copy, the staging area, and a commit.
   These are shown in the illustration below.
   
   ![Init](/git/images/firstCommit1.png)

   The *working copy* of a file is the one in your directory that you can see
   and edit.  The *staging area* is a version of file that is to be committed
   in the next `commit` action.  Committed versions of files are in the 
   commit state.  These are preserved in the commit history.

   The three logical boxes above were created with the `git init` command.
   At the beginning, all files only exist as part of the working copy.

6. For this scenario, let's say we want to commit all the `*.txt` files,
   but delay the `*.py` file.

   ```
   GitWorkshop/samples$ git add *.txt
   GitWorkshop/samples$ git status
   On branch master

   No commits yet

   Changes to be committed:
     (use "git rm --cached <file>..." to unstage)
   	new file:   file1.txt
   	new file:   hg17.txt
   	new file:   hg21.txt

   Untracked files:
     (use "git add <file>..." to include in what will be committed)
   	file2.py
  ```

   Note the change in the status message.  The status of the files went
   from **untracked** to **to be committed**.  These are the files that will
   be added to the repository if we run `git commit`.

   ![Init](/git/images/firstCommit2.png)

   We say these versions of the files are "added to the staging area."

7. Now the `*.txt` files are in the staging area and ready to commit.
   We have excluded the Python script and Markdown file by not staging
   them.  We are ready to run `git commit`.

   ```
   GitWorkshop/samples$ git commit -m "Initial version."
   [master (root-commit) d5ec68e] Initial version.
    3 files changed, 102 insertions(+)
    create mode 100644 file1.txt
    create mode 100644 hg17.txt
    create mode 100644 hg21.txt
   ```

   Note the `commit` command does **not** refernce any files.  It simply
   commits whatever changes are in the staging area.

   ![Init](/git/images/firstCommit3.png)

   This command will commit the changes using the message
   `Initial version`.  This avoids a `vi` session for those of you
   not familiar withe the `vi` editor.  But it limits you to
   commit messages that are a single line.

-------------

At the end of this exercise we still have `file2.py` as an untracked file.
There is no harm in having files in the directory that are not part of the
repository.  We can commit them later or never commit them.

```
GitWorkshop/samples$ git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	file2.py

nothing added to commit but untracked files present (use "git add" to track)
```

