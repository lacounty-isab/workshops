---
title: "Exercise 1: Workspaces and Collections"
sidebar_label: "Ex 1: Workspaces"
---

The goal of this exercise is to quickly obtain hands-on
experience with the fundamental Postman concepts of 
a *workspace* and a *collection*.

## New Workspace

1. Open the Postman application, either native or web application.

2. Create a new workspace by selecting the **Workspaces**
   dropdown and selecting **Create Workspace**.

   a. **Name**: `ISAB Workshop 1`  
   b. **Summary**: `First workspace for Postman workshop`  
   c. **Visibility**: `Personal`  

   Click the **Create Workspace** button.  This should
   create the new empty workspace.

3. Underneath the summary, click your mouse in the
   **Description** area.  When empty, it contains placeholder
   text.

   :::tip Markdown Editor
   At the bottom of the editor will be a selection that defaults
   to **Postman editor BETA**.  Select **Markdown editor** instead
   for this exercise to better see how markdown renders.
   :::

   Add the following description 

   ```markdown title="Description Area"
   Used for *private* workshop experimentation.  Will likely
   be **deleted** after the workshop.  Markdown descriptions
   support

   * bullet lists
   * `monospace font` entries
   * [links to other sites](https://workshops.lacounty-isab.org)

   and other basic formatting.
   ```

   and click <button>Save</button>.

   :::tip Markdown
   Markdown has become the de facto formatting syntax for
   web-published API documentation.  For more information on
   markdown and its syntax, see the following links.

   * https://daringfireball.net/projects/markdown/basics
   * https://guides.github.com/features/mastering-markdown/
   :::

## New Collection 

4. Select **Collections** from the left navbar and click
   **Create Collection**.  Name the new collection **Samples**.

5. Click the `...` next to the collection name in the collection
   hierarchy and select **Add folder**.  Name the new folder
   **Postman** and add the following documentation.

   ```markdown title="Folder Documentation"
   Sample APIs **hosted** by Postman
   ```

## New Request

6. Click the `...` next to the new folder and select **Add
   Request**.

   a. Name the request `Echo`.  
   b. Leave the method as `GET`.  
   c. Enter a request URL of `https://postman-echo.com/get`.

7. Click the blue <button>Send</button> button to invoke the sample
   API.  It should return the request headers as a JSON object.

   :::note Open Tabs
   By this point you'll notice that your Postman window has several
   open tabs.

   * one for the new workspace
   * one for the new collection
   * one for the `Postman` folder
   * one for the `Echo` request

   Feel free to close tabs you're not using.  For now it makes sense
   to close the first three in the list above.
   :::

   **Save** the request.

8. Using the same process, create another top-level folder
   called `CJIS Tables`.

9. Add a new request named `Charge 826`.

   :::tip Request Naming
   We could have named the request `Get Charge 826` since that's what
   the request does.  But notice that `GET` is the name of the HTTP
   verb, which is already placed before the request name.  We can save
   space in the title by using the HTTP verb as an *implied* part of
   the name.
   :::

10. Leave the method as **GET** and add a URL of
    `https://api.codes.lacounty-isab.org/api/ChargeCode/826`.

11. Click <button>Send</button>.

    The HTTP status code should be `403`.  We'll fix this later.
    **Save** the request.

:::info In this exercise you

* created a new personal workspace
* created a new collection
* created multiple folders
* created multiple GET requests
* observed different HTTP status codes
  - `200` - "success"
  - `403` - "forbidden"

:::
