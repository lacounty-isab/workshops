---
title: Ex 1 - Generate RSA Keys
sidebar_label: "Ex 1: RSA Keys"
---

The `openssl` command is required for this exercise.

1. Create a directory named `JwtWorkshop` and change to it using
   the command line.  Verify you have access to the `openssl`
   command by checking the version.  Your version may be different
   than the one shown below.

   ```console
   $ openssl version
   LibreSSL 3.2.2
   ```

2. Run the `openssl` command to create a new 2048-bit public/private
   RSA key pair.

   ```console
   $ openssl genrsa -out jwt-key.pem 2048
   Generating RSA private key, 2048 bit long modulus
   ```

3. Generate an x509 certificate from your public key.  Note that it is
   an interactive command in this form.  You are prompted for various
   x509 fields.

   ```console
   $ openssl req -x509 -new -key jwt-key.pem -out jwt-cert.pem –days 1850
   You are about to be asked to enter information that will be incorporated
   into your certificate request.
   What you are about to enter is what is called a Distinguished Name or a DN.
   There are quite a few fields but you can leave some blank
   For some fields there will be a default value,
   If you enter '.', the field will be left blank.
   -----
   Country Name (2 letter code) []:US
   State or Province Name (full name) []:California
   Locality Name (eg, city) []:County of Los Angeles
   Organization Name (eg, company) []:ISAB
   Organizational Unit Name (eg, section) []:
   Common Name (eg, fully qualified host name) []:My JWT Signer
   Email Address []:
   ```
 
:::note
- Not every option is required.
- Together, these attributes form what is known as the
  x509 **subject**.
- The **Common Name** (or **CN**, a subset of the subject)
  is **not** a fully qualified host name.
- `-days 1850` means it's valid for 5 years.
:::

The result of this exercise should be your private key and certificate

* `jwt-key.pem`
* `jwt-cert.pem`

respectively.  We'll analyze the certificate in the next exercise.
