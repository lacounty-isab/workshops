# Git

This workshop is intended to introduce the Git source control tool
to new users.  Because there are so many excellent freely available
Git references, there is not much point attempting another one from
scratch. Rather, this is intended as a guide through the available
references along with descriptions of how we apply these concepts
for certain Git repositories managed by ISAB.

It's important to become comfortable with the references.
You should bookmark the ones you find useful and refer to them first
when you have questions.  Then, if necessary, seek help from others for
clarity on the documentation rather than as a substitute for the
documentation.

For Git, a great place to start for information is

<https://git-scm.com/doc>

In particular, the book [Pro Git](https://git-scm.com/book/en/v2) is
freely available to download or browse on the web.  Updated command
references are also available here.

* [Installation](#installation)
* [Initialization](#initialization)
* [Basic Lifecycle](#basic-lifecycle)
* [Log and Diff](#log-and-diff)
* [Branches](#branches)

## Installation

Most county employees will be running Git on a Windows workstation.
The Git installer for Windows is available for free download from

<https://git-scm.com/download/win>

Running the installer is mostly straight forward.  Below are some tips
for helping you through the installation wizard.

* The default installation location is usually fine.

* Under **Select Components**, I deselect `Git Bash Here` and
  deselect `Associate .sh files to be run with Bash`.  You should
  be able to do all your Git work from your DOS command line.

  ![Git Components](images/install-win1.png)

* Under **Adjusting your PATH environment**, select the middle
  option for `Use Git from the Windows Command Prompt`.

* Under **Choosing HTTPS Transport Backend**, I choose `OpenSSL`.
  The native Windows Secure Channel library is a newer option.
  Feel free to experiment if you wish.  But the only remote Git
  server we're likely to use with HTTPS is GitHub.  The
  `ca-bundle.crt` file should be sufficient for that.

* The **Configurating line ending conversions** is a tricky
  decision.  A common problem with source controlling text files
  is that one user with a Linux or OS X workstation will check in
  a file with LF endings.  Then a Windows user will check out the
  file, change a single line, and commit the change.  But the
  diff-tools will show that the Windows developer changed every
  line in the file.  What happened is that the Windows editor
  changed every LF occurrence to CR-LF.  This is not a Git-specific
  issue, but Git attempts to address it on Windows by converting
  back and forth between LF (Unix and OS X convention) and CR-LF
  Windows convention.

  If you run an editor that automatically converts LF to CR-LF,
  then please select the first option to protect the rest of us
  from your unintended line changes.  If, on the other hand, you
  maintain Linux/Unix shell scripts as part of your job, **and**
  you FTP them in binary mode to the server (i.e. as part of zip
  archive), **and** you use an editor that does not corrupt
  end-of-line characters, then select the middle option.  If none
  of this makes sense to you, select the first option.

* For terminal emulate, choose `Use Windows default console window`.
  The other one may be OK, too, if you wish to experiment.

* For **extra options** leave the defaults.

After installation, check that the `C:\Program Files\Git\cmd`
directory is in your `PATH` variable.  You can add it manually
through the following steps:

1. Open Control Panel.
2. Choose the **System** section.
3. Choose **Advanced system settings**.
4. Choose the **Advanced** tab.
5. Click the **Environment Variables** button.
6. Under **User variables** select `PATH` and click **Edit**.
7. Add the path to the entry.  The separator is a `;`.
8. Click **OK** to dismiss the windows and close Control Panel.
9. Exit and restart the command window.

You can check your work with

```
echo %PATH%
```

to see that your PATH variable was changed.

Another fun directory to add to your `PATH` is `Git\usr\bin`.
That gives you some Unix utilities and an **ssh** client.

### First Time Setup

First time setup is described well in the
[Pro Git book](https://git-scm.com/book/en/v2)
under the section
[Getting Started - First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
The most important section is setting your `user.name`
and `user.email` properties.

```
> git config --global user.name "John Doe"
> git config --global user.email jdoe@somewhere.gov
```

The `--global` flag set the property in your global user
configuration file.

By default, Git on Windows uses its own version of **vi** to
edit commit comments.  If this doesn't sit well with you, then
you might want to change it to something else.  Note that it
needs to be something that works with Git, like `vi`, `emacs`,
or `Notepad++`.  Editors that do **not** work are
`notepad` and `write`.  It's also possible to provide a one-line
commit message on the command line.

### GUI Git

There are a number of Git GUI programs available.  Some of
them are standalone; others are part of IDEs (Integrated
Development Environments) like Eclipse (Java), Visual Studio
(.Net), RStudio (R), and others.
The GUIs are mostly good.  But you are strongly encouraged
to understand the Git command line.

1. Most actions of any GUI tool can be understood in terms
   of the command line.  
2. The definitive (not always the best) documentation is
   expresses Git operation in terms of command line options.
3. You may have to change between various GUI tools; but
   the command line stays the same.
4. When searching for help in public forums (such as
   <https://stackoverflow.com>), questions and answers are
   most easily expressed in terms of the command line.

Once you are well grounded in the command line, most GUI Git
tools should be easy for you to understand.


## Initialization

There are two ways to create a Git repository:

1. Create a new repository to track files on your workstation
   that are not currently under source control.
2. Clone an existing repository from somewhere else to your
   workstation.

### init

The Git `init` command creates a new repository.  It's normally used
to create a new local repository for files you wish to place under
source control.  To run this command, first change to the directory
that will be the root of the repository.  Then run the command.

```
git init
```

It will be very anticlimactic.  All it does is create a `.git`
folder in your directory.  Because the name starts with a dot,
your file explorer may not even show it.  The `.git` folder
contains an **empty** Git repository.  It's important to understand
that none of the code that may have existed in the folder when
you issued the `git init` command is part of the repository yet.
This is by design.  After all, you may not want every file in
your directory to be part of the repository.

To track the code your directory, you first must add it to the
Git staging area.  This is done with the `git add` command.  The
parameters to this command specify which files you want to add.
You can specify file names, directory names, or both.  When a
directory is specified, all its files are added and all its
subdirectories are added recursively.  The following command
adds everything.

```
git add .
```

Now all the files are in the staging area and ready to commit.

```
git commit -m "Initial version"
```

This command will commit the change using the message
`Initial version`.  This avoids a `vi` session for those of you
not familiar withe the `vi` editor.  But it limits you to
commit messages that are a single line.

### clone

The **clone** command clones a repository from one location to
another location.  It's commonly used to obtain a local copy of
a Git repository hosted remotely.  For example:

```
git clone https://github.com/lacounty-isab/workshops workshops
```

will copy the `workshops` repository on GitHub into a new subdirectory
of your current directory named `workshops`.  You could make another
copy like this.

```
git clone workshops wksp2
```

This does the same thing; except doesn't use the network.

### Working Copy

A typical directory containing a Git repository might look like the
the following.

```
-- MyRepo/
   |-- .git/
   |-- src/
   |-- docs/
   |-- readme.md
```

In such a configuration, the `.git` folder is the repository proper.
The other files are collectively known as *the working copy*.  It's
tempting to identify the working copy with the repository.  This is
often harmless; but we should keep in mind that the working copy is
just that, a **copy**.  Every version of every file in repository
is stored in the `.git` folder (though it's not obvious how).  The
working copy is for the convenience of the developer.


## Basic Lifecycle

Most of us have worked with some sort of *centralized* version control
system (CVCS) in the past.  Examples include tools such as **CVS**, **SVN**, and
**ClearCase** have a basic lifecycle of

1. checkout - copy a version to local workspace
2. edit - edit working copy
3. commit - write changes back to server
4. repeat

The server contains the history of every file.  Our workstation contains
a working copy that we can edit.  But anything related to other versions
of files in terms of

* comparing them
* reading their commit comments
* creating branches
* conflict resolution

requires a connection with the server.  This is inefficient even when we
do have good network connectivity.  Git is an example of a
[distributed](https://git-scm.com/about/distributed)
version control system (DVCS).  Every copy of the repository is the full
version history.  There may be an instance that a team calls "the server."
But that's purely by convention.

There is no such thing as a "Git client" that is distinct from a Git
server.  All *checkout* and *commit* commands work on local repositories.
There are commands that push and pull changes between two repositories.
But these changes have to have been committed locally first.  There is
no notion of using a Git client to browse a server.  Rather, you clone
the server repository to a local repository on your workstation and browse
it using your workstation file manager.

Once you have a local copy of the repository the basic lifecycle goes
like this.

1. checkout - change branch; often create a new one
2. edit - edit working copy
3. stage - add the changes to a staging area
4. commit - commit changes.
5. repeat steps 2 - 4.
6. push commits to a server copy of the repository.

Note that in the case of a local-only repository, step 6 never happens.
The commands used in the basic lifecycle are discussed in more detail below.
Reference is often made to **HEAD**.  This is a pointer that refers to
the place in the commit tree where the next commit will be applied.

### git checkout

The `git checkout` command has two modes.  If the argument is the name
of a branch, then the HEAD pointer is moved to that branch and your
working copy files are updated withe version associated with the branch.
If the argument is a working copy file name, it means replace the existing
working copy with the committed copy associated with the HEAD commit.

```
git checkout i40
```

will move HEAD to the `i40` branch and replace the working copy files
with the version associated with `i40`.

```
git checkout i40 -- readme.md
```

will replace the current version of `readme.md` in the working copy
with the version associated with the `i40` branch.  But it will not
switch HEAD to that branch.  If the `readme.md` has local edits that have
not been saved (via a commit), you will receive a warning.  Use the
force `-f` option to override.  The `--` is used to separate the branch
name from the file name (multiple file names are allowed).
This is not as common as the first form used to switch to another branch.  

It's common to create a new branch before starting work.

```
git branch MyNewBranch
git checkout MyNewBranch
```

The first command creates a new branch, but it does not change HEAD to
it.  The second command changes HEAD.  A single-command short-cut equivalent
to the above two commands is

```
git checkout -b MyNewBranch
```

This creates a new branch and switches HEAD to it.

With all this branch creation and switching, it's good to know where
you stand with respect to the current branch.  The `git branch` command
with no arguments lists all your local branches and highlights the current
branch with an asterisk.

```
$ git branch
  i35
  i40
  i45
  i47
  i48
  lasd/gards
  lasd/juvwrnt
* master
```

In the example above, there are eight local branches.  HEAD is currently
pointing to the `master` branch.  Another command used to determine your
status is the `git status` command.

```
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   Tables/DM_event_xref.tbl

no changes added to commit (use "git add" and/or "git commit -a")
```

The first line of the response says `master` is the current branch.  Next
it lists a file that has changed, but been staged.  It also reminds us of

1. the command to stage the file
2. the command to discard the changes.

The last line of the output says we have no staged changes.

### git add

During our edit session several files may have changed.  Some changes we
want to keep; other changes not.  Some temporary files may have been
created that we want to keep locally, but not track in source control.
The Git **add** command is how we cherry-pick exactly what we want to commit
and exclude what we don't.  The `git add` command adds **changes** to the
[staging area](https://git-scm.com/about/staging-area).
Wake up, because this is subtle.  It does **not** place *the file*
in the staging area.  It copied the contents of the file into the staging area.
If you make another change to the file and run `commit`, you commit what you
added earlier, not new changes to the file.  You have to run `git add` again
to commit the new changes.

Here is an example.

```
isabmbp1:~/idsc/workshops/git$ git add readme.md
isabmbp1:~/idsc/workshops/git$ git status
On branch git
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   readme.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	../distributions/
```

I added changes to the very file you're reading and then ran `git status`.
It says that `readme.md` is ready to be committed (it's been staged).  
But now I'm typing more stuff into it before I commit.  Let's run
`git status` again.

```
isabmbp1:~/idsc/workshops/git$ git status
On branch git
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   readme.md

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	../distributions/
```

The `readme.md` file appears twice!  Once as a file to be committed (i.e. the
staged contents) and once as changes not staged for commit (the contents I typed
later).  If I only want to commit the first change, I could run `git commit`.
If I want to commit the later change, I must run `git add` again before the
commit.

### git commit

Because so much preparatory work goes into populating the staging area with
exactly what we want to commit, the `git commit` command is very simple.  But
there are a few things to keep in mind.

#### Commit Comments

Each commit should have a comment describing the commit.  It may be brief
and benign, like "Initial commit."  Or it might go on for several paragraphs.
The following conventions apply to Git comments.

1. The first line should be a brief summary with fewer than 50 characters
   and end with a period.  That's because many reporting tools summarize
   Git commit comments using the first line only.  These reports look
   nicer if the summary is shorter.
2. If there are more details to provide, start the details on the third
   line.  The second line should be blank.
3. Comment lines starting with line 3 have no convention for length.
   But generally it's good to keep them under 100 characters.

Generally you do **not** need to provide

* __the date__ - this is provided automatically
* __the author__ - this defaults to the committer; but their is a `commit`
  option to specify a different author than the committer.  (See below)
* __the changed files__ - this is obtainable through other Git commands;
  it does not *need* to be part of the commit message.  But this is only
  a convention; you may add a file list if you feel so inclined.

 To add a commit on behalf of another author, use the `--author` option.

```
git commit --author "Mai Kaleegh <mkaleegh@agcy.place.gov>"
```

The commit record will still register you as the committer.  But the author
field will be someone else.

#### Comment Editor

The first response of the `git commit` command will be to start an editor
in which you add the commit comment.  By default, this is a **vi** editor.
On Windows, this editor is installed with Git.  You can change this editor
as mentioned in [First Time Setup](#first-time-setup).  But it has to be
an editor that can communicate with Git (e.g. not Windows Notepad or Write).

If your comment is a single line, you can do this on the command line with
the `-m` flag.

```
git commit -m "My one line commit comment."
```

When invoked this way, no editor is started since the commit comment is already
provided.

#### Short Circuit

If the whole staging area idea doesn't sit well with you, it is possible
to commit changes to file straight from the working copy without (explicitly)
passing them through a staging area.  You should do this when working on
repositories you share with others.  But it may be fine for Git repositories
you use privately.  Just provide the `-a` flag.

```
git commit -a -m "A commit without explicit staging."
```

This command will commit all changes of the working copy.  Notice I add the
"explicit" qualifier to "staging".  That's because it's still happening.  That's
just how Git works.

#### Commit Hash

A [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function)
function takes a string and converts it to a sequence of hexadecimal
digits.  This string of hexidecimal digits is informally known as
*a hash*.  (In this context *hash* is a noun.  But the act of calculating
a hash is sometimes called *hashing*; so it's also a verb.)
The idea is that if two strings are different, their respective
hashes will also be different.  While it's theoretically possible to
have two files hash to the same output, in practical terms, this is
very difficult to find.  
A "good hash function" has the property that if you change the input
string even slightly, the output is completely different.
A great deal of digital cryptography relies on this difficulty.

When you add a file to the Git staging area, the name of stored
content (under the `.git` folder) is a
[SHA-1](https://en.wikipedia.org/wiki/SHA-1) hash of the content.
The output of a SHA-1 hash is 40 hexadecimal characters.  When you
commit your changes, all the SHA-1 hashes are collected together,
along with the text of your commit comment, and used to create a
*commit hash*.  This commit hash accounts for

* your commit comment,
* all the files in your commit,
* the commit hashes of the previous commits from which your commit derives.

This 40-character string is a check on every version of every file
since the repository was created.  That's why *there is no such thing
as a Git repository corruption*.  If the hashes don't match the content
(because of a network error during a transfer or because of someone trying
to secretly change the record of the past), the Git sync commands will
immediately detect the inconsistency and fail the operation.  So it
may fail to reproduce a repository; but it will never reproduce a corrupt one.

As mentioned above, hashes are used to represent many things in Git.  But
we are mostly concerned only with the **commit hash** that represents the
state of the entire repository at a given time.  A 40-character hash
is awkward to type and copy.  But in most cases, just the first few
digits are needed to uniquely determine a commit.  The need for more digits
[depends on the number of commits](https://github.com/pglezen/githash).


****

Several subtle concepts have been introduced in this section.  If this
is new to you, you should review this process again via this blog post

<https://git-scm.com/blog/2011/07/11/reset.html>

starting with the section titled **The Workflow**.
The concepts are the same as described above;
but with some different emphasis and
several helpful diagrams carefully detailing what is changing
and what isn't.  One thing to remember while reading this post is
that the author uses the term "index" for what we call "the staging area."
"Index" was the original term for "staging area".  "Staging area"
started taking hold about five years ago.  "Staging area" is more
intuitive; "index" has fewer syllables.


## Log

The [git log](https://git-scm.com/docs/git-log) command displays
information about commits.
As simple as this sounds, there is a bewildering number of options
to customize what you see and what you hide.  Here is a basic
form of the `git log` command.

```
isabmbp1:~/idsc/workshops$ git log -2
commit 3c64c71adef0c0ccd9beabd0ced94d5477f7cff1
Author: Paul Glezen <pglezen@isab.lacounty.gov>
Date:   Thu Apr 6 07:30:45 2017 -0700

    Added Basic Lifecycle section to Git workshop.

commit cf5fdf20ee36addd9c40d24fdce1894ef8eee3f7
Author: Paul Glezen <pglezen@isab.lacounty.gov>
Date:   Wed Apr 5 07:00:45 2017 -0700

    Added Git-on-Windows installation section.
```

* The `-2` option is important.  It limits the output to two entries.
  Without this option (or some other range restriction), the output
  will list all commits that could scroll your screen for hundreds
  of lines.

* The entries are listed in **reverse chronological** order.

Another way to restrict the number commits is through a relative
time.

```
isabmbp1:~/idsc/workshops$ git log --since 1.day
commit 3c64c71adef0c0ccd9beabd0ced94d5477f7cff1
Author: Paul Glezen <pglezen@isab.lacounty.gov>
Date:   Thu Apr 6 07:30:45 2017 -0700

    Added Basic Lifecycle section to Git workshop.
isabmbp1:~/idsc/workshops
```

So far, we've restricted the commit range by time only.
We can also restrict by space.  We can specify a file or
a directory so that we only see Git commits affecting
those components.  The following command lists commits
that affect files in the `Tables` directory for the
last two months.

```
git log --since 2.month -- Tables
```

The `--` is a safety mechanism so that `Tables` is interpreted
as a file or directory and not the name of a branch.  It's not
always required; but when you see it, that's what it does.  It's
just a separator.

## Diff

The `git diff` command is helpful for checking the differences
between

* two commits
* the working copy and the last commit
* the working copy and the staging area
* the staging area and the last commit

With no options, `git diff` returns the difference between the
working copy and the staging area.  That's a common use case
since it shows you what you're about to stage.

The output of the `diff` command is similar to the classical
Unix diff.  The first few lines of output is just header.
Further down, you'll see lines that begin with either a minus
`-` or a plus `+`.  The way to read these is that the
`-`-prefix lines are deleted and the `+`-prefix lines are
added.

```
diff --git a/git/readme.md b/git/readme.md
index d04da0b..45bd5c2 100644
--- a/git/readme.md
+++ b/git/readme.md
@@ -535,7 +535,77 @@ started taking hold about five years ago.  "Staging area" is more
 intuitive; "index" has fewer syllables.


-## Log and Diff
+## Log
+
+The [git log](https://git-scm.com/docs/git-log) command displays
+information about commits.
```

In the case above, you can see that
```
## Log and Diff
```
was replaced with
```
## Log

The [git log](https://git-scm.com/docs/git-log) command displays
information about commits.
```

## Branches

Branches are a very common phenomenon with Git, much more so than
with other source control tools.  This is pragmatic with Git because
a branch is nothing more than a pointer to the commit tree.  The key
to understanding branches is to understand the commit trees.  

### DAG

A commit tree is a directed acyclic graph (DAG).  
An example of a DAG is shown below.

![Directed Acyclic Graph](images/dag1.png)

* It's a *graph* in that it has vertices and edges
  (or points and lines if you prefer).
* It's *directed* in that each edge has a direction
  (indicated by an arrow).
* It's *acyclic* in that you can't traverse a cycle (or loop)
  by following the edges in their prescribed direction.

A Git tree is a DAG where the vertices are commits and the lines
represent changes from one commit to the next.  The direction of
the Git arrows are reverse of what one typically sees in a source
control tree: *Git arrows point to the past, not the future*.
In the figure above, `A` is the initial commit.  `B` is a commit
from which two branches emanate.  `D` is a merge commit.

It's good to draw the DAGs on paper as you initially work through
branch and merge scenarios.  After a while you start to see them in
your head and there is less need to write them down.
Since a branch is simply a pointer into our DAG commit tree,
it's helpful to work through a branch/merge scenario and observe
how the structure of the DAG and branch pointers change.
But first, a quick note on branch names.

### Branch Names

There is no "special branch" in Git from a technical standpoint.
But there is a very popular convention of using a branch named
`master` for the main branch.  When a repository is initialized,
a `master` branch is created by default.

**HEAD** is technically a branch pointer (whereas branches are
commit pointers).  So `HEAD` is a pointer to a pointer.  In
practical terms, `HEAD` determines "which branch you're on".
We can also see this in implementation terms by peeking
directly into the Git repository (inside the `.git` folder).

```
$ cat .git/HEAD
ref: refs/heads/master
$ cat .git/refs/heads/master
5567a3e7b3724d116a9d7344d412aaf7ff2aba4c
isabmbp1:~/pix/cloverleaf/git/site$
```

The file `HEAD` contains a reference to a branch, in this
case `master`.  The file `.git/refs/heads/master` points
to a commit.

### Basic Scenario

Let's say we have the following commit tree.
The green circles represent commits.  I've used capital
letters instead of commit hashes to label them.
There are two commit so far, `A` and `B`.

![workflow1](images/workflow01.png)

Branches are represented by blue boxes.  In the
present case, there is only the `master` branch
which is represented by `M`.  `master` is the active
branch because `HEAD` is pointing to it.

```
isabmbp1:~/somewhere/workflow$ git logdate
* 89e5100 2017-04-07 [Paul Glezen] Added introduction.
* b668882 2017-04-07 [Paul Glezen] Initial version
isabmbp1:~/somewhere/workflow$ git branch
* master
```

In this example

* commit `B` corresponds to `89e5100`
* commit `A` corresponds to `b668882`

Let's create a new branch named `B1` in order to begin
some new work.

```
isabmbp1:~/somewhere/workflow$ git checkout -b B1
Switched to a new branch 'B1'
isabmbp1:~/somewhere/workflow$ git status
On branch B1
nothing to commit, working tree clean
```

![New branch](images/workflow02.png)

No changes of commits occurred, just pointers.
This is actually shorthand for two commands:

```
git branch B1
git checkout B1
```

The first created the `B1` square.  The second moved
`HEAD` to point to `B1`.  The `-b` in the short-cut
caused the branch creation; otherwise it is an error
to `checkout` a branch that doesn't exist.

Now I'll edit the document and commit again.

```
isabmbp1:~/somewhere/workflow$ git branch
* B1
  master
isabmbp1:~/somewhere/workflow$ vi readme.md
isabmbp1:~/somewhere/workflow$ git add readme.md
isabmbp1:~/somewhere/workflow$ git commit -m "Added design section."
[B1 4e9d53e] Added design section.
 1 file changed, 4 insertions(+)
```

The response from the commit message indicates the commit was added
to `B1` and that its hash starts with `4e9d53e`.  This corresponds
to commit `X` on the diagram.

![First branch commit](images/workflow03.png)

I drew the `X` commit at an angle to express my intention that
this commit is a branch separate from `master`.  But there is nothing
in the graph that makes this so.  I just drew it this way.
Let's reconcile the logs and the branch pointers.

```
isabmbp1:~/somewhere/workflow$ git logdate
* 4e9d53e 2017-04-07 [Paul Glezen] Added design section.
* 89e5100 2017-04-07 [Paul Glezen] Added introduction.
* b668882 2017-04-07 [Paul Glezen] Initial version
isabmbp1:~/somewhere/workflow$ git branch -v
* B1     4e9d53e Added design section.
  master 89e5100 Added introduction.
```

The asterisk next to `B1` in the `git branch -v` output shows that
`B1` is still our current branch.  `master` is still pointing to
`B`; but `B1` has advanced to `X`.

I make one more change to fix typos and commit.

![Second branch commit](images/workflow04.png)

I'm done and ready to merge this to the `master` branch.
Merging is *always* done relative to the target branch.
In this case, the target is `master`.  So I need to
change to the `master` branch.

```
$ git checkout master
Switched to branch 'master'
$ git branch
  B1
* master
```

When we changed to the `master` branch, all the files in the
working copy changed, too.  If we peek into our files, all
the changes we added on the `B1` branch are no longer visible.

![Switch to back to master](images/workflow05.png)

Now merge the `B1` changes to `master`.

```
$ git merge B1
Updating 89e5100..32b8636
Fast-forward
 readme.md | 4 ++++
 1 file changed, 4 insertions(+)
```

Notice the phrase `Fast-forward`.  This means it was a
"trivial" merge.  Instead of merging one set of changes
into another set of changes, we only had one set of changes
to begin with.  This amounts to simply advancing the
`master` pointer.

![Fast-forward](images/workflow06.png)

This is fairly common.  You create a branch on which to undertake
a change to prepare for the *possibility* other work might occur
concurrently.  But when it comes time to merge, you learn that no
other commits have been made on `master`.  So at the end of the
day, it doesn't look like a merge at all.

But what if there had been a commit to `master` before the
attempt to merge.  The picture below is very nice.  But what
if we con't have a nice picture and we want to determine what
has happened on each fork?

![Non-trivial merge](images/workflow07.png)

The `git log` command supports a "double-dot" syntax that specifies
set difference.

```
$ git logdate master..B1
* 32b8636 2017-04-07 [Paul Glezen] Fixed typos.
* 4e9d53e 2017-04-07 [Paul Glezen] Added design section.
```

The expression `master..B1` means the following.

1. Start with the commit at `B1`, follow the arrows all the way to
   the end, and consider this the "B1 set".
2. Start with the commit at `master`, follow the arrows all the way
   to the end, and consider this the "master set".
3. Perform set subtraction: remove all elements in `master` from `B1`.
4. Print log entries for whatever elements are left.

Looking up at the diagram, we see this amounts to precisely those commits
that are part of the `B1` branch, but not the `master` branch.  These are
the changes to be **merged from**.  We can see from the output there are
two commits on `B1` since the branch from `master`.

What about the **merged to**?  We just flip the arguments.

```
$ git logdate B1..master
* f092565 2017-04-07 [Paul Glezen] Added Favorite to title.
```

This is consistent with the diagram.  There has been one commit to `master`
since `B1` branched off.  Because this set is **not empty**, there will be
no possibility of a fast-forward merge.

```
isabmbp1:~/somewhere/workflow$ git merge B1
Auto-merging readme.md
Merge made by the 'recursive' strategy.
 readme.md | 4 ++++
 1 file changed, 4 insertions(+)
```

This merged the changed lines in `B1` to the lines that changed
in `master`.

![merge done](images/workflow08.png)

This was painless because the changed lines from `B1` were **different**
from the changed lines in `master`.  If both branches had changed the
same line, that would have introduced a *merge conflict*.  These have to
be resolved manually.  But that's a topic for next week.

The log command gives us the following picture.

```
isabmbp1:~/somewhere/workflow$ git logdate
*   f77e769 2017-04-07 [Paul Glezen] Merge branch 'B1'
|\  
| * 32b8636 2017-04-07 [Paul Glezen] Fixed typos.
| * 4e9d53e 2017-04-07 [Paul Glezen] Added design section.
* | f092565 2017-04-07 [Paul Glezen] Added Favorite to title.
|/  
* 89e5100 2017-04-07 [Paul Glezen] Added introduction.
* b668882 2017-04-07 [Paul Glezen] Initial version
```

Not bad for the command line. From a coding perspective, we're done.
But from a house cleaning perspective, we still have that `B1` pointer
hanging around, even though we don't need it anymore.  Just remove it.

```
isabmbp1:~/somewhere/workflow$ git branch
  B1
* master
isabmbp1:~/somewhere/workflow$ git branch -d B1
Deleted branch B1 (was 32b8636).
isabmbp1:~/somewhere/workflow$ git branch
* master
```

Deleting branches makes people nervous.  But we're not really
deleting the branch; we're deleting the pointer that created
the branch.  We can still reach either branch from commit `D`.
And we *do* have a pointer to commit `D`; namely `master`.
If we removed the `master` pointer, we'd be in trouble.
According to the diagram, there would be no way to find
the end of the branch.  It would sure be unfortunate if that
happened by accident because a Git presentation told you that
it's OK to delete branches on a whim.  Let's see what happens.

```
git branch -d master
error: Cannot delete branch 'master' checked out.
```

So it won't let me delete a branch that I've got checked out.
That's good.
But what if it was another branch on which I had worked but
not merged and don't have checked out.

```
isabmbp1:~/somewhere/workflow$ git checkout -b B2
Switched to a new branch 'B2'
isabmbp1:~/somewhere/workflow$ vi readme.md
isabmbp1:~/somewhere/workflow$ git add readme.md
isabmbp1:~/somewhere/workflow$ git commit -m "Work done."
[B2 c74fb9b] Work done.
 1 file changed, 2 insertions(+)
isabmbp1:~/somewhere/workflow$ git checkout master
Switched to branch 'master'
isabmbp1:~/somewhere/workflow$ git branch -v
  B2     c74fb9b Work done.
* master f77e769 Merge branch 'B1'
```

Now we have

![Branch B2](images/workflow09.png)

We thought we merged `B2`; but we didn't (and didn't bother to
to perform the easy check of `git log master..B2`).

```
isabmbp1:~/somewhere/workflow$ git logdate master..B2
* c74fb9b 2017-04-07 [Paul Glezen] Work done.
isabmbp1:~/somewhere/workflow$ git branch -d B2
error: The branch 'B2' is not fully merged.
If you are sure you want to delete it, run 'git branch -D B2'.
```

There you have it.  Git will warn you that the branch is not
fully merged.  If you still insist, you can use the `-D`
delete option instead of just `-d`.  One reason to force a
delete is because you accidentally committed a huge file to
the repository and you don't want it to be part of the permanent
commit history.  Avoid merging the commit and remove its branch
pointer.  That will leave a dangling commit in the repository that
still exists, but has no pointers.  Eventually Git will clean this
up (delete unreferenced commits from disk).  It waits about 60 days
in case you feel compelled to get it back
(see [git reflog](https://git-scm.com/docs/git-reflog)).


### Cautionary Note on Hierarchical Branch Names

Some times forward slashes are used
to organize branches hierarchically (e.g. `da/issue23` or
`pubdef/issue45`).  Using hierachical branch names works fine
so long as you observe the following **cautionary note**.
Under the covers (i.e. in the `.git/refs/heads` folder), each
branch pointer name is also a file name.  This file simply
contains the SHA1 hash of the commit it references.  If your
branch name contains a slash, then the file name is really a path
name containing directories relative to `.git/refs/heads`.

```
$ git branch --list lasd/*
  lasd/gards
  lasd/juvwrnt
$ cat .git/refs/heads/lasd/gards
143449187ae79e04122045b38353b13fae3fbb4b
```

In the example above, I listed only branches related to `lasd`.
We can see that under the covers, it's a very small file containing
the SHA1 hash of the commit (i.e. it's commit pointer).

The problem that can happen is if someone later decides to create
a branch named `probation` to do all probation work.  That becomes
a **file** named `.git/refs/heads/probation`.  Then later, they
try to create a `probation/issue28`.  This attempts to create a
**directory** named `probation` with a file named `issue28` inside
it.  This results in an error because there is already a file
named `probation`.

As long as you keep this restriction in mind, hierarchical branch
names work fine.

***
End of Workshop 1
