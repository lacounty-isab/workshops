---
title: "Ex 3: Managing Environments"
sidebar_label: "Ex 3: Managing Environments"
---

In the previous exercise, we saw that switching between
environments grows cumbersome as the number of
environment dependencies grows.  This exercise will
demonstrate how **Postman environments** address this.

1. Select **Environments** from the left navbar.  So far,
   we should have no environments defined in our workspace.

2. Click the plus symbol, &#x2795; , at the top-left of the
   (empty) environment list to create a new environment.

3. Name the new environment `Test`.  It is displayed as a
   table of values.

4. Make the following entries in the first row of the table.

   a. **Variable**: `baseUrl`  
   b. **Initial Value**: `https://api-test.codes.lacounty-isab.org`  
   
   The **Current Value** should be filled automatically with
   the initial value.  If not, make sure it is.

5. Add the following entries in the second row.

   a. **Variable**: `apikey`  
   b. **Initial Value**: `Your API key`  
   c. **Current Value**: the test API key

   The **Current Value** should be the actual value of the API
   key, where the **Initial Value** should be the string literal
   `Your API key`.

6. **Save** the environment.

   :::tip Check it out
   You can see that each Postman environment variable contains
   two values

   * __Initial Value__ – visible to all members of the workspace
   * __Current Value__ – used by **your** workspace
   :::

   ![Environments](/postman/env1.svg)

7. Create another environment with the &#x2795; button.

8. Name the new environment `Production`.

9. Add the `baseUrl` variable with an initial value of
   `https://api.codes.lacounty-isab.org`.

10. Save the environment (we're not adding the API key yet).

11. Close the **Test** and **Production** environment tabs
    from your workspace and select the **CJIS Tables** folder.
    It should still have the **Authorization** section selected.

12. Change the **Value** field to `{{apikey}}`.

    :::tip Check it out
    At this point, the value should appear in red.  This is because
    it's not defined for the *current* environment.  In fact, there
    is no current environment.
    :::

    ![Current Environment](/postman/env2.png)

13. From the environment list in the upper-right corner, select
    **Test**.  At this point, the `{{apikey}}` value you provided
    in the last step should turn from red to orange.  This indicates
    this value can be read from the current environment.

14. Save the folder tab and select the *Get charge 826* tab.

15. Change the URL field to contain the `{{baseUrl}}` variable.

    ![Base URL](/postman/env3.png)

16. Now <button>send</button> the request.
    You should see the result from the CJIS Tables TEST environment.

17. Select **Production** from the environment list.

18. Send another request to verify it fails due to the fact we
    didn't set the API key for this environment.

19. Verify the environment values by clicking the "eye" icon
    next to the environment dropdown list.  This displays the
    values for the current environment.
    
    ![Current Environment](/postman/env4.png)

    We can see from the environment view that we're missing the
    API key.

20. Rather than navigate back to the environment section
    to edit the current environment, just click the **Edit** link
    in the viewer.

21. Add the API key like before, using the production value
    instead of the test value.

    a. **Variable**: `apikey`    
    b. **Initial Value**: `Your PROD API key`    
    c. **Current Value**: the actual PROD API key   

22. Save the environment.

23. Return to the *Get charge 826* tab and send the request.
    This should return the production result since the
    **Production** environment should still be selected.

24. Select the **Test** environment and re-run.
    It should still succeed.

25. Select **No Environment** and re-run.
    This should fail and is a good symptom to recognize.


--------------------------------------

Postman environments are very important for

* keeping your workspace organized by reducing the need to
  duplicate requests for different envirnments,

* tracking which values are environment-specific,

* limiting the visibility of sensitive environment variables.

This last point is not as apparent for a **private** workspace.
In team workspaces it allows developers to share which keys,
tokens and passwords are required while keeping their actual
values confidential.
