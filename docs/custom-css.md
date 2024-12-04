# Custom CSS

Every website has its own style, and you can customize the appearance of embedded websites in Open Gate by adding custom CSS. This can help match the embedded content with your Obsidian theme or make it more readable.

## How to Add Custom CSS

You can add custom CSS in two ways:

1. Through the Gate Settings:
   - Open Gate Settings
   - Edit a gate
   - Enable Advanced Options
   - Add your CSS in the CSS field

2. In Markdown Code Blocks:

If you use [inline embedded](inline-embedded.md), you can add custom CSS in the code block like this:

~~~
```gate
url: https://example.com
css: |
  html { font-size: 20px; }
```
~~~

## Useful Snippets

### Dark Mode
Convert light websites to dark mode:
```css
html { 
    filter: invert(90%) hue-rotate(180deg)!important;
}
```

### Readability Improvements
Make text more readable:
```css
html { 
    font-size: 20px;
}

body {
    line-height: 1.6;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
```

### Hide Elements
Remove unwanted elements:
```css
.advertisement,
.cookie-banner,
.popup-overlay {
    display: none !important;
}
```

### Custom Scrollbar
Style the scrollbar:
```css
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: var(--background-primary);
}

::-webkit-scrollbar-thumb {
    background: var(--text-muted);
    border-radius: 4px;
}
```

## Tips
- Use `!important` when your styles aren't being applied due to specificity conflicts
- Test CSS changes incrementally to avoid breaking the layout
- Use browser dev tools to inspect elements and find the right selectors
- Consider using Obsidian CSS variables for better theme compatibility

## Resources
- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Tricks](https://css-tricks.com/)
- Share your snippets in our [GitHub Discussions](https://github.com/nguyenvanduocit/obsidian-open-gate/discussions/categories/snippets)