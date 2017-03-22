# Java Regular Expressions

The Java programming language supports regular expressions through

* `java.lang.String` methods
* `java.util.regex` package

A detailed explanation of Java regular expression support is provided
through the official Java API documentation for the
`java.util.regex.Pattern` class.  For Java 8 this is available at

<http://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html>

## String

The `String` class provides matching and replacement methods that
accept a regular expression for a parameter.

### Method: `matches`

The `matches` method performs an exact match, which is different
from a search.  Consider the following code snippet.

```
   public static void matchSamples() {
      String msg = "he renders the help when he sees her";
      evalMatches(msg, "\\bhelp\\b");
      evalMatches(msg, ".*\\bhelp\\b.*");
      evalMatches(msg, "he");
      evalMatches(msg, "he.*");
   }

   public static void evalMatches(String msg, String re) {
      if (msg.matches(re)) {
         System.out.printf("TRUE:  Regex [%s] matches [%s].\n", re, msg);
      } else {
         System.out.printf("FALSE: Regex [%s] matches [%s].\n", re, msg);
      }
   }
```
with the following output.
```
FALSE: Regex [\bhelp\b] matches [he renders the help when he sees her].
TRUE:  Regex [.*\bhelp\b.*] matches [he renders the help when he sees her].
FALSE: Regex [he] matches [he renders the help when he sees her].
TRUE:  Regex [he.*] matches [he renders the help when he sees her].
```

The first thing to remember, as with most APIs, the string that defines
the regular expression must escape all backslashes, which in turn are
usually escaping something else.  So in the code we see must backslashes
in pairs.  But in the output, we see their single backslash counterpart.

The next thing to remember is that the pattern must match the entire
string.  Looking for `\bhelp\b` failed.  We had to explicitly indicate
that other characters might be present before or after `help`.

### Method: `replaceAll`

Unlike the case with `matches`, the regular expression parameter is
used to search for a substring.  Where ever this substring is found,
it is replaced by the `replacement` parameter.

```
String newMsg = msg.replaceAll("he", "Bob");
System.out.println(newMsg);
newMsg = msg.replaceAll("\\bhe\\b", "Bob");
System.out.println(newMsg);
```
The first example reminds us to be mindful of word boundaries.
```
Bob renders tBob Boblp wBobn Bob sees Bobr
Bob renders the help when Bob sees her
```

There is a companion method `replaceFirst` that will only replace
the first match, leaving the others alone.

### Method: `split`

Regular expressions can be used as the criterion on which to split
a string into pieces.

```
   System.out.println(msg);
   splitIntoPieces(" ");
   splitIntoPieces("\\b");
   splitIntoPieces("he");
   splitIntoPieces(" he ");
   splitIntoPieces("\\s*\\bhe\\b\\s*");
   . . .
   public static void splitIntoPieces(String regex) {
      System.out.printf("Regex = \"%s\"\n", regex);
      String[] pieces = msg.split(regex);
      for (String piece : pieces) {
         System.out.printf("[%s] ", piece);
      }
      System.out.println();
   }
```
This has the following output.
```
he renders the help when he sees her
Regex = " "
[he] [renders] [the] [help] [when] [he] [sees] [her]
Regex = "\b"
[he] [ ] [renders] [ ] [the] [ ] [help] [ ] [when] [ ] [he] [ ] [sees] [ ] [her]
Regex = "he"
[] [ renders t] [ ] [lp w] [n ] [ sees ] [r]
Regex = " he "
[he renders the help when] [sees her]
Regex = "\s*\bhe\b\s*"
[] [renders the help when] [sees her]
```

-----------------------------------------------

## Package `java.util.regex`

The `java.util.regex` package provides more advanced regular expression
capabilities.  Most notably, it allows you to compile a regular expression
once and use it multiple times for improved efficiency.

An instance of the `Pattern` class represents a compiled regular expression.
The `split` method on a `Pattern` instance performs the same function as it
does on the `String` instance.

```
import java.util.regex.Pattern;
import java.util.regex.Matcher;
. . .
Pattern p = Pattern.compile(" ");
String[] pieces = p.split("Each of these words will be a piece");
```

The power of the `java.util.regex` lies in the information returned in
a `Matcher` instance.  The following sample shows an example of a
`Matcher` instance handling capture groups.

```
1 static final String msg = "he renders the help when he sees her";
2 Pattern p = Pattern.compile("he (\\w+).*he (\\w+)");
3 Matcher m = p.matcher(msg);
4 if (m.find()) {
5   for (int i = 0; i <= m.groupCount(); i++) {
6     System.out.printf("Group %d = %s\n", i, m.group(i));
7   }
8 }
```

The regular expression containing two grouping elements is compiled in
line 2 to create a `Pattern` instanced `p`.  The pattern is paired with
the `msg` string in line 3 and applied in line 4.  The `find` method
returns a boolean to signify whether there was a match.

The `groupCount` method determine how many groups are defined in the
regular expression.  The `group` method accepts an integer with the
following meaning:

* `0` - the entire string match
* `1` - capture group 1
* `2` - capture group 2

Below is the output from running the above code.
```
Group 0 = he renders the help when he sees
Group 1 = renders
Group 2 = sees
```

It's interesting to note that the second group matched the `sees` part
of `he sees` rather than the `the help`.  That's a result of *greedy*
matching.  There are two places in the string to match `.*he (\\w+)`:

1. `the help`
2. `the help when he sees`

In the first case, the `.*` matched `t`.  In the second case the
`.*` matched `the help when `.  Because greedy matching is the default,
the `.*` gobbled up as much as it could (while still matching the string).
This amounts to the second choice.
