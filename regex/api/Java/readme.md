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

Todo: Review methods like
* `matches`
* `replaceAll`.
* `replaceFirst` (not really necessary, just like `replaceAll`)
* `split`


## Package `java.util.regex`

The `java.util.regex` package provides more advanced regular expression
capabilities.  Most notably, it allows you to compile a regular expression
once and use it multiple times for improved efficiency.
