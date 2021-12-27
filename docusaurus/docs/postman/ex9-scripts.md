---
title: "Ex 9: Variables and Scripts"
sidebar_label: "Ex 9: Variables and Scripts"
---

We are now able to invoke an API requiring an authentication
token by invoking the token service and then the update service.
But it still requires we *manually* copy and paste the token from
the response body of one service into the authorization
configuration of another.  In this exercise we'll script the
copy-n-paste task.

1. Select the POST Authenticate request.

2. Select the **Tests** tab.  A JavaScript code editor is
   displayed.  Code in this tab runs *after* the request
   completes.  Enter the following code into the editor.

   ```js title="Copy to Tests tab of POST request"
   var jsonData = pm.response.json();
   var token = jsonData.token;
   if (pm.response.code === 200) {
     if (token) {
       pm.environment.set("authHeader", token);
       console.log('Token stored in authHeader variable');
     } else {
       console.log('token response is null');
     }
   } else {
     console.log('reponse code not 200');
   }
   ```

   Save the request.
   If the authentication returns a valid token, the above
   script will set a Postman variable named `authHeader`
   in the `environment` scope.

3. Select the PATCH request and then the **Authorization**
   tab.  Replace the **Token** value with `{{authHeader}}`
   and save the request.
   
4. Run the Authenticate request.

5. Run the Update request.

6. Show the Postman console.  You should see the result of the
   `console.log` statements printed in the Postman console.

:::note Script Notes
* The `pm` variable is initialized by Postman before the script
  runs.  It represents the Postman context.

* Line 1 retrieves the JSON from the response.

* Line 2 stores the token.

* Line 5 stores the token in the `environment` scope.
:::

For reference, perform an internet search on
`Postman sandbox API reference`.
