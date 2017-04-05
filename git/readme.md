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

After installation, check that the `Git\cmd` directory is in your
`PATH` variable.  You can add it manually through the following
steps:

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

`init` and `clone` commands, config user info, directory structure.

## Basic Lifecycle

the staging area; add, commit, and reset commands; amending commits;
delegating commits; .gitignore

## Log and Diff

options and range specifications for the log and diff commands;
helpful macros.

## Branches

list, change, create, and delete branches
