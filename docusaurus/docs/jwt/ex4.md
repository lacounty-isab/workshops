---
title: "Ex 4: RSA Signatures"
sidebar_label: "Ex 4: RSA Signatures"
---

:::note
If you're coming here from the previous exercise,
you can continue using the same web page.
:::

:::note
If you were not able to generate RSA certificates in
previous exercises, you may download samples from
the [Appendix](/docs/jwt/keys).
:::


1. Open your Chrome browser to https://jwt.io/ and scroll
   down to the debugger.

2. Make sure **RS256** is selected.  **R** = RSA.  This should
   cause the message <span style={{color: "red"}}>Invalid Signature</span>
   to appear in red at the bottom.  That's because we haven't
   provided a private key to use for generating the signature.

3. List your private key content on our command line; then
   paste it to the **Private Key** box (the second box).
   This should allow the JWT to be **generated**.

4. In a manner similar to the previous step, paste your public
   key into **Public Key or Certificate** box.  You should see
   the <span style={{color: "blue"}}>Signature Verified</span> message
   in blue.

   ![RSA Signature](/jwt/jwt04.png)

5. Try tweaking a single character, either in the **Encoded** box
   or the payload.  What does this do do the validation?

If you only want to generate a signature, you only need to add
the private key.

If paste in an encoded JWT you wish to validate, you only need
to add the public key.

In the Steps 1 – 5 above, we did both: we created a signature with
the private key and then validated it with our public key.  This is
a good check.
