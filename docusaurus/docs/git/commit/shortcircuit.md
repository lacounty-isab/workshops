---
id: shortcircuit
title: Short Circuit
sidebar_label: Short Circuit
---

If the whole staging area idea doesn't sit well with you, it is possible
to commit changes to files straight from the working copy without manually
staging them.  Just provide the `-a` flag.

```
git commit -a -m "A commit without explicit staging."
```

This command will commit all changes in the working copy.
It is not recommended since it easily leads to versions of files
being committed that were not intended.
