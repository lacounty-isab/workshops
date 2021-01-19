---
title: Pull
sidebar_label: Pull
---

In Exercise 9,
if L21 had already been on the `master` branch to begin with
the two steps

* `git fetch origin master`
* `git merge origin/master`

could have been combined into a single short-cut:

```console
git pull origin master
```

The `git pull` command combines `fetch` and `merge` into
a single operation.
