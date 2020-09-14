---
id: prep
title: Prepare for Conflict
sidebar_label: Preparation
---

Let's prepare a conflict.

1. Create a new working directory `GitWorkshop/samples3`.

2. Copy the following two files from
   <https://github.com/lacounty-isab/workshops/tree/master/git/samples>.

   * `file1.txt` - a set of mapping entries
   * `file2.py` - a simple Python script

   into the `GitWorkshop/samples3` directory.

3. Initialize a new Git repository.

4. Add both files with `git add .`.

5. Commit with `git commit -m 'Initial version.'`

```console
GitWorkshop/samples3$ ls
file1.txt  file2.py
GitWorkshop/samples3$ git init
Initialized empty Git repository in GitWorkshop/samples3/.git/
GitWorkshop/samples3$ git add .
GitWorkshop/samples3$ git commit -m "Initial version."
[master (root-commit) 4fff5a8] Initial version.
 2 files changed, 22 insertions(+)
 create mode 100644 file1.txt
 create mode 100644 file2.py
GitWorkshop/samples3$ git log --oneline
4fff5a8 (HEAD -> master) Initial version.
GitWorkshop/samples3$
```
