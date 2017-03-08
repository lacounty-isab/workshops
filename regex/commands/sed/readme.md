# Sed

The name **sed** is short for **s**tream **ed**itor.
It goes one step beyond **grep** in that it allows for editing
of matched lines.  Invocations of `sed` commonly differ in two
ways than `grep`.

1. The `sed` invocation references another file containing
   the `sed` editing commands (a **sed script**)
2. The output is saved to another file.

The `-f` option allows one to specify a sed script.  Since `sed`
sends its output to *stdout*, one uses I/O redirection to save
the output to another file.

## Commands

A `sed` command has the following form (square brackets mean "optional").

   [address range] function [modifier]

Here is an example.

```
$ sed "2,5 d" names.txt
Name           Hire Date  Experience
Karen Peterson 03/03/2015 16
Sally Wilson   05/19/2014 10
Sam Harman     01/20/2015 12
Peter Knight   02/07/2015  5
```

The **address range** is `2,5` which means lines 2 - 5.
The **function** is `d` which means **delete**.  So this invocation
of `sed` deleted lines 2 - 5 of the input and left the other lines
alone.

If no address range is specified for the command, the function of the
command applies to all lines of the input.
A `sed` script can have multiple commands.

### Suppress Default Printing `-n`

Input is processed by `sed` one line at a time.
The function to apply to the line is determined by the address ranges
that match it.  If a line does not match any address range,
the default function of `p` (print) is applied.  This means all
lines **not** specifically matched by the address ranges will
"flow through" to the output.  There are many cases where this is
not desirable; rather, we want to **suppress** any line that is not
explicitly matched.  To enact this default, invoke `sed` with the
`-n` flag.  Most of the examples in this tutorial will be invoked
this way.  The following example shows `sed` functioning like
`grep`.

```
$ grep "Sam" names.txt
Samuel Kravin  09/21/2015  8
Sam Harman     01/20/2015 12

$ sed -n "/Sam/p" names.txt
Samuel Kravin  09/21/2015  8
Sam Harman     01/20/2015 12
```

In this example, the **address range** is `/Sam/`, which means
"all lines with 'Sam' somewhere".  The function is `p` for print.
Because the `-n` suppress options was provided, non-matching lines
were deleted.

### Warning: Redirected File Replacement

Sed is effectively scripted editing.  Normally you edit a file
and save the changes back to the same file.  This is not possible
with `sed` unless you use an intermediate file.  One might be
tempted to try

```
sed -n -f MyScript.sed MyPrecious.txt > MyPrecious.txt
```

* This runs the `sed` commands in `MyScript.sed` against the file
  `MyPrecious.txt`.  
* The file `MyPrecious.txt` is reset to zero length.
* Its contents are filled with the output from `sed`.

The problem is that the first two items in this list **occur** in
the reverse order from how they are displayed.  The OS will prepare
`MyPrecious.txt` for writing by deleting its former contents.
By the time `sed` process it, the file is already empty.
This is usually remedied with a temporary file.

```
sed -n -f MyScript.sed MyPrecious.txt > tmp
mv -f tmp MyPrecious.txt
```
