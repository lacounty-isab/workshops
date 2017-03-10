# AWK

The `awk` command is named after its creators:

* Aho, Alfred
* Weinberger, Peter
* Kernighan, Brian

Awk is one step up from `sed`.
Whereas `sed` provided editing capabilities within the context of a
single line, `awk` is a full programming language capable of maintaining
state throughout its entire execution.
It's also simply enough to provide value as a single option on
the command line.

```
awk '{print $2}' names.txt
Hire
Campbell
Torres
Kravin
Kerkoff
Peterson
Wilson
Harman
Knight
```

The `awk` script itself is between the single quotes.
It prints the "second column" of the input, which is
the last name in the `names.txt` file.

Now let's step back and understand what's going on.
There are some similarities to `sed`.

1. There is an implicit read loop.
2. Each iteration of the loop applies the entire
   script to the line.
3. Each `awk` command has the form

`[address range] code block`

Like `sed`, if the address range is omitted, as in the example above,
the code block applies to all lines.  The example above showed that
the command even applied to the header line, which is probably not
what we wanted.  We can skip the first line with

```
awk 'NR>1 {print $2}' names.txt
```

The `NR>1` means *if the number or records (lines) is greater than one*.

### Fields

Awk has powerful builtin capabilities for processing tabular input data.
This makes it popular among system administrators for gleaning output from
other commands and storing them in comma separated value (CSV) format.
