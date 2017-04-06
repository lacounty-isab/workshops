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

  ![Git Components](install-win1.png)

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


## Log and Diff

options and range specifications for the log and diff commands;
helpful macros.

## Branches

list, change, create, and delete branches
