---
title: "County Root CA"
sidebar_label: "County Root CA"
---

Early in the workshop we discussed why you might need to the web
application version of Postman if you're within the LA County
internal network.  The network perimeter security interferes with
the native application's ability to "phone home."

## Remote APIs

Another problem that may present itself is the invocation of
*remote APIs over HTTPS*.  The LA County network perimeter will
terminate the connection and swap SSL server certificates with
one signed by its root.  But a default Postman installation will
not recognize this root.  The symptom of this problem is a warning
in the console.

```console
Warning: Unable to get local issuer certificate
```

The request may still succeeed, but your API clients may not be
so lucky if the trust store is not properly configured.  You
can remove this warning by configuring the LA County perimeter
root issuer certificate within the Postman certificate store.
This process is described below.

## County Root CA

The first step is to acquire a copy of the perimeter issuer
certificate.  A copy is attached below if you don't have one
handy.  Just copy the contents to a file named `lac-sof-root.pem`.

```text
-----BEGIN CERTIFICATE-----
MIIDaTCCAlGgAwIBAgIQLA+VADnZMZFE8sdynYppIDANBgkqhkiG9w0BAQsFADBH
MRMwEQYKCZImiZPyLGQBGRYDQ09NMRMwEQYKCZImiZPyLGQBGRYDTEFDMRswGQYD
VQQDExJMQUMtU09GLVJvb3QgQ0EgSUkwHhcNMTYxMTIxMTgyMjU5WhcNMjYxMTIx
MTgzMjU5WjBHMRMwEQYKCZImiZPyLGQBGRYDQ09NMRMwEQYKCZImiZPyLGQBGRYD
TEFDMRswGQYDVQQDExJMQUMtU09GLVJvb3QgQ0EgSUkwggEiMA0GCSqGSIb3DQEB
AQUAA4IBDwAwggEKAoIBAQDpoF3yIhdS7R4E1zXmqzhO0SdIaXOp+GCG+gEmFk5Q
DrdDTlzD1OQxiM+dDv49QEH+hEUSWT2ROfpXWhTp6ZO7I9M9lveCARGaMM5Zn4oX
unG+ATDYvMQpt6n/VtHCgoY4d+KeqYPJqm8yCrLGUhlOmLJ8ZD9EQ+dcHvJKUAHC
Ugd+CsEwQ9kd/lJpaV9dKZ88ZReIw5yJorWbNfqrgRW+AnuGpJWQEZWBZHxjl42j
pAl1R99m3/szkCO3rNOjATt8WOy1M9XqGuaGCB6O21cGItsSl6k93A1qRf5Ms+Se
nLtbrwcu9/rrqsESx55wc4ArRVUMBvHAreOFcMsa3SchAgMBAAGjUTBPMAsGA1Ud
DwQEAwIBhjAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBSIy8+g/VdchH65hEP7
N6gIQpKw5DAQBgkrBgEEAYI3FQEEAwIBADANBgkqhkiG9w0BAQsFAAOCAQEAxv2H
3OX9LravtVGul7QiZm7hUChMYC4Jdl19PAY0wDLl0KDhoNRNhdVwjrUs1As04pKL
NZQozRn8KoMjHE1TpoFN0hiLOMbKetNfruuyLCTUpEI5+axBBOyAzvm0yo0MmuXw
cmT5/ls0FH2hos0AfrHO/ra1owAxrTWEdu/8ZOvJRXmvyYBOxfRQOR2kSdhe3AWr
pnzx54vRaoyeCMLnxKQOD87/Y+aqA/A08KAeYKbFBlkNdBE09H8av/2LK7gs4Doj
ZCcHUueOmfqnVFimkDbA6oVZgw1HE5s94LZFW8prCgGyaBs6buocQkkyhq1E0ob/
StZ7ql7oBR1gIFHE9g==
-----END CERTIFICATE-----
```

A quick check with the `openssl` command can verify the subject.

```console
$ openssl x509 -in lac-sof-root.pem -noout -subject
subject=DC = COM, DC = LAC, CN = LAC-SOF-Root CA II
```

## Postman CA Store

To install the LA County root issuer certificate as a trusted
CA (Certificate Authority), open the Postman **Preferences**
dialog.  It should appear as shown in the screenshot below.

![Certificate Settings](/postman/issuerCert1.png)


1. Select the **Certificates** tab.

2. Enable CA certificates by toggling the setting to **ON**.

3. Load the CA certificate file from `lac-sof-root.pem` that
   you created earlier.

Close the dialog and try again.  The issuer warning should
disappear on you next request.
