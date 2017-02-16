# JavaScript Regular Expressions

Regular expression support is baked into JavaScript a few places.

1. The `String` class supports regular expression match methods

2. A `RegExp` object provides additional methods.

3. A special short-cut, the forward slash `/`.

**Note:** Sample code run with [Node.js](https://nodejs.org/en/).

## Short Cut

It's rare to see code explicitly refer to the `RegExp` object listed
in Item 2 above.  Usually they are specified with forward slashes and
supplied to regular expression methods of a `String` object.
These string methods are described next.

## String `search`

Search returns the **0-based** index of the first match;
`-1` for no match.

```
> "This is a string literal".search(/is/)
2
> "This is a string literal".search(/ is /)
4
```

The `is` in `This` is the first match.  With zero-based indexing this
is position number 2.  Since search accepts a regular expression
as its parameter, the forward slashes are used.
However, we could be sloppy and pass a string; JavaScript will
convert the string to a `RegExp` object behind the scenes.

```
> "This is a string literal".search("is")
2
```

It's best to use the explicit regular expression syntax.  It helps
with flags such as `i` for ignore case.

```
> "This is a string".search(/this/)
-1
> "This is a string".search(/this/i)  /* i - ignore case */
0
```

## String `replace`

This method takes two parameters: 1. `RegExp`, 2. `String`.
The first match of the regular expression is replaced with
the second `String` parameter.  If `g` (global) flag is
specified, all occurrences are replaced.

```
> let s = "One animal chased another animal up the tree"
undefined
> s.replace(/animal/, 'cat')
'One cat chased another animal up the tree'
> s.replace(/animal/g, 'cat')
'One cat chased another cat up the tree'
```

## String `match`

This is where things get interesting.  The `match` method supports
regular expression *capture groups*.  The first invocation of match
shows that upon a successful match, an array is returned populated
with the following:

* `0` - The full match
* `1` - The first group match
* `2` - The second group match

In JavaScript lingo, the returned object is an *array-like* object.
It's not an array; but it acts like one when subscripted.  But unlike
a true array, it also has a few other *properties*:

* `index` - The index of the first character of the full match
* `input` - The input on which the regular expression was evaluated.

These aren't used that often.  But they're there.

```
> s
'One animal chased another animal up the tree'
> r
/one (\w+).+other (\w+)/i
> s.match(r)  /* Result will be an array */
[ 'One animal chased another animal',
  'animal',
  'animal',
  index: 0,
  input: 'One animal chased another animal up the tree' ]
> s.replace(/animal/, 'cat')
'One cat chased another animal up the tree'
> s
'One animal chased another animal up the tree'
> s.replace(/animal/, 'cat').match(r)
[ 'One cat chased another animal',
  'cat',
  'animal',
  index: 0,
  input: 'One cat chased another animal up the tree' ]
> "nothing to match here".match(r)
null
```

A couple of other observations are worth noting about the code
sample above.

* The `replace` method does not change the string referenced by
  `s`.  It returns a new string.

* The last example shows that `null` is returned for a match
  failure.

The `null` return value for a failed match is a bit more convenient
than the `-1` we saw when `search` failed to match.  Namely, it's
cleaner when you simply want to test for the presence of a string.

```
> if ( s.match(/animal/) )  console.log("Found animal.")
Found animal.
> if ( s.search(/animal/) > -1 ) console.log("Found animal.")
Found animal.
```

## References

* _JavaScript: The Definitive Guide_, Sixth Edition. David Flanagan.

  This book is oriented toward people with previous programming experience
  with other programming languages such as Java or C.  It is an excellent
  reference and well-respected throughout the JavaScript community.
  However, it is a bit dated (March 2011) at a critical time when the JavaScript
  community is undergoing rapid non-trivial transformation on both the
  client and server side.  After having produced six editions of the
  book and despite appeals from the community to produce a seventh,
  Mr. Flanagan has related reluctance due to rampant unauthorized
  distribution of previous editions.

  This book dedicates an entire chapter to regular expressions.

* _Mozilla Developer Network: RegExp_,
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp.
  API reference for the `RegExp` object in JavaScript published by the
  Mozilla group (the folks who bring your the Firefox browser).
