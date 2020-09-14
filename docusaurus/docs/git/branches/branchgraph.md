---
id: branchgraph
title: Branch Graph
sidebar_label: Graph Branches
---

The merge commit is node `D` in the diagram below.
Notice that commit `D` has two children: `C` and `Y`.

![Merge Commit](/git/images/noConflict08.svg)

However, this is not apparent with the Git log command we've been using.

```console
GitWorkshop/samples2$ git log --oneline
6513089 (HEAD -> master) Merge branch 'B1'
4878aee Forty-two miles.
81d60de (B1) Songs to compositions.
c2e8b4e Pruned dead URL from Ch 21.
10f629d (origin/master, origin/HEAD) Added Python and fixed typos.
b83eb9b Initial version.
```

However, by adding the `--graph` option to the command, we can see
the relationship of both children to the last commit.

```console
GitWorkshop/samples2$ git log --graph --oneline
*   6513089 (HEAD -> master) Merge branch 'B1'
|\
| * 81d60de (B1) Songs to compositions.
| * c2e8b4e Pruned dead URL from Ch 21.
* | 4878aee Forty-two miles.
|/
* 10f629d (origin/master, origin/HEAD) Added Python and fixed typos.
* b83eb9b Initial version.
```

Without the `--graph` option, the branches are flattened out.
Of course, GUI tools take this visualization to another level.

![GUI History](/git/images/noConflict09.jpg)

Displaying histories is one of the better advantages to using a GUI
tool.  Most IDEs have this capability built in or available as a
free plugin.
