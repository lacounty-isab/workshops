---
id: dvcs
title: Distributed vs Centralized
sidebar_label: Distributed vs Centralized
---

Git differs fundamentally from version control tools popular
15 years ago in that it is a *distributed version control* tool
as opposed to traditional *centralized version control* tool.
Traditional centralized tools include CVS, SVN and ClearCase.
They define a repository a server.  Clients download a
*certain version* to their workspace and work with it.  The other
versions remain on the server only.  Operations such as creating
new project, checking out a different version, comparing versions,
committing new versions or viewing change history of a file
require communication with the server.  Without the server, none
of these operations are possible.

The distributed model stores the entire repository on every
workstation.  This reduces the distinction between "client" and
"server" to one of convention.  One always commits changes to a local
copy, never to a remote copy.  Those local changes may latter be
synchronized to another remote copy (an operation Git calls `push`).
But all the interesting work occurs locally.

*Remote operations merely synchronize what was already accomplished locally.*

This notion is somewhat abstract at first.  But the concept, as well as
the benefits, will become clearer as we work through the exercises.
