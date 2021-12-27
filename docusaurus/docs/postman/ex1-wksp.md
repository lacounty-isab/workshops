---
title: "Exercise 1: Workspaces and Collections"
sidebar_label: "Ex 1: Workspaces"
---

The goal of this exercise is to quickly obtain hands-on
experience with the fundamental Postman concepts of 
a *workspace* and a *collection*.

1. Open the Postman application, either the native or the
   web application.

2. Create a new workspace by selecting the **Workspaces**
   dropdown and selecting **Create Workspace**.

   a. **Name**: `ISAB Workshop 1`  
   b. **Summary**: `First workspace for Postman workshop`  
   c. **Visibility**: `Personal`  

   Click the **Create Workspace** button.  This should
   create the new empty workspace.

3. Underneath the summary, click your mouse in the
   **Description** area.  When empty, it contains the
   placeholder text *Add a description ...* .  Add the
   following description and click <button>Save</button>.

   ```markdown title="Description Area"
   Used for *private* workshop experimentation.  Will likely
   by **deleted** after workshop.  Markdown descriptions
   support
   * bullet lists
   * `monospace font` entries
   * [links to other sites](https://workshops.lacounty-isab.org)

   and other basic formatting.
   ```

   :::tip Markdown
   Markdown has become the de facto formatting syntax for
   web-published API documentation.  For more information on
   markdown and its syntax, see the following links.

   * https://daringfireball.net/projects/markdown/basics
   * https://guides.github.com/features/mastering-markdown/
   :::

4. Select **Collections** from the left navbar and click
   **Create Collection**.  Name the new collection **Samples**.

5. Click the `...` next to the collection name in the collection
   hierarchy and select **Add folder**.  Name the new folder
   **Postman** and add, as
   documentation, `Sample APIs hosted by Postman`.

6. Click the `...` next to the new folder and select **Add
   Request**.

   a. Name the request `Echo`.  
   b. Leave the method as `GET`.  
   c. Enter a request URL of `https://postman-echo.com/get`.

7. Click the blue <button>Send</button> button to invoke the sample
   API.  It should return the request headers as a JSON object.

8. Using the same process, create another top-level folder
   called `CJIS Tables`.

9. Add a new request named `Get charge 826`.

10. Leave the method as **GET** and add a URL of
    `https://api.codes.lacounty-isab.org/api/ChargeCode/826`.

11. Click <button>Send</button>.

The HTTP status code should be `403`.  We'll fix this later.

:::note In this exercise you

* created a new personal workspace
* created a new collection
* created multiple folders
* created multiple GET requests
* observed different HTTP status codes
  - `200` - "success"
  - `403` - "forbidden"

:::
