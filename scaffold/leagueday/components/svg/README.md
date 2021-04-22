## Icons

`svg` files should follow the conventions of
[Feather](https://github.com/feathericons/feather) or
[Lucide](https://github.com/lucide-icons/lucide),
or be imported verbatim (i.e. copied-and-pasted into this
project) from either of those projects.

- 24x24 viewbox
- no internal css classes
- stroke width 2
- 2 units left empty at the edges
- `stroke` must be `currentColor`
- if filled, `fill` also must be `currentColor`
- content centered in and perceptually filling the viewbox

Tools for creating SVGs such as Inkscape can create very heavyweight and complex SVG code,
while handwriting the SVG code is not very difficult and achieves a much better result.

The idea is that stylistic aspects such as sizing, aspect ratio and coloring can be
applied to the SVG by the React code at runtime, allowing much more flexible reuse of
fewer, simpler SVGs.

By following the standards outlined above, one SVG can be substituted for another, or
several SVGs can be arranged visually (i.e. having the same size and consistent alignment
on screen) very easily. A style rule that scales or positions an SVG as wanted can be
reused on another SVG without any modification.
