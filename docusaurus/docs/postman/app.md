---
title: Native vs Web Application
sidebar_label: Native vs Web
---

The Postman application is available in two forms.

* __native application__ – This runs as an executable on your
  OS with direct access to OS resources such as the network
  and filesystem.  This generally provides a better user
  experience but requires an installation step.

* __web application__ – This runs in a browser tab using the
  browser sandbox as an intermediary to the OS.  A web
  application avoids an installation step, but is prone to

  - getting lost among browser tabs
  - accidentally navigating away from the app (e.g. hitting 
    the **Back** button)
  - accidentally closing the tab or even the whole browser
  - requires a (free) Postman account.

![Web App Screenshot](/postman/appBrowser.png)

The Postman application uses the network to synchronize your
account data and make API calls.  When
[running Postman behind a firewall](https://learning.postman.com/docs/getting-started/installation-and-updates/#using-postman-behind-a-firewall),
the perimeter security can block crucial network access that
inhibits normal behavior.  However, browsers are usually
preconfigured to work with perimeter security and suffer the
least from changes in its configuration.

The recommended practice is to use the native application when
possible.  But if networking issues are encountered, fall back
to the web application.  Because Postman synchronizes your work
with your account, you can alternative between the native and
the web application without losing saved work.
