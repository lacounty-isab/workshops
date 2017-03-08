# Grep

The **grep** utility is so common that, in some circles, its name
has become a verb.  The name is actually an acronym:
General Regular Expression Parser.
It searches through each line of a file for a pattern
that matches a regular expression.  Because it also works for *fixed*
patterns, it's also popular with users that are not familiar with regular
expressions.

There are two short sample text files in the directory of this document
that were used to demonstrate the commands below.  You are encouraged
to experiment with these files yourself.

The following example is a minimal `grep` command.

```
grep Sam names.txt
Samuel Kravin  09/21/2015  8
Sam Harman     01/20/2015 12
```

This will search for the name `Sam` throughout the file `names.txt`.
This usage is typical.  In the geek vernacular this would be,
"grep names.txt for Sam."

## Command Options

The following are some useful `grep` command options.

### Ignore Case

The `-i` indicates a case insensitive match.

```
grep -i sam names.txt
Samuel Kravin  09/21/2015  8
Sam Harman     01/20/2015 12
```
will match lines with `sam`, `SaM`, `SAM`, and others.

### File Names Only

Sometimes you have a large collection of files and you merely want to
test the presence of a pattern in each one.  You don't need to actually
see the line on which it occurs.

```
grep -l Sam *.txt
logins.txt
names.txt
```

will list the name of each file ending with `.txt` that contains `Sam`.

### Line Numbers

To provide a list of which lines contain the pattern, use the `-n` option.

```
grep -n Sam *.txt
logins.txt:8:2017-02-01 10:15:51  Samuel Kravin
logins.txt:12:2017-02-02 09:16:37  Samuel Kravin
logins.txt:13:2017-02-03 08:45:41  Samuel Kravin
logins.txt:20:2017-02-01 08:50:09  Sam Harman
logins.txt:21:2017-02-02 08:50:09  Sam Harman
logins.txt:22:2017-02-03 08:50:09  Sam Harman
names.txt:4:Samuel Kravin  09/21/2015  8
names.txt:8:Sam Harman     01/20/2015 12
```
Each entry is prepended with the file name and line number of occurrence.

### Line Counts

The `-c` option prints the line counts of occurrences next to each file name.

```
grep -c Sam *.txt
logins.txt:6
names.txt:2
```

## Basic versus Extended

By default the `grep` command interprets the search expression as a
*basic regular expression* (BRE).  This is a restricted subset of the more
full-featured *extended regular expressions* (ERE). There are
two ways to specify that you want ERE instead of BRE.

1. Invoke `egrep` instead of `grep`.
2. Prefix the pattern with the `-E` flag.

The differences between BRE and ERE are not as simple as one having more
features than the other.  They also differ on how to give special characters
their meaning.  Rather then attempting to keep two systems in mind (BRE versus
ERE), it's easier to adopt the following guide line.

1. If you need to match a fixed string, use `grep`.
2. If you need a regular expression match, use `egrep`.

The differences between BRE and ERE are described at the following link.

<http://www.regular-expressions.info/posix.html>
