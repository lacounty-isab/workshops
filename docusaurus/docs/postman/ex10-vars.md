---
title: "Ex 10: Dynamic Variables"
sidebar_label: "Ex 10: Dynamic Variables"
---

If you run the PATCH request multiple times with the same
input data, you might notice the response returns

```json
{ "changedRows": 0 }
```

That's because we provided the same update value for
each request.  We only see a change if we use a
different value.  But that requires manually changing
the PATCH request body.

This is a common requirement: to send the same structure of
a request, but with differnet values of the same type for each
subsequent request.
This is supported in Postman through *dynamic variables*.

1. Navigate to the PATCH request body.

2. The value of the `short_description` field should still
   be `UNLAWFUL LIQUOR 2`.  Replace `2` with `{{$randomInt}}`.

3. Save the request and send again.  It should show that the
   number of rows changed is `1`.  But what did it change it to?

4. Expand

     * the **Console**
     * the last request
     * the Request Body

   This should reveal the request that was sent.

   ![POST request body](/postman/dynamicVar1.png)


Postman supports many such variables such as:

* names, title, addresses and emails
* dates and times
* GUIDs, IPs and filenames

Search the internet for `Postman dynamic variables` for the
full list.
