# Regular Expressions

A *regular expression* specifies search criteria on a body of text.
Often the "body of text" is a text file divided into lines.
The expression is applied to each line and a
match is determined on a per-line basis.  Regular expressions are
also used in programs where the search criteria is applied to a
single string.  In data science applications, we apply regular
expressions to vectors of strings.

## Basic Operators

The most fundamental regular expression is just a plain string.
For example, the regular expression `hello` will match the
following line
```
he will say hello when he sees her.
```
because `hello` is in the line.  But searching for a plain string
is not common with regular expressions because far simpler search
facilities do that well already.

How about if we want to find all words that begin with `he`.
Searching for the string `he` in the above sentence will match

* `he`
* `hello`
* `when`
* `her`

We matched `when` even though the `he` is in the middle of the word,
not the beginning of the word.  We can try matching ` he` that begins
with a space.  That omits `when` from the results.  But it also omits
`he` since that was at the beginning of the line with no leading space.

Regular expression operators provide special meanings in the context
of a search.  Here are five good ones to start

| Operator | Meaning |
|----------|----------------------------------------------------------|
| `.`      | An occurrence of any character.                          |
| `*`      | Any number of occurrences of the previous pattern (including zero) |
| `?`      | Zero or one occurrences of the previous pattern          |
| `+`      | One or more occurrences of the previous pattern          |
| `\`      | Escape the regular expression meaning                    |

Now for some examples.

| Expression | Match                    | No Match                    |
|------------|--------------------------|-----------------------------|
| `a.b`      | `a.b`, `12axb`, `uya b`  | `a12b`, `b.a`, `ab`         |

What if we only wanted to match the first string in the **Match** column
above.  In other words, we match **only** if there really is a period between
the `a` and `b`.  A period by itself means "match any character".  It's the
backslash that escapes this meaning.

| Expression | Match                    | No Match                    |
|------------|--------------------------|-----------------------------|
| `a\.b`      | `a.b` | `12axb`, `uya b`, `a12b`, `b.a`, `ab`         |

Here are examples of the multiplicity operators.

| Expression | Match                    | No Match                    |
|------------|--------------------------|-----------------------------|
| `ab*d`     | `abd`, `ad`, `uyabbbbd`  | `abcd`, `abbb`, `dba`       |
| `ab?d`     | `abd`, `ad`              | `uyabbbbd`, `abcb`, `abbb`, `dba` |
| `ab+d`     | `abd`, `uyabbbbd`        | `ad` `abcb`, `abbb`, `dba`  |

Beware of the expression `.*` which means to match any amount of anything.
Often we really want `.+` which is at least some amount of anything.

## Character Ranges

Square brackets denote character selection from among a fixed set.

* `[Bb]ig` - matches `Big` and `big`.
* `[brech]at` - matches `bat`, `rat`, `eat`, `cat`, and `hat`
* `[bc]a[r-t]` - matches `bar`, `car`, `bas`, `cas`, `bat`, and `cat`

The least example shows how the dash signifies a range of characters.
Common range expressions include `[a-z]` for lower case, `[A-Z]` for
upper case, and `[0-9]` for digits.

A special case is the carat `^` as the **first** character of a selection.
In this special situation it means *match anything but the following
characters*.


| Expression | Match                    | No Match                    |
|------------|--------------------------|-----------------------------|
| `[^ab]12`  | `c12`, `d12`, `1 12`     | `a12`, `b12`, `cab12`       |

## String Options

The vertical bar `|` delimits string alternatives.  It's similar to a range;
but the individual elements can be strings instead of single characters.


* `cat|run|go` matches `cat`, `run`, or `go`; but not `catrun`
* `c|r|g` is the same as `[crg]`

String options are more commonly used with gouping (see below)

## Character Classes

Above we saw how the backslash could suppress special interpretation of
special characters.  `\.` means really match a period.  `\*` means really
match an asterisk.  There are certain other character with the opposite
effect.  The backslash takes otherwise benign characters and turns them
into special classes.  There are many of these.  Here are a few common
ones.

| Class | Description             |
|-------|-------------------------|
| `\s`  | space-like (space, tab) |
| `\d`  | digit (same as [0-9])   |

For most character classes, their opposite is specified by a capital.


| Class | Description             |
|-------|-------------------------|
| `\S`  | non-space-like             |
| `\D`  | non-digit (same as [^0-9]) |

Here are some examples.


| Expression | Match                    | No Match                    |
|------------|--------------------------|-----------------------------|
| `\d\d:\d\d:\d\d`  | `18:30:00`     | `6:30:00`, `06:30` |
| `\d+(\sms)? | `4 ms`, `436 ms`, `12` | `4ms`, `4 s`, `a ms` |
| `\D+` | `xyz`, `ab%@b?r !!` | `3`, `bv4fe` |

Note the second row has a grouping designated by parenthesis.  The `?`
modifies the entire group.  The parenthesis characters themselves are
**not** part of the match.  To match a parenthesis, escape it.

| Expression | Match                    | No Match                    |
|------------|--------------------------|-----------------------------|
| `f\(\d+\)` | `f(1)`, `f(4532)` | `f (12)`, `f12`, `f()` |

## Groups

The last example of the last section demonstrated an application of applying
an operator to group of characters rather than a single character.  This is
an example of an *application group*.

### Application Groups

The use of parenthesis to scope the application of an operator is an application
group.  Here's a more useful example of the string option.

```
the (cat|dog) catches the (fish|bird)
```
This allows for either the cat or the dog to capture the fish or the bird.

```
http://localhost(/\S+)+
```

allows for

* `http://localhost/xyz`
* `http://localhost/abc/xyz`

but not

* `http://localhost`

### Capture Groups

Capture groups are very powerful for cherry-picking parts of a match.
Say we have the following text.

```
Name: aaaa  Start: 12:00  End: 12:30
Name: bbbb  Start: 03:00
Name: cccc  Start: 14:00  End: 18:00
```

We want a comma-separated-value (CSV) file containing the name and the
start time, but only if there is an end time.  This requires us to match
context but not return the whole match.  For example

```
Name: \w+  Start: \d\d:\d\d  End: \d\d:\d\d
```

This correctly identifies only the lines with end times.  But it returns
too much.  We only want the name and the time, not their corresponding labels.
We augment the expression with capture groups.

```
Name: (\w+)  Start: (\d\d:\d\d)  End: \d\d:\d\d
```

As purely a matching criteria, the added parenthesis do nothing extra.
But when invoked within a programming environment that supports group captures,
the return result of each match will be a two-element array.  The first element
will be the name; the second element will be the start time.
