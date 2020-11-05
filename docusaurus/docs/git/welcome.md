---
id: welcome
slug: /
title: Welcome
sidebar_title: Welcome
---

This workshop introduces the Git source control tool to new users
at Los Angeles County.  Because there are many excellent freely available
Git references, there is little point attempting another one from
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

In particular, the book [Pro Git](https://git-scm.com/book/en/v2)
is freely available to download or browse on the web.  Updated
[command references](https://git-scm.com/docs)
are also available there.

This document is an outline used to guide a pair of workshops.

**Week 1**

* [Installation](#installation)
* [Setup](/docs/git/setup)
* [Basic Lifecycle](#basic-lifecycle)
* [Log and Diff](#log-and-diff)
* [Branches](#branches)

**Week 2**

* [Merge Conflicts](#merge-conflicts)
* [Remotes](#remotes)
* [Tags](#tags)
* [GitHub](#github)
* [Cloverleaf Lifecycle](#cloverleaf-lifecycle)

## Installation

Most county employees will be running Git on a Windows workstation.
The Git installer for Windows is available for free download from

<https://git-scm.com/download/win>


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

```console
echo %PATH%
```

to see that your PATH variable was changed.

Another fun directory to add to your `PATH` is `Git\usr\bin`.
That gives you some Unix utilities and an **ssh** client.

