---
id: ex01
title: Exercise 1 - Setup
sidebar_label: Exercise 1
---

1. Create a new directory on your file system in which to perform the
   activities for the workshop.  This directory will be called
   `GitWorkshop` for the rest of this workshop.

2. Open a command line terminal to `GitWorkshop`.

3. Verify your Git version with `git --version`.  If this fails,
   you need to fix problems with your `PATH` or the installation.

4. Set your name and email in the **global** scope using the commands
   above.

5. Clone the ISAB repository for this workshop to your workstation.

   ```console
   git clone https://github.com/lacounty-isab/workshops isabrepo
   ```

------------

This will **clone** the Git repository hosted on GitHub to your local
file system into a new directory named `isabrepo`.  If you omit the `isabrepo`
parameter on the end, the new directory will default to the base name of the
repository, in this case `workshops`.

Keep this directory handy.  Later exercises will be pulling from parts of it.
