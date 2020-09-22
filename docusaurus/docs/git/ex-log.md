---
id: ex-log
title: Exercise 5 - Log
sidebar_label: Exercise 5
---

1. In your command line change to the `GitWorkshop/isabrepo`
   directory.  This repository has too many commits to see on
   a single screen.

2. List the last four commits.

   ```console
   GitWorkshop/isabrepo$ git log -4
   ```

   This is the most common way to limit the output.  Forgetting
   this option usually floods your screen as a lesson to remember
   it next time.

3. It's common to abbreviate the output to an entry per line.
   The `--oneline` option does this.

   ```console
   GitWorkshop/isabrepo$ git log -5 --oneline
   ```

4. Most modern installations of git have several log commands
   aliased out-of-the-box.

   ```console
   GitWorkshop/isabrepo$ git config --list | grep alias
   alias.lol=log --pretty=format:"%h %s" --graph
   alias.l=log --graph --all --pretty=format:'%C(yellow)%h%C(cyan)%d%Creset %s %C(white)- %an, %ar%Creset'
   ```
   :::note
   If you don't have the `grep` utility installed, just list all
   the aliases.
   :::

5. Try one of these aliased commands.

   ```console
   GitWorkshop/isabrepo$ git l -4
   *   3307dd6 (HEAD -> master, origin/master, origin/HEAD) Merged remote-tracking branch origin/master. - Paul Glezen, 4 weeks ago
   |\
   | * 79e14d9 Distribution supplement from last year; forgot to commit. - Paul Glezen, 6 months ago
   * | f2429ae Minor updates to GPG1. - Paul Glezen, 4 weeks ago
   |/
   * c551df5 Added workshop PDF for GPG 1. - Paul Glezen, 6 months ago
   ```

6. (Optional) If you don't have the `l` alias, define it yourself.

   ```console
   git config --global alias.l "log --graph --all --pretty=format:'%C(yellow)%h%C(cyan)%d%Creset %s %C(white)- %an, %as%Creset'"
   ```

   :::caution
   Note the mixture of double and single quotes.
   :::

   :::info
   Recall that adding `--global` to the `config` command makes it
   available to all your repositories.
   :::
   
   You can run this alias as

   ```
   GitWorkshop/isabrepo$ git l -5
   ```

7. Another way to restrict the number commits is through a relative
   time.

   ```console
   GitWorkshop/isabrepo$ git l --since 1.month
   * 3307dd6 (HEAD -> master, origin/master, origin/HEAD) Merged remote-tracking branch origin/master. - Paul Glezen, 4 weeks ago
   * f2429ae Minor updates to GPG1. - Paul Glezen, 4 weeks ago
   ```

8. So far, we've restricted the commit range by time only.
   We can also restrict by files.  We can specify a file or
   a directory so that we only see Git commits affecting
   those components.  The following command lists commits
   that affect files in the `git` directory for the
   last two months.

   ```console
   GitWorkshop/isabrepo$ git log -- git
   ```

   The `--` is a safety mechanism so that `git` is interpreted
   as a file or directory and not the name of a branch.  It's not
   always required; but when you see it, that's what it does.  It
   just separates the command options from the file or directory name.

