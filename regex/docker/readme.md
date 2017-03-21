# Docker

For those running [Docker](https://www.docker.com/what-docker) on their
workstations, a Docker image
based on CentOS is provided that contains

* `grep`, `sed`, and `awk`
* the sample text files

The image is available from

   https://hub.docker.com/r/lacounty/regex/

Once you have the docker image pulled down to your local workstation
you can create a container with the following command.

```
docker run --name my_regex -d -p 22 lacounty/regex:1.0
```

The initial username and password are `user` and `newpass`
respectively.  You can determine the port using `docker ps`.
If you have **ssh** installed, you can start an SSH client with

```
ssh -p <port> user@<host>
```

Note that **Windows 7** does not have **ssh** installed by
default.  Moreover, **docker** is only supported on Windows 10
and above.

Once inside as `user`, your first action should be to change
the password.  After that, you'll find the sample files inside
the `samples` directory.

```
[user@ebc25a37f984 ~]$ cd samples
[user@ebc25a37f984 samples]$ ls
logins.txt  names.txt
[user@ebc25a37f984 samples]$ cat names.txt
Name           Hire Date  Experience
Roger Campbell 02/05/2015 23
Lisa Torres    05/20/2014 12
Samuel Kravin  09/21/2015  8
Robert Kerkoff 11/14/2014  5
Karen Peterson 03/03/2015 16
Sally Wilson   05/19/2014 10
Sam Harman     01/20/2015 12
Peter Knight   02/07/2015  5
[user@ebc25a37f984 samples]$ grep "Sam" names.txt
Samuel Kravin  09/21/2015  8
Sam Harman     01/20/2015 12
[user@ebc25a37f984 samples]$
```
