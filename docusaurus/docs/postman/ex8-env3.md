---
title: "Ex 8: Create Environment"
sidebar_label: "Ex 8: Create Environment"
---

At this point all our values are pinned to the TEST
environment.  This is a good time to create an environment
entry for TEST.

1. Select the POST Authenticate request.

2. Copy the base URL, the part starting with `https` and
   ending with `.org` to your clipboard.

3. Click the **Environments** entry of the left navbar.

4. Click **Create Environment**.

5. Name the environment `Test`.

6. Enter the following for the first entry:

   a. Variable: `auth.baseUrl`   
   b. Initial Value: `https://auth-test.codes.lacounty-isab.org`
      (paste from clipboard)

7. Switch back to the POST Authenticate request.

8. Substitute the base URL value in the URL field with the
   variable `{{auth.baseUrl}}`.

   ![Show Environment Variable](/postman/newEnv1.png)

9. Save changes to the requests and to the environment.

10. Activate the **Test** environment.  The environment variable
    text within the request should turn from red to orange.

11. Copy the value of the `x-api-key` header to the clipboard.

12. Create a new **Test** environment entry:

    a. Variable: `apikey`   
    b. Initial Value: `Your API key`   
    c. Current Value: The **Test** API key (from clipboard)

    :::note
    The initial and current values are different.  The initial
    value is the literal string `Your API key`.  The current
    value is the API key itself.
    :::

13. Repeat the process for the `id` and `pw` values of the request **Body**.
    The variable names should be `user.id` and `user.pw` respectively.
    See the figure below for how the table should look.

14. Add the `api.baseUrl` to the environment with an initial value
    of `https://api-test.codes.lacounty-isab.org`.

    :::tip
    The new entry is added to the bottom of the table.
    But you can move it near the top next to the
    `auth.baseUrl` if you wish.
    :::

    At this point, the **Test** environment should appear as below.

    ![Test environment entries](/postman/newEnv2.png)

15. **Save** the environment.

16. For the POST request body, substitute the variables into the environment body.

17. For the POST request header, substitute `{{apikey}}` for the value of `x-api-key`.

18. For the PATCH request, add the `{{api.baseUrl}}` to the URL field.

19. For the PATCH request header, add `{{apikey}}` to the header.

20. Invoke the request to verify it still works.
