---
id: commit
title: Git Commit
sidebar_label: The Command
---

Because so much preparatory work goes into populating the staging area with
exactly what we want to commit, the `git commit` command is very simple.  But
there are a few things to keep in mind.

#### Commit Comments

Each commit should have a comment describing the commit.  It may be as brief
as "Initial commit."  Or it might go on for several paragraphs.
The following conventions apply to Git comments.

1. The first line should be a brief summary with fewer than 50 characters
   and end with a period.  That's because many reporting tools summarize
   Git commit comments using the first line only.  These reports look
   nicer if the summary is short.
2. If there are more details to provide, start the details on the third
   line.  The second line should be blank.
3. Comment lines starting with line 3 have no convention for length.
   But generally it's good to keep them under 100 characters.

Generally you do **not** need to provide

* __the date__ - this is provided automatically
* __the author__ - this defaults to the committer; but there is a `--author`
  option to specify a different author than the committer.  (See below)
* __the changed files__ - this is obtainable through other Git commands;
  it does not *need* to be part of the commit message.  But this is only
  a convention; you may add a file list if you feel so inclined.

 To add a commit on behalf of another author, use the `--author` option.

```
git commit --author "Mai Kaleegh <mkaleegh@agcy.place.gov>"
```

The commit record will still register you as the committer.  But the author
field will be Mai Kaleegh.

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
