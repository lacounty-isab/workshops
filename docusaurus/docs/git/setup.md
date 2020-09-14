---
id: setup
title: Setup
sidebar_label: First Time Setup
---

First time setup is described well in the
[Pro Git book](https://git-scm.com/book/en/v2)
under the section
[Getting Started - First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
The most important section is setting your `user.name`
and `user.email` properties.

```console
git config --global user.name "John Doe"
git config --global user.email jdoe@somewhere.gov
```

The `--global` flag sets the property in your global user
configuration file.  You can override this setting on a
per-repository basis.  The choices are

* `--local` - (default) applies property to a particular repository.
* `--global` - applies property to all repositories for a user.
* `--system` - applies across all users.

This is useful when you use a home computer for work projects.
Your `--global` setting would be your personal email. But you
would override a work repository email setting.


By default, Git on Windows uses its own version of **vi** to
edit commit comments.  If this doesn't sit well with you, then
you might want to change it to something else.  Note that your
choice needs to work with Git, like `vi`, `emacs`, or `Notepad++`.
Editors that do **not** work with Git are `notepad` and `write`.
It's also possible to provide a one-line
commit message on the command line.
