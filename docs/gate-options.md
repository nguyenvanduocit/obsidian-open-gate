# Gate Options

If you can read code, here is what we have under the hood. The `GateFrameOption` type is used to define the options for a gate frame.

<<< @/../src/GateOptions.d.ts

## User Agent

Usually, you won't need to change the user agent. However, in some case, the website you are trying to embed may require a specific user agent to work correctly. For example, some websites may block requests from bots or crawlers. In this case, you can set the user agent to a common browser user agent to bypass this restriction.

Currently, default value is:

<<< @/../src/fns/getDefaultUserAgent.ts {2}

## profileKey

This property is intriguing as it allows you to embed multiple emails in your vault using the `profileKey` for differentiation. The `profileKey` acts as a namespace, enabling gates with the same `profileKey` to share storage space. This facilitates using a single sign-on (SSO) to log into a website and maintaining the same session across all gates sharing that `profileKey`.

In other words, `profileKey` is like profile on Chrome.

## zoomFactor

The `zoomFactor` in the `GateFrameOption` determines the magnification level of the content within a "Gate" frame in Obsidian. A value of 1 means 100% zoom (normal size), 0.5 means the content is reduced to 50% of its normal size, and a value of 2 means the content is enlarged to 200% of its normal size.

## Css & Js Injection

`css` and `js` allows you to customize the appearance and functionality of embedded websites.

### Example

- Use CSS to modify styles for a consistent look with Obsidian. 
  - Example: `html { font-family: 'Arial', sans-serif; }` changes the font.
- Use JS to add interactivity or modify web content.
  - Example: `document.body.style.backgroundColor = "lightblue";` changes the background color.

### Warning

- Incorrect CSS/JS may break the appearance/functionality of the gate.
- Be cautious with JS that interacts with external websites to avoid security risks.

You may want to read [Gate Options](gate-options.md) to learn more about the options you can use. Of course, the are no space for custom css or javascript in the gate view.
