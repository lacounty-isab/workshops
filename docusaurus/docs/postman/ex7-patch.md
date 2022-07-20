---
title: "Ex 7: PATCH Request"
sidebar_label: "Ex 7: PATCH Request"
---

The HTTP `PATCH` method is used to update an existing record.
In this request we'll use the token from the previous exercise
to update the short description of a record in the TEST environment.

1. Create a new request in the **CJIS Tables** collection.   
   a. Name: `Short description`   
   b. Method: **PATCH**   
   c. URL: `https://api-test.codes.lacounty-isab.org/api/ChargeCode`   
   
   Save the request.

2. Select the **Authorization** tab of the request.

   :::note
   The auhtorization is set to inherit its configuration from its parent
   (the collection level).  By configuring the authorization at
   the collection level, the authorization would be available to
   all requests.  For this small example, we'll configure at the
   request level.
   :::

3. For **Type**, select **Bearer Token**.  The right side should
   display a **Token** field in which to include the token. We'll
   complete this field once we know the value of the encoded token.

4. Add the `x-api-key` header with the TEST API key.

   :::note
   Using the **Header** section for the API key allowed us to
   use the **Authorization** section for the bearer token.
   :::

5. Select the **Body** tab.  For the format, select **raw** and
   then select **JSON** from the **Text** dropdown as shown below.

   ![Add JSON body](/postman/bodyJson1.png) 

6. Add the following JSON to the body.

   ```json title="JSON request body"
   {
     "id": "826",
     "short_description": "UNLAWFUL LIQUOR 2"
   }
   ```

7. Verify that the request returns 401 since a valid
   bearer token is absent.

8. Return to your POST Authenticate request and copy the token
   value from the response.  You may need to invoke this request
   again if the token response is missing.

9. Return to the PATCH request and paste the token into the
   bearer field of the Authorization tab.

10. Resend the PATCH request.  A successful update should
    return the following:

    ```json title="JSON response body"
    {
      "changedRows": 1
    }
    ```

    :::note
    If the changed rows is `0`, it's probably because someone
    changed the row before you.  Try changing the `2` in the
    request to another number.
    :::

11. Save the request.
