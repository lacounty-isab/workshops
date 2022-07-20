---
title: "Ex 4: Request Headers"
sidebar_label: "Ex 4: Request Headers"
---

In this exercise, we implement the API key transmission
through a header configuration instead of an authorization.

1. Change to the **Collections** view and choose the
   **CJIS Tables** folder.  This is the folder in which
   we configured our API Key authorization.

2. Change the **Type** of the authorization back to
   *Inherit auth from parent* and save the change.

3. From the environment dropdown, select **Test**.

4. Go back to the *Charge 826* request and click
   **Send** to verify that our API key is no longer sent.

5. Select the **Headers** tab of the request definition.
   This should present a table of header values.

6. Add the API key to the header.

   a. Key: `x-api-key`   
   b. Value: `{{apikey}}`   
   c. Description: `API key for CJIS Tables`   

   The UI provides auto-complete help that displays existing
   environment entires.  In the screenshot below, typing
   `{{a` reveals a list of varables that contain `a`.  The
   **E** prefix indicates they are **Environment** variables.
   **G** means **Global**.

   ![Variable Assist Pop-up](/postman/headerHelp.png)

7. Try the request again to verify the API key explicitly
   added to the header works the same way as when configured
   through the authorization tab.


:::tip Which One to Use?
Whether we configure through the **Authorization** section or
as a **Header** depends on the context.

* The Authorization section provides scope options.

* The Header give more fine-grained control.  It's the right
  option to use when an API key is only used for throttling
  purposes and a different method is used for user authentication.
:::
