---
title: "Ex 6: POST Request"
sidebar_label: "Ex 6: POST Request"
---

In this exercise we'll create a new workspace in which to
perform the steps.  This will help us grow accustomed to
working with multiple workspaces.

:::caution
This exercise uses *temporary* credentials
that will only be valid during workshop delivery.  If you
wish to work through this exercise on your own, contact
ISAB to activate the credentials.
:::caution

1. From the **Workspace** dropdown menu click **Create Workspace**.

   a. Name: `ISAB Workshop 2`   
   b. Summary: `Demonstrate scripts, dynamic variables and other HTTP methods`   
   c. Visibility: Choose **Personal** (note the options)   
   d. Click **Create Workspace**.

2. Select **Collections** from the navbar if it isn't selected
   already.  Since this is a new workspace, there should be zero
   collections.  Click the **Create Collection** button.

3. Name the new collection `CJIS Tables`.  For this exercise
   we'll dispense with the folders and create the requests
   directly under the collection.

4. Click the **Add a request** link and name it `Authenticate`
   by clicking the pencil icon next to the name.  The request
   can also be renamed by selecting the triple dots and
   choosing **Rename**.

   ![Rename Dropdown Choice](/postman/renameRequest.png)

5. Change the method to **POST**.

6. Set the request URL: `https://auth-test.codes.lacounty-isab.org/idp/login`

7. Select **Headers** for the request and add the TEST API key
   as the `x-api-key` request header.

8. Select **Body** for the request and choose **raw** as the format.
   Enter the following JSON.

   ```json title="Request Body"
   {
     "id": "<userid>",
     "pw": "<passwd>"
   }
   ```

   :::note
   The `<userid>` and `<passwd>` values should come from
   the workshop delivery person.
   :::

9. Send the request.  The **Body** of the **Response** section
   should be a JSON object with a `token` property containing
   an encoded JWT.

10. (Optional) Paste the encoded token value into the debugger
    at https://jwt.io to see the decoded token.
