---
title: HMAC Signatures
sidebar_label: HMAC Signatures
---

An **HMAC** (Hashed Message Authentication Code) is basically
a symmetric secret key.  It can be any string you wish.
(It can be binary; but we'll stick to strings.)

* When doing simple tests, you can use easily-remembered
  strings like "my hmac".

* For broader use, use either a long phrase or randomly
  generated characters.

* A good source of random HMAC passwords is
  https://www.grc.com/passwords.htm.


The secret must be guarded closely for real applications.

* Store them in restricted file locations.

* Choose secret that is not easily retained by a human
  upon a casual glance.

Good example (but don't use this):
```
7SK4i6NvCHc9fp5jG0kehJkAny3INhjURP7hsft
```
