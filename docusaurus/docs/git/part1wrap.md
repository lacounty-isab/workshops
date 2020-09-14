---
id: part1wrap
title: Part 1 - Wrap Up
sidebar_label: Wrap Up
---

This wraps up Part 1 of this workshop.
You now know enough to work with Git on your own and
be mostly harmless to others.
If you have worked with other source control tools but
are new to Git, the following concepts might be new to
you:

* __staging area__ - Git has the notion of preparing for a
  commit by carefully adding to the staging area what is to
  be committed.  It requires planning; but in doing so, the
  `commit` action itself becomes less stressful.

* __Git graphs__ - Git commits are organized as directed
  acyclic graphs (DAGs).  Branches are simply pointers to nodes
  on these graphs.  It's important to become comfortable working
  with DAGs.

* __Logs and Diffs__ - The git `log` and `diff` command use the
  DAG structure to limit output to a particular branch using set
  arithmetic on DAG structures.

Part 2 will continue merge scenarios with the least pleasant case:
*commit conflicts*.  Conceptually, Git addresses merge conflicts
in much the same way as CVS and SVN.  The conceptually new content
for the next part will be working with remote repositories.  This
content will rely on your comfort level with DAG structures.
