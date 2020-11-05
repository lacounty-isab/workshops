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
commit d0d9eea64278b523f647d86c89bc2ced17e94eff (HEAD -> master)
Author: Paul Glezen <pglezen@isab.lacounty.gov>
Date:   Mon Oct 12 22:15:31 2020 -0700

    Added Python and fixed typos.

commit 79647d700a60bc4549ac01c7c2e3a1065394d309
Author: Paul Glezen <pglezen@isab.lacounty.gov>
Date:   Mon Oct 12 21:18:20 2020 -0700

    Initial version.
```

Note the entries are in **reverse** chronological order.

Our training repository is still very small.  In practice
there are usually far more commits than you want to see.
The following exercise provides practice in filtering log
output.

