# Tcl

Tool Command Language (TCL) has abundant support for regular expressions.
There is the [regexp package](http://www.tcl.tk/man/tcl/TclCmd/regexp.htm)
dedicated to regular expressions.  There are also functions that support
regular expressions when provided the right option.

## Package `regexp`

The `regexp` command provides a large number of options and formats.
A basic form of the command is

```
regexp pattern string matchVar
```

where
* `pattern` is a regular expression
* `string` is a string to which the regular expression is applied
* `matchVar` is an *optional* variable name used to hold the match.

In the example below, we create string named `rec` and search it for
a pattern that looks like a date.
The `\d` in the regular expression represents a digit.

```
tcl>set rec {2016-01-03 10:05:23 system up!}
2016-01-03 10:05:23 system up!
tcl>regexp {\d\d\d\d-\d\d-\d\d} $rec
1
tcl>
```
The return value `1` indicates a match.  A `0` indicates no match.

The next example show that we can store the contents of a match in
another variable.  In this case, `dt` stores the match that is found.

```
tcl>regexp {\d\d\d\d-\d\d-\d\d} $rec dt
1
tcl>puts $dt
2016-01-03
tcl>
```

The `regexp` command also supports regular expression groupings through
a *submatch variable*.  These come after the match variable.
In the next example, we supply three groupings and three submatch
variables: `year`, `month`, and `day`.

```
tcl>regexp {(\d\d\d\d)-(\d\d)-(\d\d)} $rec dt year month day
1
tcl>puts $year
2016
tcl>puts "The date is $month/$day/$year"
The date is 01/03/2016
tcl>
```

The `regexp` has a lot of useful options.

### `-indices`

The examples above placed the matching strings into the variables.
This options places the **indices** of the matched strings in the
variables.

```
tcl>regexp -indices {(\d\d\d\d)-(\d\d)} $rec dt yr mn
1
tcl>puts $dt
0 6
tcl>puts $mn
5 6
tcl>
```
This can be helpful since there are other functions that work with
string indices.

### `-inline`

This option tells `regexp` to return the matches as a Tcl list rather
than storing them in separate variables.
In the following example, the list is set to a variable named
`my_matches`.
```
tcl>set my_matches [regexp -inline {(\d\d\d\d)-(\d\d)-(\d\d)} $rec]
2016-01-03 2016 01 03
tcl>foreach w $my_matches { puts "Match: $w" }
Match: 2016-01-03
Match: 2016
Match: 01
Match: 03
tcl>
```
Notice the list is comprised of the full match followed by each
submatch.  This is useful if you don't know how many submatches
to expect.

## Other Commands

Many other Tcl commands that involve string matching can be configured
to process regular expressions.  This is often designated by the
`-regexp` option within the command.

### `lsearch`

This command returns in index of the first element within a list that
matches a string.  (Note that Tcl has a *zero-based* index model).
Continuing with the value of `$my_matches` set above, the following
examples show results from `lsearch`.  Line numbers were added for
reference below.
```
 1| tcl>lsearch $my_matches {01}
 2| 2
 3| tcl>set my_matches
 4| 2016-01-03 2016 01 03
 5| tcl>lsearch $my_matches {\d\d}
 6| -1
 7| tcl>lsearch -regexp $my_matches {\d\d}
 8| 0
 9| tcl>lsearch -regexp $my_matches {^\d\d$}
10| 2
11| tcl>
```
* __Line 1__ shows a fixed (non-regular expression) match.  The result was
  `2`, which is the 3rd element of the list in a zero-based index.
  Notice that the first entry wasn't matched despite containing a
  `01` in the middle.
* __Line 5__ is a subtle error.  It attempts to apply the regular expression
  `\d\d` but fails to provide the `-regexp` option on the command line.
  The result is `-1` which means no match.
* __Line 7__ supplies the `-regexp`.  Note that, unlike the first example,
  it matches the first occurrence of the regular expression (index `0`).
* __Line 9__ show how to search for a list element that contains exactly
  two digits by surrounding the expression with `^` and `$`.

### `switch`

Many languages support the `switch` statement, a kind of "multi-valued if"
statement.  C and Java used to only support switching on an integer.  As
of Java 7, Java added support for switching on `String` and `enum` values.
Tcl supports switching on regular expressions!
In the example below, I create a short Tcl program.  It defines a Tcl
procedure that prints output based on a switch evaluation

```
 1| $ cat rtest.tcl
 2| proc prt { year } {
 3|   switch -regexp -- $year \
 4|     {\d\d\d\d} { puts "Year: $year"   }\
 5|     {[2-9]\d}  { puts "Year: 19$year" }\
 6|     {[01]\d}   { puts "Year: 20$year" }
 7| }
 8| prt 1974
 9| prt 74
10| prt 17
11| $ tcl rtest.tcl
12| Year: 1974
13| Year: 1974
14| Year: 2017
```
* __Line 1__ I issue the Linux command to display the `rtest.tcl` script.
* __Lines 2 - 7__ Define a Tcl procedure that accepts a `year` parameter.
* __Lines 8 - 10__ Invoke the Tcl procedure with different inputs.
* __Line 11__ Run the Tcl script.
* __Line 12__ The output from running `prt 1974` in Line 8.  This matches
  the regexp in Line 4.
* __Line 13__ The output from running `prt 74` in Line 9.  This matches
  the regexp in Line 5.
* __Line 14__ The output from running `prt 17` in Line 10. This matches
  the regexp in Line 6.

I found adding regular expressions to switch statements a bit tricky
(e.g. notice the end-of-line escapes that are *sometimes* required to
make it work.)  But it does demonstrate the extent to which Tcl goes
to support regular expressions.
