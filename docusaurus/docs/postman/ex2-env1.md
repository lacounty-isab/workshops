---
title: "Ex 2: Changing Environments"
sidebar_label: "Ex 2: Changing Environments"
---

This exercise continues where the previous exercise ended –
with the *Charge 826* request.

1. Change the URL field of the request to invoke the TEST API
   instead of PROD by changing `api.codes` to `api-test.codes`
   in the URL field.

2. Send the request with the <button>Send</button> button.
   You should see the same `403` response as you did for PROD.

3. Select the **Auth** tab in the response section for adding
   the API key.  The type defaults to *Inherit auth from
   parent*.

   :::tip Auth Hierarchy
   In this case the parent is the **CJIS Tables** folder.
   Since the API key will work across all requests, it makes
   sense to configure authorization at this folder level to
   avoid duplicating it across several requests.
   :::

4. Select the parent folder, **CJIS Tables**, and the
   **Authorization** tab within it.  Notice that it, too,
   is configured to *Inherit auth from parent*.  But since
   this authorization doesn't apply to other folders, like
   the `Postman` folder, we'll
   configure the authorization here.

5. From the dropdown box, select **API Key**.

6. For the **Key** field, enter `x-api-key`.

7. For the **Value** field, enter the TEST API key listed in
   the MS Teams channel for this workshop.

8. **Save** the folder settings.

9. Return to the *Charge 826* request tab and send the
   request.  It should be successful.

10. Change the URL back to the PROD URL, i.e. change
    `api-test` back to `api` and try again.
    The request should fail.

:::note Why?
The request failed because we still have the TEST API
key configured in the folder authorization.  Changing
environments is no longer as simple as changing the URL.
Now we have to change the URL **and** the authorization.
As our API becomes more realistic, these environment differences
grow cumbersome to swap.

*Environment configurations* address this.
:::

