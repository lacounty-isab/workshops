---
id: log1
title: Git Log
sidebar_label: Log
---

The [git log](https://git-scm.com/docs/git-log) command displays
information about commits.
As simple as this sounds, there is a bewildering number of options
to customize what you see and what you hide.  Here is a basic
form of the `git log` command.

```console
GitWorkshop/samples$ git log
commit 10f629df8aab162c65f80112d2c2406095d8dfc6 (HEAD -> master)
Author: Paul Glezen <bs193538@gmail.com>
Date:   Mon Mar 30 21:02:13 2020 -0700

    Added Python and fixed typos.

commit b83eb9bed3deb85a32b12e7679a18d28765bb0de
Author: Paul Glezen <bs193538@gmail.com>
Date:   Sun Mar 29 13:15:14 2020 -0700

    Initial version.
```

Note the entries are in **reverse** chronological order.

Our training repository is still very small.  In practice
there are usually far more commits than you want to see.
The following exercise provides practice in filtering log
output.

