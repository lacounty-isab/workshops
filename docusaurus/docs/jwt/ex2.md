---
title: Ex 2 - Inspect Certificate
sidebar_label: "Ex 2: Inspect Certificate"
---

The `openssl` command can be used to list attributes of an
x509 certificate.  The term **x509** refers to the standard
that specifies these attributes.  The beginning of the
command is always the same.

```
openssl x509 -in jwt-cert.pem -noout
```

* `x509` is the `openssl` subcommand
* `-in` is the option for the input certificate filename
* `-noout` means there is *no output* certificate
  (i.e. this is not a certificate conversion)

The last argument (after the above three) will depend on what
you want to see.  This exercise will investigate three of them.

1. __-dates__ – Placing this option at the end of the command
   lists the validity dates of the certificate.

   ```
   $ openssl x509 -in jwt-cert.pem -noout -dates
   notBefore=Apr 30 18:29:08 2021 GMT
   notAfter=May 24 18:29:08 2026 GMT
   ```

2. __-subject__ – The subject parameters you provided in
   the previous exercise to create the certificate can be
   listed with this option.

   ```
   $ openssl x509 -in jwt-cert.pem -noout -subject
   subject= /C=US/ST=California/L=County of Los Angeles/O=ISAB/CN=My JWT Signer
   ```

3. __-text__ - This parameter lists all the details of the
   certificate.  It's usually more than you want to know.

   ```
   $ openssl x509 -in jwt-cert.pem -noout -text
   Certificate:
       Data:
           Version: 1 (0x0)
           Serial Number:
               fa:be:b7:ee:57:94:85:d8
   .....
   ```
